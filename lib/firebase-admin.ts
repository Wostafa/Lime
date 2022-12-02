import admin from 'firebase-admin'

// avoiding being called more than once
if(admin.apps.length === 0){
  console.log(process.env.FIREBASE_ADMIN_SDK)
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK as string)),
    storageBucket: 'lime-27e23.appspot.com'
  })
}