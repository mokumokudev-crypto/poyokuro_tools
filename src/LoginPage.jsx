import { useState } from "react";

export default function LoginPage({
  gasUrl,
  onLogin,
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

  return (
    <div className="loginPage">
      <h1>XrossStars Tool</h1>

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