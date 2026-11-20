import { useState } from 'react';
import './Home.css';
import GenrePicker from './GenrePicker.jsx';
import IslandScene from './IslandScene.jsx';
import PierScene from '../Pier/PierScene.jsx';
import TutorialModal from './TutorialModal.jsx';

export default function Home() {
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [pierOpen, setPierOpen] = useState(false);

  if (pierOpen) {
    return <PierScene onBack={() => setPierOpen(false)} />;
  }

  return (
    <main className="home-screen" aria-label="Island home screen">
      <IslandScene onBridgeClick={() => setPierOpen(true)} />
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
    </main>
  );
}
