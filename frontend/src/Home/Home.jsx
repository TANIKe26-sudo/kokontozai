import { useState } from 'react';
import './Home.css';
import GenrePicker from './GenrePicker.jsx';
import IslandScene from './IslandScene.jsx';
import PierScene from '../Pier/PierScene.jsx';
import WorkspaceScene from '../Workspace/WorkspaceScene.jsx';
import TutorialModal from './TutorialModal.jsx';
import DecorationInventoryModal from './DecorationInventoryModal.jsx';
import BottleMessageModal from '../components/BottleMessageModal.jsx';
import DecorationGetModal from '../components/DecorationGetModal.jsx';

export default function Home() {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [decorationOpen, setDecorationOpen] = useState(false);
  const [pierOpen, setPierOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [openBottleColor, setOpenBottleColor] = useState(null);
  const [pendingBottleColor, setPendingBottleColor] = useState(null);
  const [decorationGetOpen, setDecorationGetOpen] = useState(false);

  function handleIslandBottleClick(color) {
    setPendingBottleColor(color);
    setDecorationGetOpen(true);
  }

  function handleDecorationGetClose() {
    setDecorationGetOpen(false);
    if (pendingBottleColor) {
      setOpenBottleColor(pendingBottleColor);
      setPendingBottleColor(null);
    }
  }

  if (pierOpen) {
    return <PierScene onBack={() => setPierOpen(false)} />;
  }

  if (workspaceOpen) {
    return <WorkspaceScene onBack={() => setWorkspaceOpen(false)} />;
  }

  return (
    <main className="home-screen" aria-label="Island home screen">
      <IslandScene
        onBridgeClick={() => setPierOpen(true)}
        onDecoBoxClick={() => setDecorationOpen(true)}
        onWorkspaceClick={() => setWorkspaceOpen(true)}
        onBottleClick={handleIslandBottleClick}
      />
      <button
        className="help-button"
        type="button"
        aria-label="Open tutorial"
        onClick={() => setTutorialOpen(true)}
      >
        ?
      </button>
      <GenrePicker />
      {tutorialOpen && <TutorialModal onClose={() => setTutorialOpen(false)} />}
      {decorationOpen && (
        <DecorationInventoryModal onClose={() => setDecorationOpen(false)} />
      )}
      {openBottleColor && (
        <BottleMessageModal
          color={openBottleColor}
          onClose={() => setOpenBottleColor(null)}
        />
      )}
      {decorationGetOpen && (
        <DecorationGetModal
          decorationName="ハート"
          onClose={handleDecorationGetClose}
        />
      )}
    </main>
  );
}
