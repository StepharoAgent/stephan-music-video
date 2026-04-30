// =============================================================
// BUY ME — engine v4
// passwort-gate · song-switcher · live-lyrics · beat-getaktet
// =============================================================

const PW = '369';

// =============================================================
// TRACK-KONFIGURATION
// =============================================================
const TRACKS = {
  // ============================================================
  // KAUF MICH — die echte CV-Variante: Karriere, Zahlen, Wandlung
  // 3:45 / 225s
  // ============================================================
  kaufmich: {
    file: '/track.mp3',
    name: 'KAUF MICH',
    theme: 'PUNK.OS',
    bodyClass: 'theme-red',
    ticker: '· STEPHAN RÖTTGER · POLYMATH · OPERATOR · MULTIPLIKATOR · EIN KOPF — ZEHN LEUTE OUTPUT · POLITIK → CODE → AI · DENKEN · BAUEN · ANTREIBEN · LIEFERN · WAS ANDERE PLANEN — HAB ICH DEPLOYED · BYE-BYE AGENTUREN · ',
    scenes: [
      // PHASE 1 — boot + name (Stephan zuerst, ohne Firmen)
      { from: 0,    to: 3,    type: 'boot', lines: ['> sr.os // boot…','> lade kopf.dat','> ein kopf · zehn leute output','> bereit.'] },
      { from: 3,    to: 9,    type: 'name', name1: 'STEPHAN', name2: 'RÖTTGER', sub: 'polymath · operator · multiplikator' },

      // PHASE 2 — was er IST (3 Eigenschaften, nicht 3 Firmen)
      { from: 9,    to: 13,   type: 'subline', text: 'kein spezialist —', sub: 'POLYMATH.' },
      { from: 13,   to: 17,   type: 'subline', text: 'kein berater —',   sub: 'OPERATOR.' },
      { from: 17,   to: 21,   type: 'subline', text: 'kein copilot —',   sub: 'MULTIPLIKATOR.' },

      // PHASE 3 — der ungewöhnliche Werdegang als USP (Politik → Code → AI)
      { from: 21,   to: 25,   type: 'qa', q: '// vorher', a: 'POLITIK.', mode: 'glitch' },
      { from: 25,   to: 29,   type: 'qa', q: '// dann',   a: 'CODE.',    mode: 'glitch' },
      { from: 29,   to: 33,   type: 'qa', q: '// jetzt',  a: 'AI.',      mode: 'glitch' },
      { from: 33,   to: 38,   type: 'quote1', mark: '»', text: 'drei welten in einem kopf —', text2: 'selten. <span class="codeword">wertvoll</span>.' },

      // PHASE 4 — Skill-Triade (das KÖNNEN, vorne im Track)
      { from: 38,   to: 42,   type: 'slam', text: '(i.) DENKEN.',     color: 'white' },
      { from: 42,   to: 46,   type: 'slam', text: '(ii.) BAUEN.',     color: 'red' },
      { from: 46,   to: 50,   type: 'slam', text: '(iii.) ANTREIBEN.',color: 'white' },

      // PHASE 5 — das KAUFARGUMENT (Hebel-Effekt durch AI)
      { from: 50,   to: 56,   type: 'crash', stay: 'eine person —', crash: 'OUTPUT VON ZEHN.' },
      { from: 56,   to: 60,   type: 'subline', text: 'weil ki kein assistent ist —', sub: 'SONDERN MEIN HEBEL.' },
      { from: 60,   to: 66,   type: 'quote1', mark: '»', text: 'trilliarden tokens unter mir —', text2: '<span class="codeword">tage</span> statt monate.' },

      // PHASE 6 — KLEINER Proof-Block (Firmen als Beweis, nicht als Show)
      { from: 66,   to: 70,   type: 'stamp', text: 'PROOF.', color: 'red' },
      { from: 70,   to: 76,   type: 'subline', text: '10+ jahre · 22 länder · 2,5m kunden —', sub: '11TEAMSPORTS · NIKE · JAKO.' },
      { from: 76,   to: 82,   type: 'stats', items: [
        { num: 1000, final: '1000%', slot: true, label: 'umsatzwachstum geliefert' },
        { num: 22,   final: '22',    slot: true, label: 'länder ausgerollt' },
        { num: 25,   final: '2,5M',                label: 'kunden bedient' },
        { num: 10,   final: '10+',                 label: 'jahre operativ live' },
      ]},

      // PHASE 7 — Anti-Bullshit (was er NICHT mitbringt)
      { from: 82,   to: 85,   type: 'antiline', text: 'kein pitch deck.' },
      { from: 85,   to: 88,   type: 'antiline', text: 'kein agency-overhead.' },
      { from: 88,   to: 91,   type: 'antiline', text: 'kein „lass uns mal syncen“.' },

      // PHASE 8 — der eigentliche USP
      { from: 91,   to: 95,   type: 'subline', text: 'ich bin kein dienstleister —', sub: 'ICH BIN EINE ABKÜRZUNG.' },
      { from: 95,   to: 100,  type: 'quote1', mark: '»', text: 'deine roadmap —', text2: 'läuft schon in meiner <span class="codeword">pipeline</span>.' },

      // PHASE 9 — Geschwindigkeit (Verb-Triade, kürzer & härter)
      { from: 100, to: 104,  type: 'slam', text: 'DENKEN.',  color: 'white' },
      { from: 104, to: 108,  type: 'slam', text: 'BAUEN.',   color: 'red' },
      { from: 108, to: 112,  type: 'slam', text: 'LIEFERN.', color: 'white' },
      { from: 112, to: 118,  type: 'crash', stay: 'was andere noch planen —', crash: 'HAB ICH SCHON DEPLOYED.' },

      // PHASE 10 — Verstärkung
      { from: 118, to: 122,  type: 'twobeat', a: 'KLINGT GROSS.', b: 'IST ES AUCH.' },
      { from: 122, to: 128,  type: 'repeatquote', a: 'live im einsatz —', b: 'NICHT IM SLIDEDECK.' },

      // PHASE 11 — marquee (Stephans Eigenschaften, nicht Firmenliste)
      { from: 128, to: 135,  type: 'marquee', rows: [
        'STEPHAN RÖTTGER ·  POLYMATH ·  OPERATOR ·  MULTIPLIKATOR ·',
        'DENKEN · BAUEN · ANTREIBEN · LIEFERN · DENKEN · BAUEN · ANTREIBEN · LIEFERN ·',
        'EIN KOPF · ZEHN LEUTE LEISTUNG · EIN KOPF · ZEHN LEUTE LEISTUNG ·'
      ]},

      // PHASE 12 — buildup zur Botschaft
      { from: 135, to: 138,  type: 'buildup', text: 'BYE-BYE',    size: 'sm' },
      { from: 138, to: 141,  type: 'buildup', text: 'RIESIGE',    size: 'md' },
      { from: 141, to: 144,  type: 'buildup', text: 'TEURE',      size: 'lg' },
      { from: 144, to: 152,  type: 'buildup', text: 'AGENTUREN.', size: 'xl', red: true },

      // PHASE 13 — climax
      { from: 152, to: 170,  type: 'climax', a: 'KAUF MICH', b: 'NICHT.', sub: '→ HOL MICH AN BORD.' },

      // PHASE 14 — outro
      { from: 170, to: 230,  type: 'outro', name: 'Stephan Röttger',
        meta: ['agent.stepharo@gmail.com','polymath · operator · multiplikator','politik → code → ai','signiert · stepharo · 2026'] },
    ],
  },

  // ============================================================
  // UNMÖGLICH — die Mindset-Variante: Trotz, Skill-Triade, Wandel
  // 4:11 / 251s
  // ============================================================
  unmoeglich: {
    file: '/track-unmoeglich.mp3',
    name: 'UNMÖGLICH',
    theme: 'TROTZ.OS',
    bodyClass: 'theme-cyan',
    ticker: '· STEPHAN RÖTTGER · EIN KOPF GEGEN DAS SYSTEM · LIMIT GIBT ES NICHT · TEAM-GRÖSSE EINS · AUSREDE KEINE · POLITIK → CODE → AI · DENKEN · BAUEN · DURCHZIEHEN · GEHT NICHT? — DOCH. · ',
    scenes: [
      // PHASE 1 — boot + name
      { from: 0,    to: 4,    type: 'boot', lines: ['> trotz.os // boot…','> lade kopf.dat','> ein kopf gegen das system','> bereit.'] },
      { from: 4,    to: 10,   type: 'name', name1: 'UN', name2: 'MÖGLICH', sub: 'ein kopf, der nicht aufhört.' },

      // PHASE 2 — die Provokation (frage / antwort)
      { from: 10,   to: 14,   type: 'subline', text: 'andere fragen:', sub: 'GEHT DAS ÜBERHAUPT?' },
      { from: 14,   to: 18,   type: 'subline', text: 'ich frage:',     sub: 'WANN BIST DU FERTIG?' },

      // PHASE 3 — Mindset (kurz, hart, gegen alle Ausreden)
      { from: 18,   to: 22,   type: 'qa', q: '// limit',      a: 'GIBT ES NICHT.', mode: 'glitch' },
      { from: 22,   to: 26,   type: 'qa', q: '// team-größe', a: 'EINS.',          mode: 'glitch' },
      { from: 26,   to: 30,   type: 'qa', q: '// ausrede',    a: 'KEINE.',         mode: 'glitch' },

      // PHASE 4 — der Werdegang als Beleg fürs Mindset
      { from: 30,   to: 34,   type: 'subline', text: 'von',  sub: 'POLITIK' },
      { from: 34,   to: 38,   type: 'subline', text: 'über', sub: 'CODE' },
      { from: 38,   to: 42,   type: 'subline', text: 'zu',   sub: 'AI.' },
      { from: 42,   to: 47,   type: 'quote1', mark: '»', text: 'weil lernen nie aufhört —', text2: 'weil <span class="codeword">aufhören</span> nie eine option war.' },

      // PHASE 5 — die Skill-Triade
      { from: 47,   to: 53,   type: 'slam', text: '(i.) DENKEN.',     color: 'cyan' },
      { from: 53,   to: 59,   type: 'slam', text: '(ii.) BAUEN.',     color: 'white' },
      { from: 59,   to: 65,   type: 'slam', text: '(iii.) DURCHZIEHEN.', color: 'cyan' },

      // PHASE 6 — wie das aussieht
      { from: 65,   to: 70,   type: 'quote1', mark: '»', text: 'live im einsatz —', text2: 'nicht im <span class="codeword">slidedeck</span>.' },
      { from: 70,   to: 76,   type: 'crash', stay: 'ein kopf —', crash: 'OUTPUT VON ZEHN.' },

      // PHASE 7 — Anti-Ausreden
      { from: 76,   to: 79,   type: 'antiline', text: 'kein „das geht nicht“.' },
      { from: 79,   to: 82,   type: 'antiline', text: 'kein „dafür brauchen wir ein team“.' },
      { from: 82,   to: 85,   type: 'antiline', text: 'kein „lass uns ne agentur fragen“.' },

      // PHASE 8 — die Haltung als großes Statement
      { from: 85,   to: 92,   type: 'big', text: 'EINFACH MACHEN.' },

      // PHASE 9 — KLEINER Proof (Firmen nur als Fußnote)
      { from: 92,   to: 96,   type: 'stamp', text: 'PROOF.', color: 'cyan' },
      { from: 96,   to: 102,  type: 'subline', text: '10+ jahre · 22 länder · 2,5m kunden —', sub: 'EUROPA AUFGEROLLT. SOLO.' },

      // PHASE 10 — marquee (Mindset, nicht Stack)
      { from: 102,  to: 110,  type: 'marquee', rows: [
        'GEHT NICHT? · DOCH. · GEHT NICHT? · DOCH. · GEHT NICHT? · DOCH. ·',
        'EIN KOPF · ZEHN LEUTE LEISTUNG · EIN KOPF · ZEHN LEUTE LEISTUNG ·',
        'DENKEN · BAUEN · DURCHZIEHEN · DENKEN · BAUEN · DURCHZIEHEN ·'
      ]},

      // PHASE 11 — die Kernfrage
      { from: 110,  to: 118,  type: 'qa', q: '// warum geht das', a: 'WEIL ICH ES MACHE.', mode: 'fall' },

      // PHASE 12 — Verstärkung
      { from: 118,  to: 124,  type: 'repeatquote', a: 'andere planen es —', b: 'ICH HAB ES SCHON DEPLOYED.' },

      // PHASE 13 — buildup
      { from: 124,  to: 128,  type: 'buildup', text: 'NICHTS',     size: 'sm' },
      { from: 128,  to: 132,  type: 'buildup', text: 'AN MIR',     size: 'md' },
      { from: 132,  to: 136,  type: 'buildup', text: 'IST',        size: 'lg' },
      { from: 136,  to: 146,  type: 'buildup', text: 'UNMÖGLICH.', size: 'xl', cyan: true },

      // PHASE 14 — climax
      { from: 146,  to: 165,  type: 'climax', a: 'GEHT NICHT?', b: 'DOCH.', sub: '→ FRAG MICH.', cyan: true },

      // PHASE 15 — outro
      { from: 165,  to: 260,  type: 'outro', name: 'Stephan Röttger',
        meta: ['agent.stepharo@gmail.com','ein kopf, der nicht aufhört','politik → code → ai','signiert · stepharo · 2026'] },
    ],
  }
};

