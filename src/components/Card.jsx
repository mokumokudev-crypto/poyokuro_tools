import "./Card.css";

function Card({ src, name, type, onClick }) {
  return (
    <div className={`card ${type}`}>
      <img
        src={src}
        alt={name}
        onClick={onClick}
      />
    </div>
  );
}

export default Card;