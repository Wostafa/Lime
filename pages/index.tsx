import Head from 'next/head';
import { blogName, PostStored,CardProps } from '../constants';
import Featured from '../components/featured';
import RecentPosts from '../components/recent-posts';
import { getFirestore, collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const db = getFirestore();

export default function Home({cardsData}:InferGetStaticPropsType<typeof getStaticProps>) {
  // for demo featured posts and recent posts are the same type
  const featuredData = cardsData.slice(0,4)
  const recentData = cardsData.slice(4,8)
  return (
    <>
      <Head>
        <title>{blogName}</title>
      </Head>
      <Featured featuredData={featuredData}/>
      <RecentPosts recentData={recentData} />
    </>
  );
}

export const getStaticProps:GetStaticProps = async() =>{
  const _query = query(collection(db, 'posts'), limit(8), orderBy('post.data.time', 'desc'))
  const querySnapshot = await getDocs(_query);
  const postsArray: CardProps[] = []
  querySnapshot.forEach(doc=>{
    const postData = doc.data() as PostStored;
    const image = postData.post.data.blocks.find((block:any) => block.type === 'image') as any;
    postsArray.push({
      slug: postData.slug,
      title: postData.post.title,
      image: image?.data.file.url || null
    })
  })

  return {
    props:{
      cardsData: postsArray
    },
    revalidate: 60
  }
}