import { PropsWithChildren } from 'react';
import { Loader } from 'react-feather';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';

interface ElementProps {
  className?: string;
  props?: any;
  [x: string]: any;
}
type StyledElement = ({}: PropsWithChildren<ElementProps>) => JSX.Element;

export const Button: StyledElement = ({ children, className = '', ...rest }) => (
  <button
    className={`py-3 px-9 text-white hover:ring-1 transition-shadow rounded-2xl font-bold ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export const Article: StyledElement = ({ props }) => (
  <article>
    <h1 className='mb-7 capitalize font-bold'>{props.title}</h1>
    <p className='first-letter:uppercase'>{props.data}</p>
  </article>
);

export const Main: StyledElement = ({ children, className='' }) => (
  <div className='flex-[2.7_1_0%] bg-white rounded-2xl'>
    {/* adding another div to set padding, because
    setting padding to a flex box change its size */}
    <div className={`p-20 ${className}`}>{children}</div>
  </div>
);

export const Wrapper: StyledElement = ({ children, className='' }) => <div className={`flex gap-4 ${className}`}>{children}</div>;

export const Loading = () => <Loader color='#26B093' size={32} className='animate-spin-slow mx-auto' />;

export const notify = {
  options: {
    position: 'bottom-center',
  } as ToastOptions,
  success: function (msg: string, options?: ToastOptions) {
    return toast.success(msg, options ? options : this.options);
  },
  error: function (msg: string, options?: ToastOptions) {
    return toast.error(msg, options ? options : this.options);
  },
  loading: function (msg: string, options?: ToastOptions) {
    return toast.loading(msg, options ? options : this.options);
  },
  dismiss: toast.dismiss,
  Loader: Toaster,
};
