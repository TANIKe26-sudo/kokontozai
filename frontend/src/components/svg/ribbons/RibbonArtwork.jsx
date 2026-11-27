import { RIBBON_PATHS, BOTTLE_RIBBON_TRANSFORM } from './ribbonGeometry.js';
import { RIBBON_COLORS } from './ribbonColors.js';

export default function RibbonArtwork({ color = 'red', placement = 'inventory' }) {
  const palette = RIBBON_COLORS[color] ?? RIBBON_COLORS.red;
  const onBottle = placement === 'bottle';

  return (
    <g
      data-bottle-ribbon={onBottle ? '' : undefined}
      transform={onBottle ? BOTTLE_RIBBON_TRANSFORM : undefined}
    >
      <path
        data-bottle-hit={onBottle ? '' : undefined}
        data-bottle-solid={onBottle ? '' : undefined}
        d={RIBBON_PATHS.silhouette}
        fill={palette.detail}
        fillRule="evenodd"
      />
      <path d={RIBBON_PATHS.front} fill={palette.front} fillRule="evenodd" />
    </g>
  );
}
