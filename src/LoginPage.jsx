import { useState } from "react";

export default function LoginPage({
  gasUrl,
  onLogin,
  bgColor,
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await fetch(gasUrl, {
        method: "POST",
        body: JSON.stringify({
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem(
          "token",
          data.token
        );

        onLogin();
      } else {
        setError("パスワードが違います");
      }
    } catch {
      setError("ログイン失敗");
    }
  };

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
  
    const brightness =
      (r * 299 + g * 587 + b * 114) / 1000;
  
    return brightness < 128
      ? "#ffffff"
      : "#000000";
  };
  
  const textColor = getTextColor(bgColor);

  return (
    <div
      className="loginPage"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: textColor }}>XrossStars Tool</h1>
  
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />
  
      <button onClick={login}>
        ログイン
      </button>
  
      <p>{error}</p>
    </div>
  );
}