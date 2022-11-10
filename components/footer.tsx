import { Twitter, Instagram, Facebook, Linkedin, Icon } from 'react-feather';
export default function Footer() {
  return (
    <footer className='w-full flex mt-auto px-2 py-4'>
      {/* social */}
      <SocialIcons />
      {/* tags */}
      <div className='flex-1'></div>
    </footer>
  );
}

function SocialIcons() {
  const Social = ({ Icon, link }: { Icon: Icon; link: string }) => (
    <div className='relative w-16 h-16 group isolate'>
      <a href={link} className='flex items-center justify-center bg-green rounded-full h-full w-full'>
        <Icon color='white' size='34' className='group-hover:opacity-70' />
      </a>
      <div className='absolute top-1 left-1 bg-gradient-to-b from-[#26B093] to-[#1f8d755b] h-full w-full -z-10 rounded-full'></div>
    </div>
  );
  return (
    <div className='flex-1'>
      <h3>Follow us on social media</h3>
      <div className='flex gap-3 mt-4'>
        <Social Icon={Twitter} link='#' />
        <Social Icon={Instagram} link='#' />
        <Social Icon={Facebook} link='#' />
        <Social Icon={Linkedin} link='#' />
      </div>
    </div>
  );
}
