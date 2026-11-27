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
  const [openBottle, setOpenBottle] = useState(null);
  const [pendingBottle, setPendingBottle] = useState(null);
  const [decorationGetOpen, setDecorationGetOpen] = useState(false);

  function handleIslandBottleClick(bottle) {
    setPendingBottle(bottle);
    setDecorationGetOpen(true);
  }

  function handleDecorationGetClose() {
    setDecorationGetOpen(false);
    if (pendingBottle) {
      setOpenBottle(pendingBottle);
      setPendingBottle(null);
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
      {openBottle && (
        <BottleMessageModal
          color={openBottle.color}
          ribbonColor={openBottle.ribbonColor}
          onClose={() => setOpenBottle(null)}
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
