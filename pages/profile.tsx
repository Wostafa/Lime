import { Main } from '../components/elements';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Editor from '../components/editor';
// const EditorJS = dynamic(()=> import('@editorjs/editorjs'), {ssr: false})


export default function Profile() {

  // const [editor, setEditor] = useState<any>(null)
  // if(typeof window !== 'undefined'){
    // const editor = new EditorJS({
    //   holder: 'editorjs'
    // });
    // console.log(editor)
  // } 
  // useEffect(()=>{
  //   if(editor !== null) return 
  //   console.log(editor);

  //   (async function(){
  //     const EditorJS = (await import('@editorjs/editorjs')).default
  //     const _editor = new EditorJS({
  //       holder: 'editorjs'
  //     });
  //     setEditor(_editor)

  //   })()
  // },[editor])

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Main>
        {/* <div id='editorjs' className='w-full border-2 border-sky-500'></div> */}
        <div className='w-full'><Editor/></div>
        {/* <div className='w-full border-2 border-sky-500'><EditorB/></div> */}
      </Main>
    </>
  );
}

// export function getServerSideProps(){

//   return{
//     props: {}
//   }
// }
