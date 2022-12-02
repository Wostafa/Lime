import type { NextApiRequest, NextApiResponse } from 'next';
import { getStorage } from 'firebase-admin/storage';
import { nanoid } from 'nanoid/non-secure';
import busboy, { FileInfo } from 'busboy';
import '../../lib/firebase-admin';
import VerifyUser from '../../lib/verify-user';

interface File {
  base64Image: string;
  info: FileInfo;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log(req)
  if (req.method !== 'POST' || !req.headers['content-type']?.includes('multipart/form-data')) {
    res.status(400).json({ error: 'bad request' });
    console.error('error: bad request');
    return;
  }
  try {
    await VerifyUser(req.headers.authorization);
    const file = await Parse(req);
    await Upload(file, res);
  } catch (e: any) {
    console.log('failed to process file: ', e);
    res.status(e.status || 500).json({ error: e.msg || 'failed to process file' });
  }
}

async function Parse(req: NextApiRequest): Promise<File> {
  return new Promise((resolve, reject) => {
    let base64Image = '';
    const _busboy = busboy({ headers: req.headers });
    _busboy.on('file', (filedName, file, info) => {
      if (filedName !== 'image') reject({ msg: 'invalid file', status: 400 });
      file.setEncoding('base64');
      file.on('data', data => {
        base64Image += data;
      });
      file.on('end', () => {
        resolve({
          base64Image,
          info,
        });
      });
      file.on('error', () => {
        reject('failed to parse image');
      });
    });
    req.pipe(_busboy);
  });
}

async function Upload({ base64Image, info }: File, res: NextApiResponse) {
  const bufferImage = Buffer.from(base64Image, 'base64');
  const bucket = getStorage().bucket('lime-27e23.appspot.com');
  const file = bucket.file(`images/${nanoid(10)}.${info.mimeType.split('/')[1]}`);

  await file.save(bufferImage, { contentType: info.mimeType });
  console.log('file uploaded: ', file.publicUrl());

  res.status(200).json({
    success: 1,
    file: {
      url: file.publicUrl(),
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
