import { useState } from 'react';
import ImageButton from './ImageButton.jsx';
import BottleButton from '../components/BottleButton.jsx';
import { SAMPLE_BOTTLES } from '../data/bottles.js';
import './IslandScene.css';

const BOTTLES = [
  { ...SAMPLE_BOTTLES.pink, label: 'Pink message bottle' },
  { ...SAMPLE_BOTTLES.white, label: 'White message bottle' },
  { ...SAMPLE_BOTTLES.yellow, label: 'Yellow message bottle' },
  { ...SAMPLE_BOTTLES.blue, label: 'Blue message bottle' },
];

export default function IslandScene({ onBridgeClick, onDecoBoxClick, onWorkspaceClick, onBottleClick }) {
  const [bottleRotations] = useState(() =>
    Array.from({ length: BOTTLES.length }, () => Math.random() * 360),
  );

  return (
    <div className="island-scene">
      <div className="island-artboard">
        <img className="island-layer island-base" src="/images/islandBase.png" alt="" />
        <ImageButton
          className="island-bridge"
          src="/images/islandBridge.png"
          label="Bridge"
          onActivate={onBridgeClick}
        />
        <img className="island-layer island-tree" src="/images/islandTree.png" alt="" />
        <ImageButton
          className="island-deco-box"
          src="/images/decoBox.png"
          label="デコレーションボックス"
          onActivate={onDecoBoxClick}
        />
        <ImageButton
          className="island-workspace"
          src="/images/workspace.png"
          label="Workspace"
          onActivate={onWorkspaceClick}
        />
        {BOTTLES.map((bottle, index) => (
          <BottleButton
            key={bottle.color}
            className={`island-bottle bottle-${bottle.color}`}
            color={bottle.color}
            ribbonColor={bottle.ribbonColor}
            label={bottle.label}
            rotation={bottleRotations[index]}
            onActivate={() => onBottleClick(bottle)}
          />
        ))}
        <svg className="selection-marker marker-deco-box" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M5 5 H59 L32 59 Z" />
        </svg>
        <svg className="selection-marker marker-workspace" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M5 5 H59 L32 59 Z" />
        </svg>
        <svg className="selection-marker marker-bridge" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M5 5 H59 L32 59 Z" />
        </svg>
      </div>
    </div>
  );
}
