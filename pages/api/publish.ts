import { NextApiRequest, NextApiResponse } from 'next';
import {doc, setDoc, getFirestore, addDoc, collection} from 'firebase/firestore'
import {app} from '../../lib/firebase'

const db = getFirestore(app)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
/*   if(req.headers['content-type'] !== 'application/json'){
    res.status(200).json({error:'bad request'})
    return
  }
  console.log(req.body)
  res.status(200).json({message: 'post successfully published'}) */
  // -------
  try{
    await Firebase()
    res.status(200).json({})
  }catch(e){
    res.status(500).json({e})
  }
}

async function Firebase(){
  // const col = 'test-public';
  const col = 'test-auth'
  const colRef = collection(db, col);
  const docRef = await addDoc(colRef, {
    name: 'jack',
    date: new Date().toLocaleTimeString()
  })
  return docRef.id
}