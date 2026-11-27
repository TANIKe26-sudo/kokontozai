import { useId } from 'react';
import RibbonArtwork from '../ribbons/RibbonArtwork.jsx';
import {
  BOTTLE_GLASS_PATH,
  BOTTLE_RIM_PATH,
  BOTTLE_CORK_PATH,
  BOTTLE_HIGHLIGHT_PATH,
  BOTTLE_PAPER_PATH,
  BOTTLE_TIE_PATH,
  BOTTLE_OUTLINE_PATH,
  BOTTLE_MESSAGE_HIT_PATHS,
} from './bottleGeometry.js';

const BOTTLE_COLORS = {
  white: {
    rim: '#d3d3d4',
    glass: '#d5d4d3',
    gradient: { x1: 1191.7, y1: 300.5, x2: 908.3, y2: 1259.5, start: 0.27121, end: 0.27965 },
  },
  pink: {
    rim: '#fea6bb',
    glass: '#ffa6bb',
    gradient: { x1: 1506.84, y1: 983.22, x2: 593.16, y2: 576.78, start: 0.24937, end: 0.31111 },
  },
  yellow: {
    rim: '#feda5c',
    glass: '#ffdb5b',
    gradient: { x1: 1166.68, y1: 1266.19, x2: 933.32, y2: 293.81, start: 0.22308, end: 0.32081 },
  },
  blue: {
    rim: '#5bbdfe',
    glass: '#5dbbfa',
    gradient: { x1: 1540.84, y1: 875.29, x2: 559.16, y2: 684.71, start: 0.22936, end: 0.3256 },
  },
};

export default function BottleSvg({
  color = 'white',
  ribbonColor = null,
  withMessage = false,
  outlined = false,
  withHitArea = false,
  title,
  ...props
}) {
  const id = useId();
  const palette = BOTTLE_COLORS[color] ?? BOTTLE_COLORS.white;
  const gradient = palette.gradient;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 1536"
      width="2048"
      height="1536"
      preserveAspectRatio="none"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={title ? `${id}-title` : undefined}
      focusable="false"
      {...props}
    >
      {title && <title id={`${id}-title`}>{title}</title>}
      <defs>
        <linearGradient
          id={`${id}-glass`}
          gradientUnits="userSpaceOnUse"
          x1={gradient.x1}
          y1={gradient.y1}
          x2={gradient.x2}
          y2={gradient.y2}
        >
          <stop offset="0" stopColor={palette.glass} stopOpacity={gradient.start} />
          <stop offset="1" stopColor={palette.glass} stopOpacity={gradient.end} />
        </linearGradient>
      </defs>

      {outlined && <path d={BOTTLE_OUTLINE_PATH} fill="#ffffff" fillRule="evenodd" />}
      <path d={BOTTLE_GLASS_PATH} fill={`url(#${id}-glass)`} fillRule="evenodd" />
      {withMessage && (
        <g>
          <path d={BOTTLE_PAPER_PATH} fill="#d4b486" fillRule="evenodd" />
          <path d={BOTTLE_TIE_PATH} fill="#876b42" fillRule="evenodd" />
        </g>
      )}
      <path data-bottle-solid="" d={BOTTLE_RIM_PATH} fill={palette.rim} fillRule="evenodd" />
      <path data-bottle-solid="" d={BOTTLE_HIGHLIGHT_PATH} fill="#fefefe" fillRule="evenodd" />
      <path data-bottle-solid="" d={BOTTLE_CORK_PATH} fill="#ecb474" fillRule="evenodd" />
      {ribbonColor && <RibbonArtwork color={ribbonColor} placement="bottle" />}
      {withHitArea && (
        <path
          data-bottle-hit=""
          d={BOTTLE_MESSAGE_HIT_PATHS[color] ?? BOTTLE_MESSAGE_HIT_PATHS.white}
          fill="none"
          fillRule="evenodd"
          pointerEvents="none"
        />
      )}
    </svg>
  );
}
