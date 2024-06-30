import fs from 'node:fs/promises';
import sharp from 'sharp';

async function coverImagesTransparency() {
  const inputDir = './src/assets/images/cover-images/input';
  const outputDir = 'src/assets/images/cover-images/output';

  await fs.mkdir(outputDir, {recursive: true});

  let images = await fs.readdir(inputDir, {withFileTypes: true});

  images = images
    .filter(item => !item.isDirectory())
    .map(item => item.name)
    .filter(f => f.match('.jpg'))
    .map(f => f.replace('.jpg', ''));

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
