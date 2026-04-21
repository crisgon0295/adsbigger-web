import { useInView } from '../hooks';

export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const [ref, visible] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
