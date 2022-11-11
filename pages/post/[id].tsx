import Head from 'next/head';
import Sidebar from '../../components/sidebar';
import Comments from '../../components/comments';
import { Article, Main } from '../../components/elements';
import PostCard from '../../components/post-card';

interface PostData {
  title: string;
  data: string;
}

const images = ['f1', 'f2'];
const fakeTitle = `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

export default function Post({ data, title }: PostData) {
  return (
    <>
      <Head>
        <title>{title.toUpperCase()}</title>
      </Head>
      <div className='flex gap-4'>
        <Main>
          <Article props={{ title, data }} />
          <Comments />
        </Main>
        <Sidebar className='flex-1'>
          <div className='flex flex-col gap-5'>
            {images.map((image, index) => (
              <PostCard key={index} link='' image={`/temp-images/${image}.jpg`} title={fakeTitle} />
            ))}
          </div>
        </Sidebar>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          id: 'abc',
        },
      },
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      title: 'mario review',
      data: `is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
    },
  };
}
