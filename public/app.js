// =============================================================
// STEPHAN RÖTTGER — music-video engine
// Audio-reactive particle BG + scene timeline + HUD updates
// =============================================================

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const audio = $('#track');
const overlay = $('#overlay');
const startBtn = $('#start');
const progress = $('#progress');
const timeEl = $('#time');
const bpmEl = $('#bpm');
const muteBtn = $('#mute');
const restartBtn = $('#restart');
const fsBtn = $('#fs');
const scenes = $$('.scene');

// =============================================================
// AUDIO ANALYSIS
// =============================================================
let actx, analyser, source;
let freqData;

function setupAudio() {
  if (actx) return;
  actx = new (window.AudioContext || window.webkitAudioContext)();
  source = actx.createMediaElementSource(audio);
  analyser = actx.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.85;
  source.connect(analyser);
  analyser.connect(actx.destination);
  freqData = new Uint8Array(analyser.frequencyBinCount);
}

function getAudioData() {
  if (!analyser) return { bass: 0, mid: 0, treble: 0, overall: 0 };
  analyser.getByteFrequencyData(freqData);
  const len = freqData.length;
  const bassEnd = Math.floor(len * 0.06);
  const midEnd = Math.floor(len * 0.35);

  let bass = 0, mid = 0, treble = 0;
  for (let i = 0; i < bassEnd; i++) bass += freqData[i];
  for (let i = bassEnd; i < midEnd; i++) mid += freqData[i];
  for (let i = midEnd; i < len; i++) treble += freqData[i];

  bass = (bass / bassEnd) / 255;
  mid = (mid / (midEnd - bassEnd)) / 255;
  treble = (treble / (len - midEnd)) / 255;
  const overall = (bass + mid + treble) / 3;
  return { bass, mid, treble, overall };
}

// =============================================================
// PARTICLE BACKGROUND  (canvas)
// =============================================================
const canvas = $('#bg');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, dpr = 1;

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = canvas.width = window.innerWidth * dpr;
  H = canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  initParticles();
}
window.addEventListener('resize', resize);

const PARTICLE_COUNT = 140;
let particles = [];
function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3 * dpr,
      vy: (Math.random() - 0.5) * 0.3 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
      base: Math.random() * 0.5 + 0.4,
    });
  }
}

let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX * dpr;
  mouseY = e.clientY * dpr;
});

let lastBass = 0;
let bassPeakTime = 0;
let beatCount = 0, lastBeatTime = 0, bpm = 120;

