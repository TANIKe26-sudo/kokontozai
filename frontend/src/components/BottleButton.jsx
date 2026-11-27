import { useRef } from 'react';
import BottleSvg from './svg/bottles/BottleSvg.jsx';
import { isPointOnBottle } from './svg/bottles/bottleHitTest.js';

export default function BottleButton({
  color = 'white',
  ribbonColor = null,
  label,
  className = '',
  rotation = 0,
  onActivate,
  ariaPressed,
  style = {},
}) {
  const bottleRef = useRef(null);

  function isOpaque(event, allowKeyboard = false) {
    if (allowKeyboard && event.detail === 0) return true;
    return isPointOnBottle(bottleRef.current, event.clientX, event.clientY);
  }

  function blockTransparentPointer(event) {
    if (isOpaque(event)) return;
    event.preventDefault();
    event.stopPropagation();
  }

  function handleClick(event) {
    if (!isOpaque(event, true)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onActivate?.(event);
  }

  return (
    <button
      className={`island-object ${className}`}
      type="button"
      aria-label={label}
      aria-pressed={ariaPressed}
      onPointerDown={blockTransparentPointer}
      onPointerMove={(event) => {
        event.currentTarget.style.cursor = isOpaque(event) ? 'pointer' : 'default';
      }}
      onPointerLeave={(event) => { event.currentTarget.style.cursor = ''; }}
      onClick={handleClick}
      style={{ ...style, ...(rotation ? { '--rotation': `${rotation}deg` } : {}) }}
    >
      <BottleSvg
        ref={bottleRef}
        color={color}
        ribbonColor={ribbonColor}
        withMessage
        withHitArea
        outlined={ariaPressed === true}
      />
    </button>
  );
}
