import Head from 'next/head';
import { blogName } from '../constants';
import Featured from '../components/featured';
import RecentPosts from '../components/recent-posts';

export default function Home() {
  return (
    <>
      <Head>
        <title>{blogName}</title>
      </Head>
      <Featured />
      <RecentPosts />
    </>
  );
}
