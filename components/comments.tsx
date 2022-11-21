import { Button, notify } from './elements';
import { ChangeEventHandler } from 'react';
import { doc, getDoc, getFirestore, arrayUnion, updateDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useContext, useState } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../lib/contexts';

interface Comment {
  uid: string;
  name: string;
  time: number;
  text: string;
}

const db = getFirestore();

export default function Comments({ id }: { id: string }) {
  const user = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [textarea, setTextarea] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handlerTextarea: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setTextarea(e.target.value);
  };
  const handlerSend: ChangeEventHandler<HTMLButtonElement> = async e => {
    if (!textarea) {
      notify.error('Comment is empty!');
      return;
    }
    const sending = notify.loading('Sending comment...');
    const docRef = doc(db, 'comments', id);
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const comment: Comment = {
        uid: currentUser?.uid,
        name: currentUser?.displayName || 'unnamed',
        time: Date.now(),
        text: textarea,
      };
      try {
        // init empty comment doc if does not exist
        const commentDoc = await getDoc(docRef);
        if (!commentDoc.exists()) {
          await setDoc(docRef, {
            comments: [],
          });
        }
        await updateDoc(docRef, {
          comments: arrayUnion(comment),
        });
        notify.dismiss(sending);
        notify.success('Comment sent');
        setTextarea('');
        await loadComments();
      } catch (e) {
        console.log('failed to send comment: ', e);
        notify.error('Sending comment failed!');
        notify.dismiss(sending);
      }
    }
  };

  const loadComments = async () => {
    setLoading(true);
    const docRef = doc(db, 'comments', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      setComments(docSnap.data().comments as Comment[]);
    } else {
      notify.error('Post has no comments');
    }
    setLoading(false);
  };
  return (
    <div className='mt-12 rounded-2xl w-full max-w-3xl p-4 bg-black10'>
      {comments.length === 0 && (
        <Button className='w-full bg-green mb-4' onClick={loadComments}>
          {isLoading ? 'Loading Comments...' : 'Show Comments'}
        </Button>
      )}
      {user && <WriteComment handlerTextArea={handlerTextarea} textareaValue={textarea} handlerSend={handlerSend} />}

      <CommentsList comments={comments} />
      <notify.Loader />
    </div>
  );
}

interface WriteCommentProps {
  handlerTextArea: ChangeEventHandler<HTMLTextAreaElement>;
  handlerSend: ChangeEventHandler<HTMLButtonElement>;
  textareaValue: string;
}

const WriteComment = ({ handlerTextArea, handlerSend, textareaValue }: WriteCommentProps) => (
  <div>
    <textarea
      onChange={handlerTextArea}
      value={textareaValue}
      className='w-full h-52 bg-white p-3 rounded-2xl resize-none focus:outline-1 focus:outline-slate-300'
    />
    <Button onClick={handlerSend} className='bg-pink mt-3'>
      Send
    </Button>
  </div>
);

const CommentsList = ({ comments }: { comments: Comment[] }) => (
  <ul className='mt-4'>
    {comments.map((comment, index) => (
      <li key={index} className='bg-gray-50 rounded-2xl py-5 px-6 mb-3 last:mb-0'>
        <h5 className='font-semibold capitalize'>{comment.name}</h5>
        <time className='mt-2 opacity-70 text-xs'>{format(comment.time, 'PPp')}</time>
        <p className='mt-3'>{comment.text}</p>
      </li>
    ))}
  </ul>
);
