export default function Comments() {
  return (
    <div className='mt-12 rounded-2xl w-full p-4 bg-black10'>
      <button className='py-4 w-full bg-green text-white hover:ring-1 transition-shadow rounded-2xl font-bold'>
        Show Comments
      </button>
      <WriteComment/>
      <CommentsList/>
    </div>
  );
}

const WriteComment = () => (
  <div className=''>
    <textarea className='w-full h-80 bg-white p-3 rounded-2xl resize-none focus:outline-1 focus:outline-slate-300' />
    <button className='py-3 px-9 bg-pink text-white hover:ring-1 transition-shadow rounded-2xl font-bold mt-5'>
      Send
    </button>
  </div>
);

const CommentsList = ()=>(
  <ul>
    <li className='bg-white rounded-2xl py-5 px-6 mb-3 last:mb-0'>
      <h5 className='font-semibold'>Jack</h5>
      <p className='mt-3'>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Why do we use it?</p>
    </li>
  </ul>
)
