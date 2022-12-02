import { Loading, Wrapper } from '../components/elements';
import Head from 'next/head';
import Image from 'next/image';
import { useContext } from 'react';
import Editor from '../components/editor/editor';
import { AuthContext } from '../lib/contexts';
import { Login, Logout } from '../components/auth';
import Sidebar from '../components/sidebar';
import UserPosts from '../components/user-posts';
import { User } from 'firebase/auth';

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
                <ProfileHeader user={user} />
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

function ProfileHeader({ user }: { user: User }) {
  return (
    <div className='flex justify-between mb-8'>
      <h3 className='mb-4 font-bold'>Write New Post</h3>
      <div className='flex gap-3 sm:flex-col'>
        <div className='flex gap-3 items-center'>
          <span>{user.displayName}</span>
          <div className='h-10 w-10'>
            {user.photoURL && (
              <Image
                className='w-full h-auto rounded-full'
                src={user.photoURL}
                width={96}
                height={96}
                title={user.email || ''}
                alt='user profile'
              />
            )}
          </div>
        </div>
        <Logout />
      </div>
    </div>
  );
}
