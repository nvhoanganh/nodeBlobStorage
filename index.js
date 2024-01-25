const { BlobServiceClient } = require("@azure/storage-blob");

const folderId = '05026d75-ec5c-40cd-b3b0-366a8ce7a4e8';

const token = ``;

const token2 = token.replace(folderId, '');
const blobServiceClient = new BlobServiceClient(token2);


async function main() {
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

async function main2() {
  console.time();
  const containerClient = blobServiceClient.getContainerClient(folderId);

  const content = "Hello world!";
  const blobName = "newblob" + new Date().getTime();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

main2();