import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(){
  return(
    <Html>
      <Head>
      <meta name="description" content="Entertainment blog" />
      <link type='image/png' rel="icon" href="/favicon.png" />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=optional" rel="stylesheet"/>
      </Head>
        <body>
          <Main />
          <NextScript />
        </body>
    </Html>
  )
}