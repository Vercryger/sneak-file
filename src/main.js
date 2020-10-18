const querystring = require('querystring');
const cheerio = require('cheerio');
const sharp = require('sharp');
const fetch = require('node-fetch');
const userAgent = require('random-useragent');

const baseURL = 'https://docs.google.com';
const defaultOptions = {
  width: 300,
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
    html = await fetch(`${baseURL}/viewer?${querystring.stringify(params)}`, {
      method: 'GET',
      headers: {
        'User-Agent': userAgent.getRandom(),
      },
    }).then((res) => res.text());
  } catch (e) {
    throw new Error('Network error');
  }

  const $ = cheerio.load(html);
  const imgPath = $('img').first().attr('src');

  if (!imgPath) throw new Error('Cannot preview file');

  const res = await fetch(`${baseURL}${imgPath}`);
  const buffer = await res.buffer();
  const meta = await sharp(buffer).metadata();

  const sharpObject = sharp(buffer)
    .resize({ width: options.width })
    .toFormat(meta.format);

  return sharpObject.toBuffer();
}

module.exports = main;