// =============================================================
// DOM SHORTCUTS
// =============================================================
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const gate = $('#gate');
const gateForm = $('#gate-form');
const gatePw = $('#gate-pw');
const gateErr = $('#gate-err');
const picker = $('#picker');
const world = $('#world');
const audio = $('#track');
const sceneRoot = $('#scenes');
const trackName = $('#track-name');
const themeTag = $('#theme-tag');
const tickerText = $('#ticker-text');
const tickerText2 = $('#ticker-text-2');
const progress = $('#progress');
const timeEl = $('#time');
const bpmEl = $('#bpm');
const framesEl = $('#frames');
const muteBtn = $('#mute');
const restartBtn = $('#restart');
const fsBtn = $('#fs');
const backBtn = $('#back');

// =============================================================
// PASSWORT-GATE
// =============================================================
const STORAGE_KEY = 'buyme.unlocked';
function tryUnlock() {
  if (sessionStorage.getItem(STORAGE_KEY) === '1') {
    gate.classList.add('gone');
    gate.hidden = true;
    showPicker();
  }
}
function unlockSuccess() {
  sessionStorage.setItem(STORAGE_KEY, '1');
  gate.classList.add('gone');
  setTimeout(() => { gate.hidden = true; showPicker(); }, 600);
}
function unlockFail() {
  gateErr.textContent = '> falsch.';
  gatePw.value = '';
  gatePw.focus();
  gate.classList.add('shake-gate');
  setTimeout(() => gate.classList.remove('shake-gate'), 400);
  setTimeout(() => gateErr.textContent = '', 1800);
}
// Auto-submit: sobald 369 eingetippt wurde, OHNE Enter weiter
gatePw.addEventListener('input', () => {
  const v = gatePw.value.trim();
  if (v.length >= PW.length) {
    if (v === PW) unlockSuccess();
    else unlockFail();
  }
});
// Enter funktioniert weiterhin (form submit als Fallback)
gateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const v = gatePw.value.trim();
  if (v === PW) unlockSuccess();
  else unlockFail();
});

