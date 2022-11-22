import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try{
    console.log('::> revalidating...')
    await res.revalidate('/post/revalidate-this')
    res.status(200).json({msg: 'post revalidated'})
  }catch(e){
    console.log('::> failed to revalidate: ', e)
    res.status(500).json({msg: 'failed to revalidate'})
  }


}


