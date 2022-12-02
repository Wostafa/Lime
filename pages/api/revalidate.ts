import { NextApiRequest, NextApiResponse } from 'next';
import VerifyUser from '../../lib/verify-user';
import '../../lib/firebase-admin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path;
  if (!path || Array.isArray(path)) {
    return res.status(400).json({ error: 'bad request' });
  }
  try {
    await VerifyUser(req.headers.authorization);
    console.log('::> revalidating...');
    await res.revalidate(path);
    res.status(200).json({ msg: 'post revalidated' });
  } catch (e) {
    console.log('::> failed to revalidate: ', e);
    res.status(500).json({ error: 'failed to revalidate' });
  }
}
