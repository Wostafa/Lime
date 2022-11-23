import PostCard from './post-card';
import { CardProps } from '../constants';

export default function RecentPosts({recentData}:{recentData: CardProps[]}) {
  return (
    <div className='grid grid-cols-4 w-full gap-6 mt-9 md:grid-cols-2 lg:gap-3'>
      {recentData.map((data, index) => (
        <PostCard key={index} link={`/post/${data.slug}`} image={data.image} title={data.title} />
      ))}
    </div>
  );
}
