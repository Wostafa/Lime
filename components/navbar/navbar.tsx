import { menuItems, blogName } from '../../constants';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='flex gap-2 h-20 justify-between items-center mb-16'>
      <h1 className='text-green text-6xl font-bold'>{blogName}</h1>

      <div className='w-3/5'>
        <ul className='flex gap-16 capitalize pl-14 bg-green text-white rounded-full py-4 border-t-4 border-crayola'>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link href={item.path} className='block px-4 py-2 rounded-2xl hover:bg-emerald-600 transition-colors'>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
