import { useState, useEffect, useRef } from "react";

export default function LeaderArea({ 
  leaders, 
  opponentLeaders,
  playerEquipment,
  setPlayerEquipment,
  opponentEquipment,
  setOpponentEquipment,
  pendingPlayerEquipment,
  setPendingPlayerEquipment,
  movingPlayerEquipment,
  setMovingPlayerEquipment,
  onLeaderClick,
  resetAllHpTrigger,
}) {
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

  useEffect(() => {
    setLeaderStates((prev) => prev.map(resetLeaderHp));
    setOpponentLeaderStates((prev) => prev.map(resetLeaderHp));
  }, [resetAllHpTrigger]);

  const pressTimer = useRef(null);
  const isLongPress = useRef(false);
  const handlePressStart = (index, toggleAwaken) => {
    isLongPress.current = false;
  
    pressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      toggleAwaken(index);
    }, 600);
  };
  
  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
  };

  const adjustHp = (index, amount) => {
    setLeaderStates((prev) =>
      prev.map((leader, i) => {
        if (i !== index) return leader;

        const newHp = Math.max(
          0,
          Math.min(
            240,
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

  const resetLeaderHp = (leader) => ({
    ...leader,
    currentHp: leader.awakened ? leader.awaken_hp : leader.hp,
  });


  return (
    <div className="leader-wrapper">

      {/* 自分のリーダー */}
      <div className="leader-grid">
        {leaderStates.map((leader, index) => (
          <div key={leader.leader_id} className="leader-item" onClick={() => onLeaderClick(leader.leader_id)}>

            <div 
                className="leader-image-wrapper"
                onMouseDown={() =>
                  handlePressStart(index, toggleAwaken)
                }
                onMouseUp={handlePressEnd}
                onMouseLeave={handlePressEnd}
                onClick={(e) => {
                  if (isLongPress.current) return;
                  if (pendingPlayerEquipment || movingPlayerEquipment) return;
                  const rect =
                    e.currentTarget.getBoundingClientRect();
              
                  const y = e.clientY - rect.top;
              
                  if (y < rect.height / 2) {
                    adjustHp(index, +10);
                  } else {
                    adjustHp(index, -10);
                  }
                }}
            >
            <img
              src={
                leader.awakened
                  ? leader.awaken_image_url
                  : leader.image_url
              }
              alt={leader.name}
              className="leader-img"
            />

            {/* 装備表示 */}
            <div className="equipment-stack">
              {(playerEquipment[leader.leader_id] || []).map((card, index) => (
                <img
                  key={index}
                  src={card.image_url}
                  className="equipment-image"
                  style={{
                    transform: `translate(${index * 24}px, ${index * 16}px)`,
                    zIndex: index,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    setMovingPlayerEquipment({
                      card,
                      from: leader.leader_id,
                    });
                  }}
                />
              ))}
            </div>

              <div className="leader-hp-overlay player-hp">
                {leader.currentHp}
              </div>
            </div>

            {leader.currentHp === 0 && (
              <div className="leader-down">DOWN</div>
            )}

          </div>
        ))}
      </div>

      {/* 相手のリーダー */}
      <div className="leader-grid">
        {opponentLeaderStates.map((leader, index) => (
          <div key={leader.leader_id} className="leader-item">

            <div
              className="leader-image-wrapper"
              onMouseDown={() =>
                handlePressStart(index, toggleOpponentAwaken)
              }
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onClick={(e) => {
                if (isLongPress.current) return;

                const rect =
                  e.currentTarget.getBoundingClientRect();

                const y = e.clientY - rect.top;

                if (y < rect.height / 2) {
                  adjustOpponentHp(index, +10);
                } else {
                  adjustOpponentHp(index, -10);
                }
              }}
            >
            <img
              src={
                leader.awakened
                  ? leader.awaken_image_url
                  : leader.image_url
              }
              alt={leader.name}
              className="leader-img"
            />

              <div className="leader-hp-overlay opponent-hp">
                {leader.currentHp}
              </div>
            </div>

            {leader.currentHp === 0 && (
              <div className="leader-down">DOWN</div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