// =============================================================
// SONG-PICKER
// =============================================================
let currentSong = null;
function showPicker() {
  picker.hidden = false;
  requestAnimationFrame(() => picker.classList.add('shown'));
}
$$('.track-card').forEach((card) => {
  card.addEventListener('click', () => {
    const songKey = card.dataset.song;
    startSong(songKey);
  });
});

function startSong(key) {
  currentSong = TRACKS[key];
  // Theme
  document.body.dataset.theme = key;
  document.body.className = currentSong.bodyClass;
  trackName.textContent = currentSong.name;
  themeTag.textContent = currentSong.theme;
  tickerText.innerHTML = currentSong.ticker;
  tickerText2.innerHTML = currentSong.ticker;
  // Generate scenes
  buildScenes(currentSong.scenes);
  // Audio
  audio.src = currentSong.file;
  audio.load();
  // Hide picker, show world
  picker.classList.remove('shown');
  setTimeout(() => {
    picker.hidden = true;
    world.hidden = false;
    requestAnimationFrame(() => {
      document.body.classList.add('playing');
      setupAudio();
      if (actx && actx.state === 'suspended') actx.resume();
      audio.play().catch((e) => console.warn('autoplay blocked:', e));
    });
  }, 500);
}

function backToPicker() {
  audio.pause();
  audio.currentTime = 0;
  document.body.classList.remove('playing');
  world.hidden = true;
  currentSceneIdx = -1;
  sceneRoot.innerHTML = '';
  showPicker();
}
backBtn.addEventListener('click', backToPicker);

