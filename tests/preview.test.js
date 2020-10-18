const previewer = require('../src/main.js');

test('it should preview docx file', async () => {
  const fileData = await previewer('https://eks-revolution-global.s3.amazonaws.com/PigBvvoFn5rJpRRgM-365%20Cannabis%20-%20Inventory%20API%20-%20Preview%20-%20Revolution%20eComm.docx');
  expect(fileData.length).toEqual(66529);
});

test('it should preview pdf file', async () => {
  const fileData = await previewer('https://eks-revolution-global.s3.amazonaws.com/KxWXEpKsiHXKeA7Wh-Sent%20to%20Andy%20Mack%203-30-20.pdf');
  expect(fileData.length).toEqual(23431);
});

test('it should preview pptx file', async () => {
  const fileData = await previewer('https://eks-revolution-global.s3.us-east-2.amazonaws.com/test/Untitled+presentation.pptx');
  expect(fileData.length).toEqual(4104);
});

test('it should throw error for unsuported file', async () => {
  const call = previewer('https://eks-revolution-global.s3.us-east-2.amazonaws.com/test/ohm2013.odp');

  await expect(call).rejects.toThrow('Cannot preview file');
});

test('it should throw error for URLs with no extension', async () => {
  const call = previewer('https://samples3bucket.com/filewithnoextension');

  await expect(call).rejects.toThrow('Unrecognized file');
});