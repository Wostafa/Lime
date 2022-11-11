import { Article, Main } from '../components/elements';
import Head from 'next/head';

export default function About() {
  const title = 'Error 404';
  const data = 'the page was not found!';
  return (
    <>
      <Head>
        <title>Not Found</title>
      </Head>
      <Main>
        <Article props={{ title, data }} />
      </Main>
    </>
  );
}
