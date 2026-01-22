// src/components/DesktopIcon.jsx
import React, { useState, useRef } from "react";

const DesktopIcon = ({ onClick }) => {
  const [position, setPosition] = useState({ x: 60, y: 80 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const startDrag = (e) => {
    setDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const onDrag = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const stopDrag = () => setDragging(false);

  const handleClick = () => {
    if (!dragging) onClick();
  };

  return (
    <div
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 9999,
      }}
    >
      <div
        onMouseDown={startDrag}
        onClick={handleClick}
        className="hover:scale-110 transition-transform duration-300"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: dragging ? "grabbing" : "pointer",
          width: "80px",
          userSelect: "none",
        }}
      >
        {/* ICON IMAGE */}
        <img
          src="/icons/robot.png"
          alt="Siri"
          draggable={false}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "contain",
            borderRadius: "14px",
            filter: "drop-shadow(0 0 8px rgba(0,255,255,0.6))",
          }}
        />

        {/* LABEL */}
        <span
          style={{
            marginTop: "8px",
            color: "white",
            fontSize: "13px",
            textShadow: "0 2px 4px rgba(0,0,0,0.8)",
            fontFamily: "SF Pro Display, sans-serif",
            fontWeight: 500,
          }}
        >
          Siri
        </span>
      </div>
    </div>
  );
};

export default DesktopIcon;
