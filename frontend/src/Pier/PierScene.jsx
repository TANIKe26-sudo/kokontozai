import { useEffect, useState } from 'react';
import ImageButton from '../Home/ImageButton.jsx';
import './PierScene.css';

const BOTTLES = [
  { color: 'white', label: '白いメッセージボトル' },
  { color: 'blue', label: '青いメッセージボトル' },
  { color: 'pink', label: 'ピンクのメッセージボトル' },
  { color: 'yellow', label: '黄色いメッセージボトル' },
];

export default function PierScene({ onBack }) {
  const [bottleRotations] = useState(() =>
    Object.fromEntries(BOTTLES.map(({ color }) => [color, Math.random() * 360])),
  );
  const [selectedBottle, setSelectedBottle] = useState(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onBack();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  return (
    <main className="pier-scene" aria-label="桟橋">
      <div className="pier-artboard">
        <img className="pier-art pier-bridge" src="/images/bridge.png" alt="" />
        <img className="pier-art pier-fishing-rod" src="/images/fishingRod.png" alt="" />
        {BOTTLES.map(({ color, label }) => (
          <ImageButton
            key={color}
            className={`pier-art pier-bottle pier-bottle-${color}`}
            src={`/images/bottle${color[0].toUpperCase()}${color.slice(1)}Msg.png`}
            label={label}
            rotation={bottleRotations[color]}
            ariaPressed={selectedBottle === color}
            onActivate={() => setSelectedBottle((selected) => (selected === color ? null : color))}
          />
        ))}
      </div>
      <button className="pier-back-button" type="button" onClick={onBack} aria-label="ホームに戻る">
        <span aria-hidden="true">←</span>
      </button>
      <button className="pier-fish-button" type="button">
        {selectedBottle ? 'このボトルを釣る' : 'ランダムで釣る'}
      </button>
    </main>
  );
}
