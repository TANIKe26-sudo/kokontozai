import { useCallback, useEffect, useRef, useState } from 'react';
import './DecorationInventoryModal.css';

const DECORATIONS = [
  { name: 'ハート', image: 'heart.png' },
  { name: 'ハグ', image: 'hug.png' },
  { name: 'ハート(手)', image: 'heartHands.png' },
  { name: '握手', image: 'handShake.png' },
  { name: '祈り', image: 'pray.png' },
  { name: '頭爆発', image: 'ExplodingHead.png' },
  { name: 'ぴえん', image: 'PienFace.png' },
  { name: '溶ける顔', image: 'MeltingFace.png' },
  { name: '涙', image: 'cry.png' },
  { name: '号泣', image: 'sob.png' },
  { name: 'しょんぼり', image: 'pensive.png' },
  { name: '目', image: 'eyes.png' },
  { name: '叫び', image: 'scream.png' },
];

function getColumnCount() {
  if (window.matchMedia('(max-width: 560px)').matches) return 3;
  if (window.matchMedia('(max-width: 760px)').matches) return 4;
  return 5;
}

const CLOSE_ANIMATION_MS = 220;

export default function DecorationInventoryModal({ onClose }) {
  const closeButtonRef = useRef(null);
  const closeTimerRef = useRef(null);
  const closingRef = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const [columnCount, setColumnCount] = useState(getColumnCount);
  const [page, setPage] = useState(0);
  const pageSize = columnCount * 3;
  const pageCount = Math.ceil(DECORATIONS.length / pageSize);
  const visibleDecorations = DECORATIONS.slice(page * pageSize, (page + 1) * pageSize);

  const closeWithAnimation = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, CLOSE_ANIMATION_MS);
  }, [onClose]);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function closeOnEscape(event) {
      if (event.key === 'Escape') closeWithAnimation();
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.clearTimeout(closeTimerRef.current);
    };
  }, [closeWithAnimation]);

  useEffect(() => {
    const layoutQueries = [
      window.matchMedia('(max-width: 560px)'),
      window.matchMedia('(max-width: 760px)'),
    ];
    const updateColumns = () => {
      setColumnCount(getColumnCount());
      setPage(0);
    };

    layoutQueries.forEach((query) => query.addEventListener('change', updateColumns));
    return () => layoutQueries.forEach((query) => query.removeEventListener('change', updateColumns));
  }, []);

  return (
    <div
      className={`decoration-backdrop${isClosing ? ' is-closing' : ''}`}
      onClick={closeWithAnimation}
    >
      <section
        className={`decoration-dialog${isClosing ? ' is-closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="decoration-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="decoration-header">
          <div className="decoration-heading">
            <h1 id="decoration-title">持っているデコ・リアクション</h1>
          </div>
          <button
            ref={closeButtonRef}
            className="decoration-close"
            type="button"
            aria-label="閉じる"
            onClick={closeWithAnimation}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <ul
          className="decoration-grid"
          aria-label={`所持しているリアクション、${page + 1}ページ目`}
          style={{ '--decoration-columns': columnCount }}
        >
          {visibleDecorations.map((decoration) => (
            <li className="decoration-card" key={decoration.image}>
              <span className="decoration-art">
                <img src={`/images/${decoration.image}`} alt="" loading="lazy" />
              </span>
              <span className="decoration-name">{decoration.name}</span>
            </li>
          ))}
        </ul>
        {pageCount > 1 && (
          <nav className="decoration-pagination" aria-label="リアクション一覧のページ">
            <button
              className="decoration-page-button"
              type="button"
              aria-label="前のページ"
              onClick={() => setPage((current) => Math.max(0, current - 1))}
              disabled={page === 0}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14.5 5-7 7 7 7" />
              </svg>
            </button>
            <span className="decoration-page-count" aria-live="polite">
              {page + 1}<span> / </span>{pageCount}
            </span>
            <button
              className="decoration-page-button"
              type="button"
              aria-label="次のページ"
              onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
              disabled={page === pageCount - 1}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9.5 5 7 7-7 7" />
              </svg>
            </button>
          </nav>
        )}
      </section>
    </div>
  );
}
