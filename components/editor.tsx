import React, { useEffect, useState, useRef } from 'react';
import { Button } from './elements';
import { Loader } from 'react-feather';
const EditorID = 'editorjs';

const saveToStorage = (data: {}) => {
  console.log(data);
  window.localStorage.setItem('editor-data', JSON.stringify(data));
};
const getFromStorage = () => {
  return JSON.parse(String(window.localStorage.getItem('editor-data')));
};

export default function Editor() {
  /* using ref instead of state because editor.js is not init immediately and during
   development useState is called twice and state reset every time */
  const editorInstance = useRef<any>();
  const isLoading = useRef<boolean>(false);
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState('');
  /* use ref to keep title updated for saving, because
   saving process can't get latest state of title in useEffect */
  const titleRef = useRef('');
  const editorDomRef = useRef<HTMLDivElement>(null);

  const publishHandler = async () => {
    const data = await editorInstance.current.saver.save();
    if(!title || data.blocks.length === 0){
      alert('title or content is empty')
      return
    }
    console.log(data);
  };

  const titleHandler: React.ChangeEventHandler<HTMLInputElement> = e => {
    setTitle(e.target.value);
    titleRef.current = e.target.value;
  };

  useEffect(() => {
    console.log('use');
    console.log('isLoading: ', isLoading.current);
    // to avoid adding twice editorjs dom
    if (!isLoading.current) {
      console.log('isLoading is not set: ', isLoading.current);
      if (!editorInstance.current) {
        (async () => {
          isLoading.current = true;
          const EditorJS = (await import('@editorjs/editorjs')).default;
          const Header = (await import('@editorjs/header')).default;
          const Image = (await import('@editorjs/image')).default;

          const savedData = getFromStorage();
          if (savedData) {
            setTitle(savedData.title);
            titleRef.current = savedData.title;
          }

          const editor = new EditorJS({
            holder: EditorID,
            data: savedData ? savedData.data : null,
            placeholder: 'Write something',
            tools: {
              header: Header,
              image: {
                class: Image,
                config: {
                  endpoints: {
                    byFile: 'http://localhost:3000/api/upload', // Your backend file uploader endpoint
                  },
                },
              },
            },
            onReady: () => {
              editorInstance.current = editor;
              isLoading.current = false;
              console.log('onReady: ', editor);
              setIsReady(true);
            },
            onChange: ()=> {},
          });
        })();
      }
    }
    return () => {

      (async () => {
        if (!editorInstance.current || !editorInstance.current.saver) return;
        const data = await editorInstance.current.saver.save();
        saveToStorage({
          title: titleRef.current,
          data,
        });
        editorInstance.current.destroy();
        console.log('destroy');
      })();
    };
  }, []);

  return (
    <>
      {!isReady && <Loader color='#26B093' size={32} className='animate-spin-slow mx-auto' />}

      <div className={`${isReady ? 'block' : 'hidden'}`}>
        <label htmlFor='title'>Title:</label>
        <input
          value={title}
          onChange={titleHandler}
          type='text'
          id='title'
          className='rounded-2xl border-gray-200 border-2 p-3 outline-1 outline-gray-500 max-w-xs mt-2 block'
        />
        <div className='rounded-2xl p-9 bg-[#eef5fa] mt-5'>
        <div ref={editorDomRef} className='rounded-lg shadow-md bg-white py-2' id={EditorID}></div>
        {/* <div ref={editorDomRef} className='border-2 border-gray-200 rounded-md mt-4 py-2 focus-within:border-gray-500' id={EditorID}></div> */}
        </div>
        <Button className='bg-lime-500 w-fit' onClick={publishHandler}>
          Publish
        </Button>
      </div>
    </>
  );
}
