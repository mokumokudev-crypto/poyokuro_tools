import Card from "./Card";

function TrashArea({ trashArea }) {
  return (
    <div className="card-row">
      {trashArea.map((card, index) => (
        <Card
          key={index}
          src={card.image_url}
          name={card.name}
          size="small"
        />
      ))}
    </div>
  );
}

export default TrashArea;