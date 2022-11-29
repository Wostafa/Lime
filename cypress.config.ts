import { defineConfig } from 'cypress';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
require('dotenv').config({ path: '.env.local' });
//

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      on('task', {
        test() {
          return null;
        },
      });
      // -----
      on('task', {
        createCustomToken(): Promise<string | undefined> {
          if(admin.apps.length === 0){
            admin.initializeApp({
              credential: applicationDefault(),
              storageBucket: 'lime-27e23.appspot.com',
            });
          }
          return new Promise((resolve, reject) => {
            getAuth()
              .createCustomToken(process.env.UID as string)
              .then(token => {
                console.log('::> custom token made');
                resolve(token);
              })
              .catch(e => {
                console.log('::> failed to create custom token: ', e);
                reject(undefined);
              });
          });
        },
      });
    },
  },
  watchForFileChanges: false,
});
