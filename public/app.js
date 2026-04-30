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

      // 🆕 image scene — neural network as backdrop for the token claim
      { from: 60,   to: 66,   type: 'image', src: '/img/neural.png', tint: 'red',
        tag: '// scale', text: 'TRILLIONS.', sub: 'tokens unter mir · tage statt monate.' },

      // PHASE 6 — Hintergrund (indirekt: stationen, nicht eigenleistung)
      { from: 66,   to: 70,   type: 'stamp', text: 'STATIONEN.', color: 'red' },
      { from: 70,   to: 75,   type: 'subline', text: 'wo gelernt:', sub: '11TS · NIKE · JAKO.' },

      // 🆕 chart scene — real metrics statt nur slot-machine zahlen
      { from: 75,   to: 82,   type: 'chart', title: 'PROOF.', bars: [
        { label: 'lighthouse', value: 100, max: 100, suffix: '/100', color: 'red' },
        { label: 'deploy',     value: 8,   max: 60,  suffix: 's',    color: 'cyan' },
        { label: 'p99 latency',value: 47,  max: 500, suffix: 'ms',   color: 'red' },
        { label: 'agency cost',value: 0,   max: 100, suffix: '%',    color: 'green' },
      ]},
      { from: 82,   to: 86,   type: 'quote1', mark: '»', text: 'großes team. großes ergebnis.', text2: '<span class="codeword">dabei</span> gewesen. davon gelernt.' },

      // PHASE 7 — Anti-Bullshit (was er NICHT mitbringt)
      { from: 86,   to: 89,   type: 'antiline', text: 'kein pitch deck.' },
      { from: 89,   to: 92,   type: 'antiline', text: 'kein agency-overhead.' },
      { from: 92,   to: 95,   type: 'antiline', text: 'kein „lass uns mal syncen“.' },

      // PHASE 8 — der eigentliche USP
      { from: 95,   to: 99,   type: 'subline', text: 'ich bin kein dienstleister —', sub: 'ICH BIN EINE ABKÜRZUNG.' },
      { from: 99,   to: 104,  type: 'quote1', mark: '»', text: 'deine roadmap —', text2: 'läuft schon in meiner <span class="codeword">pipeline</span>.' },

      // PHASE 9 — Geschwindigkeit (Verb-Triade, kürzer & härter)
      { from: 104, to: 108,  type: 'slam', text: 'DENKEN.',  color: 'white' },
      { from: 108, to: 112,  type: 'slam', text: 'BAUEN.',   color: 'red' },
      { from: 112, to: 116,  type: 'slam', text: 'LIEFERN.', color: 'white' },

      // 🆕 terminal scene — live deploy als beweis, nicht als behauptung
      { from: 116, to: 128,  type: 'terminal', title: 'agent.stepharo @ ~/projects/customer', lines: [
        { prompt: '$', text: 'git push origin main', delay: 35, pause: 200 },
        { output: 'Counting objects: 47, done.', color: 'grey', delay: 50 },
        { output: 'Writing objects: 100% (47/47), 12.3 KiB', color: 'grey', delay: 50 },
        { output: "To github.com:customer/landing.git", color: 'cyan', delay: 50 },
        { prompt: '$', text: 'wrangler pages deploy public', delay: 35, pause: 250 },
        { output: '⛅️ wrangler 4.86.0', color: 'grey', delay: 60 },
        { output: 'Uploading... (5/5)', color: 'grey', delay: 80 },
        { output: '✨ Success! Uploaded 5 files (0.71 sec)', color: 'green', delay: 80 },
        { output: '✨ Deployment complete!', color: 'green', delay: 80 },
        { output: '🌎 https://customer.com — live in 8s.', color: 'cyan', delay: 100 },
      ]},

      // PHASE 10 — Verstärkung (twobeat raus, terminal war schon der proof)
      { from: 128, to: 132,  type: 'repeatquote', a: 'live im einsatz —', b: 'NICHT IM SLIDEDECK.' },

      // PHASE 11 — marquee (eigenschaften, keine team-pose)
      { from: 132, to: 139,  type: 'marquee', rows: [
        'STEPHAN RÖTTGER ·  POLYMATH ·  OPERATOR ·  MULTIPLIKATOR ·',
        'DENKEN · BAUEN · ANTREIBEN · LIEFERN · DENKEN · BAUEN · ANTREIBEN · LIEFERN ·',
        '11TEAMSPORTS · NIKE · JAKO · 11TEAMSPORTS · NIKE · JAKO ·'
      ]},

      // PHASE 12 — buildup zur Botschaft
      { from: 139, to: 142,  type: 'buildup', text: 'BYE-BYE',    size: 'sm' },
      { from: 142, to: 145,  type: 'buildup', text: 'RIESIGE',    size: 'md' },
      { from: 145, to: 148,  type: 'buildup', text: 'TEURE',      size: 'lg' },
      { from: 148, to: 156,  type: 'buildup', text: 'AGENTUREN.', size: 'xl', red: true },

      // PHASE 13 — climax
      { from: 156, to: 170,  type: 'climax', a: 'KAUF MICH', b: 'NICHT.', sub: '→ HOL MICH AN BORD.' },

      // ============================================================
      // LETZTE MINUTE — viele kurze cuts, kein toter screen
      // ============================================================

      // 14a: erste endcard, kurz
      { from: 170, to: 178,  type: 'endcard', cta: 'HOL MICH AN BORD.', mail: 'agent.stepharo@gmail.com', tag: 'kein pitch · keine agentur · nur lieferung' },

      // 14b: drei kurze stamps in folge (jeder 2.3s) — rhythmisch wie ein outro-drum
      { from: 178, to: 180,  type: 'stamp', text: 'EIN.',   color: 'white' },
      { from: 180, to: 182,  type: 'stamp', text: 'CALL.',  color: 'red' },
      { from: 182, to: 184,  type: 'stamp', text: 'EINE.',  color: 'white' },
      { from: 184, to: 186,  type: 'stamp', text: 'ANTWORT.', color: 'red' },

      // 14c: punchline mini-quote
      { from: 186, to: 190,  type: 'quote1', mark: '»', text: 'erste woche —', text2: '<span class="codeword">prototype</span> live.' },

      // 14d: anti-zeile (warum nicht Agentur)
      { from: 190, to: 193,  type: 'antiline', text: 'kein onboarding-marathon.' },
      { from: 193, to: 196,  type: 'antiline', text: 'kein 6-monats-roadshow.' },

      // 14e: zweite endcard, anderer CTA
      { from: 196, to: 204,  type: 'endcard', cta: 'STELL MICH EIN.', mail: 'agent.stepharo@gmail.com', tag: 'verfügbar ab sofort · remote oder vor ort' },

      // 14f: repeat-twist auf den Songtitel
      { from: 204, to: 208,  type: 'repeatquote', a: 'kauf mich nicht —', b: 'HOL MICH AN BORD.' },

      // 14g: closing marquee mit email (CTO/ARCHITEKT raus)
      { from: 208, to: 213,  type: 'marquee', rows: [
        '→ AGENT.STEPHARO@GMAIL.COM ·  → AGENT.STEPHARO@GMAIL.COM ·',
        'KAUF MICH NICHT · STELL MICH EIN · KAUF MICH NICHT · STELL MICH EIN ·',
        'DENKEN · BAUEN · LIEFERN · DENKEN · BAUEN · LIEFERN ·'
      ]},

      // 14h: kinetische 4-puls-folge (kein name-spam, kürzere cuts)
      { from: 213, to: 214.5, type: 'stamp', text: 'GO.',          color: 'red' },
      { from: 214.5, to: 216, type: 'stamp', text: 'NOW.',         color: 'white' },
      { from: 216, to: 218,   type: 'stamp', text: 'NICHT MORGEN.', color: 'red' },

      // 14i: crash-line statt totem screen
      { from: 218, to: 221,   type: 'crash', stay: 'eine entscheidung —', crash: 'JETZT TREFFEN.' },

      // 14j: big email-flash (gross, kinetisch)
      { from: 221, to: 224,   type: 'big', text: 'AGENT.STEPHARO@GMAIL.COM' },

      // 14k: ultra-kurze signature (2s zum fade)
      { from: 224, to: 226,   type: 'outro', name: 'Stephan Röttger',
        meta: ['agent.stepharo@gmail.com','· 2026 ·'] },
    ],
  },

  // ============================================================
  // UNMÖGLICH — deutsche mindset-variante, hommage an
  // gianna nannini · "bello e impossibile" · 1986
  // 4:11 / 251s — alle texte deutsch, songtitel nur als hommage
  // intern key bleibt 'unmoeglich' wegen file path
  // ============================================================
  unmoeglich: {
    file: '/track-unmoeglich.mp3',
    name: 'UNMÖGLICH',
    theme: 'NANNINI.86',
    bodyClass: 'theme-cyan',
    ticker: '· STEPHAN RÖTTGER · UNMÖGLICH? — SCHON GEMACHT · DENKEN · BAUEN · MACHEN · EINE PERSON — OUTPUT VON ZEHN · TROTZDEM GEMACHT · FREI NACH GIANNA NANNINI · BELLO E IMPOSSIBILE · 1986 · ',
    scenes: [
      // PHASE 1 — boot + name (deutsch)
      { from: 0,    to: 4,    type: 'boot', lines: ['> unmoeglich.sys // boot…','> lade trotz.dat','> alle sagen: nicht machbar','> ich sage: schon gemacht.'] },
      { from: 4,    to: 10,   type: 'name', name1: 'STEPHAN', name2: 'RÖTTGER', sub: 'unmöglich? — schon gemacht.' },

      // PHASE 2 — Title-Drop (deutsch, songtitel als hommage in subline)
      { from: 10,   to: 15,   type: 'slam', text: 'UN.',       color: 'cyan' },
      { from: 15,   to: 20,   type: 'slam', text: 'MÖGLICH.',  color: 'white' },
      { from: 20,   to: 25,   type: 'subline', text: 'frei nach gianna nannini —', sub: '„BELLO E IMPOSSIBILE“ · 1986.' },

      // PHASE 3 — die Provokation
      { from: 25,   to: 29,   type: 'qa', q: '// alle sagen', a: 'UNMÖGLICH.',     mode: 'glitch' },
      { from: 29,   to: 33,   type: 'qa', q: '// ich sage',   a: 'SCHON GEMACHT.', mode: 'glitch' },

      // PHASE 4 — Lyric-Hooks (Songbezug, deutsch) — eine als image für visuellen impact
      { from: 33,   to: 38,   type: 'image', src: '/img/neural.png', tint: 'cyan',
        tag: '// halt', text: 'AIRBAG.', sub: 'fest beim aufprall.' },
      { from: 38,   to: 43,   type: 'quote1', mark: '»', text: 'eine autobahn —', text2: 'kein <span class="codeword">umweg</span>.' },

      // PHASE 5 — Skill-Triade DEUTSCH
      { from: 43,   to: 49,   type: 'slam', text: '(i.) DENKEN.',  color: 'cyan'  },
      { from: 49,   to: 55,   type: 'slam', text: '(ii.) BAUEN.',  color: 'white' },
      { from: 55,   to: 61,   type: 'slam', text: '(iii.) MACHEN.', color: 'cyan'  },

      // PHASE 6 — die Kernaussage als image-statement (neon deploy backdrop)
      { from: 61,   to: 67,   type: 'image', src: '/img/deploy.png', tint: 'cyan',
        tag: '// hebel', text: 'EINE × ZEHN.', sub: 'output einer person · output von zehn.' },
      { from: 67,   to: 72,   type: 'subline', text: 'live im einsatz —', sub: 'NICHT IM SLIDEDECK.' },

      // PHASE 7 — Anti-Ausreden (deutsch)
      { from: 72,   to: 75,   type: 'antiline', text: 'kein „geht nicht“.' },
      { from: 75,   to: 78,   type: 'antiline', text: 'kein „brauchen wir ein team von zehn“.' },
      { from: 78,   to: 81,   type: 'antiline', text: 'kein „fragen wir mal eine agentur“.' },

      // PHASE 8 — die Haltung (gross, einfach, hart)
      { from: 81,   to: 88,   type: 'big', text: 'TROTZDEM GEMACHT.' },

      // PHASE 9 — Hintergrund (indirekt) + chart als beweis
      { from: 88,   to: 97,   type: 'chart', title: 'BEWIESEN.', bars: [
        { label: 'tage zu live',  value: 7,   max: 180, suffix: 'd',    color: 'cyan' },
        { label: 'meetings',      value: 0,   max: 50,  suffix: '',     color: 'cyan' },
        { label: 'lighthouse',    value: 100, max: 100, suffix: '/100', color: 'cyan' },
        { label: 'team größe',    value: 1,   max: 10,  suffix: '',     color: 'cyan' },
      ]},
      { from: 97,   to: 102,  type: 'quote1', mark: '»', text: 'großes team. großes ergebnis.', text2: '<span class="codeword">dabei</span> gewesen. davon gelernt.' },

      // PHASE 10 — marquee (deutsche hook-phrasen)
      { from: 102,  to: 110,  type: 'marquee', rows: [
        'UNMÖGLICH ·  SCHON GEMACHT ·  UNMÖGLICH ·  SCHON GEMACHT ·',
        'DENKEN · BAUEN · MACHEN · DENKEN · BAUEN · MACHEN ·',
        '11TS · NIKE · JAKO · 11TS · NIKE · JAKO ·'
      ]},

      // PHASE 11 — Kernfrage
      { from: 110,  to: 118,  type: 'qa', q: '// warum funktioniert es', a: 'WEIL ICH ES MACHE.', mode: 'fall' },

      // PHASE 12 — Verstärkung
      { from: 118,  to: 124,  type: 'repeatquote', a: 'sie sagen unmöglich —', b: 'ICH HAB ES SCHON DEPLOYED.' },

      // PHASE 13 — buildup
      { from: 124,  to: 128,  type: 'buildup', text: 'NICHTS',     size: 'sm' },
      { from: 128,  to: 132,  type: 'buildup', text: 'IST',        size: 'md' },
      { from: 132,  to: 136,  type: 'buildup', text: 'WIRKLICH',   size: 'lg' },
      { from: 136,  to: 146,  type: 'buildup', text: 'UNMÖGLICH.', size: 'xl', cyan: true },

      // PHASE 14 — climax (deutsch, songtitel als reverenz)
      { from: 146,  to: 162,  type: 'climax', a: 'SCHÖN UND', b: 'UNMÖGLICH.', sub: '→ TROTZDEM GEMACHT.', cyan: true },

      // ============================================================
      // LETZTE PHASE — viele kurze cuts, kein toter screen
      // ============================================================

      // 15a: erste endcard
      { from: 162, to: 170,  type: 'endcard', cta: 'HOL MICH AN BORD.', mail: 'agent.stepharo@gmail.com', tag: 'eine person · sofort verfügbar', cyan: true },

      // 15b: vier kurze stamps — outro-puls (auf den deutschen titel)
      { from: 170, to: 172,  type: 'stamp', text: 'SCHÖN.',     color: 'cyan' },
      { from: 172, to: 174,  type: 'stamp', text: 'UND.',       color: 'white' },
      { from: 174, to: 176,  type: 'stamp', text: 'UNMÖGLICH.', color: 'cyan' },
      { from: 176, to: 178,  type: 'stamp', text: 'GEMACHT.',   color: 'white' },

      // 15c: punchline als live-terminal — proof statt claim
      { from: 178, to: 188,  type: 'terminal', title: 'agent.stepharo @ ~/projects/proto', lines: [
        { prompt: '$', text: 'npm run build && wrangler deploy', delay: 35, pause: 200 },
        { output: 'vite v6.0.0 building for production...', color: 'grey', delay: 60 },
        { output: '✓ 234 modules transformed.', color: 'grey', delay: 60 },
        { output: '✨ Built in 2.34s', color: 'green', delay: 70 },
        { output: '✨ Deployment complete!', color: 'green', delay: 70 },
        { output: '🌎 https://kunde.de — eine woche · live.', color: 'cyan', delay: 100 },
      ]},

      // 15d: (anti-zeilen entfernt — terminal ist der bessere proof)

      // 15e: zweite endcard
      { from: 188, to: 196,  type: 'endcard', cta: 'STELL MICH EIN.', mail: 'agent.stepharo@gmail.com', tag: 'sofort verfügbar · remote oder vor ort', cyan: true },

      // 15f: repeat-twist
      { from: 196, to: 200,  type: 'repeatquote', a: 'unmöglich —', b: 'TROTZDEM GEMACHT.' },

      // 15g: closing marquee
      { from: 200, to: 208,  type: 'marquee', rows: [
        '→ AGENT.STEPHARO@GMAIL.COM ·  → AGENT.STEPHARO@GMAIL.COM ·',
        'UNMÖGLICH · TROTZDEM GEMACHT · UNMÖGLICH · TROTZDEM GEMACHT ·',
        'DENKEN · BAUEN · MACHEN · DENKEN · BAUEN · MACHEN ·'
      ]},

      // 15h: action-stamps (deutsch)
      { from: 208, to: 210,  type: 'stamp', text: 'JETZT.',         color: 'cyan' },
      { from: 210, to: 212,  type: 'stamp', text: 'NICHT MORGEN.',  color: 'white' },
      { from: 212, to: 214,  type: 'stamp', text: 'DANKE GIANNA.',  color: 'cyan' },

      // 15i: hommage-quote (deutsch)
      { from: 214, to: 219,  type: 'quote1', mark: '»', text: 'danke an gianna nannini —', text2: '1986 → <span class="codeword">2026</span>.' },

      // 15j: endcard reprise (6s, deutsch)
      { from: 219, to: 225,  type: 'endcard', cta: 'SCHÖN UND UNMÖGLICH.', mail: 'agent.stepharo@gmail.com', tag: '→ trotzdem gemacht.', cyan: true },

      // 15k: crash-reprise
      { from: 225, to: 229,  type: 'crash', stay: 'sie sagen unmöglich —', crash: 'SCHON LÄNGST GEMACHT.' },

      // 15l: zweite kinetische puls-folge
      { from: 229, to: 231,  type: 'stamp', text: 'RUF AN.',    color: 'cyan' },
      { from: 231, to: 233,  type: 'stamp', text: 'HEUTE.',     color: 'white' },
      { from: 233, to: 235,  type: 'stamp', text: 'PROTOTYP.',  color: 'cyan' },

      // 15m: big email-flash
      { from: 235, to: 239,  type: 'big', text: 'AGENT.STEPHARO@GMAIL.COM' },

      // 15n: marquee final loop (deutsch)
      { from: 239, to: 245,  type: 'marquee', rows: [
        '→ AGENT.STEPHARO@GMAIL.COM ·  → AGENT.STEPHARO@GMAIL.COM ·',
        '· TROTZDEM GEMACHT · TROTZDEM GEMACHT · TROTZDEM GEMACHT ·',
        'SCHÖN UND UNMÖGLICH · SCHÖN UND UNMÖGLICH · SCHÖN UND UNMÖGLICH ·'
      ]},

      // 15o: letzter slam vor outro
      { from: 245, to: 248,  type: 'big', text: 'TROTZDEM GEMACHT.' },

      // 15p: ultra-kurze signature (3s zum fade)
      { from: 248, to: 251,  type: 'outro', name: 'Stephan Röttger',
        meta: ['agent.stepharo@gmail.com','schön und unmöglich · trotzdem gemacht','danke · gianna nannini · 1986'] },
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
    case 'endcard': {
      const color = s.cyan ? 'endcard-cyan' : 'endcard-red';
      return `<div class="endcard ${color}">
        <div class="endcard-cta">${[...s.cta].map((c) => c === ' ' ? `<span class="sp"> </span>` : `<span class="ec-lt">${c}</span>`).join('')}</div>
        <div class="endcard-mail mono"><span class="ec-cur">▌</span>${esc(s.mail)}</div>
        <div class="endcard-tag mono">${esc(s.tag || '')}</div>
      </div>`;
    }
    case 'outro':
      return `<div class="outro">
        <div class="sig-name">— ${esc(s.name)}</div>
        <div class="sig-meta mono">${s.meta.map((m) => `<span>${m}</span>`).join('')}</div>
      </div>`;
    case 'image': {
      const tint = s.tint ? `tint-${s.tint}` : '';
      return `<div class="img-wrap ${tint}">
        <img src="${esc(s.src)}" alt="" />
        <div class="img-overlay">
          ${s.tag ? `<div class="img-overlay-tag">${esc(s.tag)}</div>` : ''}
          ${s.text ? `<div class="img-overlay-text">${esc(s.text)}</div>` : ''}
          ${s.sub ? `<div class="img-overlay-sub">${esc(s.sub)}</div>` : ''}
        </div>
      </div>`;
    }
    case 'terminal': {
      return `<div class="terminal">
        <div class="term-bar">
          <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
          <span class="title">${esc(s.title || 'agent.stepharo @ deploy')}</span>
        </div>
        <div class="term-body" data-lines='${JSON.stringify(s.lines).replace(/'/g, "&#39;")}'>
          <span class="term-cursor"></span>
        </div>
      </div>`;
    }
    case 'chart': {
      return `<div class="chart">
        <div class="chart-title">${esc(s.title || 'PROOF.')}</div>
        ${s.bars.map((b, i) => `
          <div class="chart-row" data-i="${i}" data-target="${b.value}" data-max="${b.max || 100}" data-suffix="${esc(b.suffix || '')}">
            <div class="chart-label">${esc(b.label)}</div>
            <div class="chart-track"><div class="chart-bar ${b.color || ''}"></div></div>
            <div class="chart-value">0${esc(b.suffix || '')}</div>
          </div>
        `).join('')}
      </div>`;
    }
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
    // Split final into numeric prefix (slot-animated) and suffix (e.g. "%", "M")
    const finalStr = final || String(num);
    const m = finalStr.match(/^(\d+)(.*)$/);
    const digits = m ? m[1] : String(num);
    const suffix = m ? m[2] : '';
    el.innerHTML = '';
    [...digits].forEach((targetDigit, i) => {
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
        // fin lives at index cycles*10 → translate by exactly cycles*10 em to land on it
        const offset = cycles * 10;
        reel.style.transform = `translateY(-${offset}em)`;
      });
    });
    if (suffix) {
      const sfx = document.createElement('span');
      sfx.className = 'slot-suffix';
      sfx.textContent = suffix;
      el.appendChild(sfx);
    }
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
// TERMINAL — live-typed deploy log
// =============================================================
async function runTerminal(body) {
  if (!body || body.dataset.ran === '1') return;
  body.dataset.ran = '1';
  let lines;
  try { lines = JSON.parse(body.dataset.lines.replace(/&#39;/g, "'")); }
  catch (e) { return; }
  const cursor = body.querySelector('.term-cursor');
  for (const ln of lines) {
    const lineEl = document.createElement('div');
    lineEl.className = 'term-line';
    body.insertBefore(lineEl, cursor);
    if (ln.prompt) {
      const p = document.createElement('span');
      p.className = 'term-prompt'; p.textContent = ln.prompt + ' ';
      lineEl.appendChild(p);
      const cmd = document.createElement('span');
      cmd.className = 'term-cmd'; lineEl.appendChild(cmd);
      const text = ln.text || '';
      for (let i = 0; i < text.length; i++) {
        cmd.textContent = text.slice(0, i + 1);
        await sleep((ln.delay || 35) + Math.random() * 25);
      }
      await sleep(ln.pause || 220);
    } else {
      const span = document.createElement('span');
      span.className = 'term-' + (ln.color || 'grey');
      span.textContent = ln.output || '';
      lineEl.appendChild(span);
      await sleep(ln.delay || 60);
    }
    body.scrollTop = body.scrollHeight;
  }
}
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

// =============================================================
// CHART — animate horizontal bars from 0 to value
// =============================================================
function runChart(scene) {
  const rows = scene.querySelectorAll('.chart-row');
  rows.forEach((row, i) => {
    setTimeout(() => {
      const target = parseFloat(row.dataset.target);
      const max    = parseFloat(row.dataset.max) || 100;
      const suffix = row.dataset.suffix || '';
      const bar    = row.querySelector('.chart-bar');
      const val    = row.querySelector('.chart-value');
      const pct    = Math.min(100, (target / max) * 100);
      bar.style.width = pct + '%';
      // count up the displayed value
      const dur = 1300; const start = performance.now();
      const isFloat = !Number.isInteger(target);
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const v = eased * target;
        val.textContent = (isFloat ? v.toFixed(1) : Math.floor(v)) + suffix;
        if (t < 1) requestAnimationFrame(step);
        else val.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
      };
      requestAnimationFrame(step);
      row.classList.add('shown');
    }, 250 + i * 280);
  });
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
  if (scene.classList.contains('scene-endcard')) {
    setTimeout(() => { triggerShockwave(); triggerAberrate(); }, 80);
    setTimeout(() => triggerVhs(), 1200);
  }
  if (scene.classList.contains('scene-image')) {
    setTimeout(() => { triggerVhs(); triggerAberrate(); }, 80);
  }
  if (scene.classList.contains('scene-terminal')) {
    setTimeout(() => triggerAberrate(), 80);
    runTerminal(scene.querySelector('.term-body'));
  }
  if (scene.classList.contains('scene-chart')) {
    setTimeout(() => triggerShake(), 100);
    runChart(scene);
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
