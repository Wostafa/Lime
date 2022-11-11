import PostCard from './post-card';

export default function RecentPosts() {
  const images = ['f1', 'f2', 'f3', 'f4'];
  const title = `It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
  return (
    <div className='grid grid-cols-3 w-full gap-6 mt-9'>
      {images.map((image, index) => (
        <PostCard key={index} link='' image={`/temp-images/${image}.jpg`} title={title} />
      ))}
    </div>
  );
}
