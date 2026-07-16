import { useState, useEffect } from "react";
import HistoryCardSelectModal from "../components/HistoryCardSelectModal";
import PresetModal from "../components/PresetModal";
import "./MatchHistoryPage.css";

export default function MatchHistoryPage({   
    setPage,
    bgColor,
    textColor, }) {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [eventName, setEventName] = useState("");
  const [opponentLeaders, setOpponentLeaders] = useState([]);
  const [opponentAces, setOpponentAces] = useState([]);
  const [opponentTactics, setOpponentTactics] = useState([]);
  const [memo, setMemo] = useState("");
  const [presets, setPresets] = useState([]);
  const [deckPresets, setDeckPresets] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [firstPlayer, setFirstPlayer] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [showCardModal, setShowCardModal] = useState(false);
  const [selectMode, setSelectMode] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [selectedOpponentPreset, setSelectedOpponentPreset] =
  useState("");
  const [opponentPresets, setOpponentPresets] =
  useState([]);
  const [selectedDeckPreset, setSelectedDeckPreset] =
  useState("");
  const [historyDate, setHistoryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [rounds, setRounds] = useState([
    {
      round: 1,
      result: "",
      playerTactics: [],
      opponentTactics: [],
    },
    {
      round: 2,
      result: "",
      playerTactics: [],
      opponentTactics: [],
    },
    {
      round: 3,
      result: "",
      playerTactics: [],
      opponentTactics: [],
    },
  ]);

  const filteredHistory =
  historyList.filter(
    (history) =>
      history.date === historyDate
  );

  function reloadPresets() {
    setDeckPresets(
      JSON.parse(
        localStorage.getItem("deckNamePresets")
      ) || []
    );
  
    setOpponentPresets(
      JSON.parse(
        localStorage.getItem("matchPresets")
      ) || []
    );
  }
  
  useEffect(() => {
    const history =
      JSON.parse(localStorage.getItem("matchHistory")) || [];
  
    setHistoryList(history);
  
    const cards =
      JSON.parse(localStorage.getItem("allCards")) || [];
  
    setAllCards(cards);

    reloadPresets();

  }, []);

  function openLeaderSelector() {
    setModalTitle("相手リーダー");
    setSelectMode({
      type: "leader",
    });
    setShowCardModal(true);
  }
  
  function openAceSelector() {
    setModalTitle("相手エース");
    setSelectMode({
      type: "ace",
    });
    setShowCardModal(true);
  }

  function saveDeckPreset() {
    if (!deckName.trim()) return;
  
    if (deckPresets.includes(deckName)) return;
  
    const list = [...deckPresets, deckName];
  
    localStorage.setItem(
      "deckNamePresets",
      JSON.stringify(list)
    );
  
    setDeckPresets(list);
  }

  function addPlayerRoundTactic(roundIndex, card) {
    const newRounds = [...rounds];  
    newRounds[roundIndex].playerTactics.push(card);
    setRounds(newRounds);
  }

  function addOpponentRoundTactic(roundIndex, card) {
    const newRounds = [...rounds];
    newRounds[roundIndex].opponentTactics.push(card);
    setRounds(newRounds);
  }

  function removePlayerRoundTactic(roundIndex, cardIndex) {
    const newRounds = [...rounds];
    newRounds[roundIndex].playerTactics.splice(cardIndex, 1);
    setRounds(newRounds);
  }

  function removeOpponentRoundTactic(roundIndex, cardIndex) {
    const newRounds = [...rounds];
    newRounds[roundIndex].opponentTactics.splice(cardIndex, 1);
    setRounds(newRounds);
  }

  function updateRound(roundIndex, key, value) {
    const newRounds = [...rounds];
    newRounds[roundIndex][key] = value;
    setRounds(newRounds);
  }

  const handleSelectCard = (card) => {
    console.log(card);
    if (!selectMode) return;
  
    // 相手リーダー
    if (selectMode.type === "leader") {
        setOpponentLeaders((prev) => {
            if (prev.some((c) => c.id === card.id)) {
              // 選択済みなら解除
              return prev.filter((c) => c.id !== card.id);
            }
          
            if (prev.length >= 4) return prev;
          
            return [...prev, card];
          });
    }
  
    // 相手エース
    else if (selectMode.type === "ace") {
        setOpponentAces((prev) => {
            if (prev.some((c) => c.id === card.id)) {
              return prev.filter((c) => c.id !== card.id);
            }
          
            if (prev.length >= 4) return prev;
          
            return [...prev, card];
          });
    }
  
    // ラウンドタクティクス
    else if (selectMode.type === "roundTactics") {
      setRounds((prev) =>
        prev.map((round, index) => {
          if (index !== selectMode.roundIndex) return round;
  
          const key =
            selectMode.side === "player"
              ? "playerTactics"
              : "opponentTactics";
  
          const list = round[key];
  
          if (list.some((c) => c.id === card.id)) {
            return {
              ...round,
              [key]: list.filter((c) => c.id !== card.id),
            };
          }
  
          if (list.length >= 4) {
            return round;
          }
  
          return {
            ...round,
            [key]: [...list, card],
          };
        })
      );
    }
  };

  function saveHistory() {
    const newHistory = {
      id: Date.now(),
      date,
      eventName,
      deckName,
      firstPlayer,
      opponentLeaders,
      opponentAces,
      opponentTactics,
      rounds,
      memo,
      uploaded: false,
      createdAt: Date.now(),
    };
  
    const history =
      JSON.parse(localStorage.getItem("matchHistory")) || [];
  
    history.unshift(newHistory);
  
    localStorage.setItem(
      "matchHistory",
      JSON.stringify(history)
    );
  
    setHistoryList(history);

    // ===== 保存後リセット =====

    setDate(
    new Date().toISOString().split("T")[0]
    );

    setEventName("");

    setDeckName("");

    setOpponentLeaders([]);

    setOpponentAces([]);

    setOpponentTactics([]);

    setFirstPlayer("");

    setRounds([
    {
        round: 1,
        result: "",
        playerTactics: [],
        opponentTactics: [],
    },
    {
        round: 2,
        result: "",
        playerTactics: [],
        opponentTactics: [],
    },
    {
        round: 3,
        result: "",
        playerTactics: [],
        opponentTactics: [],
    },
    ]);

    setMemo("");

    setSelectedOpponentPreset("");

    setSelectedDeckPreset("");

    alert("保存しました");
  }

  async function copyHistory(history) {
    const roundsText = history.rounds
    .map((round) => {
      const lines = [];
  
      lines.push(`${round.round}R：${round.result || "-"}`);
  
      if (round.playerTactics.length > 0) {
        lines.push(
          `  自分タクティクス：${round.playerTactics
            .map((c) => c.name)
            .join("、")}`
        );
      }
  
      if (round.opponentTactics.length > 0) {
        lines.push(
          `  相手タクティクス：${round.opponentTactics
            .map((c) => c.name)
            .join("、")}`
        );
      }
  
      return lines.join("\n");
    })
    .join("\n\n");

    const lines = [];

lines.push("【対戦履歴】");
lines.push("");

lines.push(`日付：${history.date}  大会：${history.eventName}`);
lines.push(`使用デッキ：${history.deckName}`);
lines.push(`先攻後攻：${history.firstPlayer}`);
lines.push("");

lines.push("■相手リーダー");
lines.push(history.opponentLeaders.map(c => c.name).join("、"));
lines.push("");

lines.push("■相手エース");
lines.push(history.opponentAces.map(c => c.name).join("、"));
lines.push("");

lines.push("■試合内容");
lines.push(roundsText);
lines.push("");

lines.push("■メモ");
lines.push(history.memo || "");

const text = lines.join("\n");
  
    try {
      await navigator.clipboard.writeText(text);
      alert("コピーしました");
    } catch {
      alert("コピーに失敗しました");
    }
  }

  return (
    <div className="match-history-page">
      <div className="page-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <button onClick={() => setPage("home")}>
            ← 戻る
          </button>

          <button
            onClick={() => setShowPresetModal(true)}
            className="preset-btn"
          >
            プリセット管理
          </button>
        </div>

        <h1
          style={{
            color: textColor,
            textAlign: "center",
            margin: 0,
          }}
        >
          対戦履歴
        </h1>
      </div>
      {/* 日付 */}
      <section className="section">
        <h3>日付</h3>

        <div
            style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
            }}
        >
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />

            <input
                type="text"
                name="eventName"
                autoComplete="on"
                value={eventName}
                onChange={(e) =>
                setEventName(e.target.value)
                }
                placeholder="大会名・店舗名など"
                style={{
                flex: 1,
                minWidth: 180,
                }}
            />


        </div>
        </section>

        <section className="section">
            <h3>自分のデッキ</h3>

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
                >
                <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="デッキ名を入力してください"
                    style={{
                    flex: 1,
                    minWidth: 180,
                    }}
                />

                <select
                    value={selectedDeckPreset}
                    onChange={(e) => {
                    const name = e.target.value;

                    setSelectedDeckPreset(name);

                    if (!name) return;

                    setDeckName(name);
                    }}
                    style={{
                    width: 180,
                    }}
                >
                    <option value="">
                    プリセットから選択
                    </option>

                    {deckPresets.map((preset) => (
                    <option
                        key={preset.id}
                        value={preset.name}
                    >
                        {preset.name}
                    </option>
                    ))}
                </select>
                </div>
        </section>

      {/* 相手リーダー */}
      <section className="section">
        <h3>相手リーダー</h3>

        <button onClick={openLeaderSelector} className="select-btn">
          リーダーを選択
        </button>

        <select
            value={selectedOpponentPreset}
            onChange={(e)=>{

                const name = e.target.value;

                setSelectedOpponentPreset(name);

                if(!name) return;


                const presets =
                JSON.parse(
                    localStorage.getItem("matchPresets")
                ) || [];


                const preset =
                presets.find(
                    (p)=>p.name === name
                );


                if(!preset) return;


                setOpponentLeaders(
                preset.leaders || []
                );

                setOpponentAces(
                preset.aces || []
                );

            }}
            >
            <option value="">
                プリセットから選択
            </option>


            {opponentPresets.map((preset)=>(
                <option
                key={preset.id}
                value={preset.name}
                >
                {preset.name}
                </option>
            ))}

        </select>

        <div
        className="selected-cards"
        style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            marginTop: 10,
        }}
        >
        {opponentLeaders.map((card, index) => (
            <img
            key={index}
            src={card.image_url}
            alt={card.name}
            title={card.name}
            width={70}
            />
        ))}
        </div>
      </section>

      {/* 相手エース */}
      <section className="section" >
        <h3>相手エース</h3>

        <button onClick={openAceSelector} className="select-btn">
          エースを選択
        </button>

        <div
        className="selected-cards"
        style={{
            display: "flex",
            gap: 5,
            flexWrap: "wrap",
            marginTop: 10,
        }}
        >
        {opponentAces.map((card, index) => (
            <img
            key={index}
            src={card.image_url}
            alt={card.name}
            title={card.name}
            width={70}
            />
        ))}
        </div>
      </section>

      {/* タクティクス */}
      {/*
      <section className="section">
        <h3>タクティクス</h3>

        <button>
          タクティクス追加
        </button>

        <div className="selected-list">
          
        </div>   
      </section>
      */}

      {/* ラウンド */}
      <section className="section">
        
        <section className="section">
        <button
            onClick={() => setFirstPlayer("先攻")}
            style={{
            background:
                firstPlayer === "先攻"
                ? "#87cefa"
                : "",
            marginRight: 10,
            }}
        >
            先攻
        </button>

        <button
            onClick={() => setFirstPlayer("後攻")}
            style={{
            background:
                firstPlayer === "後攻"
                ? "#87cefa"
                : "",
            }}
        >
            後攻
        </button>
        </section>
        {rounds.map((round, index) => (
            <div
            key={round.round}
            className="round-card"
            style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
            }}
            >
            <h4  style={{
              margin: "0 0 10px 0",
            }}>{round.round}R</h4>
            
            <div style={{ marginBottom: 10 }}>
                <strong>勝敗</strong>
                <br />

                <button
                onClick={() =>
                    updateRound(index, "result", "〇")
                }
                style={{
                    background:
                    round.result === "〇"
                        ? "#90ee90"
                        : "",
                }}
                >
                〇 勝ち
                </button>

                <button
                onClick={() =>
                    updateRound(index, "result", "×")
                }
                style={{
                    marginLeft: 10,
                    background:
                    round.result === "×"
                        ? "#ffb6b6"
                        : "",
                }}
                >
                × 負け
                </button>
            </div>

            <div
            style={{
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
                marginTop: 10,
            }}
            >
            {/* 自分 */}
            <div style={{ flex: 1 }}>
                <strong>自分のタクティクス</strong>
                <br />

                <button
                onClick={() => {
                    setModalTitle("自分のタクティクス");
                    setSelectMode({
                    type: "roundTactics",
                    roundIndex: index,
                    side: "player",
                    });
                    setShowCardModal(true);
                }}
                >
                ＋追加
                </button>

                <div
                style={{
                    display: "flex",
                    gap: 5,
                    marginTop: 5,
                    flexWrap: "wrap",
                }}
                >
                {round.playerTactics.map((card, i) => (
                    <img
                    key={i}
                    src={card.image_url}
                    alt=""
                    width={60}
                    />
                ))}
                </div>
            </div>

            {/* 相手 */}
            <div style={{ flex: 1 }}>
                <strong>相手のタクティクス</strong>
                <br />

                <button
                onClick={() => {
                    setModalTitle("相手のタクティクス");
                    setSelectMode({
                    type: "roundTactics",
                    roundIndex: index,
                    side: "opponent",
                    });
                    setShowCardModal(true);
                }}
                >
                ＋追加
                </button>

                <div
                style={{
                    display: "flex",
                    gap: 5,
                    marginTop: 5,
                    flexWrap: "wrap",
                }}
                >
                {round.opponentTactics.map((card, i) => (
                    <img
                    key={i}
                    src={card.image_url}
                    alt=""
                    width={60}
                    />
                ))}
                </div>
            </div>
            </div>
            </div>
        ))}
        </section>

      {/* メモ */}
      <section className="section">
        <h3>メモ</h3>

        <textarea
            rows={5}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="自由に記入してください"
            style={{
                width: "90vw",
                height: "20vh",
                boxSizing: "border-box",
                resize: "vertical",
              }}
        />
      </section>

      {/* ボタン */}
      <section className="section">
        <button onClick={saveHistory}>
          保存
        </button>
{/*
        <button>
          サーバーへ反映
        </button>*/}
      </section>

      {/* 履歴一覧 */}
      <section className="section">
        <h3>保存済み履歴</h3>
        <input
            type="date"
            value={historyDate}
            onChange={(e)=>
            setHistoryDate(e.target.value)
            }
        />
        <div className="history-list">

        {filteredHistory.length === 0 && (
        <p>
            この日の履歴はありません
        </p>
        )}
        {filteredHistory.map((history) => (
            <div
            key={history.id}
            className="history-card"
            style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
            }}
            >

            {/* 日付 + 大会名 */}
            
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                    display: "flex",
                    gap: 15,
                    alignItems: "center",
                    flexWrap: "wrap",
                    }}
                >
                    <strong>
                    {history.date}
                    </strong>

                    {history.eventName && (
                    <span>
                        大会：{history.eventName}
                    </span>
                    )}
                </div>

                <button
                    onClick={() => copyHistory(history)}
                >
                    📋コピー
                </button>
            </div>


            {/* リーダー */}
            <div style={{ marginTop: 10 }}>
                <strong>
                相手リーダー
                </strong>

                <div
                style={{
                    display:"flex",
                    gap:5,
                    flexWrap:"wrap",
                    marginTop:5,
                }}
                >
                {history.opponentLeaders.map(
                    (card,index)=>(
                    <img
                        key={index}
                        src={card.image_url}
                        alt={card.name}
                        title={card.name}
                        width={60}
                    />
                    )
                )}
                </div>
            </div>


            {/* エース */}
            <div
                style={{
                marginTop:10,
                }}
            >
                <strong>
                相手エース
                </strong>

                <div
                style={{
                    display:"flex",
                    gap:5,
                    flexWrap:"wrap",
                    marginTop:5,
                }}
                >
                {history.opponentAces.map(
                    (card,index)=>(
                    <img
                        key={index}
                        src={card.image_url}
                        alt={card.name}
                        title={card.name}
                        width={60}
                    />
                    )
                )}
                </div>
            </div>



            {/* ラウンドタイトル + 先攻後攻 */}
            <div
                style={{
                display:"flex",
                gap:15,
                alignItems:"center",
                marginTop:15,
                flexWrap:"wrap",
                }}
            >
                <strong>
                ラウンド結果
                </strong>

                <span>
                先攻後攻：
                {history.firstPlayer || "未入力"}
                </span>
            </div>



            {/* ラウンド */}
            {history.rounds.map(
                (round)=>(
                <div
                    key={round.round}
                    style={{
                    marginTop:8,
                    padding:8,
                    borderRadius:5,
                    border: `1px solid ${textColor}`,
                    }}
                >

                    {/* ラウンド数 + 結果 */}
                    <div
                    style={{
                        display:"flex",
                        gap:15,
                        alignItems:"center",
                    }}
                    >
                    <strong>
                        {round.round}R
                    </strong>

                    <span>
                        結果：
                        {round.result || "未入力"}
                    </span>
                    </div>



                    {/* タクティクス横並び */}
                    <div
                    style={{
                        display:"flex",
                        gap:20,
                        marginTop:10,
                    }}
                    >

                    {/* 自分 */}
                    <div style={{ flex:1 }}>
                        <strong>
                        自分タクティクス
                        </strong>

                        <div
                        style={{
                            display:"flex",
                            gap:5,
                            flexWrap:"wrap",
                            marginTop:5,
                        }}
                        >
                        {round.playerTactics.map(
                            (card,index)=>(
                            <img
                                key={index}
                                src={card.image_url}
                                width={50}
                                alt=""
                            />
                            )
                        )}
                        </div>
                    </div>



                    {/* 相手 */}
                    <div style={{ flex:1 }}>
                        <strong>
                        相手タクティクス
                        </strong>

                        <div
                        style={{
                            display:"flex",
                            gap:5,
                            flexWrap:"wrap",
                            marginTop:5,
                        }}
                        >
                        {round.opponentTactics.map(
                            (card,index)=>(
                            <img
                                key={index}
                                src={card.image_url}
                                width={50}
                                alt=""
                            />
                            )
                        )}
                        </div>
                    </div>

                    </div>

                </div>
                )
            )}



            {/* メモ */}
            {history.memo && (
                <div
                style={{
                    marginTop:10,
                }}
                >
                <strong>
                    メモ
                </strong>

                <div>
                    {history.memo}
                </div>
                </div>
            )}

        </div>
        ))}
        </div>
      </section>

    <HistoryCardSelectModal
        open={showCardModal}
        cards={allCards}
        mode={selectMode}
        title={modalTitle}
        bgColor={bgColor}
        textColor={textColor}
        onClose={() => setShowCardModal(false)}
        onSelect={handleSelectCard}
        selectedCards={
            selectMode?.type === "leader"
              ? opponentLeaders
              : selectMode?.type === "ace"
              ? opponentAces
              : selectMode?.type === "roundTactics"
              ? rounds[selectMode.roundIndex]?.[
                  selectMode.side === "player"
                    ? "playerTactics"
                    : "opponentTactics"
                ] || []
              : []
          }
    />
    <PresetModal
        open={showPresetModal}
        onClose={() => setShowPresetModal(false)}

        bgColor={bgColor}
        textColor={textColor}

        deckName={deckName}
        setDeckName={setDeckName}

        opponentLeaders={opponentLeaders}
        setOpponentLeaders={setOpponentLeaders}

        opponentAces={opponentAces}
        setOpponentAces={setOpponentAces}

        allCards={allCards}
    />
    </div>
    
  );
}