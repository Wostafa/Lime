import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import VerifyUser from '../../lib/verify-user';
import type { UserInfo } from '../../constants';
import '../../lib/firebase-admin'

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json({ error: 'bad request' });
    return;
  }
  try {
    const userInfo = await VerifyUser(req.headers);
    const postId = await Upload(req.body, userInfo);
    console.log('post published, id: ', postId)
    res.status(200).json({
      message: 'post successfully published',
      postId,
    });
  } catch (e: any) {
    res.status(e.status || 500).json({ error: e.msg || 'failed to publish' });
  }
}

async function Upload(post: {}, user: UserInfo) {
  const docRef = db.collection('posts').doc();
  await docRef.set({
    post,
    user,
  });
  return docRef.id;
}
