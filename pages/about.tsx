import { Article, Main } from '../components/elements';
import Head from 'next/head';

interface PostData {
  title: string;
  data: string;
}

export default function About({ data, title }: PostData) {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <Main>
        <Article props={{ title, data }} />
      </Main>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      title: 'about us',
      data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
  };
}
