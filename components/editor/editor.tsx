import React, { useEffect, useState, useRef } from 'react';
import { Button, Loading, notify } from '../elements';
import { TOKEN_KEY } from '../../constants';
import * as handlers from './handlers';
import { useRouter } from 'next/router';

const EDITOR_ID = 'editorjs';

export default function Editor() {
  /* editorjs's destroy() does not remove the editor dom from its parent,
  so you have to use ref to memorize that editor is set up during rerenders,
  specially in development because rect call useEffects twice */
  const editorInstance = useRef<any>();
  const isLoading = useRef<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState('');
  const editorDomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  

  const publishHandler = () => handlers.publishHandler(editorInstance, title, false, router)
  const draftHandler = () => handlers.draftHandler(editorInstance, title)
  const previewHandler = () => handlers.publishHandler(editorInstance, title, true)

  const titleHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    // to avoid adding twice editorjs dom
    if (!isLoading.current) {
      if (!editorInstance.current) {
        (async () => {
          isLoading.current = true;
          const EditorJS = (await import('@editorjs/editorjs')).default;
          const Header = (await import('@editorjs/header')).default;
          const Image = (await import('@editorjs/image')).default;

          const savedData = handlers.getFromStorage();
          if (savedData) {
            setTitle(savedData.title);
          }

          const editor = new EditorJS({
            holder: EDITOR_ID,
            data: savedData ? savedData.data : null,
            placeholder: 'Write something',
            tools: {
              header: Header,
              image: {
                class: Image,
                config: {
                  endpoints: {
                    byFile: '/api/upload',
                  },
                  additionalRequestHeaders: {
                    authorization: sessionStorage.getItem(TOKEN_KEY)
                  }
                },
              },
            },
            onReady: () => {
              editorInstance.current = editor;
              isLoading.current = false;
              setIsReady(true);
            },
            onChange: () => {},
          });
        })();
      }
    }
    return () => {
      if (!editorInstance.current || !editorInstance.current.saver) return;
      editorInstance.current.destroy();
      editorInstance.current = null;
    };
  }, []);

  return (
    <>
      {!isReady && <Loading />}

      <div className={`${isReady ? 'block' : 'hidden'}`}>
        <label htmlFor='title'>Title:</label>
        <input
          value={title}
          onChange={titleHandler}
          type='text'
          id='title'
          className='rounded-2xl border-gray-200 border-2 p-3 outline-1 outline-gray-500 max-w-md w-full mt-2 block'
        />
        <div className='rounded-2xl p-4 bg-[#eef5fa] mt-5'>
          <div
            ref={editorDomRef}
            className='rounded-lg shadow-md bg-white py-2 opacity-80 focus-within:opacity-100'
            id={EDITOR_ID}
          ></div>
        </div>
        <div className='flex gap-5 items-baseline mt-5'>
          <Button className='bg-lime-500 w-fit' onClick={publishHandler}>
            Publish
          </Button>
          <Button className='bg-cyan-500 w-fit' onClick={draftHandler}>
            Save Draft
          </Button>
          <Button className='bg-amber-500 w-fit' onClick={previewHandler}>
            Preview
          </Button>
        </div>
      </div>
      <notify.Loader/>
    </>
  );
}
