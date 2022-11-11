import Link from 'next/link';
import Image from 'next/image';

export default function RecentPosts() {
  const images = ['f1', 'f2', 'f3', 'f4'];
  return (
    <div className='grid grid-cols-3 w-full gap-6 mt-9'>
      {images.map((image, index) => (
        <Link href='' className='block h-[400px] relative rounded-2xl overflow-hidden group border-r-4 border-b-4 odd:border-yellow-400 even:border-lime-400' key={index}>
          <Image src={`/temp-images/${image}.jpg`} alt='' fill className='object-cover group-hover:scale-110 transition-transform' />
          <div
            className='bg-white absolute bottom-0 left-0 h-fit max-h-72 overflow-hidden
            rounded-t-2xl'
          >
            <p className='capitalize text-lg font-semibold m-4'>
              It has survived not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged.
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
