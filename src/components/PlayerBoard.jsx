import BoardArea from "./BoardArea";

export default function PlayerBoard({
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

  drawStartingHand,
  drawCard,
  resetGame,
  moveSelectedToTrash,
  linkAssault,
  endTurn,
  endRound,
  onOpenTactics,

  playCard,
  returnToHand,

  moveTacticToArea,
  moveTacticToPlayArea,

  increasePP,
  decreasePP,
  playerEquipment,
  setPlayerEquipment,
  opponentEquipment,
  setOpponentEquipment,
  pendingPlayerEquipment,
  setPendingPlayerEquipment,
  movingPlayerEquipment,
  setMovingPlayerEquipment,
  onLeaderClick,
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
      setDeck={setDeck}
      setPlayArea={setPlayArea}
      setTrashArea={setTrashArea}
      onOpenTactics={onOpenTactics}

      drawStartingHand={drawStartingHand}
      drawCard={drawCard}
      resetGame={resetGame}
      moveSelectedToTrash={moveSelectedToTrash}
      linkAssault={linkAssault}
      endTurn={endTurn}
      endRound={endRound}

      playCard={playCard}
      returnToHand={returnToHand}

      moveTacticToArea={moveTacticToArea}
      moveTacticToPlayArea={moveTacticToPlayArea}

      increasePP={increasePP}
      decreasePP={decreasePP}
      playerEquipment={playerEquipment}
      setPlayerEquipment={setPlayerEquipment}
      opponentEquipment={opponentEquipment}
      setOpponentEquipment={setOpponentEquipment}
      pendingPlayerEquipment={pendingPlayerEquipment}
      setPendingPlayerEquipment={setPendingPlayerEquipment}
      movingPlayerEquipment={movingPlayerEquipment}
      setMovingPlayerEquipment={setMovingPlayerEquipment}
      onLeaderClick={onLeaderClick}
    />
  );
}