import Head from 'next/head'
import { blogName } from '../constants'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className='w-full max-w-6xl mx-auto flex flex-col h-full'>
      <Head>
        <title>{blogName}</title>
        <meta name="description" content="Entertainment blog" />
        <link type='image/png' rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <Footer/>
    </div>
  )
}
