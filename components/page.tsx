import { Wrapper, Main, Article } from './elements';
import Sidebar from './sidebar';
import Head from 'next/head';
import { ReactNode } from 'react';
import { Capitalize } from '../lib/utils';

interface PageProps {
  title: string;
  data: string;
  sidebar?: ReactNode;
}

export default function Page({ title, data, sidebar }: PageProps) {
  return (
    <>
      <Head>
        <title>{Capitalize(title)}</title>
      </Head>
      <Wrapper className='lg:flex-col sm:-mx-3'>
        <Main>
          <Article props={{ title, data }} />
        </Main>
        <Sidebar>{sidebar}</Sidebar>
      </Wrapper>
    </>
  );
}
