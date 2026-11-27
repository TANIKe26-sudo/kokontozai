import { useRef, useState } from 'react';
import ReactionIcon from './svg/reactions/ReactionIcon.jsx';
import BottleSvg from './svg/bottles/BottleSvg.jsx';
import { isPointOnBottle } from './svg/bottles/bottleHitTest.js';
import { MESSAGE_REACTIONS } from '../data/reactions.js';
import './BottleMessageModal.css';

const BOTTLE_NAMES = {
  white: '白い',
  blue: '青い',
  pink: 'ピンクの',
  yellow: '黄色い',
};

const ALPHA_HIT_THRESHOLD = 64;

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

function isOpaqueAt(
  image,
  map,
  clientX,
  clientY,
  threshold = ALPHA_HIT_THRESHOLD,
  inset = 0,
) {
  if (!image || !map) return false;

  const bounds = image.getBoundingClientRect();
  if (bounds.width === 0 || bounds.height === 0) return false;
  const x = Math.floor(((clientX - bounds.left) / bounds.width) * map.width);
  const y = Math.floor(((clientY - bounds.top) / bounds.height) * map.height);
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  if (
    x < map.width * inset
    || x >= map.width * (1 - inset)
    || y < map.height * inset
    || y >= map.height * (1 - inset)
  ) return false;
  return map.alpha[y * map.width + x] >= threshold;
}

export default function BottleMessageModal({ color, ribbonColor = null, onClose }) {
  const paperAlphaMap = useRef(null);
  const bottleRef = useRef(null);
  const [selectedReactionId, setSelectedReactionId] = useState(null);
  const selectedReaction = MESSAGE_REACTIONS.find(({ id }) => id === selectedReactionId);

  function savePaperAlphaMap(event) {
    try {
      paperAlphaMap.current = createAlphaMap(event.currentTarget);
    } catch {
      paperAlphaMap.current = null;
    }
  }

  function handleOverlayClick(event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('.reaction-rail, .release-bottle-button, .caught-bottle-back')) return;

    const paperImage = event.currentTarget.querySelector('.letter-paper-image');
    if (isOpaqueAt(paperImage, paperAlphaMap.current, event.clientX, event.clientY, ALPHA_HIT_THRESHOLD, 0.035)) return;

    if (isPointOnBottle(bottleRef.current, event.clientX, event.clientY, true)) return;

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
          {MESSAGE_REACTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`reaction-button${selectedReactionId === id ? ' is-selected' : ''}`}
              type="button"
              aria-label={label}
              aria-pressed={selectedReactionId === id}
              onClick={() => setSelectedReactionId((selected) => (selected === id ? null : id))}
            >
              <ReactionIcon reactionId={id} />
            </button>
          ))}
        </div>
      </aside>

      <article className="letter-paper" aria-label="ボトルの中の手紙">
        <img
          className="letter-paper-image"
          src="/images/paper.png"
          alt=""
          onLoad={savePaperAlphaMap}
        />
        {selectedReaction && (
          <ReactionIcon
            className="letter-reaction-sticker"
            reactionId={selectedReaction.id}
            title={selectedReaction.label}
          />
        )}
        <div className="letter-copy">
          <p className="letter-message">
            最初から、pngで画像を使うんじゃなく、画像をsvgにしとくべきだったテストねぇ。
          </p>
        </div>
      </article>

      <BottleSvg
        ref={bottleRef}
        className={`caught-empty-bottle caught-empty-bottle-${color}`}
        color={color}
        ribbonColor={ribbonColor}
        title={`${BOTTLE_NAMES[color]}開いた空のボトル`}
      />

      <button className="release-bottle-button" type="button" onClick={onClose}>
        海に流す
      </button>
    </section>
  );
}
