import { Button } from './elements';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

const authProvider = new GoogleAuthProvider();

export function Login() {
  const loginHandler = () => {
    signInWithPopup(getAuth(), authProvider)
      .then(result => {
        console.log('login was successful: ', result.user.email);
      })
      .catch(e => {
        console.error('failed to login: ', e);
      });
  };
  return (
    <div className='w-fit m-auto text-center space-y-5'>
      <h4 className='font-bold'>You must login to access your profile</h4>
      <p>By logging in you are able to manage your post and write new posts</p>
      <Button className='bg-lime-500' onClick={loginHandler}>
        Login
      </Button>
    </div>
  );
}
export function Logout() {
  const logoutHandler = () => {
    signOut(getAuth())
      .then(() => {
        console.log('sign-out was successful');
      })
      .catch(e => {
        console.error('failed to sign out: ', e);
      });
  };
  return (
    <Button className='bg-pink' onClick={logoutHandler}>
      Logout
    </Button>
  );
}
