import { useState } from 'react';
import './Home.css';
import GenrePicker from './GenrePicker.jsx';
import IslandScene from './IslandScene.jsx';
import PierScene from '../Pier/PierScene.jsx';
import WorkspaceScene from '../Workspace/WorkspaceScene.jsx';
import TutorialModal from './TutorialModal.jsx';
import DecorationInventoryModal from './DecorationInventoryModal.jsx';
import BottleMessageModal from '../components/BottleMessageModal.jsx';

export default function Home() {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [decorationOpen, setDecorationOpen] = useState(false);
  const [pierOpen, setPierOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [openBottleColor, setOpenBottleColor] = useState(null);

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
        onBottleClick={setOpenBottleColor}
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
        <BottleMessageModal color={openBottleColor} onClose={() => setOpenBottleColor(null)} />
      )}
    </main>
  );
}