// =============================================================
// SCENE-BUILDER — generiert HTML aus konfig
// =============================================================
function buildScenes(scenes) {
  sceneRoot.innerHTML = '';
  scenes.forEach((s, idx) => {
    const el = document.createElement('section');
    el.className = 'scene scene-' + s.type;
    el.dataset.from = s.from;
    el.dataset.to = s.to;
    el.dataset.idx = idx;
    el.innerHTML = renderScene(s);
    sceneRoot.appendChild(el);
  });
}

function esc(s) { return String(s ?? ''); }

function renderScene(s) {
  switch (s.type) {
    case 'boot':
      return `<div class="boot">${s.lines.map((l, i) => `<div class="boot-line mono" data-i="${i}" data-text="${esc(l).replace(/"/g, '&quot;')}"></div>`).join('')}<div class="cursor">█</div></div>`;
    case 'name':
      return `<div class="name-stack">
        <div class="huge">${esc(s.name1)}</div>
        <div class="huge outline">${esc(s.name2)}</div>
        <div class="role mono">${esc(s.sub)}</div>
      </div>`;
    case 'slam': {
      const align = s.align === 'right' ? 'align-right' : '';
      return `<div class="trio ${align}"><div class="trio-line slam ${s.color || ''}">${esc(s.text)}</div></div>`;
    }
    case 'qa': {
      const cls = s.mode === 'glitch' ? 'glitch' : s.mode === 'run' ? 'run' : s.mode === 'fall' ? 'fall' : '';
      const dataAttr = (s.mode === 'run' || s.mode === 'fall') ? `data-text="${esc(s.a).replace(/"/g, '&quot;')}"` : '';
      const inner = (s.mode === 'run' || s.mode === 'fall') ? '' : esc(s.a);
      return `<div class="qa">
        <div class="qa-q mono">${esc(s.q)}</div>
        <h1 class="qa-a ${cls}" ${dataAttr}>${inner}</h1>
      </div>`;
    }
    case 'stamp':
      return `<div class="bio"><h2 class="bio-h"><span class="stamp ${s.color}">${esc(s.text)}</span></h2></div>`;
    case 'subline':
      return `<div class="subline-wrap">
        <div class="sl-top">${esc(s.text)}</div>
        <div class="sl-bottom">${s.sub}</div>
      </div>`;
    case 'stats':
      return `<div class="stats">${s.items.map((it, i) => `
        <div class="stat" data-i="${i}">
          <div class="stat-num ${it.slot ? 'slot' : ''}" data-final="${esc(it.final)}" data-num="${esc(it.num)}">0</div>
          <div class="stat-l mono">${esc(it.label)}</div>
        </div>`).join('')}</div>`;
    case 'quote1':
      return `<div class="quote">
        <div class="q-mark">${esc(s.mark)}</div>
        <div class="q-text">${s.text}<br>${s.text2}</div>
      </div>`;
    case 'twobeat':
      return `<div class="qa"><h1 class="qa-a two-beat">
        <span class="hold">${esc(s.a)}</span>
        <span class="fire">${esc(s.b)}</span>
      </h1></div>`;
    case 'crash':
      return `<div class="quote"><div class="q-mark">»</div>
        <div class="q-text"><span class="stay">${esc(s.stay)}</span><br><span class="crash">${esc(s.crash)}</span></div>
      </div>`;
    case 'antiline':
      return `<div class="anti"><div class="anti-line strike" data-i="0">${esc(s.text)}</div></div>`;
    case 'big':
      return `<div class="anti"><div class="anti-line big explode" data-i="0">${esc(s.text)}</div></div>`;
    case 'marquee':
      return `<div class="big-marquee">${s.rows.map((r, i) => `<div class="bm-row ${i % 2 === 1 ? 'reverse' : ''}">${esc(r)} ${esc(r)}</div>`).join('')}</div>`;
    case 'repeatquote':
      return `<div class="quote"><div class="q-mark">»</div>
        <div class="q-text"><span class="think">${esc(s.a)}</span><br><span class="repeat">${esc(s.b)}</span></div>
      </div>`;
    case 'buildup': {
      const size = s.size === 'sm' ? 'bu-sm' : s.size === 'md' ? 'bu-md' : s.size === 'lg' ? 'bu-lg' : 'bu-xl';
      const color = s.red ? 'bu-red' : s.cyan ? 'bu-cyan' : '';
      return `<div class="buildup"><div class="bu-line ${size} ${color}">${esc(s.text)}</div></div>`;
    }
    case 'climax': {
      const color = s.cyan ? 'climax-cyan' : '';
      return `<div class="climax ${color}">
        <div class="climax-text">
          ${[...s.a].map((c) => c === ' ' ? `<span class="sp"> </span>` : `<span class="lt">${c}</span>`).join('')}
          <span class="sp"> </span>
          ${[...s.b].map((c) => c === ' ' ? `<span class="sp"> </span>` : `<span class="bang">${c}</span>`).join('')}
        </div>
        <div class="climax-sub mono">${esc(s.sub)}</div>
      </div>`;
    }
    case 'outro':
      return `<div class="outro">
        <div class="sig-name">— ${esc(s.name)}</div>
        <div class="sig-meta mono">${s.meta.map((m) => `<span>${m}</span>`).join('')}</div>
      </div>`;
    default:
      return '';
  }
}

