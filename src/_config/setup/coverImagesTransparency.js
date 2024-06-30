import fs from 'node:fs/promises';
import sharp from 'sharp';

async function coverImagesTransparency() {
  const inputDir = './src/assets/images/cover-images/input';
  const outputDir = 'src/assets/images/cover-images/output';

  await fs.mkdir(outputDir, {recursive: true});

  const images = ['mountain-mist'];

  await Promise.all(
    images.map(async image => {
      const src = `${inputDir}/${image}.jpg`;
      const pic = await fs.readFile(src);
      await sharp(pic).ensureAlpha(0.5).webp({lossless: true}).toFile(`${outputDir}/${image}.webp`);
      console.log(`${image} done`);
    })
  );

  console.log('All cover images generated.');
}

coverImagesTransparency();
