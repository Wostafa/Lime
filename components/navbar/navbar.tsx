import { menuItems, blogName } from '../../constants';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex gap-2 h-20 justify-between items-center mb-16'>
      <h1 className='text-green text-6xl font-bold'>{blogName}</h1>

      <div className='relative w-3/5 isolate'>
        <ul className='flex gap-16 capitalize pl-14 bg-green text-white rounded-l-full'>
          {menuItems.map((item, index) => (
            <li key={index} className='my-7'>
              <Link href={`/${item}`}>{item}</Link>
            </li>
          ))}
        </ul>
        <div className='bg-crayola h-full absolute rounded-l-full -top-1 w-full -z-50'></div>
      </div>
    </div>
  );
}
