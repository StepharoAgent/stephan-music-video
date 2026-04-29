// =============================================================
// STEPHAN RÖTTGER — music-video engine v3
// per-scene impact animations · typewriter · letter splitter ·
// beat-synced cuts · camera moves · redwash · zoom-punch
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
// AUDIO
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
  const midEnd = Math.floor(len * 0.35);
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
// PARTICLE BG
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

const PARTICLE_COUNT = 180;
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
  if (bass > 0.66 && bass > lastBass * 1.12 && now - bassPeakTime > 200) {
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
  const gridA = 0.04 + bass * 0.24;
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
    const radius = bass * Math.max(W, H) * 0.55;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(255, 0, 51, ${bass * 0.22})`);
    grad.addColorStop(0.5, `rgba(255, 0, 51, ${bass * 0.08})`);
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
      p.vx += (ddx / dd) * bass * 0.8;
      p.vy += (ddy / dd) * bass * 0.8;
    }
    p.x += p.vx * speedBoost;
    p.y += p.vy * speedBoost;
    p.vx *= 0.96; p.vy *= 0.96;
    p.vx += (Math.random() - 0.5) * 0.04 * dpr;
    p.vy += (Math.random() - 0.5) * 0.04 * dpr;
    if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
    const alpha = p.base + treble * 0.5;
    const size = p.r * (1 + bass * 1.6);
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
        const alpha = (1 - d / connectDist) * (0.18 + mid * 0.55);
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
      const bh = v * 90 * dpr;
      ctx.fillStyle = `rgba(255, 0, 51, ${v * 0.65})`;
      ctx.fillRect(i * barW, baseY - bh, barW - 2, bh);
    }
  }
}

// =============================================================
// BEAT EFFECTS — flash, shake, zoom, redwash, aberrate
// =============================================================
const FX_TIMERS = {};
function fxFire(name, ms) {
  document.body.classList.add(name);
  clearTimeout(FX_TIMERS[name]);
  FX_TIMERS[name] = setTimeout(() => document.body.classList.remove(name), ms);
}
function triggerKick()    { fxFire('kick',     200); }
function triggerFlash()   { fxFire('flash',    180); }
function triggerShake()   { fxFire('shake',    360); }
function triggerZoom()    { fxFire('zoom',     560); }
function triggerRedwash() { fxFire('redwash',  440); }
function triggerAberrate(){ fxFire('aberrate', 520); }

function onBeat(n) {
  if (n % 16 === 0)      { triggerRedwash(); triggerShake(); }
  else if (n % 8 === 0)  { triggerFlash(); triggerAberrate(); }
  else if (n % 4 === 0)  { triggerShake(); }
}

// =============================================================
// TEXT SCRAMBLE (Mr. Robot)
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
    const newText = this.target;
    const length = newText.length;
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30) + 10;
      this.queue.push({ to, start, end, char: '' });
    }
    this.frame = 0;
    this.update();
  }
  update() {
    if (!this.running) return;
    let output = '';
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:#ff0033;opacity:.7">${char}</span>`;
      } else { output += '&nbsp;'; }
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
// LETTER SPLITTER — for .qa-a.run and .qa-a.fall
// Splits text into per-letter spans with stagger delays so CSS
// keyframes fire one-by-one.
// =============================================================
function splitLetters(el, baseDelay = 0, stagger = 0.06) {
  const text = el.dataset.text || el.textContent;
  el.dataset.original = text;
  el.innerHTML = '';
  let idx = 0;
  for (const ch of text) {
    const span = document.createElement('span');
    span.className = 'ch';
    if (ch === ' ') {
      span.innerHTML = '&nbsp;';
      span.style.width = '0.35em';
    } else {
      span.textContent = ch;
    }
    span.style.animationDelay = (baseDelay + idx * stagger) + 's';
    el.appendChild(span);
    idx++;
  }
}
$$('.qa-a.run').forEach((el) => splitLetters(el, 0.1, 0.05));
$$('.qa-a.fall').forEach((el) => splitLetters(el, 0.15, 0.09));

