import { useState, useEffect } from "react";

import "./App.css";

import LoginPage from "./LoginPage";
import HomePage from "./pages/HomePage";
import SoloToolPage from "./pages/SoloToolPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import MatchHistoryPage from "./pages/MatchHistoryPage";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbwYOkMSRnZSLozkLdgDK24qSZcyxuQnbYOiIGr4rvOeYY2fLCrLZIqzx3-vkqVtcvq5bg/exec";

export default function App() {
  // ログイン
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("auth") === "true"
  );

  // ページ
  const [page, setPage] = useState("home");

  // 背景色
  const [bgColor, setBgColor] = useState(
    localStorage.getItem("bgColor") || "#ffffff"
  );

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const brightness =
      (r * 299 + g * 587 + b * 114) / 1000;

    return brightness < 128 ? "#ffffff" : "#000000";
  };

  const textColor = getTextColor(bgColor);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;
    document.body.style.color = textColor;

    localStorage.setItem("bgColor", bgColor);
  }, [bgColor, textColor]);

  // ログイン画面
  if (!authenticated) {
    return (
      <LoginPage
        gasUrl={GAS_URL}
        bgColor={bgColor}
        onLogin={() => setAuthenticated(true)}
      />
    );
  }

  // ページ切り替え
  switch (page) {
    case "solo":
      return (
        <SoloToolPage
          setPage={setPage}
          bgColor={bgColor}
          setBgColor={setBgColor}
          textColor={textColor}
        />
      );

    case "builder":
      return (
        <DeckBuilderPage
          setPage={setPage}
          bgColor={bgColor}
          setBgColor={setBgColor}
          textColor={textColor}
        />
      );

    case "History":
      return (
        <MatchHistoryPage
          setPage={setPage}
          bgColor={bgColor}
          setBgColor={setBgColor}
          textColor={textColor}
        />
      );

    default:
      return (
        <HomePage
          setPage={setPage}
          bgColor={bgColor}
          setBgColor={setBgColor}
          textColor={textColor}
        />
      );
  }
}