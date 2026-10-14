# Teyro Originals covers

Each Original's cover is a small HTML page in Teyro's style (brand blue `#0172FD`, Plus Jakarta Sans, chunky lipped shapes, a still frame of a motion-graphics scene), rendered to a 1600×1000 JPEG. No Tey on covers (founder, 2026-10-14). Covers display at 16:10 and are cropped to 16:9 in some places, so keep important content away from the top and bottom edges.

Render (from `frontend/`, which has Playwright installed):

```bash
node ../backend/originals/covers/render.js "<abs path>/frontend/node_modules/playwright" "<abs path>/backend/originals/covers/ai-at-work-beginner.html" "<abs path>/frontend/public/User onbarding Assets/tey/pointing.webp" "<abs path>/frontend/public/originals/ai-at-work-beginner.jpg"
```

The output goes in `frontend/public/originals/`, and the level's `thumbnailUrl` points at it (`/originals/<slug>.jpg`). render.js still takes an image argument for older templates; covers without Tey ignore it, so any existing file works there.
