import { NextApiRequest, NextApiResponse } from 'next';
import VerifyUser from '../../lib/verify-user';
import { getFirestore } from 'firebase-admin/firestore';
import '../../lib/firebase-admin';

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.secret || Array.isArray(req.query.secret) || !req.query.postId || Array.isArray(req.query.postId)) {
    return res.status(400).json({ error: 'bad request' });
  }
  try {
    await VerifyUser(req.query.secret);
    const verifiedPost = await VerifyPost(req.query.postId);
    console.log(verifiedPost);
    res.setPreviewData({ postId: verifiedPost.postId });
    res.redirect(`/post/${verifiedPost.slug}`);
  } catch (e: any) {
    console.log('failed to show preview: ', e);
    return res.status(e.status || 500).json({ error: e.msg || 'failed to show preview' });
  }
}

async function VerifyPost(postId: string) {
  const docRef = db.collection('posts').doc(postId);
  const doc = await docRef.get();
  if (!doc.exists) throw new Error('post not found');
  console.log('post verified: ', doc.id);
  return {
    postId: doc.id,
    slug: doc.data()?.slug,
  };
}
