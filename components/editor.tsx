import React, { useEffect, useState, useRef } from 'react';
import { Button, Loading, notify } from './elements';
import { TOKEN_KEY } from '../constants';

const EDITOR_ID = 'editorjs';
const EDITOR_DATA = 'editor-data';

const saveToStorage = (data: {}) => {
  window.localStorage.setItem(EDITOR_DATA, JSON.stringify(data));
};
const getFromStorage = () => {
  return JSON.parse(String(window.localStorage.getItem(EDITOR_DATA)));
};

export default function Editor() {
  /* editorjs's destroy() does not remove the editor dom from its parent,
  so you have to use ref to memorize that editor is set up during rerenders,
  specially in development because rect call useEffects twice */
  const editorInstance = useRef<any>();
  const isLoading = useRef<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState('');
  const [draftSaved, setDraftSaved] = useState('');
  const editorDomRef = useRef<HTMLDivElement>(null);

  const publishHandler = async () => {
    const data = await editorInstance.current.saver.save();
    if (!title || data.blocks.length === 0) {
      alert('title or content is empty');
      return;
    }
    const body = {
      title,
      data,
    };
    try {
      const sending = notify.show.loading('Sending...', notify.default)
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           authorization: sessionStorage.getItem(TOKEN_KEY) || ''
        },
        body: JSON.stringify(body),
      });
      notify.hide(sending);
      if (!res.ok) {
        throw new Error('Failed to publish the post');
      }
      const json = await res.json();
      console.log('Post published', json);
      notify.show.success('Post successfully published', notify.default)

    } catch (e) {
      notify.show.error('Failed to publish post', notify.default)
      console.error('Network Error: ', e);
    }
  };
  const draftHandler = async () => {
    const data = await editorInstance.current.saver.save();
    saveToStorage({
      title,
      data,
    });
    setDraftSaved('Saved!');
    setTimeout(() => setDraftSaved(''), 2000);
  };

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

          const savedData = getFromStorage();
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
        <div className='rounded-2xl p-9 bg-[#eef5fa] mt-5'>
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
          <div className='text-slate-500 font-semibold'>{draftSaved}</div>
        </div>
      </div>
      <notify.Loader/>
    </>
  );
}
