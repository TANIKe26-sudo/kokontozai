import { useState } from 'react';
import './TutorialModal.css';

const PAGE_COUNT = 3;

export default function TutorialModal({ onClose }) {
  const [page, setPage] = useState(0);

  function goNext() {
    if (page === PAGE_COUNT - 1) {
      onClose();
      return;
    }
    setPage((current) => current + 1);
  }

  return (
    <div className="tutorial-backdrop" onClick={onClose}>
      <section
        className="tutorial-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutorial-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="tutorial-close" type="button" aria-label="閉じる" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="tutorial-page" aria-live="polite">
          <h1 id="tutorial-title">チュートリアル</h1>
          <p>説明内容はここに追加します。</p>
        </div>

        <footer className="tutorial-navigation">
          <button
            className="tutorial-nav-button tutorial-previous"
            type="button"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
          >
            前へ
          </button>
          <span className="tutorial-page-count">{page + 1} / {PAGE_COUNT}</span>
          <button className="tutorial-nav-button tutorial-next" type="button" onClick={goNext}>
            {page === PAGE_COUNT - 1 ? '完了' : '次へ'}
          </button>
        </footer>
      </section>
    </div>
  );
}
