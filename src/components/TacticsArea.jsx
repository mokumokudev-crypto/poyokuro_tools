import Card from "./Card";

function TacticsArea({ title, tactics, onClickTactic }) {
  return (
    <div className="tactics-area">
      <h3>{title}</h3>

      <div className="tactics-cards">
        {tactics
          .filter(Boolean)
          .map((t, index) => (
            <Card
              key={t?.id ?? index}
              src={t?.image_url}
              type={t?.type}
              onClick={() => onClickTactic(t)}
            />
        ))}
      </div>
    </div>
  );
}

export default TacticsArea;
