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
      <Wrapper>
        <Main>
          {user === null && <Loading />}
          {user === false && <Login />}
          {user && (
            <div className='w-auto flex flex-col -m-16'>
              <div className='self-end'>
                <Logout />
              </div>
              <Editor />
            </div>
          )}
        </Main>
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