// =============================================================
// AUDIO ANALYSE
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
// CANVAS BG
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
      x: Math.random() * W, y: Math.random() * H,
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

function themeColor() {
  return document.body.classList.contains('theme-cyan') ? '0, 247, 255' : '255, 0, 51';
}

function drawBG(t) {
  const { bass, mid, treble, overall } = getAudioData();
  const themeRGB = themeColor();

  const now = performance.now();
  if (bass > 0.66 && bass > lastBass * 1.12 && now - bassPeakTime > 200) {
    bassPeakTime = now;
    triggerKick();
    if (lastBeatTime > 0) {
      const delta = now - lastBeatTime;
      if (delta > 250 && delta < 1500) {
        bpm = Math.round(60000 / delta);
        if (bpmEl) bpmEl.textContent = String(bpm).padStart(3, '0');
      }
    }
    lastBeatTime = now;
    beatCount++;
    onBeat(beatCount);
  }
  lastBass = bass;

  ctx.fillStyle = `rgba(0, 0, 0, ${0.16 + (1 - overall) * 0.12})`;
  ctx.fillRect(0, 0, W, H);

  const gridA = 0.04 + bass * 0.24;
  ctx.strokeStyle = `rgba(${themeRGB}, ${gridA})`;
  ctx.lineWidth = 1 * dpr;
  const gs = 80 * dpr;
  const off = (t * 0.025) % gs;
  ctx.beginPath();
  for (let x = -off; x < W + gs; x += gs) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = -off; y < H + gs; y += gs) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();

  if (bass > 0.4) {
    const cx = W / 2, cy = H / 2;
    const radius = bass * Math.max(W, H) * 0.55;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, `rgba(${themeRGB}, ${bass * 0.22})`);
    grad.addColorStop(0.5, `rgba(${themeRGB}, ${bass * 0.08})`);
    grad.addColorStop(1, `rgba(${themeRGB}, 0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

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
    p.x += p.vx * speedBoost; p.y += p.vy * speedBoost;
    p.vx *= 0.96; p.vy *= 0.96;
    p.vx += (Math.random() - 0.5) * 0.04 * dpr;
    p.vy += (Math.random() - 0.5) * 0.04 * dpr;
    if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;
    const alpha = p.base + treble * 0.5;
    const size = p.r * (1 + bass * 1.6);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath(); ctx.arc(p.x, p.y, size, 0, Math.PI * 2); ctx.fill();
  }

  const connectDist = 110 * dpr;
  ctx.lineWidth = 0.5 * dpr;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i], b = particles[j];
      const dx = a.x - b.x, dy = a.y - b.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < connectDist) {
        const alpha = (1 - d / connectDist) * (0.18 + mid * 0.55);
        ctx.strokeStyle = `rgba(${themeRGB}, ${alpha})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
  }

  if (analyser) {
    const barW = W / 64;
    const baseY = H - 40 * dpr;
    for (let i = 0; i < 64; i++) {
      const v = freqData[i * 2] / 255;
      const bh = v * 90 * dpr;
      ctx.fillStyle = `rgba(${themeRGB}, ${v * 0.65})`;
      ctx.fillRect(i * barW, baseY - bh, barW - 2, bh);
    }
  }
}

