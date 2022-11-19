import Image from 'next/image';
import { format } from 'date-fns';

export default function Parser(blocks: Array<any>, time: number) {
  const date = <time>{format(time, 'LLLL dd, yyyy')}</time>;
  return blocks.map(block => {
    const data = block.data;
    switch (block.type) {
      case 'header':
        let h;
        // title
        if (data.level === 1) {
          h = (
            <div key={block.id}>
              <h1>{data.text}</h1>
              {date}
            </div>
          );
        } else if (data.level === 2) {
          h = <h2 key={block.id}>{data.text}</h2>;
        } else {
          h = <h3 key={block.id}>{data.text}</h3>;
        }
        return h;
      case 'paragraph':
        return <p key={block.id}>{data.text}</p>;
      case 'image':
        return (
          <div key={block.id} className='image-wrapper'>
            <Image src={data.file.url} fill alt={data.caption} />
          </div>
        );
      default:
        console.log('unknown type: ', data.type);
        break;
    }
  });
}
