const previewer = require('../src/main.js');

jest.setTimeout(10000);

test('it should preview docx file', async () => {
  const fileData = await previewer('https://eks-revolution-global.s3.amazonaws.com/PigBvvoFn5rJpRRgM-365%20Cannabis%20-%20Inventory%20API%20-%20Preview%20-%20Revolution%20eComm.docx');
  expect(fileData).toEqual({
    format: 'png',
    width: 800,
    height: 1130,
    channels: 3,
    premultiplied: false,
    size: 124019
  });
});

test('it should preview pdf file', async () => {
  const fileData = await previewer('https://eks-revolution-global.s3.amazonaws.com/KxWXEpKsiHXKeA7Wh-Sent%20to%20Andy%20Mack%203-30-20.pdf');
  expect(fileData).toEqual({
    format: 'png',
    width: 800,
    height: 450,
    channels: 3,
    premultiplied: false,
    size: 58581
  });
});

test('it should preview pptx file', async () => {
  const fileData = await previewer('https://eks-revolution-global.s3.us-east-2.amazonaws.com/test/Untitled+presentation.pptx');
  expect(fileData).toEqual({
    channels: 3,
    format: 'png',
    height: 450,
    premultiplied: false,
    size: 6844,
    width: 800
  });
});

test('it should throw error for unsuported file', async () => {
  const call = previewer('https://eks-revolution-global.s3.us-east-2.amazonaws.com/test/ohm2013.odp');

  await expect(call).rejects.toThrow('Cannot preview file');
});

test('it should throw error for URLs with no extension', async () => {
  const call = previewer('https://samples3bucket.com/filewithnoextension');

  await expect(call).rejects.toThrow('Unrecognized file');
});