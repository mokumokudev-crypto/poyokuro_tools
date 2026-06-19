import { useState, useEffect } from "react";
import localCards from "../data/localCards";
import "./DeckBuilderPage.css";

export default function DeckBuilderPage({ onBack }) {
  const [keyword, setKeyword] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewCard, setPreviewCard] = useState(null);
  const [deckName, setDeckName] = useState("");
  const [savedDecks, setSavedDecks] = useState(
    JSON.parse(localStorage.getItem("savedDecks") || "[]")
  );
  const [bgColor, setBgColor] = useState(
    localStorage.getItem("bgColor") || "#ffffff"
  );
  
  const [selectedDeck, setSelectedDeck] = useState("");
  const [showDeckList, setShowDeckList] = useState(false);

  let pressTimer = null;

  const startPress = (card) => {
    pressTimer = setTimeout(() => {
        setPreviewCard(card);
    }, 500);
  };

  const endPress = () => {
    clearTimeout(pressTimer);
    setPreviewCard(null);
  };

  const [deck, setDeck] = useState({
    leader: [],
    main: [],
    tactics: [],
  });

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness < 128 ? "#ffffff" : "#000000";
  };
  
  const textColor = getTextColor(bgColor);

  const GAS_URL =
    "https://script.google.com/macros/s/AKfycbwYOkMSRnZSLozkLdgDK24qSZcyxuQnbYOiIGr4rvOeYY2fLCrLZIqzx3-vkqVtcvq5bg/exec";
    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
      
        localStorage.setItem("bgColor", bgColor);
      
        return () => {
          document.body.style.backgroundColor = "";
        };
      }, [bgColor]);
      useEffect(() => {
        localStorage.setItem("bgColor", bgColor);
      }, [bgColor]);
