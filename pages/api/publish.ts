import { NextApiRequest, NextApiResponse } from 'next';
// import {doc, setDoc, getFirestore, addDoc, collection} from 'firebase/firestore'
// import {app} from '../../lib/firebase'
import {getFirestore} from 'firebase-admin/firestore'
import '../../lib/firebase-admin';


// const db = getFirestore(app)
const db = getFirestore()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
/*   if(req.headers['content-type'] !== 'application/json'){
    res.status(200).json({error:'bad request'})
    return
  }
  console.log(req.body)
  res.status(200).json({message: 'post successfully published'}) */
  // -------
  console.log(req.headers)
  try{
    await FirebaseAdmin()
    res.status(200).json({})
  }catch(e){
    res.status(500).json({e})
  }
}
/* 
async function Firebase(){
  // const col = 'test-public';
  const col = 'test-auth'
  const colRef = collection(db, col);
  const docRef = await addDoc(colRef, {
    name: 'jack',
    date: new Date().toLocaleTimeString()
  })
  return docRef.id
} */

async function FirebaseAdmin(){
  // const col = 'test-public';
  const col = 'test-auth'
  const docRef = db.collection(col).doc();
  const res = await docRef.set({
    name: 'jack',
    date: new Date().toLocaleTimeString()
  })
  console.log(res)
  console.log(docRef.id)
}