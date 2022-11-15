import { Main } from '../components/elements';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Editor from '../components/editor';


export default function Profile() {

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Main>
        <div className='w-full'><Editor/></div>
      </Main>
    </>
  );
}

// export function getServerSideProps(){

//   return{
//     props: {}
//   }
// }
