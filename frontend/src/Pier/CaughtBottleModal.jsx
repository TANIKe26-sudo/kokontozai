import { useRef, useState } from 'react';
import './CaughtBottleModal.css';

const REACTIONS = [
  { image: 'heart.png', label: '共感' },
  { image: 'eyes.png', label: '見守る' },
  { image: 'hug.png', label: 'ハグ' },
  { image: 'ExplodingHead.png', label: 'びっくり' },
  { image: 'handShake.png', label: '握手' },
  { image: 'heartHands.png', label: 'ハートを送る' },
  { image: 'cry.png', label: '泣く' },
  { image: 'scream.png', label: '叫ぶ' },
  { image: 'sob.png', label: '号泣' },
  { image: 'pensive.png', label: '考える' },
  { image: 'pray.png', label: '祈る' },
  { image: 'MeltingFace.png', label: 'とろける' },
  { image: 'PienFace.png', label: 'ぴえん' },
];

const BOTTLE_NAMES = {
  white: '白い',
  blue: '青い',
  pink: 'ピンクの',
  yellow: '黄色い',
};

function createAlphaMap(image) {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, width, height).data;
  const alpha = new Uint8Array(width * height);
  for (let pixel = 0; pixel < alpha.length; pixel += 1) {
    alpha[pixel] = pixels[pixel * 4 + 3];
  }
  return { alpha, width, height };
}

function isOpaqueAt(image, map, clientX, clientY) {
  if (!image || !map) return true;

  const bounds = image.getBoundingClientRect();
  const x = Math.floor(((clientX - bounds.left) / bounds.width) * map.width);
  const y = Math.floor(((clientY - bounds.top) / bounds.height) * map.height);
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  return map.alpha[y * map.width + x] > 8;
}

export default function CaughtBottleModal({ color, onClose }) {
  const paperAlphaMap = useRef(null);
  const bottleAlphaMap = useRef(null);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const selectedReactionLabel = REACTIONS.find(({ image }) => image === selectedReaction)?.label;

  function saveAlphaMap(event, mapRef) {
    try {
      mapRef.current = createAlphaMap(event.currentTarget);
    } catch {
      mapRef.current = null;
    }
  }

  function handleOverlayClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest(
      '.reaction-rail, .release-bottle-button, .caught-bottle-back',
    )) return;

    const bottle = target.closest('.caught-empty-bottle');
    if (bottle && isOpaqueAt(bottle, bottleAlphaMap.current, event.clientX, event.clientY)) return;

    const paper = event.currentTarget.querySelector('.letter-paper-image');
    if (isOpaqueAt(paper, paperAlphaMap.current, event.clientX, event.clientY)) return;

    onClose();
  }

  return (
    <section
      className="caught-bottle-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="釣ったボトルの手紙"
      onClick={handleOverlayClick}
    >
      <button
        className="scene-back-button caught-bottle-back"
        type="button"
        onClick={onClose}
        aria-label="桟橋に戻る"
      >
        <span aria-hidden="true">←</span>
      </button>

      <aside className="reaction-rail" aria-label="リアクションを選ぶ">
        <div className="reaction-list">
          {REACTIONS.map(({ image, label }) => (
            <button
              key={image}
              className={`reaction-button${selectedReaction === image ? ' is-selected' : ''}`}
              type="button"
              aria-label={label}
              aria-pressed={selectedReaction === image}
              onClick={() => setSelectedReaction((selected) => (selected === image ? null : image))}
            >
              <img src={`/images/${image}`} alt="" draggable="false" />
            </button>
          ))}
        </div>
      </aside>

      <article className="letter-paper" aria-label="ボトルの中の手紙">
        <img
          className="letter-paper-image"
          src="/images/paper.png"
          alt=""
          onLoad={(event) => saveAlphaMap(event, paperAlphaMap)}
        />
        {selectedReaction && (
          <img
            className="letter-reaction-sticker"
            src={`/images/${selectedReaction}`}
            alt={selectedReactionLabel ?? '選択したリアクション'}
            draggable="false"
          />
        )}
        <div className="letter-copy">
          <p className="letter-message">友達と喧嘩して、喧嘩になった。</p>
        </div>
      </article>

      <img
        className={`caught-empty-bottle caught-empty-bottle-${color}`}
        src={`/images/bottle${color[0].toUpperCase()}${color.slice(1)}.png`}
        alt={`${BOTTLE_NAMES[color]}開いた空のボトル`}
        onLoad={(event) => saveAlphaMap(event, bottleAlphaMap)}
      />

      <button className="release-bottle-button" type="button" onClick={onClose}>
        海に流す
      </button>
    </section>
  );
}
