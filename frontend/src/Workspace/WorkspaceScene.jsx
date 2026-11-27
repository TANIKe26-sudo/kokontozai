import { useEffect, useState } from 'react';
import WorkspaceTable from '../components/backgrounds/WorkspaceTable.jsx';
import BottleSvg from '../components/svg/bottles/BottleSvg.jsx';
import RibbonSvg from '../components/svg/ribbons/RibbonSvg.jsx';
import '../styles/sceneButtons.css';
import '../Home/DecorationInventoryModal.css';
import './WorkspaceScene.css';

const GENRES = ['恋愛', '人間関係', '仕事／学校', 'その他'];
const BOTTLE_COLOR_BY_GENRE = {
  恋愛: 'pink',
  人間関係: 'yellow',
  '仕事／学校': 'blue',
  その他: 'white',
};
const RIBBONS = [
  { id: 'red', label: '赤いリボン' },
  { id: 'blue', label: '青いリボン' },
];

export default function WorkspaceScene({ onBack }) {
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('write');
  const [genre, setGenre] = useState('');
  const [selectedRibbon, setSelectedRibbon] = useState(null);
  const [released, setReleased] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key !== 'Escape') return;
      if (step === 'customize') {
        setStep('write');
        setReleased(false);
        return;
      }
      onBack();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, step]);

  function handleMessageSubmit(event) {
    event.preventDefault();
    if (!message.trim()) return;
    setStep('customize');
  }

  function handleRelease() {
    setReleased(true);
  }

  return (
    <main
      className="workspace-scene"
      aria-label={step === 'write' ? 'ボトルメッセージ作成' : 'ジャンルとボトルのデコ選択'}
    >
      <WorkspaceTable />
      <div className="workspace-artboard">
        {step === 'write' ? (
          <>
            <div className="workspace-paper-layer">
              <img className="workspace-art workspace-paper" src="/images/paper.png" alt="" />
              <form id="workspace-message-form" className="workspace-form" onSubmit={handleMessageSubmit}>
                <textarea
                  id="bottle-message"
                  className="workspace-message-input"
                  aria-label="ボトルメッセージ"
                  placeholder="モヤモヤを入力"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </form>
            </div>
            <img className="workspace-art workspace-feather" src="/images/workSpaceFeather.png" alt="" />
          </>
        ) : (
          <>
            <div
              className="workspace-bottle-preview"
              role="img"
              aria-label={selectedRibbon ? `メッセージ入りボトル、${selectedRibbon.label}付き` : 'メッセージ入りボトル'}
            >
              <BottleSvg
                className="workspace-bottle-image"
                color={BOTTLE_COLOR_BY_GENRE[genre] ?? 'white'}
                ribbonColor={selectedRibbon?.id ?? null}
                withMessage
              />
            </div>

            <section className="workspace-genre-section" aria-labelledby="workspace-genre-title">
              <h1 id="workspace-genre-title" className="workspace-customize-heading">
                ジャンル選択
              </h1>
              <fieldset className="workspace-genre-options">
                <legend className="workspace-visually-hidden">メッセージのジャンル</legend>
                {GENRES.map((option) => (
                  <label className="workspace-genre-option" key={option}>
                    <input
                      type="radio"
                      name="message-genre"
                      value={option}
                      checked={genre === option}
                      onChange={() => setGenre(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </fieldset>
            </section>

            <section className="workspace-ribbon-section" aria-labelledby="workspace-ribbon-title">
              <h2 id="workspace-ribbon-title" className="workspace-customize-heading">
                ボトルをデコる
              </h2>
              <div
                className="workspace-ribbon-box decoration-dialog"
                role="group"
                aria-label="ボトルのリボン"
              >
                {RIBBONS.map((ribbon) => (
                  <button
                    className={`decoration-card workspace-ribbon-card${selectedRibbon?.id === ribbon.id ? ' is-selected' : ''}`}
                    key={ribbon.id}
                    type="button"
                    aria-label={ribbon.label}
                    aria-pressed={selectedRibbon?.id === ribbon.id}
                    onClick={() =>
                      setSelectedRibbon((current) => (current?.id === ribbon.id ? null : ribbon))
                    }
                  >
                    <span className="decoration-art">
                      <RibbonSvg color={ribbon.id} />
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {released && (
        <p className="workspace-release-status" role="status">
          ボトルを海に流しました
        </p>
      )}
      {step === 'write' ? (
        <button className="scene-action-button" type="submit" form="workspace-message-form">
          決定
        </button>
      ) : (
        <button className="scene-action-button" type="button" onClick={handleRelease}>
          海に流す
        </button>
      )}
      <button
        className="scene-back-button"
        type="button"
        onClick={() => {
          if (step === 'write') {
            onBack();
            return;
          }
          setStep('write');
          setReleased(false);
        }}
        aria-label={step === 'write' ? 'ホームに戻る' : 'メッセージ入力に戻る'}
      >
        <span aria-hidden="true">←</span>
      </button>
    </main>
  );
}
