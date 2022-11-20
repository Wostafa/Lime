import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  GetServerSidePropsContext,
  PreviewData,
  InferGetServerSidePropsType,
  GetStaticPropsContext,
} from 'next';
import Sidebar from '../../components/sidebar';
import Comments from '../../components/comments';
import { Article, Main, Loading, Wrapper } from '../../components/elements';
import PostCard from '../../components/post-card';
import { Capitalize } from '../../lib/utils';
import { doc, getDoc, getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { ParsedUrlQuery } from 'querystring';
import { PostStored, UserInfo } from '../../constants';
import Parser from '../../lib/editorjs-parser';

const db = getFirestore();

const images = ['f1', 'f2'];
const fakeTitle = `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
//
export default function Post({ data, title, user }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();
  let Content = <></>;
  if (!router.isFallback) {
    const parsedData = Parser(data.blocks, data.time);
    Content = <article className='post'>{parsedData}</article>;
  } else {
    Content = <Loading />;
  }
  return (
    <>
      <Head>
        <title>{router.isFallback ? 'Loading...' : Capitalize(title)}</title>
      </Head>
      <Wrapper>
        <Main>{Content}</Main>
        <Sidebar>
          <div className='flex flex-col gap-5'>
            {/* {images.map((image, index) => (
              <PostCard key={index} link='' image={`/temp-images/${image}.jpg`} title={fakeTitle} />
            ))} */}
          </div>
        </Sidebar>
      </Wrapper>
    </>
  );
}

// ----------------
export const getStaticPaths: GetStaticPaths = async params => {
  console.log('static path params: ', params);
  const postSlugs = await getPostSlugs();
  console.log('postIds: ', postSlugs);
  return {
    paths: postSlugs,
    fallback: true,
  };
};

// ---------------
type Context = GetStaticPropsContext<{ id: string }, { postId: string }>;

export const getStaticProps = async (context: Context) => {
  console.log('context: ', context);

  let postData;
  try {
    if (context.previewData && context.previewData.postId) {
      postData = await getPreviewPost(context.previewData.postId);
      console.log('postData preview: ', postData);

    } else if (context.params) {
      postData = await getRealPost(context.params.id);
      console.log('postData real: ', postData);
    }
  } catch (e:any) {
    console.log('failed to load post: ', e.message);
    return {
      notFound: true,
    };
  }

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: postData.post.title,
      data: postData?.post.data,
      user: postData?.user,
    },
  };
};

// ------------------
async function getPreviewPost(postId: string) {
  const docRef = doc(db, 'previews', postId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('post does not exist');
  }
  return docSnap.data() as PostStored;
}

// ------------------
async function getRealPost(slug: string) {
  const _query = query(collection(db, 'posts'), where('slug', '==', slug));
  const querySnapshot = await getDocs(_query);
  if (querySnapshot.size > 1) throw new Error('duplicated posts');
  if(querySnapshot.empty) throw new Error('post does not exist');
  return querySnapshot.docs[0].data() as PostStored;
}

// -------------------

interface PostSlugs {
  params: {
    id: string;
  };
}

async function getPostSlugs() {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const postIds: PostSlugs[] = [];
  querySnapshot.forEach(doc => {
    const data = doc.data() as PostStored;
    postIds.push({
      params: {
        id: data.slug,
      },
    });
  });
  return postIds;
}
