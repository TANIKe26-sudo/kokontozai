import { useRef } from 'react';

export default function ImageButton({
  src,
  label,
  className = '',
  rotation = 0,
  onActivate,
  ariaPressed,
  style = {},
}) {
  const alphaMap = useRef(null);

  function buildAlphaMap(event) {
    const image = event.currentTarget;
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;

    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const alpha = new Uint8Array(canvas.width * canvas.height);

    for (let pixel = 0, index = 3; pixel < alpha.length; pixel += 1, index += 4) {
      alpha[pixel] = pixels[index];
    }

    alphaMap.current = { alpha, width: canvas.width, height: canvas.height };
  }

  function isOpaque(event, allowKeyboard = false) {
    if (allowKeyboard && event.detail === 0) return true;

    const map = alphaMap.current;
    if (!map) return false;

    const button = event.currentTarget;
    const bounds = button.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    const radians = (rotation * Math.PI) / 180;
    const cosine = Math.cos(radians);
    const sine = Math.sin(radians);
    const localX = cosine * dx + sine * dy + button.offsetWidth / 2;
    const localY = -sine * dx + cosine * dy + button.offsetHeight / 2;
    const x = Math.floor((localX / button.offsetWidth) * map.width);
    const y = Math.floor((localY / button.offsetHeight) * map.height);

    if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
    return map.alpha[y * map.width + x] > 0;
  }

  function blockTransparentPointer(event) {
    if (isOpaque(event)) return;
    event.preventDefault();
    event.stopPropagation();
  }

  function updatePointerCursor(event) {
    event.currentTarget.style.cursor = isOpaque(event) ? 'pointer' : 'default';
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
      onPointerMove={updatePointerCursor}
      onPointerLeave={(event) => { event.currentTarget.style.cursor = ''; }}
      onClick={handleClick}
      style={{ ...style, ...(rotation ? { '--rotation': `${rotation}deg` } : {}) }}
    >
      <img src={src} alt="" draggable="false" onLoad={buildAlphaMap} />
    </button>
  );
}
