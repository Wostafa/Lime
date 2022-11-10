import { Twitter, Instagram, Facebook, Linkedin, Icon } from 'react-feather';
import { blogName } from '../constants';

export default function Footer() {
  return (
    <footer className='w-full mt-auto px-2 pt-4 pb-8'>
      <div className='flex gap-3 text-slate-600'>
        <SocialIcons />
        <Tags />
        <About />
      </div>
      <Copyright />
    </footer>
  );
}

const SocialIcons = () => {
  const Social = ({ Icon, link }: { Icon: Icon; link: string }) => (
    <div className='relative w-16 h-16 isolate hover:opacity-70'>
      <a href={link} className='flex items-center justify-center bg-green rounded-full h-full w-full'>
        <Icon color='white' size='34' />
      </a>
      <div className='absolute top-1 left-1 bg-gradient-to-b from-[#26B093] to-[#1f8d755b] h-full w-full -z-10 rounded-full'></div>
    </div>
  );
  return (
    <div className='flex-1'>
      <h5 className='font-bold'>Follow us on social media</h5>
      <div className='flex gap-3 mt-4'>
        <Social Icon={Twitter} link='#' />
        <Social Icon={Instagram} link='#' />
        <Social Icon={Facebook} link='#' />
        <Social Icon={Linkedin} link='#' />
      </div>
    </div>
  );
};

const Tags = () => {
  const tempTags = ['review', 'movies', 'games', 'news', 'video', 'music'];
  const tags = tempTags.map((tag, index) => (
    <div className='relative h-fit w-fit isolate hover:opacity-70' key={index}>
      <a
        href='#'
        className='flex items-center justify-center text-black bg-crayola rounded-2xl h-full w-full capitalize px-3 py-2'
      >
        {tag}
      </a>
      <div className='absolute top-1 left-1 bg-crayola-dark h-full w-full -z-10 rounded-2xl'></div>
    </div>
  ));

  return (
    <div className='flex-1'>
      <h5 className='font-bold'>Explore more</h5>
      <div className='flex gap-3 mt-4 flex-wrap'>{tags}</div>
    </div>
  );
};

const About = () => {
  return (
    <div className='flex-1'>
      <h5 className='font-bold capitalize'>about {blogName}</h5>
      <p className='mt-4'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.
      </p>
    </div>
  );
};

const Copyright = () => (
  <div className='w-full rounded-2xl bg-white px-5 py-5 text-slate-400 mt-8 text-sm'>2022- All Rights Reserved</div>
);
