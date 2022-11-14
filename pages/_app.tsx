import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer';
import '../lib/firebase'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col h-full'>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
