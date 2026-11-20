import { useEffect, useRef, useState } from 'react';
import './GenrePicker.css';

const GENRES = [
  ['romance', '恋愛'],
  ['relationships', '人間関係'],
  ['work-school', '仕事／学校'],
  ['other', 'その他'],
];

export default function GenrePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState(['work-school']);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    function closeOnOutsideClick(event) {
      if (!pickerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener('pointerdown', closeOnOutsideClick);
    return () => window.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [isOpen]);

  function toggleGenre(genre) {
    setSelectedGenres((current) =>
      current.includes(genre)
        ? current.filter((item) => item !== genre)
        : [...current, genre],
    );
  }

  return (
    <div className="genre-picker" ref={pickerRef}>
      <button
        className={isOpen ? 'genre-trigger is-open' : 'genre-trigger'}
        type="button"
        aria-expanded={isOpen}
        aria-controls="genre-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>興味のあるジャンル</span>
        <svg className={isOpen ? 'genre-chevron is-open' : 'genre-chevron'} viewBox="0 0 16 16" aria-hidden="true">
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>
      {isOpen && (
        <div className="genre-menu" id="genre-menu" role="group" aria-label="興味のあるジャンル">
          {GENRES.map(([value, label]) => (
            <label className="genre-option" key={value}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(value)}
                onChange={() => toggleGenre(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
