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

  drawStartingHand,
  drawCard,
  resetGame,

  playCard,
  returnToHand,
  moveSelectedToTrash,
  linkAssault,
  endTurn,

  moveTacticToArea,
  moveTacticToPlayArea,

  increasePP,
  decreasePP,
}) {
  return (
    <>
      {/* プレイエリア */}
      <div className="section">

        <div className="play-layout">

            <div className="play-left-buttons">
            <button onClick={moveSelectedToTrash}>
                トラッシュ
            </button>

            <button onClick={linkAssault}>
                リンクアサルト
            </button>
            </div>

            <div className="play-center">
            <PlayArea
                playArea={playArea}
                returnToHand={returnToHand}
            />
            </div>

            <div className="play-right-buttons">
            <button onClick={endTurn}>
                ターン終了
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
            <div className="deck-card">
              山札
            </div>

            <div className="deck-count">
              残り {deck.length} 枚
            </div>

            <button onClick={drawStartingHand}>
              初手5枚
            </button>

            <button onClick={drawCard}>
              ドロー
            </button>

            <button onClick={resetGame}>
              リセット
            </button>
          </div>

        </div>
      </div>

      {/* タクティクス */}
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
    </>
  );
}