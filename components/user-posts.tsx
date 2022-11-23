import { useEffect, useState, MouseEventHandler } from 'react';
import { getAuth } from 'firebase/auth';
import { query, deleteDoc, getDocs, getFirestore, collection, where, doc, orderBy } from 'firebase/firestore';
import { PostStored } from '../constants';
import { Trash } from 'react-feather';
import { notify, Loading } from './elements';
import { TOKEN_KEY } from '../constants';

interface Post {
  title: string;
  link: string;
  uid: string;
  slug: string;
}

const db = getFirestore();

export default function UserPosts() {
  const [isLoading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  // to trigger useEffect to rerun and update user's post
  const [postsUpdated, setPostsUpdated] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const uid = getAuth().currentUser?.uid;
      const _query = query(collection(db, 'posts'), where('user.uid', '==', uid), orderBy('post.data.time', 'desc'));
      const querySnapshot = await getDocs(_query);
      const postsArray: Post[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data() as PostStored;
        postsArray.push({
          title: data.post.title,
          link: `/post/${data.slug}`,
          uid: doc.id,
          slug: data.slug,
        });
      });
      setPosts(postsArray);
      setLoading(false);
    })().catch(e => {
      console.log("failed to load user's posts :", e);
      setLoading(false);
    });
  }, [postsUpdated]);

  const handlerDelete: MouseEventHandler<HTMLButtonElement> = async e => {
    const uid = e.currentTarget.dataset.uid;
    const slug = e.currentTarget.dataset.slug;
    const deleting = notify.loading('Deleting post...');
    if (uid && slug) {
      try {
        await deleteDoc(doc(db, 'posts', uid));
        await revalidatePost(slug);
        notify.dismiss(deleting);
        notify.success('Post removed');
        setPostsUpdated(Date.now());
      } catch (e) {
        notify.dismiss(deleting);
        console.log('failed to delete post: ', e);
        notify.error('Failed to delete post!');
      }
    }
  };

  return (
    <div className='bg-white h-fit min-h-[200px] w-full p-4'>
      <h3 className='mb-4 text-center font-bold'>Your Posts</h3>
      {posts.length > 0 && <PostList {...{ posts, handlerDelete }} />}
      {posts.length === 0 && isLoading && <Loading />}
      {posts.length === 0 && !isLoading && <h5 className='text-gray-500 text-center'>You have no posts</h5>}
    </div>
  );
}

const PostList = ({ posts, handlerDelete }: { posts: Post[]; handlerDelete: MouseEventHandler }) => (
  <ul className='space-y-2 font-semibold text-sm'>
    {posts.map((post, index) => (
      <li key={index} className='relative bg-gray-100 rounded-md p-2 text-gray-700 hover:text-blue-600 lg:p-4'>
        <a href={post.link} className='block' target='blank'>
          {post.title}
        </a>
        <button
          data-uid={post.uid}
          data-slug={post.slug}
          onClick={handlerDelete}
          title='Delete post'
          className='w-fit p-1 rounded-md absolute right-1 top-1 bg-white opacity-50 hover:opacity-100 lg:p-2'
        >
          <Trash size={20} color='#F54A73' />
          <span className='sr-only'>delete post</span>
        </button>
      </li>
    ))}
  </ul>
);

const revalidatePost = async (slug: string) => {
  const res = await fetch(`/api/revalidate?path=/post/${slug}`, {
    headers: {
      authorization: window.sessionStorage.getItem(TOKEN_KEY) || '',
    },
  });
  if (res.ok) return true;
  throw new Error('failed to revalidate post');
};
