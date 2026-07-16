import { useEffect, useState } from "react";

export default function OpponentPresetModal({
  open,
  onClose,
  leaders,
  aces,
  onSelect,
}) {
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!open) return;

    const list =
      JSON.parse(localStorage.getItem("matchPresets")) || [];

    setPresets(list);
    setPresetName("");
    setSelectedId(null);
  }, [open]);

  if (!open) return null;

  function savePreset() {
    if (!presetName.trim()) {
      alert("プリセット名を入力してください");
      return;
    }

    if (leaders.length === 0) {
      alert("リーダーを選択してください");
      return;
    }

    const list = [...presets];

    const index = list.findIndex(
      (item) => item.name === presetName.trim()
    );

    const preset = {
      id:
        index >= 0
          ? list[index].id
          : Date.now(),
      name: presetName.trim(),
      leaders,
      aces,
    };

    if (index >= 0) {
      if (
        !window.confirm(
          "同名のプリセットがあります。上書きしますか？"
        )
      ) {
        return;
      }

      list[index] = preset;
    } else {
      list.push(preset);
    }

    localStorage.setItem(
      "matchPresets",
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

    onSelect(preset);

    onClose();
  }

  function deletePreset() {
    if (selectedId == null) return;

    if (!window.confirm("削除しますか？"))
      return;

    const list = presets.filter(
      (item) => item.id !== selectedId
    );

    localStorage.setItem(
      "matchPresets",
      JSON.stringify(list)
    );

    setPresets(list);
    setSelectedId(null);
  }  return (
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
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 8,
          padding: 20,
        }}
      >
        <h2>相手プリセット</h2>

        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            value={presetName}
            placeholder="プリセット名"
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
            onClick={savePreset}
            style={{
              width: "100%",
              marginTop: 10,
            }}
          >
            現在の相手を登録
          </button>
        </div>

        <hr />

        <h3>登録済みプリセット</h3>

        {presets.length === 0 && (
          <p>登録されていません。</p>
        )}

        {presets.map((preset) => (
          <div
            key={preset.id}
            onClick={() =>
              setSelectedId(preset.id)
            }
            style={{
              border:
                selectedId === preset.id
                  ? "2px solid #2196f3"
                  : "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
              cursor: "pointer",
            }}
          >
            <strong>{preset.name}</strong>

            <div style={{ marginTop: 8 }}>
              <div>リーダー</div>

              <div
                style={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                }}
              >
                {preset.leaders?.map((card, i) => (
                  <img
                    key={i}
                    src={card.image_url}
                    alt={card.name}
                    title={card.name}
                    width={55}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <div>エース</div>

              <div
                style={{
                  display: "flex",
                  gap: 5,
                  flexWrap: "wrap",
                }}
              >
                {preset.aces?.map((card, i) => (
                  <img
                    key={i}
                    src={card.image_url}
                    alt={card.name}
                    title={card.name}
                    width={55}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

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