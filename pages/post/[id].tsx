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
import { doc, getDoc, getFirestore } from 'firebase/firestore';
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

export const getStaticPaths: GetStaticPaths = params => {
  console.log('static path params: ', params);
  return {
    paths: [
      // {
      //   params: {
      //     id: 'abc',
      //   },
      // },
    ],
    fallback: true,
  };
};

type Context = GetStaticPropsContext<ParsedUrlQuery, { postId: string }>;

export const getStaticProps = async (context: Context) => {
  console.log('context: ', context);

  let postData;
  try {
    if (context.previewData && context.previewData.postId) {
      postData = await getPost(context.previewData.postId, 'previews');
      console.log('postData: ', postData);
    }
  } catch (e) {
    console.log('failed to load post: ', e);
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

async function getPost(postId: string, collection:string) {
  const docRef = doc(db, collection, postId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('post does not exist');
  }
  return docSnap.data() as PostStored;
}
