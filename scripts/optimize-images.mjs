import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { glob } from 'fs';

const extensions = ['.png', '.jpg', '.jpeg'];
const imageDirs = ['public/images', 'public/images/stories'];
const maxWidth = 1200;
const webpQuality = 80;
const jpegQuality = 85;

let totalOriginal = 0;
let totalNew = 0;
let fileCount = 0;

for (const dir of imageDirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => extensions.includes(path.extname(f).toLowerCase()));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);
    const originalSize = fs.statSync(filePath).size;
    totalOriginal += originalSize;

    let pipeline = sharp(filePath);
    const meta = await pipeline.metadata();

    if (meta.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth);
    }

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      // Convert to WebP
      const webpPath = path.join(dir, `${baseName}.webp`);
      const newExt = path.extname(webpPath).toLowerCase();
      await pipeline.webp({ quality: webpQuality }).toFile(webpPath);
      const webpSize = fs.statSync(webpPath).size;

      // Recompress original JPEG with mozjpeg (skip PNG since sharp makes it worse)
      if (ext !== '.png') {
        await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toFile(filePath + '.tmp');
        fs.renameSync(filePath + '.tmp', filePath);
      }

      const newOriginalSize = ext !== '.png' ? fs.statSync(filePath).size : originalSize;
      totalNew += webpSize;

      const webpSavings = ((originalSize - webpSize) / 1024).toFixed(1);
      const jpgSavings = ((originalSize - newOriginalSize) / 1024).toFixed(1);
      fileCount++;
      console.log(
        `${file}: ${(originalSize / 1024).toFixed(1)}KB → ` +
        `${(webpSize / 1024).toFixed(1)}KB webp (saved ${webpSavings}KB)` +
        (ext !== '.png' ? `, jpeg: ${jpgSavings}KB` : '')
      );
    }
  }
}

const totalSavings = ((totalOriginal - totalNew) / 1024 / 1024).toFixed(1);
console.log(`\nDone. ${fileCount} files processed, ${(totalOriginal / 1024 / 1024).toFixed(1)}MB → ${(totalNew / 1024 / 1024).toFixed(1)}MB (saved ${totalSavings}MB)`);
console.log('\nNow update markdown frontmatter: run `node scripts/update-image-refs.mjs`');
