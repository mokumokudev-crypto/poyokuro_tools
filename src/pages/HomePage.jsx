export default function HomePage({
    setPage,
    bgColor,
    setBgColor,
    textColor,
  }) {
    const buttonStyle = {
      display: "block",
      width: "320px",
      margin: "16px auto",
      padding: "18px 24px",
      fontSize: "22px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "14px",
      background: "#3b82f6",
      color: "#fff",
      cursor: "pointer",
      transition: "0.2s",
      boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
    };
  
    return (
      <div
        style={{
          minHeight: "100vh",
          textAlign: "center",
          paddingTop: "60px",
        }}
      >
        <h1
          style={{
            color: textColor,
            fontSize: "42px",
            marginBottom: "40px",
          }}
        >
          クロススターズツール
        </h1>
  
        <p style={{ marginBottom: "40px" }}>
          背景色変更：
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{
              marginLeft: "10px",
              width: "50px",
              height: "35px",
              border: "none",
              cursor: "pointer",
            }}
          />
        </p>
  
        <button
          style={buttonStyle}
          onClick={() => setPage("solo")}
          onMouseOver={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseOut={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          🎮 一人回し
        </button>
  
        <button
          style={buttonStyle}
          onClick={() => setPage("builder")}
          onMouseOver={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseOut={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          📝 デッキメーカー
        </button>
  
        <button
          style={buttonStyle}
          onClick={() => setPage("History")}
          onMouseOver={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseOut={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          🚧 対戦成績
        </button>
      </div>
    );
  }