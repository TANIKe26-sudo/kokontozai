import { useId } from 'react';
import { REACTION_ICONS } from './index.js';

export default function ReactionIcon({ reactionId, title, ...props }) {
  const titleId = useId();
  const Icon = REACTION_ICONS[reactionId];

  if (!Icon) return null;

  return (
    <Icon
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={title ? titleId : undefined}
      focusable="false"
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}
    </Icon>
  );
}
