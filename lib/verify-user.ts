import { getAuth } from 'firebase-admin/auth';
import { IncomingHttpHeaders } from 'http';
import type { UserInfo } from '../constants';

export default async function VerifyUser(headers: IncomingHttpHeaders): Promise<UserInfo> {
  return new Promise((resolve, reject) => {
    if (headers.authorization) {
      getAuth()
        .verifyIdToken(headers.authorization)
        .then(decodedToken => {
          console.log('user is valid: ', {
            email: decodedToken.email,
            exp: new Date(decodedToken.exp * 1000).toLocaleString()
          });
          resolve({
            uid: decodedToken.uid,
            email: decodedToken.email,
            picture:decodedToken.picture
          });
        })
        .catch(e => {
          console.log('token is not valid: ', e);
          reject({ msg: 'access denied', status: 401 });
        });
    } else {
      console.log('authorization not provided');
      reject({ msg: 'access denied', status: 401 });
    }
  });
}
