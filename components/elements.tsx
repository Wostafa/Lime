import { PropsWithChildren } from 'react';

interface ElementProps {
  className?: string;
  props?: any;
}
type StyledElement = ({}: PropsWithChildren<ElementProps>) => JSX.Element;

export const Button: StyledElement = ({ children, className = '' }) => (
  <button className={`py-3 px-9 text-white hover:ring-1 transition-shadow rounded-2xl font-bold mt-5 ${className}`}>
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
  <div className='flex-[2.5_1_0%] bg-white rounded-r-2xl pl-20 pr-20 py-20'>{children}</div>
);
