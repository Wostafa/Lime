import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  link: string;
  image: string;
}

export default function PostCard({ title, link, image }: CardProps) {
  return (
    <>
      <Link
        href={link}
        className='block h-[400px] relative rounded-2xl overflow-hidden group border-r-4 border-b-4 odd:border-fuchsia-400 even:border-teal-400'
      >
        <Image src={image} alt='' fill className='object-cover group-hover:scale-110 transition-transform' />
        <div
          className='bg-white absolute bottom-0 left-0 h-fit max-h-72 overflow-hidden rounded-t-2xl'
        >
          <p className='capitalize text-lg font-semibold m-4'>{title}</p>
        </div>
      </Link>
    </>
  );
}
