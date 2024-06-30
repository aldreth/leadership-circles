import fs from 'node:fs';
import sharp from 'sharp';
import {sharpsToIco} from 'sharp-ico';
import {pathToSvgLogo} from '../../_data/meta.js';

async function createFavicons() {
  const outputDir = 'src/assets/images/favicon';

  fs.mkdirSync(outputDir, {recursive: true});

  // Get the SVG logo
  // const svgBuffer = fs.readFileSync(pathToSvgLogo);
  const jpgBuffer = fs.readFileSync(pathToSvgLogo);
  const pngBuffer = await sharp(jpgBuffer).toFormat('png').toBuffer();

  // SVG icon
  fs.writeFileSync(`${outputDir}/favicon.svg`, pngBuffer);

  // PNG icons
  await sharp(pngBuffer).resize(192, 192).toFile(`${outputDir}/icon-192x192.png`);
  await sharp(pngBuffer).resize(512, 512).toFile(`${outputDir}/icon-512x512.png`);
  await sharp(pngBuffer).resize(180, 180).toFile(`${outputDir}/apple-touch-icon.png`);

  // maskable icon
  await sharp(pngBuffer)
    .resize(512, 512)
    .extend({
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
      background: {r: 0, g: 0, b: 0, alpha: 0} // Transparent padding
    })
    .toFile(`${outputDir}/maskable-icon.png`);

  // ICO icon
  const iconSharp = sharp(pngBuffer).resize(16, 16);
  await sharpsToIco([iconSharp], `${outputDir}/favicon.ico`, {sizes: [16]});

  console.log('All favicons generated.');
}

createFavicons();