// =============================================================
// FX
// =============================================================
const FX_TIMERS = {};
function fxFire(name, ms) {
  document.body.classList.add(name);
  clearTimeout(FX_TIMERS[name]);
  FX_TIMERS[name] = setTimeout(() => document.body.classList.remove(name), ms);
}
function triggerKick()      { fxFire('kick',      200); }
function triggerFlash()     { fxFire('flash',     180); }
function triggerShake()     { fxFire('shake',     360); }
function triggerZoom()      { fxFire('zoom',      560); }
function triggerRedwash()   { fxFire('redwash',   440); }
function triggerAberrate()  { fxFire('aberrate',  520); }
function triggerShockwave() { fxFire('shockwave', 860); }
function triggerVhs()       { fxFire('vhs',       340); }
function triggerInvert()    { fxFire('invert',    180); }

function onBeat(n) {
  if (n % 16 === 0)      { triggerRedwash(); triggerShake(); triggerShockwave(); }
  else if (n % 8 === 0)  { triggerFlash(); triggerAberrate(); triggerVhs(); }
  else if (n % 4 === 0)  { triggerShake(); }
}

// =============================================================
// LETTER SPLITTER
// =============================================================
function splitLetters(el, baseDelay = 0, stagger = 0.06) {
  const text = el.dataset.text || el.textContent;
  el.dataset.original = text;
  el.innerHTML = '';
  let idx = 0;
  for (const ch of text) {
    const span = document.createElement('span');
    span.className = 'ch';
    if (ch === ' ') { span.innerHTML = '&nbsp;'; span.style.width = '0.35em'; }
    else { span.textContent = ch; }
    span.style.animationDelay = (baseDelay + idx * stagger) + 's';
    el.appendChild(span);
    idx++;
  }
}

