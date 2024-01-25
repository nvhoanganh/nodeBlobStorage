const { BlobServiceClient } = require("@azure/storage-blob");
let fs = require('fs');

const _token = ``;


async function main(token) {
  const folderId = '';
  const token2 = token.replace(folderId, '');
  const blobServiceClient = new BlobServiceClient(token2);
  console.time();
  const containerClient = blobServiceClient.getContainerClient(folderId);

  const blobName = "sample.jpeg";
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const fileName = `/Users/anthonynguyen/sources/personal/nodeBlobStorage/sample.jpeg`;

  const uploadBlobResponse = await blockBlobClient.uploadFile(fileName,
    { blobHTTPHeaders: { blobContentType: 'image/jpeg' } });

  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
  console.timeEnd();
}

// uploading using REST API and fetch
async function main3(token) {
  // via REST API, upload a simple text
  console.time();

  const fileName = 'IMG_0002.JPG';
  const filePath = `/Users/anthonynguyen/sources/personal/nodeBlobStorage/IMG_0002.JPG`;

  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats.size;

  console.log(`file lenght is ${fileSizeInBytes} bytes`);

  const URL = token.split('?')[0] + `/${fileName}?` + token.split('?')[1];

  console.log(`upload URL is: ${URL}`);

  let readStream = fs.createReadStream(filePath);

  console.time();
  console.log('uploading..');
  await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/jpeg',
      'x-ms-version': '2023-11-03',
      'x-ms-blob-type': 'BlockBlob',
      'Content-length': fileSizeInBytes
    },
    body: readStream,
    duplex: 'half'
  })
  console.timeEnd();
  console.log('done');
}

main3(_token);