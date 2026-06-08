import Card from "./Card";

function TacticsArea({ title, tactics, onClickTactic }) {
  return (
    <div className="tactics-area">
      <h3>{title}</h3>

      <div className="tactics-cards">
        {tactics.map((t, index) => (
          <Card
            key={index}
            src={t.image_url}
            size="tactics"
            rotated={true}
            type={t.type} 
            onClick={
              onClickTactic
                ? () => onClickTactic(index)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}

export default TacticsArea;
