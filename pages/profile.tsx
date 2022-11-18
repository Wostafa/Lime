import { Main, Loading } from '../components/elements';
import Head from 'next/head';
import { useContext } from 'react';
import Editor from '../components/editor/editor';
import { AuthContext } from '../lib/contexts';
import { Login, Logout } from '../components/auth';

export default function Profile() {
  const user = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Main>
        {user === null && <Loading />}
        {user === false && <Login />}
        {user && (
          <div className='w-full flex flex-col'>
            <div className='self-end'>
              <Logout />
            </div>
            <Editor />
          </div>
        )}
      </Main>
    </>
  );
}

// export function getServerSideProps(){

//   return{
//     props: {}
//   }
// }
