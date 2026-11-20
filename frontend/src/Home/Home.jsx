import { useState } from 'react';
import './Home.css';
import GenrePicker from './GenrePicker.jsx';
import IslandScene from './IslandScene.jsx';
import TutorialModal from './TutorialModal.jsx';

export default function Home() {
  const [tutorialOpen, setTutorialOpen] = useState(false);

  return (
    <main className="home-screen" aria-label="Island home screen">
      <IslandScene />
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
