const querystring = require('querystring');
const cheerio = require('cheerio');
const sharp = require('sharp');
const fetch = require('node-fetch');

const baseURL = 'https://docs.google.com';
const defaultOptions = {
  format: 'png',
  scale: 1,
  filePath: `output-${Date.now()}`,
};

async function main(fileUrl, opts = {}) {
  if (!fileUrl.match(/\.[^.\\/:*?"<>|\r\n]+$/)) throw new Error('Unrecognized file');

  const options = {
    ...defaultOptions,
    ...opts,
  };
  const params = {
    embedded: true,
    url: fileUrl,
  };

  let html = null;

  try {
    html = await fetch(`${baseURL}/viewer?${querystring.stringify(params)}`).then((res) => res.text());
  } catch (e) {
    throw new Error('Network error');
  }

  const $ = cheerio.load(html);
  const imgPath = $('img').first().attr('src');

  if (!imgPath) throw new Error('Cannot preview file');

  const res = await fetch(`https://docs.google.com${imgPath}`);
  const buffer = await res.buffer();

  const meta = await sharp(buffer).metadata();
  const sharpFile = sharp(buffer)
    .resize(Math.round(meta.width * options.scale))
    .toFormat(options.format);

  if (options.filePath) {
    return sharpFile.toFile(`${options.filePath}.${options.format}`);
  }

  return sharpFile;
}

module.exports = main;
