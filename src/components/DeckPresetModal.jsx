import { useEffect, useState } from "react";

export default function DeckPresetModal({
  open,
  onClose,
  deckName,
  onSelect,
}) {
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!open) return;

    const list =
      JSON.parse(localStorage.getItem("deckNamePresets")) || [];

    setPresets(list);
    setPresetName(deckName || "");
    setSelectedId(null);
  }, [open, deckName]);

  if (!open) return null;

  function savePreset() {
    const name = presetName.trim();

    if (!name) {
      alert("デッキ名を入力してください");
      return;
    }

    const list = [...presets];

    const index = list.findIndex(
      (item) => item.name === name
    );

    if (index >= 0) {
      if (!window.confirm("同名のプリセットがあります。上書きしますか？")) {
        return;
      }

      list[index] = {
        ...list[index],
        name,
      };
    } else {
      list.push({
        id: Date.now(),
        name,
      });
    }

    localStorage.setItem(
      "deckNamePresets",
      JSON.stringify(list)
    );

    setPresets(list);

    alert("保存しました");
  }

  function loadPreset() {
    const preset = presets.find(
      (item) => item.id === selectedId
    );

    if (!preset) return;

    onSelect(preset.name);
    onClose();
  }

  function deletePreset() {
    if (selectedId == null) return;

    if (!window.confirm("削除しますか？")) return;

    const list = presets.filter(
      (item) => item.id !== selectedId
    );

    localStorage.setItem(
      "deckNamePresets",
      JSON.stringify(list)
    );

    setPresets(list);
    setSelectedId(null);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "95%",
          maxWidth: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 8,
          padding: 20,
        }}
      >
        <h2>デッキプリセット</h2>

        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={presetName}
            placeholder="デッキ名"
            onChange={(e) =>
              setPresetName(e.target.value)
            }
            style={{
              width: "100%",
              padding: 8,
              boxSizing: "border-box",
            }}
          />

          <button
            style={{
              marginTop: 10,
              width: "100%",
            }}
            onClick={savePreset}
          >
            現在のデッキ名を登録
          </button>
        </div>

        <hr />

        <h3>登録済み</h3>

        {presets.length === 0 && (
          <p>登録されていません</p>
        )}

        <div>
          {presets.map((preset) => (
            <div
              key={preset.id}
              onClick={() =>
                setSelectedId(preset.id)
              }
              style={{
                border:
                  preset.id === selectedId
                    ? "2px solid #2196f3"
                    : "1px solid #ccc",
                borderRadius: 6,
                padding: 10,
                marginBottom: 8,
                cursor: "pointer",
              }}
            >
              {preset.name}
            </div>
          ))}
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
            onClick={loadPreset}
          >
            読み込む
          </button>

          <button
            style={{ flex: 1 }}
            onClick={deletePreset}
          >
            削除
          </button>

          <button
            style={{ flex: 1 }}
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}