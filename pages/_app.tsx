import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import '../lib/firebase';
import { useState, useEffect } from 'react';
import { AuthContext } from '../lib/contexts';
import  {onAuthStateChanged, getAuth, User} from 'firebase/auth'

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(getAuth(), (user)=>{
      if(user !== null){
        setUser(user)
        console.log('User\'s state changed: Signed In')
      }
      else {
        setUser(null)
        console.log('User\'s state changed: Signed Out')
      }
    }) 
    return ()=> unsubscribe()
  },[])


  return (
    <AuthContext.Provider value={user}>
      <div className='w-full max-w-6xl mx-auto flex flex-col h-full'>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