function drawBackground(t) {
  const audio = getAudioData();
  const { bass, mid, treble, overall } = audio;

  // Beat detection (simple bass kick detection)
  const now = performance.now();
  if (bass > 0.7 && bass > lastBass * 1.15 && now - bassPeakTime > 200) {
    bassPeakTime = now;
    document.body.classList.add('bass');
    setTimeout(() => document.body.classList.remove('bass'), 180);
    if (lastBeatTime > 0) {
      const delta = now - lastBeatTime;
      if (delta > 250 && delta < 1500) {
        bpm = Math.round(60000 / delta);
        bpmEl.textContent = bpm.toString().padStart(3, '0');
      }
    }
    lastBeatTime = now;
    beatCount++;
  }
  lastBass = bass;

  // Background fade — leaves trails
  ctx.fillStyle = `rgba(0, 0, 0, ${0.18 + (1 - overall) * 0.12})`;
  ctx.fillRect(0, 0, W, H);

  // Grid lines (subtle, audio-reactive)
  const gridAlpha = 0.04 + bass * 0.18;
  ctx.strokeStyle = `rgba(255, 0, 51, ${gridAlpha})`;
  ctx.lineWidth = 1 * dpr;
  const gridSize = 80 * dpr;
  const offset = (t * 0.02) % gridSize;
  ctx.beginPath();
  for (let x = -offset; x < W + gridSize; x += gridSize) {
    ctx.moveTo(x, 0); ctx.lineTo(x, H);
  }
  for (let y = -offset; y < H + gridSize; y += gridSize) {
    ctx.moveTo(0, y); ctx.lineTo(W, y);
  }
  ctx.stroke();

  // Radial energy pulse on bass
  if (bass > 0.4) {
    const cx = W / 2, cy = H / 2;
    const radius = bass * Math.max(W, H) * 0.45;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(255, 0, 51, ${bass * 0.18})`);
    grad.addColorStop(0.5, `rgba(255, 0, 51, ${bass * 0.06})`);
    grad.addColorStop(1, 'rgba(255, 0, 51, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // Particles
  const speedBoost = 1 + mid * 4;
  const reach = 120 * dpr;
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Mouse repulsion
    const dx = p.x - mouseX;
    const dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < reach && dist > 0) {
      const force = (1 - dist / reach) * 1.5;
      p.vx += (dx / dist) * force * 0.4;
      p.vy += (dy / dist) * force * 0.4;
    }

    // Audio push outward from center on bass
    if (bass > 0.5) {
      const cx = W / 2, cy = H / 2;
      const ddx = p.x - cx, ddy = p.y - cy;
      const dd = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
      p.vx += (ddx / dd) * bass * 0.6;
      p.vy += (ddy / dd) * bass * 0.6;
    }

    p.x += p.vx * speedBoost;
    p.y += p.vy * speedBoost;

    // Friction
    p.vx *= 0.96;
    p.vy *= 0.96;
    // Base drift
    p.vx += (Math.random() - 0.5) * 0.04 * dpr;
    p.vy += (Math.random() - 0.5) * 0.04 * dpr;

    // Wrap
    if (p.x < 0) p.x = W;
    else if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    else if (p.y > H) p.y = 0;

    // Draw
    const alpha = p.base + treble * 0.5;
    const size = p.r * (1 + bass * 1.5);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Connect nearby particles (constellation lines)
  const connectDist = 110 * dpr;
  ctx.lineWidth = 0.5 * dpr;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < connectDist) {
        const alpha = (1 - d / connectDist) * (0.15 + mid * 0.4);
        ctx.strokeStyle = `rgba(255, 0, 51, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // Audio-spectrum bottom bar (subtle)
  if (analyser) {
    const barW = W / 64;
    for (let i = 0; i < 64; i++) {
      const v = freqData[i * 2] / 255;
      const bh = v * 60 * dpr;
      ctx.fillStyle = `rgba(255, 0, 51, ${v * 0.5})`;
      ctx.fillRect(i * barW, H - bh, barW - 2, bh);
    }
  }
}

// =============================================================
// SCENES
// =============================================================
let currentScene = -1;
function updateScenes(time) {
  let active = -1;
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const from = parseFloat(s.dataset.from);
    const to = parseFloat(s.dataset.to);
    if (time >= from && time < to) { active = i; break; }
  }
  if (active !== currentScene) {
    if (currentScene >= 0) scenes[currentScene].classList.remove('active');
    if (active >= 0) scenes[active].classList.add('active');
    currentScene = active;
  }
}

// =============================================================
// HUD updates (heartbeat scene typing effect)
// =============================================================
const bootLines = [
  '> mounting punk.os ........................ ok',
  '> loading bio.bin .......................... ok',
  '> connecting to signal layer ............... ok',
  '> calibrating energy ........................ ok',
  '> ready.',
];
let bootIdx = 0, bootChar = 0;
const typingEl = document.querySelector('.hb-typing');

function updateBoot(t) {
  if (!typingEl) return;
  const cycle = Math.floor(t * 1.5);
  const lineIdx = cycle % bootLines.length;
  const line = bootLines[lineIdx];
  const charProg = Math.min(1, (t * 1.5) % 1 * 2);
  typingEl.textContent = line.slice(0, Math.floor(line.length * charProg));
}

// =============================================================
// MAIN LOOP
// =============================================================
let raf;
function loop() {
  const t = audio.currentTime || 0;
  const total = audio.duration || 226;

  drawBackground(performance.now());
  updateScenes(t);
  updateBoot(t);

  // Timeline
  progress.style.width = ((t / total) * 100) + '%';
  timeEl.textContent = `${fmt(t)} / ${fmt(total)}`;

  raf = requestAnimationFrame(loop);
}

function fmt(s) {
  if (!isFinite(s)) return '00:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}

// =============================================================
// INIT / CONTROLS
// =============================================================
function startExperience() {
  setupAudio();
  if (actx.state === 'suspended') actx.resume();
  audio.play().then(() => {
    document.body.classList.add('playing');
    overlay.classList.add('gone');
  }).catch((e) => console.error('autoplay blocked:', e));
}

startBtn.addEventListener('click', startExperience);

muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.querySelector('.ic').textContent = audio.muted ? '🔇' : '🔊';
});

restartBtn.addEventListener('click', () => {
  audio.currentTime = 0;
  audio.play();
});

fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});

audio.addEventListener('ended', () => {
  document.body.classList.remove('playing');
  overlay.classList.remove('gone');
  currentScene = -1;
  scenes.forEach(s => s.classList.remove('active'));
});

// Keyboard
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (audio.paused) audio.play(); else audio.pause();
  }
  if (e.code === 'KeyM') muteBtn.click();
  if (e.code === 'KeyR') restartBtn.click();
  if (e.code === 'KeyF') fsBtn.click();
});

// Boot
resize();
loop();
