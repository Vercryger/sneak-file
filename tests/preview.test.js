const previewer = require('../src/main.js');

test('it should preview docx file', async () => {
  const res = await previewer('https://github.com/Vercryger/sneak-file/raw/master/tests/files/sample-doc.docx');
  expect(res).toBeInstanceOf(Buffer);
});

test('it should preview pdf file', async () => {
  const res = await previewer('https://github.com/Vercryger/sneak-file/raw/master/tests/files/sample-doc.pdf');
  expect(res).toBeInstanceOf(Buffer);
});

test('it should preview rtf file', async () => {
  const res = await previewer('https://github.com/Vercryger/sneak-file/raw/master/tests/files/sample-doc.rtf');
  expect(res).toBeInstanceOf(Buffer);
});

test('it should preview pptx file', async () => {
  const res = await previewer('https://github.com/Vercryger/sneak-file/raw/master/tests/files/sample-pp.pptx');
  expect(res).toBeInstanceOf(Buffer);
});

test('it should throw error for unsuported file', async () => {
  const call = previewer('https://github.com/Vercryger/sneak-file/raw/master/tests/files/sample-pp.odp');

  await expect(call).rejects.toThrow('Cannot preview file');
});

test('it should throw error for URLs with no extension', async () => {
  const call = previewer('https://sampledomain.com/filewithnoextension');

  await expect(call).rejects.toThrow('Unrecognized file');
});