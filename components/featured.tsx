import Image from 'next/image';
import Link from 'next/link';

export default function Featured() {
  return (
    <div className='w-full grid grid-cols-[repeat(40,_1fr)] gap-6'>
      <Card />
    </div>
  );
}

const Card = () => {
  const images = ['f1', 'f2', 'f3', 'f4'];
  const colorsGradient = ['from-emerald-400', 'from-sky-400', 'from-rose-400', 'from-purple-400'];
  const colorsBorder = ['border-emerald-400', 'border-sky-400', 'border-rose-400', 'border-purple-400'];
  const card = images.map((image, index) => (
    <Link
      href='#'
      className={`block group relative rounded-2xl overflow-hidden ${colorsBorder[index]} border-r-4 border-b-4 h-72 col-[span_19_/_span_19] first:col-[span_21_/_span_21] last:col-[span_21_/_span_21]`}
      key={index}
    >
      <Image src={`/temp-images/${image}.jpg`} alt='' fill className='object-cover absolute left-0 top-0' />
      <div
        className={`bg-gradient-to-t ${colorsGradient[index]} absolute left-0 top-0 right-0 bottom-0 opacity-70 group-hover:opacity-0 transition-opacity duration-200`}
      ></div>
      <p className='capitalize text-white absolute left-0 bottom-0 m-4 font-bold text-lg'>
        but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </Link>
  ));
  return <>{card}</>;
};
