import { useState, useEffect } from "react";
import DeckBuilderPage from "./DeckBuilderPage";

import "../App.css";
import LoginPage from "../LoginPage";
import LeaderArea from "../components/LeaderArea";
import PlayerBoard from "../components/PlayerBoard";
import OpponentBoard from "../components/OpponentBoard";
import TacticsArea from "../components/TacticsArea";

const GAS_URL =
"https://script.google.com/macros/s/AKfycbwYOkMSRnZSLozkLdgDK24qSZcyxuQnbYOiIGr4rvOeYY2fLCrLZIqzx3-vkqVtcvq5bg/exec";

export default function SoloToolPage({
    setPage,
    bgColor,
    setBgColor,
    textColor,
  }) {
  const [activeTab, setActiveTab] = useState("player");
  const [deckCode, setDeckCode] = useState("");

  const [playerDeckData, setPlayerDeckData] = useState(null);
  const [opponentDeckData, setOpponentDeckData] = useState(null);
  const [showTacticsModal, setShowTacticsModal] = useState(false);
  const [resetAllHpTrigger, setResetAllHpTrigger] = useState(0);

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
  const [pendingPlayerEquipment, setPendingPlayerEquipment] = useState(null);
  const [pendingOpponentEquipment, setPendingOpponentEquipment] = useState(null);
  const [movingPlayerEquipment, setMovingPlayerEquipment] = useState(null);
  const [movingOpponentEquipment, setMovingOpponentEquipment] = useState(null);
  const [playerEquipment, setPlayerEquipment] = useState({});
  const [opponentEquipment, setOpponentEquipment] = useState({});
  const [round, setRound] = useState(1);
  const [open, setOpen] = useState(false);

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

  const resolveCardsByImage = (cardsFromDeck) => {
    const allCards = JSON.parse(
      localStorage.getItem("allCards") || "[]"
    );
  
    return cardsFromDeck
    .map((c) => {
      const found = allCards.find(
        (local) => local.image_url === c.image_url
      );
  
      return found ? { ...found, type: c.type } : null;
    })
    .filter(Boolean);
  };

  const [savedDecks, setSavedDecks] = useState(
    JSON.parse(
      localStorage.getItem("savedDecks") || "[]"
    )
  );

  const [deckHistory, setDeckHistory] = useState(
    JSON.parse(
      localStorage.getItem("deckHistory") || "[]"
    )
  );
  
  const saveDeckHistory = (code) => {
    if (!code.trim()) return;
  
    const updated = [
      code,
      ...deckHistory.filter((c) => c !== code),
    ].slice(0, 5); // 最新5件だけ
  
    setDeckHistory(updated);
  
    localStorage.setItem(
      "deckHistory",
      JSON.stringify(updated)
    );
  };

  const [selectedDeck, setSelectedDeck] = useState("");
  const loadPlayerDeck = async () => {
    saveDeckHistory(deckCode);

    const res = await fetch(
      `${GAS_URL}?deckCode=${deckCode}`
    );
  
    const data = normalizeData(await res.json());
  
    setPlayerDeckData(data);
    setPlayerDeck(
      [...data.deck].sort(() => Math.random() - 0.5)
    );
    setPlayerTacticsDeck(
        resolveCardsByImage(data.tactics)
    );
  
    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
    setPlayerTacticsArea([]);
    setPlayerPP(0);
    setPlayerTurn(1);
    setPlayerTrashHistory([]);
  };

  const loadOpponentDeck = async () => {
    saveDeckHistory(deckCode);

    const res = await fetch(
      `${GAS_URL}?deckCode=${deckCode}`
    );

    const data = normalizeData(await res.json());

    setOpponentDeckData(data);
    setOpponentDeck(
      [...data.deck].sort(() => Math.random() - 0.5)
    );
    setOpponentTacticsDeck(
      resolveCardsByImage(loaded.tactics)
    );

    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
    setOpponentTacticsArea([]);
    setOpponentPP(0);
    setOpponentTurn(1);
    setOpponentTrashHistory([]);
  };

  const loadSavedPlayerDeck = () => {
    const target = savedDecks.find(
      (d) => d.name === selectedDeck
    );
  
    if (!target) {
      alert("デッキを選択してください");
      return;
    }
  
    const loaded = target.deck;
  
    setPlayerDeck(
      [...loaded.main].sort(
        () => Math.random() - 0.5
      )
    );
  
    setPlayerTacticsDeck(
      [...loaded.tactics]
    );
  
    setPlayerDeckData({
      leaders: loaded.leader,
      tactics: loaded.tactics,
      deck: loaded.main,
    });
  
    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
    setPlayerTacticsArea([]);
    setPlayerPP(0);
    setPlayerTurn(1);
    setPlayerTrashHistory([]);
  };

  const loadSavedOpponentDeck = () => {
    const target = savedDecks.find(
      (d) => d.name === selectedDeck
    );
  
    if (!target) {
      alert("デッキを選択してください");
      return;
    }
  
    const loaded = target.deck;
  
    setOpponentDeck(
      [...loaded.main].sort(
        () => Math.random() - 0.5
      )
    );
  
    setOpponentTacticsDeck(
      [...loaded.tactics]
    );
  
    setOpponentDeckData({
      leaders: loaded.leader,
      tactics: loaded.tactics,
      deck: loaded.main,
    });
  
    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
    setOpponentTacticsArea([]);
    setOpponentPP(0);
    setOpponentTurn(1);
    setOpponentTrashHistory([]);
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
  
    setPlayerTacticsDeck(resolveCardsByImage(playerDeckData.tactics));
    setPlayerTacticsArea([]);

    setPlayerEquipment({}); 
    setPendingPlayerEquipment(null);
    setMovingPlayerEquipment(null);

  
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
    setOpponentTacticsDeck(resolveCardsByImage(opponentDeckData.tactics));
  
    setOpponentTacticsArea([]);
    setOpponentEquipment({}); 
    setPendingOpponentEquipment(null);
    setMovingOpponentEquipment(null);
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

  const playerMoveTacticToArea = (card) => {
    setPlayerTacticsDeck(prev =>
      prev.filter(c => c !== card)
    );
  
    setPlayerTacticsArea(prev => [...prev, card]);
  };

  const opponentMoveTacticToArea = (card) => {
    setOpponentTacticsDeck(prev =>
      prev.filter(c => c !== card)
    );
  
    setOpponentTacticsArea(prev => [...prev, card]);
  };

  const playerMoveTacticToPlayArea = (card) => {
    if (!card) return;
  
    // 装備タクティクス
    if (card.tactics_type === "equipment") {
      setPendingPlayerEquipment({ card });
  
      setShowTacticsModal(false);
  
      return;
    }
  
    // 通常タクティクス
    setPlayerPlayArea((prev) => [...prev, card]);
  
    setPlayerTacticsArea((prev) =>
      prev.filter((c) => c.id !== card.id)
    );

    setShowTacticsModal(false);
  };

  const opponentMoveTacticToPlayArea = (card) => {
    if (!card) return;
  
    setOpponentPlayArea((prev) => [...prev, card]);
  
    setOpponentTacticsArea((prev) =>
      prev.filter((c) => c.id !== card.id)
    );
  
    setShowTactics(false); // もし共有モーダルなら
  };

  const handlePlayerLeaderClick = (leaderId) => {
    // ① 装備
    if (pendingPlayerEquipment) {
      setPlayerEquipment(prev => {
        const current = prev[leaderId] || [];
    
        // 5枚制限
        if (current.length >= 5) {
          return prev;
        }
    
        return {
          ...prev,
          [leaderId]: [...current, pendingPlayerEquipment.card],
        };
      });
    
      setPlayerTacticsArea(prev =>
        prev.filter(c => c !== pendingPlayerEquipment.card)
      );
    
      setPendingPlayerEquipment(null);
      return;
    }
  
    // ② 移動
    if (movingPlayerEquipment) {
      setPlayerEquipment(prev => {
        const fromList = prev[movingPlayerEquipment.from] || [];
        const toList = prev[leaderId] || [];
    
        return {
          ...prev,
          [movingPlayerEquipment.from]:
            fromList.filter(c => c !== movingPlayerEquipment.card),
    
          [leaderId]:
            toList.length < 5
              ? [...toList, movingPlayerEquipment.card]
              : toList,
        };
      });
    
      setMovingPlayerEquipment(null);
    }
  };

  const endRound = () => {
    // プレイヤー
    if (playerPlayArea.length > 0) {
      setPlayerTrashHistory((prev) => [
        ...prev,
        {
          turn: playerTurn,
          round,
          label: `${playerTurn}ターン目（${round}ラウンド目終了）`,
          cards: [...playerPlayArea],
        },
      ]);
    }

    setPlayerTrashArea((prev) => [...prev, ...playerPlayArea]);
    setPlayerPlayArea([]);

    // 相手
    if (opponentPlayArea.length > 0) {
      setOpponentTrashHistory((prev) => [
        ...prev,
        {
          turn: opponentTurn,
          round,
          label: `${opponentTurn}ターン目（${round}ラウンド目終了）`,
          cards: [...opponentPlayArea],
        },
      ]);
    }

    setOpponentTrashArea((prev) => [...prev, ...opponentPlayArea]);
    setOpponentPlayArea([]);

    // ラウンド進行
    setRound((prev) => prev + 1);

    // HPリセットトリガー
    setResetAllHpTrigger((v) => v + 1);
  };

  return (
    
    <div 
      className="app-container"
      style={{
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
    }}>
      <h1 style={{ color: textColor }}>クロススターズ 一人回しツール</h1>
      <p>
        背景色変更：
        <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
        />
      </p>
      <div className="menu-buttons">

        <button onClick={()=>setPage("builder")}>
          デッキメーカーへ
        </button>
      </div>
      

      <div className="deck-load-area">
        <div className="deck-input-wrapper">
        <input
          value={deckCode}
          onChange={(e) => setDeckCode(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="デッキコード"
        />

        {open && deckHistory.length > 0 && (
          <div className="deck-dropdown">
            {deckHistory.map((code) => (
              <div
                key={code}
                className="deck-dropdown-item"
                onClick={() => {
                  setDeckCode(code);
                  setOpen(false);
                }}
              >
                {code}
              </div>
            ))}
          </div>
        )}
      </div>

      <datalist id="deck-history">
        {deckHistory.map((code) => (
          <option key={code} value={code} />
        ))}
      </datalist>

        <button onClick={loadPlayerDeck}>
          自分読込
        </button>

        <button onClick={loadOpponentDeck}>
          相手読込
        </button>
      </div>

      <div className="deck-load-area">
        <select
          value={selectedDeck}
          onChange={(e) =>
            setSelectedDeck(e.target.value)
          }
        >
          <option value="">
            保存済みデッキ
          </option>

          {savedDecks.map((d) => (
            <option
              key={d.name}
              value={d.name}
            >
              {d.name}
            </option>
          ))}
        </select>

        <button onClick={loadSavedPlayerDeck}>
          自分読込
        </button>

        <button onClick={loadSavedOpponentDeck}>
          相手読込
        </button>
      </div>
      

      {(playerDeckData || opponentDeckData) && (
        <>
          <div className="leader-layout">
            <div className="leader-content">
              <LeaderArea
                leaders={playerDeckData?.leaders || []}
                opponentLeaders={
                  opponentDeckData?.leaders || []
                }

                playerEquipment={playerEquipment}
                setPlayerEquipment={setPlayerEquipment}
              
                pendingPlayerEquipment={pendingPlayerEquipment}
                setPendingPlayerEquipment={setPendingPlayerEquipment}
              
                movingPlayerEquipment={movingPlayerEquipment}
                setMovingPlayerEquipment={setMovingPlayerEquipment}
              
                onLeaderClick={handlePlayerLeaderClick}
                resetAllHpTrigger={resetAllHpTrigger}
              />
            </div>

            <div className="tab-buttons">
              <button
                onClick={() => setActiveTab("player")}
              >
                自分盤面
              </button>

              <button
                onClick={() => setActiveTab("opponent")}
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
              pendingPlayerEquipment={pendingPlayerEquipment}
              setPendingPlayerEquipment={setPendingPlayerEquipment}
              pp={playerPP}
              setDeck={setPlayerDeck}
              setPlayArea={setPlayerPlayArea}
              setTrashArea={setPlayerTrashArea}
              onOpenTactics={() => setShowTacticsModal(true)}

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
              endRound={endRound}
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
              pendingPlayerEquipment={pendingPlayerEquipment}
              setPendingPlayerEquipment={setPendingPlayerEquipment}
              pp={opponentPP}
              onOpenTactics={() => setShowTacticsModal(true)}

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
              endRound={endRound}
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
                    {group.label ?? ` ${group.turn}ターン目`}
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
      {showTacticsModal && (
        <div className="modal-overlay" onClick={() => setShowTacticsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>タクティクス</h2>

            <TacticsArea
              title="タクティクスエリア"
              tactics={playerTacticsArea}
              onClickTactic={playerMoveTacticToPlayArea}
            />

            <TacticsArea
              title="タクティクスデッキ"
              tactics={playerTacticsDeck}
              onClickTactic={playerMoveTacticToArea}
            />

            <button onClick={() => setShowTacticsModal(false)}>
              閉じる
            </button>
          </div>
        </div>
      )}
      {pendingPlayerEquipment && (
        <div className="state-banner">
          装備するリーダーを選択してください
        </div>
      )}

      {movingPlayerEquipment && (
        <div className="state-banner">
          移動先のリーダーを選択してください
        </div>
      )}
    </div>
  );
}
;