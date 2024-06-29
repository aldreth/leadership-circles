import Image from '@11ty/eleventy-img';

function generateImages(src) {
  let options = {
    widths: [600, 800, 900, 1100, 1500, 2000],
    formats: ['jpeg'],
    outputDir: './dist/assets/cover-images/',
    urlPath: '/assets/cover-images/',
    useCache: true,
    sharpJpegOptions: {
      quality: 99,
      progressive: true
    }
  };
  // genrate images, ! dont wait
  Image(src, options);
  // get metadata even the image are not fully generated
  return Image.statsSync(src, options);
}

export function imageCssBackground(fileName) {
  const selector = '.cover-image';
  const src = `./src/assets/images/cover-images/${fileName}`;
  const metadata = generateImages(src);

  let markup = [`${selector} { background-image: url(${metadata.jpeg[0].url});} `];
  metadata.jpeg.slice(1).forEach((image, idx) => {
    markup.push(
      `@media (min-width: ${metadata.jpeg[idx].width}px) { ${selector} {background-image: url(${image.url});}}`
    );
  });
  return markup.join('');
}
