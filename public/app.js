// =============================================================
// STEPHAN RÖTTGER — music-video engine v2
// Audio-reactive particle BG · scene timeline · text-scramble ·
// counter · beat-triggered shake/flash · permanent micro-motion
// =============================================================

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const audio = $('#track');
const overlay = $('#overlay');
const startBtn = $('#start');
const progress = $('#progress');
const timeEl = $('#time');
const bpmEl = $('#bpm');
const framesEl = $('#frames');
const muteBtn = $('#mute');
const restartBtn = $('#restart');
const fsBtn = $('#fs');
const scenes = $$('.scene');

// =============================================================
// AUDIO ANALYSIS
// =============================================================
let actx, analyser, source, freqData;
function setupAudio() {
  if (actx) return;
  actx = new (window.AudioContext || window.webkitAudioContext)();
  source = actx.createMediaElementSource(audio);
  analyser = actx.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.82;
  source.connect(analyser);
  analyser.connect(actx.destination);
  freqData = new Uint8Array(analyser.frequencyBinCount);
}
function getAudioData() {
  if (!analyser) return { bass: 0, mid: 0, treble: 0, overall: 0 };
  analyser.getByteFrequencyData(freqData);
  const len = freqData.length;
  const bassEnd = Math.floor(len * 0.06);
  const midEnd  = Math.floor(len * 0.35);
  let bass = 0, mid = 0, treble = 0;
  for (let i = 0; i < bassEnd; i++) bass += freqData[i];
  for (let i = bassEnd; i < midEnd; i++) mid += freqData[i];
  for (let i = midEnd; i < len; i++) treble += freqData[i];
  bass = (bass / bassEnd) / 255;
  mid = (mid / (midEnd - bassEnd)) / 255;
  treble = (treble / (len - midEnd)) / 255;
  return { bass, mid, treble, overall: (bass + mid + treble) / 3 };
}

// =============================================================
// PARTICLE BG (canvas)
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

const PARTICLE_COUNT = 160;
let particles = [];
function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4 * dpr,
      vy: (Math.random() - 0.5) * 0.4 * dpr,
      r: (Math.random() * 1.4 + 0.4) * dpr,
      base: Math.random() * 0.5 + 0.4,
    });
  }
}
let mouseX = 0, mouseY = 0;
window.addEventListener('mousemove', (e) => { mouseX = e.clientX * dpr; mouseY = e.clientY * dpr; });

let lastBass = 0, bassPeakTime = 0;
let beatCount = 0, lastBeatTime = 0, bpm = 120;
let frameCount = 0;

function drawBG(t) {
  const { bass, mid, treble, overall } = getAudioData();

  // Beat detection
  const now = performance.now();
  if (bass > 0.68 && bass > lastBass * 1.13 && now - bassPeakTime > 220) {
    bassPeakTime = now;
    triggerKick();
    if (lastBeatTime > 0) {
      const delta = now - lastBeatTime;
      if (delta > 250 && delta < 1500) {
        bpm = Math.round(60000 / delta);
        bpmEl.textContent = String(bpm).padStart(3, '0');
      }
    }
    lastBeatTime = now;
    beatCount++;
    onBeat(beatCount);
  }
  lastBass = bass;

  // BG fade trail
  ctx.fillStyle = `rgba(0, 0, 0, ${0.16 + (1 - overall) * 0.12})`;
  ctx.fillRect(0, 0, W, H);

  // Audio-reactive grid
  const gridA = 0.04 + bass * 0.22;
  ctx.strokeStyle = `rgba(255, 0, 51, ${gridA})`;
  ctx.lineWidth = 1 * dpr;
  const gs = 80 * dpr;
  const off = (t * 0.025) % gs;
  ctx.beginPath();
  for (let x = -off; x < W + gs; x += gs) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = -off; y < H + gs; y += gs) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();

  // Bass radial pulse
  if (bass > 0.4) {
    const cx = W / 2, cy = H / 2;
    const radius = bass * Math.max(W, H) * 0.5;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(255, 0, 51, ${bass * 0.20})`);
    grad.addColorStop(0.5, `rgba(255, 0, 51, ${bass * 0.07})`);
    grad.addColorStop(1, 'rgba(255, 0, 51, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // Particles
  const speedBoost = 1 + mid * 4;
  const reach = 130 * dpr;
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const dx = p.x - mouseX, dy = p.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < reach && dist > 0) {
      const force = (1 - dist / reach) * 1.5;
      p.vx += (dx / dist) * force * 0.4;
      p.vy += (dy / dist) * force * 0.4;
    }
    if (bass > 0.5) {
      const ddx = p.x - W / 2, ddy = p.y - H / 2;
      const dd = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
      p.vx += (ddx / dd) * bass * 0.7;
      p.vy += (ddy / dd) * bass * 0.7;
    }
    p.x += p.vx * speedBoost;
    p.y += p.vy * speedBoost;
    p.vx *= 0.96; p.vy *= 0.96;
    p.vx += (Math.random() - 0.5) * 0.04 * dpr;
    p.vy += (Math.random() - 0.5) * 0.04 * dpr;
    if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
    const alpha = p.base + treble * 0.5;
    const size = p.r * (1 + bass * 1.5);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Constellation
  const connectDist = 110 * dpr;
  ctx.lineWidth = 0.5 * dpr;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < connectDist) {
        const alpha = (1 - d / connectDist) * (0.15 + mid * 0.5);
        ctx.strokeStyle = `rgba(255, 0, 51, ${alpha})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }

  // Spectrum bottom bar
  if (analyser) {
    const barW = W / 64;
    const baseY = H - 40 * dpr;
    for (let i = 0; i < 64; i++) {
      const v = freqData[i * 2] / 255;
      const bh = v * 80 * dpr;
      ctx.fillStyle = `rgba(255, 0, 51, ${v * 0.6})`;
      ctx.fillRect(i * barW, baseY - bh, barW - 2, bh);
    }
  }
}

