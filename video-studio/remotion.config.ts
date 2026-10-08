import { Config } from '@remotion/cli/config';

// GPU (ANGLE) rendering: ~5x faster for Ada's sticker outline (CSS drop-shadows) than the default software renderer.
Config.setChromiumOpenGlRenderer('angle');
Config.setVideoImageFormat('jpeg');
