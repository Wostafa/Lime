
import { GetServerSideProps, GetStaticPaths, GetStaticProps, GetServerSidePropsContext, PreviewData, InferGetServerSidePropsType, GetStaticPropsContext } from 'next';

export default function Post(dataMe: InferGetServerSidePropsType<typeof getStaticProps>) {
  console.log('render: ', dataMe)
  return (<div></div>
  );
}

export const getStaticPaths:GetStaticPaths= (params)=> {
  console.log('static path params: ', params)
  return {
    paths: [
      {
        params: {
          slug: 'lskdflsklf',
        },
      },
    ],
    fallback: true,

  };
}

export const getStaticProps:GetStaticProps = async(staticData) => {
  console.log('context: ', staticData)
  return {
    props:{
      data: staticData.previewData
    }
  }
}