// =============================================================
// TYPEWRITER — for .scene-boot lines
// =============================================================
function typeLine(el, text, charDelay = 45) {
  return new Promise((resolve) => {
    el.textContent = '';
    el.style.opacity = '1';
    let i = 0;
    const tick = () => {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, charDelay + Math.random() * 30);
      } else {
        resolve();
      }
    };
    tick();
  });
}
async function runBootSequence(scene) {
  const lines = [...scene.querySelectorAll('.boot-line')];
  for (const ln of lines) {
    await typeLine(ln, ln.dataset.text || ln.textContent, 38);
    await new Promise((r) => setTimeout(r, 280));
  }
}

// =============================================================
// COUNTERS
// =============================================================
function animateCounter(el) {
  const final = el.dataset.final;
  const num = parseInt(el.dataset.num, 10);
  if (isNaN(num)) {
    let i = 0;
    const flicker = () => {
      el.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      if (i++ < 22) setTimeout(flicker, 35); else el.textContent = final;
    };
    flicker();
    return;
  }
  const dur = 1200;
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
// SCENE TRANSITIONS — flash + per-scene kick
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
      // hard cut → flash + zoom punch
      triggerFlash();
      triggerZoom();
      onSceneEnter(scenes[active]);
    }
    currentScene = active;
  }
}

function onSceneEnter(scene) {
  // Scramblers
  scene.querySelectorAll('[data-scramble]').forEach((el) => {
    const s = scramblers.get(el);
    if (s) {
      s.frame = 0; s.queue = []; s.running = false;
      el.textContent = '';
      requestAnimationFrame(() => s.start());
    }
  });

  // Counters
  scene.querySelectorAll('.stat-num[data-final]').forEach((el) => {
    const stat = el.closest('.stat');
    const idx = stat ? parseInt(stat.dataset.i, 10) : 0;
    setTimeout(() => animateCounter(el), 250 + idx * 220);
  });

  // Per-scene custom triggers
  if (scene.classList.contains('scene-boot')) {
    runBootSequence(scene);
  }
  if (scene.classList.contains('scene-trio')) {
    // sync impact: red wash on "ICH LIEFER." (1.6s + ~0.3s)
    setTimeout(() => { triggerShake(); triggerRedwash(); }, 100);
    setTimeout(() => { triggerShake(); triggerRedwash(); triggerAberrate(); }, 1700);
    setTimeout(() => { triggerFlash(); }, 3300);
  }
  if (scene.classList.contains('scene-bio')) {
    setTimeout(() => triggerShake(), 250);
    setTimeout(() => { triggerShake(); triggerRedwash(); }, 1650);
    setTimeout(() => triggerShake(), 3050);
  }
  if (scene.classList.contains('scene-stack')) {
    [100, 500, 900, 1300, 1700].forEach((d, i) => {
      setTimeout(() => { triggerShake(); if (i % 2 === 1) triggerRedwash(); }, d);
    });
  }
  if (scene.classList.contains('scene-anti')) {
    [200, 1600, 3200].forEach((d) => setTimeout(triggerShake, d + 500));
    setTimeout(() => { triggerZoom(); triggerRedwash(); triggerAberrate(); }, 5050);
  }
  if (scene.classList.contains('scene-buildup')) {
    setTimeout(() => { triggerZoom(); triggerRedwash(); triggerAberrate(); }, 4450);
  }
  if (scene.classList.contains('scene-climax')) {
    // KAUF MICH lands
    setTimeout(() => triggerShake(), 850);
    // NICHT smashes
    setTimeout(() => { triggerZoom(); triggerRedwash(); triggerAberrate(); triggerShake(); }, 1650);
    setTimeout(() => { triggerFlash(); triggerRedwash(); }, 2050);
  }
  // re-trigger letter animations on .run / .fall
  scene.querySelectorAll('.qa-a.run, .qa-a.fall').forEach((el) => {
    // Force reflow to restart animations
    const chs = el.querySelectorAll('.ch');
    chs.forEach((ch) => {
      const d = ch.style.animationDelay;
      ch.style.animation = 'none';
      void ch.offsetWidth;
      ch.style.animation = '';
      ch.style.animationDelay = d;
    });
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
