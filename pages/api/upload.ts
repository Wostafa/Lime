import type { NextApiRequest, NextApiResponse } from 'next';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid/non-secure';
import busboy, { FileInfo } from 'busboy';
import '../../lib/firebase-admin'

interface File {
  base64Image: string;
  info: FileInfo;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method !== 'POST' || !req.headers['content-type']?.includes('multipart/form-data')) {
    res.status(400).json({ error: 'bad request' });
    console.error('error: bad request');
    return
  }
  try {
    // const file = await Parse(req);
    // Upload(file, res);
    console.log(req.headers);
    res.status(200).json({});
  } catch (e: any) {
    console.log('failed to process file: ', e);
    res.status(e.status || 500).json({ error: 'failed to process file' || e.msg });
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

function Upload({ base64Image, info }: File, res: NextApiResponse) {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${nanoid(10)}.${info.mimeType.split('/')[1]}`);
  const dataUrl = `data:${info.mimeType};base64,${base64Image}`;

  uploadString(imageRef, dataUrl, 'data_url').then(snapshot => {
    getDownloadURL(snapshot.ref).then(url => {
      console.log('uploaded: ', url);
      res.status(200).json({
        success: 1,
        file: {
          url,
        },
      });
    });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
