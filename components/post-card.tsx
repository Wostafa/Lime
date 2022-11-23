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
        <div className='h-2/3 relative'>
          {/* TODO: edit sizes */}
        <Image src={image} alt='' fill className='object-cover group-hover:scale-110 transition-transform' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <div
          className='absolute bg-white bottom-0 h-fit min-h-[40%] max-h-[50%] overflow-hidden rounded-t-2xl w-full'
        >
          <p className='capitalize text-lg font-semibold m-4'>{title}</p>
        </div>
      </Link>
    </>
  );
}
