import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import '../lib/firebase';
import { useState, useEffect } from 'react';
import { AuthContext } from '../lib/contexts';
import  {onAuthStateChanged, getAuth, User} from 'firebase/auth'
import { TOKEN_KEY } from '../constants';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null | false>(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(getAuth(), (user)=>{
      if(user !== null){
        setUser(user)
        user.getIdToken().then(idToken =>{
          sessionStorage.setItem(TOKEN_KEY, idToken)
        })
        console.log('User\'s state changed: Signed In')
      }
      else {
        setUser(false)
        sessionStorage.removeItem(TOKEN_KEY);
        console.log('User\'s state changed: Signed Out')
      }
    });


    return ()=> unsubscribe()
  },[])


  return (
    <AuthContext.Provider value={user}>
      <div className='w-full max-w-6xl mx-auto flex flex-col h-full px-3'>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
