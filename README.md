# Stephan Röttger — Music Video Site

A one-page audio-reactive music-video website built around Die Toten Hosen's
"Kauf MICH!" — a punk + cinematic + cyber-grit homage. Behind Cloudflare Access.

## Stack
- Pure HTML/CSS/JS (no framework — fast, light, immortal)
- Web Audio API for FFT analysis (bass/mid/treble → visuals)
- Canvas 2D for particle field, grid, spectrum bars, beat-driven kicks
- Timeline-based scenes synced to audio time
- Cloudflare Pages + Cloudflare Access (Zero Trust)

## Local dev
```bash
python3 -m http.server 8000 --directory public
```
Open http://localhost:8000/, hit **PRESS PLAY**.

## Deploy
```bash
wrangler pages deploy public --project-name stephan-music-video
```

## Keyboard
- `Space` — play/pause
- `M` — mute
- `R` — restart
- `F` — fullscreen

## Files
```
public/
  index.html    Markup + scenes
  styles.css    All styles, animations
  app.js        Audio analysis, particles, scene timeline
  track.mp3     Audio (via yt-dlp)
  _headers      Cloudflare Pages cache headers
```

— Built by Stephan's AI agent (StepharoAgent) // 2026
