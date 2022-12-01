import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Sidebar from '../../components/sidebar';
import Comments from '../../components/comments';
import { Main, Loading, Wrapper } from '../../components/elements';
import { Capitalize } from '../../lib/utils';
import { doc, getDoc, getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import { PostStored } from '../../constants';
import Parser from '../../lib/editorjs-parser';

const db = getFirestore();

export default function Post({ data, title, user, id }: InferGetStaticPropsType<typeof getStaticProps>) {
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
      <Wrapper className='lg:flex-col sm:-mx-3'>
        {router.isPreview && (
          <h5 data-test='preview-bar' className='fixed top-0 right-0 left-0 bg-orange-500 text-white font-medium py-2 text-center z-40'>
            Preview
          </h5>
        )}
        <Main className='md:px-5 md:py-8'>{Content}</Main>
        <Sidebar>
        </Sidebar>
      </Wrapper>
      {!router.isPreview && <Comments id={id as string} />}
    </>
  );
}

// ----------------
export const getStaticPaths: GetStaticPaths = async params => {
  console.log('::> static path params: ', params);
  const postSlugs = await getPostSlugs();
  return {
    paths: postSlugs,
    fallback: true,
  };
};

// ---------------
type Context = GetStaticPropsContext<{ id: string }, { postId: string }>;

export const getStaticProps = async (context: Context) => {
  console.log('::> params.id: ', context.params?.id);

  let postData;
  try {
    if (context.previewData && context.previewData.postId) {
      postData = await getPreviewPost(context.previewData.postId);
      console.log('::> postData preview');
    } else if (context.params) {
      postData = await getRealPost(context.params.id);
    }
  } catch (e: any) {
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
      id: postData.id ? postData.id : null // just for loading comments, unnecessary for preview
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
  if (querySnapshot.empty) throw new Error('post does not exist');
  return {
    id: querySnapshot.docs[0].id, // id for loading comments
    ...(querySnapshot.docs[0].data() as PostStored),
  };
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