// =========================
// カードキャッシュ
// =========================
useEffect(() => {
    const loadCards = async () => {
      try {
        const savedCards = JSON.parse(
          localStorage.getItem("allCards") || "[]"
        );
  
        const lastUpdate =
          Number(localStorage.getItem("allCardsUpdatedAt")) || 0;
  
        const now = Date.now();
  
        // 24時間
        const ONE_DAY = 24 * 60 * 60 * 1000;
  
        // キャッシュが存在し24時間以内
        if (
          savedCards.length > 0 &&
          now - lastUpdate < ONE_DAY
        ) {
          console.log(
            "localStorageからカード読込",
            savedCards.length
          );
  
          return;
        }
  
        console.log("GASからカード再取得");
  
        const res = await fetch(`${GAS_URL}?query=`);
        const data = await res.json();
  
        const gasCards = data.cards || [];
  
        const allCards = [
          ...gasCards,
          ...localCards
        ];
  
        localStorage.setItem(
          "allCards",
          JSON.stringify(allCards)
        );
  
        localStorage.setItem(
          "allCardsUpdatedAt",
          String(now)
        );
  
        console.log(
          "カード保存完了",
          allCards.length
        );
      } catch (err) {
        console.error(err);
      }
    };
  
    loadCards();
  }, []);

  // =========================
  // カード取得
  // =========================
  const getCardType = (card) => {
    return card.card_type?.internal_id;
  };

  const fetchCards = async (type = "") => {
    setLoading(true);
    setCards([]); 
  
    try {
      // =========================
      // マージ
      // =========================
      const allCards = JSON.parse(
        localStorage.getItem("allCards") || "[]"
      );

      let filtered = allCards;
  
      if (type === "leader") {
        filtered = allCards.filter(
          (c) => getCardType(c) === "leader"
        );
      }
  
      if (type === "main") {
        filtered = allCards.filter(
          (c) =>
            (getCardType(c) === "attack" ||
              getCardType(c) === "memoria") &&
            !c.is_ace
        );
      }

      if (type === "leaderMain") {
        filtered = allCards.filter(
          (c) =>
            (getCardType(c) === "attack" ||
              getCardType(c) === "memoria") &&
            !c.is_ace &&
            c.build_rule?.type === "require_leader"
        );
      }

      if (type === "neutral") {
        filtered = allCards.filter(
          (c) =>
            (getCardType(c) === "attack" ||
              getCardType(c) === "memoria") &&
            !c.is_ace &&
            c.build_rule?.type != "require_leader"
        );
      }
  
      if (type === "tactics") {
        filtered = allCards.filter(
          (c) => getCardType(c) === "tactics"
        );
      }
  
      if (type === "ace") {
        filtered = allCards.filter(
          (c) =>
            (getCardType(c) === "attack" ||
              getCardType(c) === "memoria") &&
            c.is_ace
        );
      }

      if (type === "new") {
        filtered = allCards.filter(
          (c) => c.is_new === true
        );
      }

      if (type === "newLeader") {
        filtered = allCards.filter(
          (c) =>
            c.is_new === true &&
            getCardType(c) === "leader"
        );
      }

      if (type === "newAce") {
        filtered = allCards.filter(
          (c) =>
            c.is_new === true &&
            (getCardType(c) === "attack" ||
             getCardType(c) === "memoria") &&
            c.is_ace === true
        );
      }

      if (type === "newMain") {
        filtered = allCards.filter(
          (c) =>
            c.is_new === true &&
            (getCardType(c) === "attack" ||
             getCardType(c) === "memoria") &&
            c.is_ace === false
        );
      }

      if (type === "newLeaderMain") {
        filtered = allCards.filter(
            (c) =>
              c.is_new === true &&
              (getCardType(c) === "attack" ||
                getCardType(c) === "memoria") &&
              !c.is_ace &&
              c.build_rule?.type === "require_leader"
          );
      }

      if (type === "newNeutral") {
        filtered = allCards.filter(
            (c) =>
              c.is_new === true &&
              (getCardType(c) === "attack" ||
                getCardType(c) === "memoria") &&
              !c.is_ace &&
              c.build_rule?.type != "require_leader"
          );
      }

      if (type === "newTactics") {
        filtered = allCards.filter(
          (c) =>
            c.is_new === true &&
            getCardType(c) === "tactics"
        );
      }
  
      setCards(filtered);
    } catch (err) {
      console.error(err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };
  // =========================
  // カード検索
  // =========================
  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(keyword.toLowerCase())
  );
  // =========================
  // 自動分類
  // =========================
    const detectType = (card) => {
    const type = getCardType(card);

    if (type === "leader") {
        return "leader";
    }

    if (type === "tactics") {
        return "tactics";
    }

    return "main";
    };

    const attackCount = deck.main.filter(
        (c) => getCardType(c) === "attack"
    ).length;
      
    const memoriaCount = deck.main.filter(
        (c) => getCardType(c) === "memoria"
    ).length;

  // =========================
  // 枚数制限
  // =========================
  const LIMITS = {
    leader: 4,
    main: 100,
    tactics: 5,
  };

  // =========================
  // デッキ追加
  // =========================
  const addToDeck = (card) => {
    const type = detectType(card);

    setDeck((prev) => {
      const section = prev[type];

      if (section.length >= LIMITS[type]) return prev;

      const sameCount = section.filter(
        (c) => c.id === card.id
      ).length;

      if (sameCount >= 4) return prev;

      return {
        ...prev,
        [type]: [...section, card],
      };
    });
  };

  // =========================
  // デッキ削除
  // =========================
  const removeFromDeck = (type, index) => {
    setDeck((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // =========================
  // デッキ保存
  // =========================
  const saveDeck = () => {
    if (!deckName.trim()) {
      alert("デッキ名を入力してください");
      return;
    }
  
    const savedDecks = JSON.parse(
      localStorage.getItem("savedDecks") || "[]"
    );
  
    const newDeck = {
      name: deckName,
      createdAt: Date.now(),
      deck,
    };
  
    const index = savedDecks.findIndex(
      (d) => d.name === deckName
    );
  
    if (index >= 0) {
      savedDecks[index] = newDeck;
    } else {
      savedDecks.push(newDeck);
    }
  
    localStorage.setItem(
      "savedDecks",
      JSON.stringify(savedDecks)
    );

    setSavedDecks(savedDecks);
  
    alert("デッキを保存しました");
  };

  // =========================
  // デッキ読み込み
  // =========================

  const loadDeck = () => {
    if (!selectedDeck) {
      alert("デッキを選択してください");
      return;
    }
  
    const target = savedDecks.find(
      (d) => d.name === selectedDeck
    );
  
    if (!target) {
      alert("デッキが見つかりません");
      return;
    }
  
    setDeck(target.deck);
  };

  // =========================
  // メイングループ化
  // =========================
  const getGroupedMain = () => {
    const map = new Map();
  
    deck.main.forEach((c) => {
      const key = c.id;
  
      if (!map.has(key)) {
        map.set(key, { card: c, count: 1 });
      } else {
        map.get(key).count += 1;
      }
    });
  
    const grouped = Array.from(map.values());
  
    grouped.sort((a, b) => {
      const getOrder = (card) => {
        const type = getCardType(card);
  
        // エースアタック
        if (card.is_ace && type === "attack") return 1;
  
        // エースメモリア
        if (card.is_ace && type === "memoria") return 2;
  
        // 通常アタック
        if (!card.is_ace && type === "attack") return 3;
  
        // 通常メモリア
        if (!card.is_ace && type === "memoria") return 4;
  
        return 999;
      };
  
      const orderA = getOrder(a.card);
      const orderB = getOrder(b.card);
  
      if (orderA !== orderB) {
        return orderA - orderB;
      }
  
      // 同カテゴリ内は名前順
      return a.card.name.localeCompare(
        b.card.name,
        "ja"
      );
    });

    return grouped;
  };
  return (
    <div
        className="deckBuilder-container"
        style={{
            backgroundColor: bgColor,
            color: textColor,
            minHeight: "100vh"
        }}
    >
      <h1>デッキメーカー</h1>

      <p>
        最終カード一覧更新：
        {
        localStorage.getItem("allCardsUpdatedAt")
            ? new Date(
                Number(
                localStorage.getItem(
                    "allCardsUpdatedAt"
                )
                )
            ).toLocaleString("ja-JP")
            : "未取得"
        }
        <label>
        {"　　"}背景色変更：
        <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
        />
        </label>
        </p>

        <button 
            onClick={async () => {
                const res = await fetch(`${GAS_URL}?query=`);
                const data = await res.json();

                const allCards = [
                ...(data.cards || []),
                ...localCards
                ];

                localStorage.setItem(
                "allCards",
                JSON.stringify(allCards)
                );

                localStorage.setItem(
                "allCardsUpdatedAt",
                String(Date.now())
                );

                setCards(allCards);

                alert("カードデータ更新完了");
            }}
            >
            カード更新
            </button>
            <button onClick={onBack} className="back-button">一人回しへ戻る</button>
      {/* =========================
          検索
      ========================= */}
      <div className="deckBuilder-search">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="カード名検索"
      />

        <button onClick={() => fetchCards("")}>全カード</button>
        <button onClick={() => fetchCards("leader")}>リーダー</button>
        <button onClick={() => fetchCards("ace")}>エース</button>
        <button onClick={() => fetchCards("leaderMain")}>リーダー専用</button>
        <button onClick={() => fetchCards("neutral")}>ニュートラル</button>
        <button onClick={() => fetchCards("main")}>メイン</button>
        <button onClick={() => fetchCards("tactics")}>タクティクス</button>

        <button onClick={() => fetchCards("new")}>新カード全</button>
        <button onClick={() => fetchCards("newLeader")}>新リーダー</button>
        <button onClick={() => fetchCards("newAce")}>新エース</button>
        <button onClick={() => fetchCards("newLeaderMain")}>新リーダー専用</button>
        <button onClick={() => fetchCards("newNeutral")}>新ニュートラル</button>
        <button onClick={() => fetchCards("newMain")}>新メイン</button>
        <button onClick={() => fetchCards("newTactics")}>新タクティクス</button>
      </div>

      {/* =========================
          カード一覧
      ========================= */}
      <div className="deckBuilder-layout">

      <div className="deckBuilder-cardList">
        {loading && <p>読み込み中...</p>}

        {!loading && filteredCards.length === 0 && (
            <p>カードがありません</p>
        )}

        {filteredCards.map((card, index) => (
            <div key={index} className="deckBuilder-cardItem">
            <img
                loading="lazy"
                src={card.image_url}
                alt={card.name}
                className="deckBuilder-cardImage"
                onClick={() => addToDeck(card)}
                onMouseDown={() => startPress(card)}
                onMouseUp={endPress}
                onMouseLeave={endPress}
                onTouchStart={() => startPress(card)}
                onTouchEnd={endPress}
            />
            <div className="deckBuilder-cardName">
                {card.name}
            </div>
            </div>
        ))}
        </div>

        {/* =========================
            デッキ
        ========================= */}
        <div className="deckBuilder-deckEditor">

          {/* Leader */}
          <div className="deck-section">
            <h4>リーダー</h4>

            {deck.leader.map((card, i) => (
              <div key={i} onClick={() => removeFromDeck("leader", i)} className="deck-main-item">
                <img 
                  src={card.image_url} 
                  className="deckBuilder-deckImage" 
                  onMouseDown={() => startPress(card)}
                  onMouseUp={endPress}
                  onMouseLeave={endPress}
                  onTouchStart={() => startPress(card)}
                  onTouchEnd={endPress}
                />
              </div>
            ))}
          </div>

          {/* Main */}
          <div className="deck-section">
            <h4>メイン   
                {deck.main.length}枚 
                Attack: {attackCount}
                {" "}
                Memoria: {memoriaCount}
            </h4>

            {getGroupedMain().map(({ card, count }) => (
              <div key={card.id} className="deck-main-item">

                <img
                  src={card.image_url}
                  className="deckBuilder-deckImage"
                  onMouseDown={() => startPress(card)}
                  onMouseUp={endPress}
                  onMouseLeave={endPress}
                  onTouchStart={() => startPress(card)}
                  onTouchEnd={endPress}
                />

                <div className="deck-count">
                  <button
                    onClick={() =>
                      removeFromDeck(
                        "main",
                        deck.main.findIndex(
                            (c) => c.id === card.id
                        )
                      )
                    }
                  >
                    −
                  </button>

                  <span className="deck-count-number">{count}</span>

                  <button
                    onClick={() => {
                        const sameCount = deck.main.filter(
                            (c) => c.id === card.id
                          ).length;

                      if (sameCount >= 4) return;
                      if (deck.main.length >= 100) return;

                      setDeck((prev) => ({
                        ...prev,
                        main: [...prev.main, card],
                      }));
                    }}
                  >
                    ＋
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tactics */}
          <div className="deck-section">
            <h4>タクティクス</h4>

            {deck.tactics.map((card, i) => (
              <div key={i} onClick={() => removeFromDeck("tactics", i)}>
                <img 
                  src={card.image_url} 
                  className="deckBuilder-deckImage" 
                  onMouseDown={() => startPress(card)}
                  onMouseUp={endPress}
                  onMouseLeave={endPress}
                  onTouchStart={() => startPress(card)}
                  onTouchEnd={endPress}/>
              </div>
            ))}
          </div>

          <div className="deck-save-area">
            <input
                type="text"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="デッキ名"
                className="deck-name-input"
            />

            <button onClick={saveDeck}>
                保存
            </button>
          </div>
          <div className="deck-load-area">
            <select
                value={selectedDeck}
                onChange={(e) => setSelectedDeck(e.target.value)}
            >
                <option value="">
                保存済みデッキを選択
                </option>

                {savedDecks.map((d) => (
                <option key={d.name} value={d.name}>
                    {d.name}
                </option>
                ))}
            </select>

            <button onClick={loadDeck}>
                読込
            </button>
            <button
                onClick={() => setShowDeckList(true)}
                >
                デッキリスト表示
            </button>
          </div>
        </div>
      </div>
      {previewCard && (
        <div className="card-preview-overlay">
            <img
            src={previewCard.image_url}
            alt={previewCard.name}
            className="card-preview-image"
            />
        </div>
        )}
        {showDeckList && (
            <div
                className="deckList-overlay"
                onClick={() => setShowDeckList(false)}
            >
                <div
                className="deckList-modal"
                onClick={(e) => e.stopPropagation()}
                >
                <div className="deckList-content">

                    {/* 左側 */}
                    <div className="deckList-left">

                    {/* Leader */}
                    <div className="deckList-leaderArea">
                        <h1>LEADER</h1>

                        <div className="deckList-leaders">
                        {deck.leader.map((card, i) => (
                            <img
                            key={i}
                            src={card.image_url}
                            alt={card.name}
                            className="deckList-leaderCard"
                            />
                        ))}
                        </div>
                    </div>

                    {/* Main */}
                    <div className="deckList-main">

                        <h1>DECK</h1>

                        <h2>
                        ATTACK: {attackCount}
                        {" "}
                        MEMORIA: {memoriaCount}
                        </h2>

                        <div className="deckList-grid">
                        {getGroupedMain().map(({ card, count }) => (
                            <div
                            key={card.id}
                            className="deckList-cardItem"
                            >
                            <img
                                src={card.image_url}
                                alt={card.name}
                                className="deckList-card"
                            />

                            <div className="deckList-count">
                                × {count}
                            </div>
                            </div>
                        ))}
                        </div>

                    </div>
                    </div>

                    {/* 右側 Tactics */}
                    <div className="deckList-tactics">

                    <h1>TACTICS</h1>

                    {deck.tactics.map((card, i) => (
                        <img
                        key={i}
                        src={card.image_url}
                        alt={card.name}
                        className="deckList-tacticsCard"
                        />
                    ))}

                    </div>

                </div>
                </div>
            </div>
            )}
    </div>
  );
}