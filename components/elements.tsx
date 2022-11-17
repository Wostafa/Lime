import { PropsWithChildren } from 'react';
import { Loader } from 'react-feather';
import toast , {Toaster, ToastOptions} from 'react-hot-toast'

interface ElementProps {
  className?: string;
  props?: any;
  [x:string]:any
}
type StyledElement = ({}: PropsWithChildren<ElementProps>) => JSX.Element;

export const Button: StyledElement = ({ children, className = '', ...rest }) => (
  <button className={`py-3 px-9 text-white hover:ring-1 transition-shadow rounded-2xl font-bold ${className}`} {...rest}>
    {children}
  </button>
);

export const Article: StyledElement = ({ props }) => (
  <article>
    <h1 className='mb-7 capitalize font-bold'>{props.title}</h1>
    <p className='first-letter:uppercase'>{props.data}</p>
  </article>
);

export const Main: StyledElement = ({ children }) => (
  <div className='flex-[2.5_1_0%] bg-white rounded-2xl pl-20 pr-20 py-20'>{children}</div>
);

export const Loading= ()=> (<Loader color='#26B093' size={32} className='animate-spin-slow mx-auto' />)
 
export const notify = {
  default: {
    position:'bottom-center',
  } as ToastOptions,
  show: toast,
  hide: toast.dismiss,
  Loader: Toaster
}
const p = toast.loading('ok')
toast.dismiss(p)