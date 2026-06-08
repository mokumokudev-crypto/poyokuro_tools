import { useState, useEffect } from "react";

export default function LeaderArea({ leaders, opponentLeaders,}) {
  // 元の HP 管理ロジックをそのまま使用
  const [leaderStates, setLeaderStates] = useState([]);
  const [opponentLeaderStates, setOpponentLeaderStates] = useState([]);

  useEffect(() => {
    setLeaderStates(
      leaders.map((leader) => ({
        ...leader,
        currentHp: leader.hp,
        awakened: false,
        beforeAwakenHp: leader.hp,
      }))
    );
  }, [leaders]);
  
  useEffect(() => {
    setOpponentLeaderStates(
      opponentLeaders.map((leader) => ({
        ...leader,
        currentHp: leader.hp,
        awakened: false,
        beforeAwakenHp: leader.hp,
      }))
    );
  }, [opponentLeaders]);

  const adjustHp = (index, amount) => {
    setLeaderStates((prev) =>
      prev.map((leader, i) => {
        if (i !== index) return leader;

        const newHp = Math.max(
          0,
          Math.min(
            leader.awakened
              ? leader.awaken_hp
              : leader.hp,
            leader.currentHp + amount
          )
        );
        return {
          ...leader,
          currentHp: newHp,
        };
      })
    );
  };

  const adjustOpponentHp = (index, amount) => {
    setOpponentLeaderStates((prev) =>
      prev.map((leader, i) => {
        if (i !== index) return leader;
  
        const newHp = Math.max(
          0,
          Math.min(
            leader.awakened
              ? leader.awaken_hp
              : leader.hp,
            leader.currentHp + amount
          )
        );
  
        return {
          ...leader,
          currentHp: newHp,
        };
      })
    );
  };

  const toggleAwaken = (index) => {
    setLeaderStates((prev) =>
      prev.map((leader, i) => {
        if (i !== index) return leader;
  
        const diff =
          leader.awaken_hp - leader.hp;
  
        return {
          ...leader,
          awakened: !leader.awakened,
  
          currentHp: leader.awakened
            ? Math.max(
                0,
                leader.currentHp - diff
              )
            : Math.min(
                leader.awaken_hp,
                leader.currentHp + diff
              ),
        };
      })
    );
  };
  
  const toggleOpponentAwaken = (index) => {
    setOpponentLeaderStates((prev) =>
      prev.map((leader, i) => {
        if (i !== index) return leader;
  
        const diff =
          leader.awaken_hp - leader.hp;
  
        return {
          ...leader,
          awakened: !leader.awakened,
  
          currentHp: leader.awakened
            ? Math.max(
                0,
                leader.currentHp - diff
              )
            : Math.min(
                leader.awaken_hp,
                leader.currentHp + diff
              ),
        };
      })
    );
  };
  return (
    <div className="leader-wrapper">

      {/* 自分のリーダー */}
      <div className="leader-grid">
        {leaderStates.map((leader, index) => (
          <div key={leader.leader_id} className="leader-item">

            <div className="leader-image-wrapper">
            <img
              src={
                leader.awakened
                  ? leader.awaken_image_url
                  : leader.image_url
              }
              alt={leader.name}
              className="leader-img"
              onDoubleClick={() =>
                toggleAwaken(index)
              }
            />

              <div className="leader-hp-overlay">
                {leader.currentHp}
              </div>
            </div>

            {leader.currentHp === 0 && (
              <div className="leader-down">DOWN</div>
            )}

            <div className="leader-buttons">
              <button onClick={() => adjustHp(index, +10)}>＋</button>
              <button onClick={() => adjustHp(index, -10)}>−</button>
            </div>

          </div>
        ))}
      </div>

      {/* 相手のリーダー（同じ UI を複製） */}
      <div className="leader-grid">
        {opponentLeaderStates.map((leader, index) => (
          <div key={leader.leader_id} className="leader-item">

            <div className="leader-image-wrapper">
            <img
              src={
                leader.awakened
                  ? leader.awaken_image_url
                  : leader.image_url
              }
              alt={leader.name}
              className="leader-img"
              onDoubleClick={() =>
                toggleOpponentAwaken(index)
              }
            />

              <div className="leader-hp-overlay">
                {leader.currentHp}
              </div>
            </div>

            {leader.currentHp === 0 && (
              <div className="leader-down">DOWN</div>
            )}

            <div className="leader-buttons">
              <button onClick={() => adjustOpponentHp(index, +10)}>＋</button>
              <button onClick={() => adjustOpponentHp(index, -10)}>−</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
