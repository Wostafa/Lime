import React, {useEffect, useState, useRef} from 'react';
import type { OutputData } from '@editorjs/editorjs';


const Editor_ID = 'editorjs'
const InitialData = ()=>({
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "This is my awesome editor!",
        "level": 1
      }
    },
  ]
})

export default function Editor(){
  /* using ref instead of state because editor.js is not init immediate and during
   development useState is called twice and state reset every time */
 const editorInstance = useRef<any>();
//  const [isLoading, setLoading] = useState(false)
 const isLoading = useRef<boolean>()
 const [editorData, setEditorData] = useState<OutputData>(InitialData) 

  const saveHandler = async() =>{
    const data = await editorInstance.current.saver.save()
    // const p = editorInstance.current.getBlockByIndex(0);
    console.log('current:', editorInstance.current)
    console.log(data)
  }

 useEffect(()=>{
  if(isLoading.current) return 
  console.log('isLoading: ',isLoading.current)
  if(!editorInstance.current){
    console.log('editorInstance: ',editorInstance.current);

    (async()=>{
      isLoading.current = true
      const EditorJS = (await import('@editorjs/editorjs')).default
      const Header = (await import('@editorjs/header')).default
      const Image = (await import('@editorjs/image')).default
      
      const editor = new EditorJS({
        holder: Editor_ID,
        data: editorData,
        tools: { 
          header: Header,
          image: Image 
        }, 
        onReady: ()=>{
          editorInstance.current = editor
          console.log('onReady: ', editor)
        },
        onChange: async()=>{
          // const data = await editorInstance.current.saver.save()
          // setEditorData(data);
          // console.log(data);
        }
      })

    })().then(()=>{
      console.log('async: ', editorInstance)

    })
  }
  return ()=>{
    console.log('return: ', editorInstance.current)
    if(editorInstance.current?.destroy) {
      editorInstance.current.destroy()
      console.log('destroy')
    }
    console.log('not destroy')
    editorInstance.current = null
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])


 return(
  <>
  <button className='bg-orange-600 p-5' onClick={()=> saveHandler()}>Save</button>
  <div id={Editor_ID}></div>
  </>
 )

}