import { useState } from "react";
import DeckBuilderPage from "./pages/DeckBuilderPage";

import "./App.css";
import LoginPage from "./LoginPage";
import LeaderArea from "./components/LeaderArea";
import PlayerBoard from "./components/PlayerBoard";
import OpponentBoard from "./components/OpponentBoard";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzgCuCh5jXOemCWa6ZFB-m4wOIm2VxUNk6jBPGVm5jh_8EYDKFWCe4EzwP4eD_Jeo-zow/exec";

function App() {
  const [page, setPage] = useState("solo");
  const [activeTab, setActiveTab] = useState("player");

  const [playerDeckCode, setPlayerDeckCode] = useState("");
  const [opponentDeckCode, setOpponentDeckCode] = useState("");

  const [playerDeckData, setPlayerDeckData] = useState(null);
  const [opponentDeckData, setOpponentDeckData] = useState(null);

  // Player
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPlayArea, setPlayerPlayArea] = useState([]);
  const [playerTrashArea, setPlayerTrashArea] = useState([]);
  const [playerTacticsArea, setPlayerTacticsArea] = useState([]);
  const [playerTacticsDeck, setPlayerTacticsDeck] = useState([]);
  const [showPlayerTrash, setShowPlayerTrash] = useState(false);
  const [playerPP, setPlayerPP] = useState(0);
  const [playerTrashHistory, setPlayerTrashHistory] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);

  // Opponent
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [opponentPlayArea, setOpponentPlayArea] = useState([]);
  const [opponentTrashArea, setOpponentTrashArea] = useState([]);
  const [opponentTacticsArea, setOpponentTacticsArea] = useState([]);
  const [opponentTacticsDeck, setOpponentTacticsDeck] = useState([]);
  const [showOpponentTrash, setShowOpponentTrash] = useState(false);
  const [opponentPP, setOpponentPP] = useState(0);
  const [opponentTrashHistory,setOpponentTrashHistory] = useState([]);
  const [opponentTurn,setOpponentTurn] = useState(1);


  const [authenticated, setAuthenticated] =
    useState(
      sessionStorage.getItem("auth") === "true"
  );

  const normalizeData = (data) => {
    const leaders = data.leaders.map((l) => ({
      ...l,
      type: "leader",
    }));

    const tactics = data.tactics.map((t) => ({
      ...t,
      type: "tactics",
    }));

    const deck = data.deck.map((c) => ({
      ...c,
      type: "normal",
    }));

    return { leaders, tactics, deck };
  };

  const loadPlayerDeck = async () => {

    const res = await fetch(
      `${GAS_URL}?deckCode=${playerDeckCode}`
    );

    const data = normalizeData(await res.json());

    setPlayerDeckData(data);
    setPlayerDeck(
      [...data.deck].sort(() => Math.random() - 0.5)
    );
    setPlayerTacticsDeck(data.tactics);

    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
    setPlayerTacticsArea([]);
    setPlayerPP(0);
  };

  const loadOpponentDeck = async () => {
    const res = await fetch(
      `${GAS_URL}?deckCode=${opponentDeckCode}`
    );

    const data = normalizeData(await res.json());

    setOpponentDeckData(data);
    setOpponentDeck(
      [...data.deck].sort(() => Math.random() - 0.5)
    );
    setOpponentTacticsDeck(data.tactics);

    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
    setOpponentTacticsArea([]);
    setOpponentPP(0);
  };

  const playerDrawStartingHand = () => {
    if (playerDeck.length < 5) return;
  
    const cards = playerDeck.slice(0, 5);
  
    setPlayerHand(cards);
    setPlayerDeck(playerDeck.slice(5));
  };

  const opponentDrawStartingHand = () => {
    if (opponentDeck.length < 5) return;
  
    const cards = opponentDeck.slice(0, 5);
  
    setOpponentHand(cards);
    setOpponentDeck(opponentDeck.slice(5));
  };

  const playerDrawCard = () => {
    if (playerDeck.length === 0) return;
  
    const card = playerDeck[0];
  
    setPlayerHand((prev) => [...prev, card]);
  
    setPlayerDeck((prev) => prev.slice(1));
  };

  const opponentDrawCard = () => {
    if (opponentDeck.length === 0) return;
  
    const card = opponentDeck[0];
  
    setOpponentHand((prev) => [...prev, card]);
  
    setOpponentDeck((prev) => prev.slice(1));
  };

  const playerResetGame = () => {
    if (!playerDeckData) return;
  
    const shuffledDeck = [...playerDeckData.deck]
      .sort(() => Math.random() - 0.5);
  
    setPlayerDeck(shuffledDeck);
  
    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
  
    setPlayerTacticsDeck(playerDeckData.tactics);
    setPlayerTacticsArea([]);
  
    setPlayerPP(0);
  };

  const opponentResetGame = () => {
    if (!opponentDeckData) return;
  
    const shuffledDeck = [...opponentDeckData.deck]
      .sort(() => Math.random() - 0.5);
  
    setOpponentDeck(shuffledDeck);
  
    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
  
    setOpponentTacticsDeck(
      opponentDeckData.tactics
    );
  
    setOpponentTacticsArea([]);
  
    setOpponentPP(0);
  };

  const playerMoveSelectedToTrash = () => {
    setShowPlayerTrash(true);
  };
  
  const opponentMoveSelectedToTrash = () => {
    setShowOpponentTrash(true);
  };
  
  const playerLinkAssault = () => {
    alert("リンクアサルト");
  };

  const opponentLinkAssault = () => {
    alert("リンクアサルト");
  };
  
  const playerEndTurn = () => {

    if (playerPlayArea.length > 0) {
  
      setPlayerTrashHistory((prev) => [
        ...prev,
        {
          turn: playerTurn,
          cards: [...playerPlayArea],
        },
      ]);
    }
  
    setPlayerTrashArea((prev) => [
      ...prev,
      ...playerPlayArea,
    ]);
  
    setPlayerPlayArea([]);
  
    setPlayerTurn((prev) => prev + 1);
  };
  
  const opponentEndTurn = () => {

    if (opponentPlayArea.length > 0) {
  
      setOpponentTrashHistory((prev) => [
        ...prev,
        {
          turn: opponentTurn,
          cards: [...opponentPlayArea],
        },
      ]);
    }
  
    setOpponentTrashArea((prev) => [
      ...prev,
      ...opponentPlayArea,
    ]);
  
    setOpponentPlayArea([]);
  
    setOpponentTurn((prev) => prev + 1);
  };

  const playerPlayCard = (index) => {
    const card = playerHand[index];
  
    setPlayerPlayArea((prev) => [...prev, card]);
  
    setPlayerHand((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentPlayCard = (index) => {
    const card = opponentHand[index];
  
    setOpponentPlayArea((prev) => [...prev, card]);
  
    setOpponentHand((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const playerReturnToHand = (index) => {
    const card = playerPlayArea[index];
  
    setPlayerHand((prev) => [...prev, card]);
  
    setPlayerPlayArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentReturnToHand = (index) => {
    const card = opponentPlayArea[index];
  
    setOpponentHand((prev) => [...prev, card]);
  
    setOpponentPlayArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const playerMoveToTrash = (index) => {
    const card = playerPlayArea[index];
  
    setPlayerTrashArea((prev) => [...prev, card]);
  
    setPlayerPlayArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentMoveToTrash = (index) => {
    const card = opponentPlayArea[index];
  
    setOpponentTrashArea((prev) => [...prev, card]);
  
    setOpponentPlayArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const playerMoveTacticToArea = (index) => {
    const card = playerTacticsDeck[index];
  
    setPlayerTacticsArea((prev) => [...prev, card]);
  
    setPlayerTacticsDeck((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentMoveTacticToArea = (index) => {
    const card = opponentTacticsDeck[index];
  
    setOpponentTacticsArea((prev) => [...prev, card]);
  
    setOpponentTacticsDeck((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const playerMoveTacticToPlayArea = (index) => {
    const card = playerTacticsArea[index];
  
    setPlayerPlayArea((prev) => [...prev, card]);
  
    setPlayerTacticsArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentMoveTacticToPlayArea = (index) => {
    const card = opponentTacticsArea[index];
  
    setOpponentPlayArea((prev) => [...prev, card]);
  
    setOpponentTacticsArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  if (page === "builder") {
    return (
      <DeckBuilderPage
        onBack={() => setPage("solo")}
      />
    );
  }

  if (!authenticated) {
    return (
      <LoginPage
        gasUrl={GAS_URL}
        onLogin={() =>
          setAuthenticated(true)
        }
      />
    );
  }
  return (
    
    <div className="app-container">
      <h1>クロススターズ 一人回しツール</h1>
      <div className="menu-buttons">

        <button
          onClick={() => setPage("builder")} className="back-button"
        >
          デッキメーカーへ
        </button>
      </div>
      

      <div className="deck-load-area">
        <input
          value={playerDeckCode}
          onChange={(e) =>
            setPlayerDeckCode(e.target.value)
          }
          placeholder="自分デッキコード"
        />

        <button onClick={loadPlayerDeck}>
          自分デッキ読込
        </button>
      </div>

      <div className="deck-load-area">
        <input
          value={opponentDeckCode}
          onChange={(e) =>
            setOpponentDeckCode(e.target.value)
          }
          placeholder="相手デッキコード"
        />

        <button onClick={loadOpponentDeck}>
          相手デッキ読込
        </button>
      </div>

      {(playerDeckData || opponentDeckData) && (
        <>
          <div className="section">
            <LeaderArea
              leaders={playerDeckData?.leaders || []}
              opponentLeaders={
                opponentDeckData?.leaders || []
              }
            />
          </div>

          <div className="section">
            <div className="tab-buttons">
              <button
                onClick={() =>
                  setActiveTab("player")
                }
              >
                自分盤面
              </button>

              <button
                onClick={() =>
                  setActiveTab("opponent")
                }
              >
                相手盤面
              </button>
            </div>
          </div>

          {activeTab === "player" && (
            <PlayerBoard
              deck={playerDeck}
              hand={playerHand}
              playArea={playerPlayArea}
              trashArea={playerTrashArea}
              tacticsArea={playerTacticsArea}
              tacticsDeck={playerTacticsDeck}
              pp={playerPP}

              drawStartingHand={playerDrawStartingHand}
              drawCard={playerDrawCard}
              resetGame={playerResetGame}
              playCard={playerPlayCard}
              returnToHand={playerReturnToHand}
              moveTacticToArea={playerMoveTacticToArea}
              moveTacticToPlayArea={playerMoveTacticToPlayArea}
              moveSelectedToTrash={playerMoveSelectedToTrash}
              linkAssault={playerLinkAssault}
              endTurn={playerEndTurn}
            />
          )}

          {activeTab === "opponent" && (
            <OpponentBoard
              deck={opponentDeck}
              hand={opponentHand}
              playArea={opponentPlayArea}
              trashArea={opponentTrashArea}
              tacticsArea={opponentTacticsArea}
              tacticsDeck={opponentTacticsDeck}
              pp={opponentPP}

              drawStartingHand={opponentDrawStartingHand}
              drawCard={opponentDrawCard}
              resetGame={opponentResetGame}
              playCard={opponentPlayCard}
              returnToHand={opponentReturnToHand}
              moveTacticToArea={opponentMoveTacticToArea}
              moveTacticToPlayArea={opponentMoveTacticToPlayArea}
              moveSelectedToTrash={opponentMoveSelectedToTrash}
              linkAssault={opponentLinkAssault}
              endTurn={opponentEndTurn}
            />
          )}
        </>
      )}

      {showPlayerTrash && (
        <div
          className="modal-overlay"
          onClick={() => setShowPlayerTrash(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>トラッシュ履歴</h2>

            {playerTrashHistory.length === 0 ? (
              <p>まだカードはありません</p>
            ) : (
              playerTrashHistory.map((group, index) => (
                <div
                  key={index}
                  className="trash-turn-group"
                >
                  <h3>
                    ターン {group.turn}
                  </h3>

                  <div className="card-row">
                    {group.cards.map((card, i) => (
                      <img
                        key={i}
                        src={card.image_url}
                        alt={card.name}
                        className="modal-card"
                      />
                    ))}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => setShowPlayerTrash(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {showOpponentTrash && (
        <div
          className="modal-overlay"
          onClick={() => setShowOpponentTrash(false)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>トラッシュ履歴</h2>

            {opponentTrashHistory.length === 0 ? (
              <p>まだカードはありません</p>
            ) : (
              opponentTrashHistory.map((group, index) => (
                <div
                  key={index}
                  className="trash-turn-group"
                >
                  <h3>
                    ターン {group.turn}
                  </h3>

                  <div className="card-row">
                    {group.cards.map((card, i) => (
                      <img
                        key={i}
                        src={card.image_url}
                        alt={card.name}
                        className="modal-card"
                      />
                    ))}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => setShowOpponentTrash(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;