import Card from "./Card";

function HandArea({ hand, playCard }) {
  return (
    <div className="card-row">
      {hand.map((card, index) => (
        <Card
          key={index}
          src={card.image_url}
          name={card.name}
          type={card.type} 
          size="normal"
          onClick={() => playCard(index)}
        />
      ))}
    </div>
  );
}

export default HandArea;