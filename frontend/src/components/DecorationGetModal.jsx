import './DecorationGetModal.css';

export default function DecorationGetModal({ decorationName = 'ハート', onClose }) {
  return (
    <section
      className="decoration-get-screen"
      role="dialog"
      aria-modal="true"
      aria-label={`${decorationName}を手に入れました`}
      onClick={onClose}
    >
      <span className="decoration-get-heart-glow" aria-hidden="true">
        <img className="decoration-get-heart" src="/images/heart.png" alt="" />
      </span>
      <p className="decoration-get-message">
        <span>{decorationName}を手に入れた！</span>
        <span>デコレーションボックスに収納しました</span>
      </p>
    </section>
  );
}