// =============================================================
// BEAT EFFECTS
// =============================================================
let kickTO = null, flashTO = null, shakeTO = null;
function triggerKick() {
  document.body.classList.add('kick');
  clearTimeout(kickTO);
  kickTO = setTimeout(() => document.body.classList.remove('kick'), 200);
}
function triggerFlash() {
  document.body.classList.add('flash');
  clearTimeout(flashTO);
  flashTO = setTimeout(() => document.body.classList.remove('flash'), 180);
}
function triggerShake() {
  document.body.classList.add('shake');
  clearTimeout(shakeTO);
  shakeTO = setTimeout(() => document.body.classList.remove('shake'), 300);
}
function onBeat(n) {
  // Every 4th beat: small shake. Every 8th: flash.
  if (n % 8 === 0) triggerFlash();
  else if (n % 4 === 0) triggerShake();
}

// =============================================================
// TEXT SCRAMBLE (Mr. Robot style)
// =============================================================
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#0123456789ABCDEF';
class Scrambler {
  constructor(el) {
    this.el = el;
    this.target = el.dataset.scramble;
    this.frame = 0;
    this.queue = [];
    this.running = false;
  }
  start() {
    if (this.running) return;
    this.running = true;
    const oldText = '';
    const newText = this.target;
    const length = Math.max(oldText.length, newText.length);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30) + 10;
      this.queue.push({ from, to, start, end, char: '' });
    }
    this.frame = 0;
    this.update();
  }
  update() {
    if (!this.running) return;
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:#ff0033;opacity:.7">${char}</span>`;
      } else { output += from; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.running = false;
      this.el.textContent = this.target;
    } else {
      this.frame++;
      requestAnimationFrame(() => this.update());
    }
  }
}
const scramblers = new Map();
$$('[data-scramble]').forEach((el) => scramblers.set(el, new Scrambler(el)));

// =============================================================
// COUNTER (for stats)
// =============================================================
function animateCounter(el) {
  const final = el.dataset.final;
  const num = parseInt(el.dataset.num, 10);
  if (isNaN(num)) {
    // non-numeric like ∞ — flicker chars then settle
    let i = 0;
    const flicker = () => {
      el.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      if (i++ < 20) setTimeout(flicker, 35); else el.textContent = final;
    };
    flicker();
    return;
  }
  const dur = 1100;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(eased * num).toString();
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = final;
  };
  requestAnimationFrame(step);
}

// =============================================================
// SCENE TRANSITIONS
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
    if (active >= 0) {
      scenes[active].classList.add('active');
      // hard cut on scene change → flash
      triggerFlash();
      onSceneEnter(scenes[active]);
    }
    currentScene = active;
  }
}
function onSceneEnter(scene) {
  // Trigger scramblers
  scene.querySelectorAll('[data-scramble]').forEach((el) => {
    const s = scramblers.get(el);
    if (s) {
      // reset & restart
      s.frame = 0; s.queue = []; s.running = false;
      el.textContent = '';
      requestAnimationFrame(() => s.start());
    }
  });
  // Trigger counters
  scene.querySelectorAll('.stat-num[data-final]').forEach((el) => {
    setTimeout(() => animateCounter(el), 200 + (parseInt(el.closest('.stat').dataset.i, 10) * 200));
  });
}

// =============================================================
// MAIN LOOP
// =============================================================
function fmt(s) {
  if (!isFinite(s)) return '00:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}
function loop() {
  const t = audio.currentTime || 0;
  const total = audio.duration || 226;
  drawBG(performance.now());
  updateScenes(t);
  progress.style.width = ((t / total) * 100) + '%';
  timeEl.textContent = `${fmt(t)} / ${fmt(total)}`;
  frameCount++;
  if (frameCount % 6 === 0 && framesEl) framesEl.textContent = String(frameCount).padStart(6, '0');
  requestAnimationFrame(loop);
}

// =============================================================
// CONTROLS
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
restartBtn.addEventListener('click', () => { audio.currentTime = 0; audio.play(); currentScene = -1; });
fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});
audio.addEventListener('ended', () => {
  document.body.classList.remove('playing');
  overlay.classList.remove('gone');
  currentScene = -1;
  scenes.forEach((s) => s.classList.remove('active'));
});
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); audio.paused ? audio.play() : audio.pause(); }
  if (e.code === 'KeyM') muteBtn.click();
  if (e.code === 'KeyR') restartBtn.click();
  if (e.code === 'KeyF') fsBtn.click();
});

// Boot
resize();
loop();
