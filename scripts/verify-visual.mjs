import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const url = process.env.VISUAL_URL || 'https://syed-furqan-portfolio.vercel.app';

function hasNonBlankPixels(pixelData) {
  let visiblePixels = 0;

  for (let index = 0; index < pixelData.length; index += 4) {
    const red = pixelData[index];
    const green = pixelData[index + 1];
    const blue = pixelData[index + 2];
    const alpha = pixelData[index + 3];
    const brightness = red + green + blue;

    if (alpha > 0 && brightness > 18) {
      visiblePixels += 1;
    }
  }

  return visiblePixels > 100;
}

function sampleRegion(png, box) {
  const left = Math.max(0, Math.floor(box.x));
  const top = Math.max(0, Math.floor(box.y));
  const right = Math.min(png.width, Math.ceil(box.x + box.width));
  const bottom = Math.min(png.height, Math.ceil(box.y + box.height));
  const samples = [];

  for (let y = top; y < bottom; y += Math.max(1, Math.floor((bottom - top) / 80))) {
    for (let x = left; x < right; x += Math.max(1, Math.floor((right - left) / 80))) {
      const index = (png.width * y + x) * 4;
      samples.push(png.data[index], png.data[index + 1], png.data[index + 2], png.data[index + 3]);
    }
  }

  return Uint8Array.from(samples);
}

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const page = await browser.newPage({ viewport: { width: target.width, height: target.height } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('canvas');
    await page.waitForTimeout(1200);

    const canvasBoxes = await page.locator('canvas').evaluateAll((canvases) =>
      canvases.map((canvas) => {
        const rect = canvas.getBoundingClientRect();
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        };
      }),
    );
    const screenshot = await page.screenshot({ animations: 'allow', fullPage: false, path: `visual-${target.name}.png` });
    const png = PNG.sync.read(screenshot);
    const canvasChecks = canvasBoxes.map((box) => hasNonBlankPixels(sampleRegion(png, box)));

    const passed = canvasChecks.some(Boolean);
    if (!passed) {
      throw new Error(`Canvas verification failed for ${target.name}.`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}

console.log(`Visual verification passed for ${targets.map((target) => target.name).join(', ')} at ${url}.`);
