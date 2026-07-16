/**
 * scripts/optimize-existing.js
 *
 * Reads every .png/.jpg/.jpeg file in the onboarding assets folder,
 * resizes to 800px width (maintaining aspect ratio),
 * converts to WebP at quality 80,
 * and saves the .webp version alongside the original.
 *
 * Does NOT delete originals.
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(
  __dirname,
  '../public/User onbarding Assets'
);

const SUPPORTED_EXTS = new Set(['.png', '.jpg', '.jpeg']);

async function getFileSizeKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(1);
  } catch {
    return 'N/A';
  }
}

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTS.has(ext)) return null;

  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const beforeKB = await getFileSizeKB(filePath);

  await sharp(filePath)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webpPath);

  const afterKB = await getFileSizeKB(webpPath);

  return {
    original: path.basename(filePath),
    webp: path.basename(webpPath),
    beforeKB,
    afterKB,
    savedKB: (parseFloat(beforeKB) - parseFloat(afterKB)).toFixed(1),
  };
}

async function main() {
  console.log(`\nScanning: ${INPUT_DIR}\n`);

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`Directory not found: ${INPUT_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(INPUT_DIR, { withFileTypes: true });
  const imageFiles = entries
    .filter((e) => e.isFile() && SUPPORTED_EXTS.has(path.extname(e.name).toLowerCase()))
    .map((e) => path.join(INPUT_DIR, e.name));

  if (imageFiles.length === 0) {
    console.log('No image files found.');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s). Processing...\n`);

  const results = [];
  for (const filePath of imageFiles) {
    try {
      const result = await processFile(filePath);
      if (result) {
        results.push(result);
        console.log(`  ✅  ${result.original}`);
        console.log(`       Before: ${result.beforeKB} KB  →  After: ${result.afterKB} KB  (saved ${result.savedKB} KB)`);
        console.log(`       Output: ${result.webp}\n`);
      }
    } catch (err) {
      console.error(`  ❌  Failed: ${path.basename(filePath)} — ${err.message}`);
    }
  }

  const totalBefore = results.reduce((s, r) => s + parseFloat(r.beforeKB), 0).toFixed(1);
  const totalAfter  = results.reduce((s, r) => s + parseFloat(r.afterKB), 0).toFixed(1);
  const totalSaved  = (parseFloat(totalBefore) - parseFloat(totalAfter)).toFixed(1);

  console.log('─'.repeat(50));
  console.log(`  Total files processed : ${results.length}`);
  console.log(`  Total before          : ${totalBefore} KB`);
  console.log(`  Total after (WebP)    : ${totalAfter} KB`);
  console.log(`  Total saved           : ${totalSaved} KB`);
  console.log('─'.repeat(50));
  console.log('\nDone. Originals have NOT been deleted.\n');
}

main();
