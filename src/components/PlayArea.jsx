import Card from "./Card";

function PlayArea({ playArea, returnToHand }) {
  return (
    <div className="card-row">
      {playArea.map((card, index) => (
        <Card
          key={index}
          src={card.image_url}
          name={card.name}
          type={card.type} 
          onClick={() => returnToHand(index)}
        />
      ))}
    </div>
  );
}

export default PlayArea;