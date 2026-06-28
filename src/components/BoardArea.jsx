import { useState } from "react";
import PlayArea from "./PlayArea";
import HandArea from "./HandArea";
import TrashArea from "./TrashArea";
import TacticsArea from "./TacticsArea";

export default function BoardArea({
  deck,
  hand,
  playArea,
  trashArea,
  tacticsArea,
  tacticsDeck,
  pp,
  setDeck,
  setPlayArea,
  setTrashArea,
  onOpenTactics,

  drawStartingHand,
  drawCard,
  resetGame,

  playCard,
  returnToHand,
  moveSelectedToTrash,
  linkAssault,
  endTurn,
  endRound ,

  moveTacticToArea,
  moveTacticToPlayArea,

  increasePP,
  decreasePP,
}) {
  const [showTactics, setShowTactics] = useState(false);
  const [showLinkAssault, setShowLinkAssault] = useState(false);
  const [linkCards, setLinkCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const startLinkAssault = (count) => {
    const cards = deck.slice(0, count);
  
    setLinkCards(cards);
    setSelectedCards([]);
  };

  const selectCard = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(
        selectedCards.filter(c => c !== card)
      );
    } else {
      setSelectedCards([
        ...selectedCards,
        card,
      ]);
    }
  };

  const executeLinkAssault = () => {
    const remainCards =
      linkCards.filter(
        card => !selectedCards.includes(card)
      );
  
    setPlayArea(prev => [
      ...prev,
      ...selectedCards,
    ]);
  
    setTrashArea(prev => [
      ...prev,
      ...remainCards,
    ]);
  
    setDeck(prev =>
      prev.slice(linkCards.length)
    );
  
    setShowLinkAssault(false);
    setLinkCards([]);
    setSelectedCards([]);
  };
  return (
    <>
      {/* プレイエリア */}
      <div className="section">

        <div className="play-layout">


            <div className="play-left-buttons">
              <button onClick={endTurn}>
                  ターン終了
              </button>

              <button onClick={endRound} className="round-end-button">
                ラウンド終了
              </button>
            </div>

            <div className="play-center">
            <PlayArea
                playArea={playArea}
                returnToHand={returnToHand}
            />
            </div>


            <div className="play-right-buttons">
              <button onClick={moveSelectedToTrash}>
                  トラッシュ
              </button>

              <button onClick={() => setShowLinkAssault(true)}>
                  リンクアサルト
              </button>
            </div>
        </div>

      </div>

      {/* 手札＋山札 */}
      <div className="section">
        <div className="hand-row">

          <div className="hand-column">
            <HandArea
              hand={hand}
              playCard={playCard}
            />
          </div>

          <div className="deck-column">

            <div className="deck-card" onClick={drawCard}>
                <img
                src={`${import.meta.env.BASE_URL}cards/deckImage.png`}
                alt="山札"
                className="deck-image"
                />

                <div className="deck-card-count">
                {deck.length}
                </div>
            </div>

            <button onClick={drawStartingHand}>
                初手5枚
            </button>

            <button onClick={onOpenTactics}>
              タクティクス
            </button>

            <button onClick={resetGame}>
                リセット
            </button>

            </div>

        </div>
      </div>

      {/* タクティクス 
      <div className="section">

        <div className="tactics-container">

          <TacticsArea
            title="タクティクスエリア"
            tactics={tacticsArea}
            onClickTactic={
              moveTacticToPlayArea
            }
          />

          <TacticsArea
            title="タクティクスデッキ"
            tactics={tacticsDeck}
            onClickTactic={
              moveTacticToArea
            }
          />

        </div>

      </div>
      */}
      {showLinkAssault && (
        <div
          className="modal-overlay"
          onClick={() => setShowLinkAssault(false)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            {linkCards.length === 0 ? (
              <>
                <h2 style={{ color: "inherit" }}>リンクアサルト</h2>

                <button
                  onClick={() =>
                    startLinkAssault(3)
                  }
                >
                  3枚
                </button>

                <button
                  onClick={() =>
                    startLinkAssault(5)
                  }
                >
                  5枚
                </button>
              </>
            ) : (
              <>
                <h2 style={{ color: "inherit" }}>カード選択</h2>

                <div className="card-row">
                  {linkCards.map((card) => {
                    const order =
                      selectedCards.indexOf(card);

                    return (
                      <div
                        key={card.id}
                        className="link-card"
                        onClick={() =>
                          selectCard(card)
                        }
                      >
                        <img
                          src={card.image_url}
                          alt={card.name}
                          className="modal-card"
                        />

                        {order !== -1 && (
                          <div className="select-order">
                            {order + 1}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={executeLinkAssault}
                >
                  OK
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}