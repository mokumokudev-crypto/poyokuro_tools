import BoardArea from "./BoardArea";

export default function PlayerBoard({
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
  moveSelectedToTrash,
  linkAssault,
  endTurn,

  playCard,
  returnToHand,

  moveTacticToArea,
  moveTacticToPlayArea,

  increasePP,
  decreasePP,
}) {
  return (
    <BoardArea
      deck={deck}
      hand={hand}
      playArea={playArea}
      trashArea={trashArea}
      tacticsArea={tacticsArea}
      tacticsDeck={tacticsDeck}
      pp={pp}

      drawStartingHand={drawStartingHand}
      drawCard={drawCard}
      resetGame={resetGame}
      moveSelectedToTrash={moveSelectedToTrash}
      linkAssault={linkAssault}
      endTurn={endTurn}

      playCard={playCard}
      returnToHand={returnToHand}

      moveTacticToArea={moveTacticToArea}
      moveTacticToPlayArea={moveTacticToPlayArea}

      increasePP={increasePP}
      decreasePP={decreasePP}
    />
  );
}