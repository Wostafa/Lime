import { Main, Loading, Wrapper } from '../components/elements';
import Head from 'next/head';
import { useContext } from 'react';
import Editor from '../components/editor/editor';
import { AuthContext } from '../lib/contexts';
import { Login, Logout } from '../components/auth';
import Sidebar from '../components/sidebar';
import UserPosts from '../components/user-posts';

export default function Profile() {
  const user = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Wrapper className='lg:flex-col sm:-mx-3'>
        <main className='flex-[2.7_1_0%] bg-white rounded-2xl lg:flex-none'>
          <div className='p-4'>
          {user === null && <Loading />}
          {user === false && <Login />}
          {user && (
            <div className='w-auto flex flex-col'>
              <div className='flex justify-between'>
                <h3 className='mb-4 font-bold'>Write New Post</h3>
                <Logout />
              </div>
              <Editor />
            </div>
          )}
          </div>
        </main>
        <Sidebar>{user && <UserPosts />}</Sidebar>
      </Wrapper>
    </>
  );
}

// export function getServerSideProps(){

//   return{
//     props: {}
//   }
// }
