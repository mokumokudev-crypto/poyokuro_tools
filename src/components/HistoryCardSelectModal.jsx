import { useMemo, useState } from "react";
import "./HistoryCardSelectModal.css";

export default function CardSelectModal({
  open,
  cards,
  mode,
  title,
  onClose,
  onSelect,
  selectedCards,
  bgColor,
  textColor,
}) {
  const [keyword, setKeyword] = useState("");
  const modalMode = typeof mode === "string" ? mode : mode?.type;

  const displayCards = useMemo(() => {
    let list = cards;

    switch (modalMode) {
      case "leader":
        list = list.filter(
          (card) =>
            card.card_type?.internal_id === "leader"
        );
        break;

      case "ace":
        list = list.filter(
          (card) => card.is_ace
        );
        break;

      case "tactics":
      case "roundTactics":
        list = list.filter(
          (card) =>
            card.card_type?.internal_id === "tactics"
        );
        break;

      default:
        break;
    }

    if (keyword !== "") {
      list = list.filter((card) =>
        card.name.includes(keyword)
      );
    }

    return list;
  }, [cards, modalMode, keyword]);

  if (!open) return null;

  return (
    <div className="card-modal">

      <div 
        className="card-modal-body"
        style={{
            background: bgColor,
            color: textColor,
          }}
      >

        <div className="card-modal-header">

          <h3>{title}</h3>
          <input
          type="text"
          placeholder="カード検索"
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />
          <button onClick={onClose}>
            ✕
          </button>

        </div>



        <div className="card-grid">
        {displayCards.map((card) => {
            const isSelected = selectedCards?.some(
            (c) => c.id === card.id
            );

            return (
            <img
                key={card.id}
                src={card.image_url}
                alt={card.name}
                title={card.name}
                onClick={() => {
                onSelect(card);
                }}
                style={{
                width: 90,
                height: 120,
                objectFit: "cover",
                cursor: "pointer",
                border: isSelected
                    ? "3px solid #00aaff"
                    : "1px solid #ccc",
                opacity: isSelected ? 0.7 : 1,
                borderRadius: 6,
                boxSizing: "border-box",
                }}
            />
            );
        })}
        </div>

      </div>

    </div>
  );
}