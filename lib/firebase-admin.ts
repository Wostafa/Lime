import admin from 'firebase-admin'
import { applicationDefault } from 'firebase-admin/app';

// avoiding being called more than once
if(admin.apps.length === 0){
  admin.initializeApp({
    credential: applicationDefault(),
    storageBucket: 'lime-27e23.appspot.com'
  })
}