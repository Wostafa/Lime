import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore } from 'firebase-admin/firestore';
import VerifyUser from '../../lib/verify-user';
import type { UserInfo, PostPublish, PostStored } from '../../constants';
import '../../lib/firebase-admin'
import slugify from 'slugify';

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json({ error: 'bad request' });
    return;
  }
  try {
    const userInfo = await VerifyUser(req.headers.authorization);
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

async function Upload(post: PostPublish, user: UserInfo) {
  const docRef = db.collection('posts').doc();
  const docPost: PostStored = {
    post,
    user,
    slug: slugify(post.title, {lower:true, strict:true}),
  }
  await docRef.set(docPost);
  return docRef.id;
}
