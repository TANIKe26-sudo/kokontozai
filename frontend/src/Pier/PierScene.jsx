import { useEffect, useState } from 'react';
import BottleButton from '../components/BottleButton.jsx';
import BottleMessageModal from '../components/BottleMessageModal.jsx';
import DecorationGetModal from '../components/DecorationGetModal.jsx';
import { SAMPLE_BOTTLES } from '../data/bottles.js';
import '../styles/sceneButtons.css';
import './PierScene.css';

const BOTTLES = [
  { ...SAMPLE_BOTTLES.white, label: '白いメッセージボトル', top: 60, left: 12, size: 56 },
  { ...SAMPLE_BOTTLES.blue, label: '青いメッセージボトル', top: 18, left: 21, size: 24 },
  { ...SAMPLE_BOTTLES.pink, label: 'ピンクのメッセージボトル', top: 23, left: 76, size: 25 },
  { ...SAMPLE_BOTTLES.yellow, label: '黄色いメッセージボトル', top: 48, left: 82, size: 44 },
];

export default function PierScene({ onBack }) {
  const [bottleRotations] = useState(() =>
    Object.fromEntries(BOTTLES.map(({ color }) => [color, Math.random() * 360])),
  );
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [caughtBottle, setCaughtBottle] = useState(null);
  const [pendingBottle, setPendingBottle] = useState(null);
  const [decorationGetOpen, setDecorationGetOpen] = useState(false);
  const selectedBottleLayout = BOTTLES.find(({ color }) => color === selectedBottle);
  const showBubbleBelowBottle = selectedBottleLayout?.top <= 25;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'Escape') return;
      if (decorationGetOpen) {
        setDecorationGetOpen(false);
        setCaughtBottle(pendingBottle);
        setPendingBottle(null);
        return;
      }
      if (caughtBottle) {
        setCaughtBottle(null);
      } else {
        onBack();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [caughtBottle, decorationGetOpen, onBack, pendingBottle]);

  function catchBottle() {
    const bottle = BOTTLES.find(({ color }) => color === selectedBottle)
      || BOTTLES[Math.floor(Math.random() * BOTTLES.length)];
    setPendingBottle(bottle);
    setDecorationGetOpen(true);
  }

  return (
    <main className="pier-scene" aria-label="桟橋">
      <div className="pier-artboard">
        <img className="pier-art pier-bridge" src="/images/bridge.png" alt="" />
        <img className="pier-art pier-fishing-rod" src="/images/fishingRod.png" alt="" />
        {BOTTLES.map(({ color, ribbonColor, label, top, left, size }) => (
          <BottleButton
            key={color}
            className={`pier-art pier-bottle pier-bottle-${color}`}
            color={color}
            ribbonColor={ribbonColor}
            label={label}
            rotation={bottleRotations[color]}
            ariaPressed={selectedBottle === color}
            style={{ top: `${top}%`, left: `${left}%`, width: `${size}%` }}
            onActivate={() => setSelectedBottle((selected) => (selected === color ? null : color))}
          />
        ))}
        {selectedBottleLayout && (
          <div
            className={`pier-bottle-bubble${showBubbleBelowBottle ? ' pier-bottle-bubble-below' : ''}`}
            role="status"
            style={{
              left: `${selectedBottleLayout.left}%`,
              top: showBubbleBelowBottle
                ? `${selectedBottleLayout.top + selectedBottleLayout.size * 0.55}%`
                : `${Math.max(17, selectedBottleLayout.top - selectedBottleLayout.size * 0.36)}%`,
            }}
          >
            テスト
          </div>
        )}
      </div>
      {!caughtBottle && (
        <button className="scene-back-button" type="button" onClick={onBack} aria-label="ホームに戻る">
          <span aria-hidden="true">←</span>
        </button>
      )}
      {!caughtBottle && !decorationGetOpen && (
        <button
          className="scene-action-button"
          type="button"
          onClick={catchBottle}
        >
          {selectedBottle ? 'このボトルを釣る' : 'ランダムで釣る'}
        </button>
      )}
      {caughtBottle && (
        <BottleMessageModal
          color={caughtBottle.color}
          ribbonColor={caughtBottle.ribbonColor}
          onClose={() => setCaughtBottle(null)}
        />
      )}
      {decorationGetOpen && (
        <DecorationGetModal
          decorationName="ハート"
          onClose={() => {
            setDecorationGetOpen(false);
            setCaughtBottle(pendingBottle);
            setPendingBottle(null);
          }}
        />
      )}
    </main>
  );
}