// =============================================================
// TYPEWRITER (boot scene)
// =============================================================
function typeLine(el, text, charDelay = 35) {
  return new Promise((resolve) => {
    el.textContent = ''; el.style.opacity = '1';
    let i = 0;
    const tick = () => {
      if (i <= text.length) { el.textContent = text.slice(0, i); i++; setTimeout(tick, charDelay + Math.random() * 25); }
      else resolve();
    };
    tick();
  });
}
async function runBootSequence(scene) {
  const lines = [...scene.querySelectorAll('.boot-line')];
  for (const ln of lines) {
    await typeLine(ln, ln.dataset.text || '', 32);
    await new Promise((r) => setTimeout(r, 220));
  }
}

// =============================================================
// COUNTER + SLOT-MACHINE
// =============================================================
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#0123456789ABCDEF';
function animateCounter(el) {
  const final = el.dataset.final;
  const num = parseInt(el.dataset.num, 10);
  if (el.classList.contains('slot') && !isNaN(num)) {
    const target = String(num);
    el.innerHTML = '';
    [...target].forEach((targetDigit, i) => {
      const tgt = parseInt(targetDigit, 10);
      const wrap = document.createElement('span'); wrap.className = 'digit';
      const reel = document.createElement('span'); reel.className = 'reel';
      const cycles = 3 + i;
      for (let c = 0; c < cycles; c++) {
        for (let d = 0; d < 10; d++) {
          const s = document.createElement('span'); s.textContent = d; reel.appendChild(s);
        }
      }
      const fin = document.createElement('span'); fin.textContent = tgt; reel.appendChild(fin);
      wrap.appendChild(reel); el.appendChild(wrap);
      requestAnimationFrame(() => {
        const offset = (cycles * 10 + tgt);
        reel.style.transform = `translateY(-${offset}em)`;
      });
    });
    return;
  }
  if (isNaN(num)) {
    let i = 0;
    const flicker = () => {
      el.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      if (i++ < 22) setTimeout(flicker, 35); else el.textContent = final;
    };
    flicker(); return;
  }
  const dur = 1200; const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(eased * num).toString();
    if (t < 1) requestAnimationFrame(step); else el.textContent = final;
  };
  requestAnimationFrame(step);
}

// =============================================================
// SCRAMBLER (glitch headlines)
// =============================================================
class Scrambler {
  constructor(el) { this.el = el; this.target = el.textContent; this.frame = 0; this.queue = []; this.running = false; }
  start() {
    if (this.running) return;
    this.running = true;
    const newText = this.target;
    this.queue = [];
    for (let i = 0; i < newText.length; i++) {
      const start = Math.floor(Math.random() * 24);
      const end = start + Math.floor(Math.random() * 22) + 8;
      this.queue.push({ to: newText[i] || '', start, end, char: '' });
    }
    this.frame = 0; this.update();
  }
  update() {
    if (!this.running) return;
    let output = '', complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      let { to, start, end, char } = this.queue[i];
      if (this.frame >= end) { complete++; output += to; }
      else if (this.frame >= start) {
        if (!char || Math.random() < 0.3) {
          char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:var(--accent);opacity:.7">${char}</span>`;
      } else { output += '&nbsp;'; }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) { this.running = false; this.el.textContent = this.target; }
    else { this.frame++; requestAnimationFrame(() => this.update()); }
  }
}

// =============================================================
// SCENE TRANSITIONS
// =============================================================
let currentSceneIdx = -1;

function updateScenes(time) {
  if (!currentSong) return;
  const scenes = sceneRoot.querySelectorAll('.scene');
  let active = -1;
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i];
    const from = parseFloat(s.dataset.from);
    const to = parseFloat(s.dataset.to);
    if (time >= from && time < to) { active = i; break; }
  }
  if (active !== currentSceneIdx) {
    if (currentSceneIdx >= 0 && scenes[currentSceneIdx]) scenes[currentSceneIdx].classList.remove('active');
    if (active >= 0 && scenes[active]) {
      scenes[active].classList.add('active');
      triggerFlash(); triggerZoom(); triggerVhs();
      onSceneEnter(scenes[active]);
    }
    currentSceneIdx = active;
  }
}

