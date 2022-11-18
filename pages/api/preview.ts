import { NextApiRequest, NextApiResponse } from 'next';
import VerifyUser from '../../lib/verify-user';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(!req.query.secret || Array.isArray(req.query.secret) || !req.query.postId){
    return res.status(400).json({error:'bad request'})
  }
  try{
    await VerifyUser(req.query.secret);
  }catch(e:any){
    return res.status(e.status || 500).json({error: e.msg || 'failed to show preview'})
  }
  const slug = req.query.postId
  res.setPreviewData({slug})
  res.end(`slug: ${slug}`)
}