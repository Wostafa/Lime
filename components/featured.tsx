import Image from 'next/image';
import Link from 'next/link';
import { CardProps } from '../constants';

export default function Featured({featuredData}:{featuredData: CardProps[]}) {
  return (
    <div className='w-full grid grid-cols-[repeat(40,_1fr)] gap-6 lg:gap-4 md:gap-3'>
      <Card featuredData={featuredData}/>
    </div>
  );
}

const Card = ({featuredData}:{featuredData: CardProps[]}) => {
  const colorsGradient = ['from-emerald-400', 'from-sky-400', 'from-rose-400', 'from-purple-400'];
  const colorsBorder = ['border-emerald-400', 'border-sky-400', 'border-rose-400', 'border-purple-400'];
  const card = featuredData.map((data, index) => (
    <Link
      href={`/post/${data.slug}`}
      className={`block group relative rounded-2xl overflow-hidden ${colorsBorder[index]} border-r-4 border-b-4 h-72 col-[span_19_/_span_19] first:col-[span_21_/_span_21] last:col-[span_21_/_span_21]`}
      key={index}
    >
      {/* TODO: edit sizes */}
      <Image src={data.image} alt='' fill className='object-cover absolute left-0 top-0' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      <div
        className={`bg-gradient-to-t ${colorsGradient[index]} absolute left-0 top-0 right-0 bottom-0 opacity-70 group-hover:opacity-0 transition-opacity duration-200`}
      ></div>
      <p className='capitalize text-white absolute left-0 bottom-0 m-4 font-bold text-lg'>{data.title}</p>
    </Link>
  ));
  return <>{card}</>;
};
