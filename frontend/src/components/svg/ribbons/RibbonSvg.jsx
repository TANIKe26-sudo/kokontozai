import { useId } from 'react';
import RibbonArtwork from './RibbonArtwork.jsx';

export default function RibbonSvg({
  color = 'red',
  placement = 'inventory',
  title,
  ...props
}) {
  const id = useId();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 1536"
      width="2048"
      height="1536"
      preserveAspectRatio="xMidYMid meet"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={title ? `${id}-title` : undefined}
      focusable="false"
      {...props}
    >
      {title && <title id={`${id}-title`}>{title}</title>}
      <RibbonArtwork color={color} placement={placement} />
    </svg>
  );
}