function onSceneEnter(scene) {
  // Run scene-specific triggers
  if (scene.classList.contains('scene-boot'))    runBootSequence(scene);
  if (scene.classList.contains('scene-name'))    setTimeout(() => { triggerVhs(); triggerAberrate(); }, 400);
  if (scene.classList.contains('scene-slam'))    setTimeout(() => { triggerShake(); triggerRedwash(); }, 80);
  if (scene.classList.contains('scene-stamp'))   setTimeout(() => { triggerShake(); }, 100);
  if (scene.classList.contains('scene-stats'))   {
    scene.querySelectorAll('.stat-num').forEach((el, i) => setTimeout(() => animateCounter(el), 200 + i * 220));
  }
  if (scene.classList.contains('scene-big'))     setTimeout(() => { triggerZoom(); triggerRedwash(); triggerShockwave(); triggerAberrate(); }, 100);
  if (scene.classList.contains('scene-buildup')) setTimeout(() => { triggerShake(); }, 100);
  if (scene.classList.contains('scene-climax')) {
    setTimeout(() => triggerShake(), 200);
    setTimeout(() => triggerShake(), 850);
    setTimeout(() => { triggerZoom(); triggerRedwash(); triggerAberrate(); triggerShake(); triggerShockwave(); triggerInvert(); }, 1650);
    setTimeout(() => { triggerFlash(); triggerShockwave(); }, 2050);
    setTimeout(triggerVhs, 2400);
  }

  // QA glitch headline → scramble it
  scene.querySelectorAll('.qa-a.glitch').forEach((el) => {
    new Scrambler(el).start();
  });
  // QA run/fall headline → letter-split
  scene.querySelectorAll('.qa-a.run').forEach((el) => splitLetters(el, 0.1, 0.05));
  scene.querySelectorAll('.qa-a.fall').forEach((el) => splitLetters(el, 0.15, 0.09));
}

// =============================================================
// BASS-REACTIVE GLOW VARS
// =============================================================
function pulseHeadlines() {
  if (!analyser) return;
  const { bass, mid, treble } = getAudioData();
  const root = document.documentElement;
  root.style.setProperty('--bass', bass.toFixed(3));
  root.style.setProperty('--mid', mid.toFixed(3));
  root.style.setProperty('--treble', treble.toFixed(3));
  root.style.setProperty('--bass-glow', (40 + bass * 80).toFixed(0) + 'px');
  root.style.setProperty('--bass-thick', (1 + bass * 8).toFixed(1) + 'px');
}

// =============================================================
// MAIN LOOP
// =============================================================
function fmt(s) {
  if (!isFinite(s)) return '00:00';
  const m = Math.floor(s / 60);
  const ss = Math.floor(s % 60);
  return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`;
}
function loop() {
  if (currentSong) {
    const t = audio.currentTime || 0;
    const total = audio.duration || 1;
    drawBG(performance.now());
    updateScenes(t);
    pulseHeadlines();
    if (progress) progress.style.width = ((t / total) * 100) + '%';
    if (timeEl) timeEl.textContent = `${fmt(t)} / ${fmt(total)}`;
    frameCount++;
    if (frameCount % 6 === 0 && framesEl) framesEl.textContent = String(frameCount).padStart(6, '0');
  } else {
    drawBG(performance.now());
  }
  requestAnimationFrame(loop);
}

// =============================================================
// CONTROLS
// =============================================================
muteBtn.addEventListener('click', () => {
  audio.muted = !audio.muted;
  muteBtn.querySelector('.ic').textContent = audio.muted ? '🔇' : '🔊';
});
restartBtn.addEventListener('click', () => { audio.currentTime = 0; audio.play(); currentSceneIdx = -1; });
fsBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});
audio.addEventListener('ended', backToPicker);
document.addEventListener('keydown', (e) => {
  if (gate.hidden && !world.hidden) {
    if (e.code === 'Space') { e.preventDefault(); audio.paused ? audio.play() : audio.pause(); }
    if (e.code === 'KeyM') muteBtn.click();
    if (e.code === 'KeyR') restartBtn.click();
    if (e.code === 'KeyF') fsBtn.click();
    if (e.code === 'KeyB') backToPicker();
  }
});

// =============================================================
// BOOT
// =============================================================
resize();
loop();
tryUnlock();
