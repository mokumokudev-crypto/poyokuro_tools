import { useEffect, useState } from "react";
import HistoryCardSelectModal from "./HistoryCardSelectModal";

export default function PresetModal({
  open,
  onClose,

  bgColor,
  textColor,

  deckName,
  setDeckName,

  opponentLeaders,
  setOpponentLeaders,

  opponentAces,
  setOpponentAces,

  allCards,
}) {
  const [deckPresets, setDeckPresets] = useState([]);
  const [opponentPresets, setOpponentPresets] = useState([]);

  const [deckInput, setDeckInput] = useState("");

  const [presetName, setPresetName] = useState("");

  const [presetLeaders, setPresetLeaders] = useState([]);
  const [presetAces, setPresetAces] = useState([]);

  const [showCardModal, setShowCardModal] =
    useState(false);

  const [selectMode, setSelectMode] =
    useState("");

  const [modalTitle, setModalTitle] =
    useState("");
  const [deleteMode, setDeleteMode] = useState(false);  
  const [deleteType, setDeleteType] = useState("");
  const [checkedDecks, setCheckedDecks] = useState([]);
  const [checkedOpponents, setCheckedOpponents] = useState([]);
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
    if (!open) return;
  
    setDeckInput("");
    setPresetName("");
  
    setPresetLeaders([]);
    setPresetAces([]);
  
    reloadPresets();
  
  }, [open]);

  if (!open) return null;
  function resetOpponentPreset() {
    setPresetLeaders([]);
    setPresetAces([]);
  }

  function saveDeckPreset() {
    if (!deckInput.trim()) {
      alert("デッキ名を入力してください");
      return;
    }

    const list = [...deckPresets];

    const index = list.findIndex(
      (x) => x.name === deckInput.trim()
    );

    if (index >= 0) {
      if (
        !window.confirm(
          "上書きしますか？"
        )
      )
        return;

      list[index].name = deckInput.trim();
    } else {
      list.push({
        id: Date.now(),
        name: deckInput.trim(),
      });
    }

    localStorage.setItem(
      "deckNamePresets",
      JSON.stringify(list)
    );

    reloadPresets();

    alert("保存しました");
  }
  
  function saveOpponentPreset() {
    if (!presetName.trim()) {
      alert("プリセット名を入力してください");
      return;
    }

    // リーダーもエースも未選択なら保存不可
    if (
        presetLeaders.length === 0 &&
        presetAces.length === 0
    ) {
        alert("リーダーまたはエースを選択してください");
        return;
    }

    const list = [...opponentPresets];

    const index = list.findIndex(
      (x) => x.name === presetName.trim()
    );

    const preset = {
      id:
        index >= 0
          ? list[index].id
          : Date.now(),
      name: presetName.trim(),
      leaders: presetLeaders,
      aces: presetAces,
    };

    if (index >= 0) {
      if (!window.confirm("上書きしますか？"))
        return;

      list[index] = preset;
    } else {
      list.push(preset);
    }

    localStorage.setItem(
      "matchPresets",
      JSON.stringify(list)
    );

    reloadPresets();

    alert("保存しました");
  }

  function openLeaderSelector() {
    setModalTitle("リーダー選択");

    setSelectMode("leader");

    setShowCardModal(true);
  }

  function openAceSelector() {
    setModalTitle("エース選択");

    setSelectMode("ace");

    setShowCardModal(true);
  }

  function toggleDeck(name) {
    setCheckedDecks((prev) =>
      prev.includes(name)
        ? prev.filter((x) => x !== name)
        : [...prev, name]
    );
  }
  
  function toggleOpponent(name) {
    setCheckedOpponents((prev) =>
      prev.includes(name)
        ? prev.filter((x) => x !== name)
        : [...prev, name]
    );
  }

  function deleteCheckedPresets() {

    if (
      !window.confirm("選択したプリセットを削除しますか？")
    ) {
      return;
    }
  
    const deckList = deckPresets.filter(
      (item) => !checkedDecks.includes(item.name)
    );
  
    const opponentList = opponentPresets.filter(
      (item) => !checkedOpponents.includes(item.name)
    );
  
    localStorage.setItem(
      "deckNamePresets",
      JSON.stringify(deckList)
    );
  
    localStorage.setItem(
      "matchPresets",
      JSON.stringify(opponentList)
    );
  
    setDeckPresets(deckList);
    setOpponentPresets(opponentList);
  
    setCheckedDecks([]);
    setCheckedOpponents([]);

    reloadPresets();
  
    setDeleteMode(false);
  
    alert("削除しました");
  }
  
  function handleSelectCard(card) {
    if (selectMode === "leader") {
      setPresetLeaders((prev) => {
        if (prev.some((c) => c.id === card.id)) {
          return prev.filter(
            (c) => c.id !== card.id
          );
        }

        if (prev.length >= 4) return prev;

        return [...prev, card];
      });

      return;
    }

    if (selectMode === "ace") {
      setPresetAces((prev) => {
        if (prev.some((c) => c.id === card.id)) {
          return prev.filter(
            (c) => c.id !== card.id
          );
        }

        if (prev.length >= 4) return prev;

        return [...prev, card];
      });
    }
  }  return (
    <>
    <div
    style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 20,
        overflowY: "auto",
        zIndex: 9999,
    }}
    >
        <div
          style={{
            width: "95%",
            maxWidth: 700,
            maxHeight: "90vh",
            overflowY: "auto",
            background: bgColor,
            color: textColor,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <h2>プリセット管理</h2>

          {/* ==========================
              自分のデッキ
          ========================== */}

          <h3>自分のデッキ</h3>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <input
              style={{ flex: 1 }}
              value={deckInput}
              onChange={(e) =>
                setDeckInput(e.target.value)
              }
            />

            <button onClick={saveDeckPreset}>
              登録
            </button>
          </div>

          <hr />

          {/* ==========================
              相手プリセット
          ========================== */}

          <h3>相手プリセット</h3>

          <input
            style={{
              width: "100%",
              marginBottom: 10,
              boxSizing: "border-box",
            }}
            placeholder="プリセット名"
            value={presetName}
            onChange={(e) =>
              setPresetName(e.target.value)
            }
          />

          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >
                <strong>リーダー</strong>

                <button
                  onClick={
                    openLeaderSelector
                  }
                >
                  リーダー選択
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  marginTop: 10,
                }}
              >
                {presetLeaders.map(
                  (card, i) => (
                    <img
                      key={i}
                      src={card.image_url}
                      width={60}
                      alt=""
                    />
                  )
                )}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                }}
              >
                <strong>エース</strong>

                <button
                  onClick={
                    openAceSelector
                  }
                >
                  エース選択
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  marginTop: 10,
                }}
              >
                {presetAces.map(
                  (card, i) => (
                    <img
                      key={i}
                      src={card.image_url}
                      width={60}
                      alt=""
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              marginBottom: 20,
            }}
            onClick={saveOpponentPreset}
          >
            登録
          </button>
            <button
            onClick={()=>{
            setDeleteMode(true);
            }}
            >
            プリセット削除
            </button>
            <button
                style={{
                flex: 1,
                }}
                onClick={resetOpponentPreset}
            >
                リセット
            </button>
          
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 20,
            }}
          >

            <button
              style={{ flex: 1 }}
              onClick={onClose}
            >
              閉じる
            </button>
          </div>
        </div>
      </div>

      <HistoryCardSelectModal
        open={showCardModal}
        cards={allCards}
        mode={
          selectMode === "leader"
            ? { type: "leader" }
            : { type: "ace" }
        }
        title={modalTitle}
        onClose={() =>
          setShowCardModal(false)
        }
        bgColor={bgColor}
        textColor={textColor}
        onSelect={handleSelectCard}
        selectedCards={
          selectMode === "leader"
            ? presetLeaders
            : presetAces
        }
      />
      {deleteMode && (
        <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10000,
        }}
      >
        <div
          style={{
            background: bgColor,
            color: textColor,
            padding: 20,
            borderRadius: 10,
            width: 700,
          }}
        >
          <h2>プリセット削除</h2>
      
          <div
            style={{
              display: "flex",
              gap: 30,
            }}
          >
            {/* 左 */}
            <div style={{ flex: 1 }}>
              <h3>自分のデッキ</h3>
      
              {deckPresets.map((item) => (
                <label
                  key={item.id}
                  style={{ display: "block" }}
                >
                  <input
                    type="checkbox"
                    checked={checkedDecks.includes(item.name)}
                    onChange={() =>
                      toggleDeck(item.name)
                    }
                  />
      
                  {item.name}
                </label>
              ))}
            </div>
      
            {/* 右 */}
            <div style={{ flex: 1 }}>
              <h3>相手プリセット</h3>
      
              {opponentPresets.map((item) => (
                <label
                  key={item.id}
                  style={{ display: "block" }}
                >
                  <input
                    type="checkbox"
                    checked={checkedOpponents.includes(item.name)}
                    onChange={() =>
                      toggleOpponent(item.name)
                    }
                  />
      
                  {item.name}
                </label>
              ))}
            </div>
          </div>
      
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 20,
            }}
          >
            <button
              style={{ flex: 1 }}
              onClick={deleteCheckedPresets}
            >
              削除
            </button>
      
            <button
              style={{ flex: 1 }}
              onClick={() => setDeleteMode(false)}
            >
              キャンセル
            </button>
          </div>
        </div>
      </div>
        )}
    </>
  );
}