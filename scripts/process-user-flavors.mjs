import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = 'C:/Users/elmoc/.gemini/antigravity/brain/64c1391b-8367-4a36-82e0-17984be15763/.user_uploaded';
const outputDir = path.resolve('public/flavors');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Process transparent PNGs directly (resize/optimize cleanly)
async function copyPng(inputFile, outputFile) {
  const inPath = path.join(inputDir, inputFile);
  const outPath = path.join(outputDir, outputFile);
  await sharp(inPath)
    .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✓ Copied & optimized ${outputFile}`);
}

// 2. Flood-fill background removal for black background JPEGs
async function removeBlackBackground(inputFile, outputFile, threshold = 18, feather = 12) {
  const inPath = path.join(inputDir, inputFile);
  const outPath = path.join(outputDir, outputFile);

  const { data, info } = await sharp(inPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 3 for RGB

  // RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);

  // Visited array for BFS flood fill
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function pushQueue(x, y) {
    const idx = y * width + x;
    if (visited[idx] === 0) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  }

  // Seed BFS from all borders
  for (let x = 0; x < width; x++) {
    pushQueue(x, 0);
    pushQueue(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushQueue(0, y);
    pushQueue(width - 1, y);
  }

  // Flood fill from border
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const px = (cy * width + cx) * channels;
    const r = data[px];
    const g = data[px + 1];
    const b = data[px + 2];
    const maxVal = Math.max(r, g, b);

    // If this pixel is dark enough to be background, continue BFS
    if (maxVal <= threshold + feather) {
      // Check 4 neighbors
      if (cx > 0) pushQueue(cx - 1, cy);
      if (cx < width - 1) pushQueue(cx + 1, cy);
      if (cy > 0) pushQueue(cx, cy - 1);
      if (cy < height - 1) pushQueue(cx, cy + 1);
    }
  }

  // Now build RGBA output
  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const destIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const maxVal = Math.max(r, g, b);

    rgba[destIdx] = r;
    rgba[destIdx + 1] = g;
    rgba[destIdx + 2] = b;

    if (visited[i] === 1) {
      // Pixel was reached by border flood fill
      if (maxVal <= threshold) {
        rgba[destIdx + 3] = 0; // Pure background
      } else {
        // Feathered edge: smooth transition from 0 to 255
        const factor = (maxVal - threshold) / feather;
        rgba[destIdx + 3] = Math.min(255, Math.max(0, Math.round(factor * 255)));
      }
    } else {
      // Inside food object: 100% opaque (preserves dark grill marks, deep shadows inside food)
      rgba[destIdx + 3] = 255;
    }
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(outPath);

  console.log(`✓ Converted ${inputFile} -> ${outputFile} (transparent PNG)`);
}

async function run() {
  // 1. Very Spicy (from media_1794789566641_3764afa3.png)
  await copyPng('media_1794789566641_3764afa3.png', 'very-spicy.png');

  // 2. Medium Spicy (from media_1794789566627_4f42441d.png)
  await copyPng('media_1794789566627_4f42441d.png', 'medium-spicy.png');

  // 3. Mango (from media_1794789566630_eeeb2c21.jpg)
  await removeBlackBackground('media_1794789566630_eeeb2c21.jpg', 'mango.png', 16, 14);

  // 4. Barbecue (from media_1794789566636_a773eb32.jpg)
  await removeBlackBackground('media_1794789566636_a773eb32.jpg', 'barbecue.png', 18, 14);

  // 5. Lemon & Lime (from media_1794789566592_376159a4.jpg)
  await removeBlackBackground('media_1794789566592_376159a4.jpg', 'lemon-lime.png', 16, 14);
}

run().catch(console.error);
