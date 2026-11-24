import { useState } from 'react';
import ImageButton from './ImageButton.jsx';
import './IslandScene.css';

export default function IslandScene({ onBridgeClick, onDecoBoxClick }) {
  const [bottleRotations] = useState(() =>
    Array.from({ length: 4 }, () => Math.random() * 360),
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
        />
        <ImageButton
          className="island-bottle bottle-pink"
          src="/images/bottlePinkMsg.png"
          label="Pink message bottle"
          rotation={bottleRotations[0]}
        />
        <ImageButton
          className="island-bottle bottle-white"
          src="/images/bottleWhiteMsg.png"
          label="White message bottle"
          rotation={bottleRotations[1]}
        />
        <ImageButton
          className="island-bottle bottle-yellow"
          src="/images/bottleYellowMsg.png"
          label="Yellow message bottle"
          rotation={bottleRotations[2]}
        />
        <ImageButton
          className="island-bottle bottle-blue"
          src="/images/bottleBlueMsg.png"
          label="Blue message bottle"
          rotation={bottleRotations[3]}
        />
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
