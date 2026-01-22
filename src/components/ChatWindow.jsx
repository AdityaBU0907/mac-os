// src/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal } from 'lucide-react';
import { getRoastResponse } from "../chatService";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! 👋 I'm Aditya's assistant. Ask me about my projects, technical skills, or resume.", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Window size
  const WIDTH = 480;
  const HEIGHT = 650;

  // Dragging
  const [position, setPosition] = useState({
    x: window.innerWidth / 2 - WIDTH / 2,
    y: window.innerHeight / 2 - HEIGHT / 2
  });

  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startDrag = (e) => {
    setDragging(true);
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const onDrag = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y
    });
  };

  const stopDrag = () => setDragging(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setLoading(true);

    const botReply = await getRoastResponse(userText);

    setMessages(prev => [...prev, { text: botReply, sender: 'bot' }]);
    setLoading(false);
  };

  return (
    <div
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,

        background: 'rgba(25, 25, 35, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',

        display: 'flex',
        flexDirection: 'column',
        zIndex: 10000,
        overflow: 'hidden',
        color: '#eee',
        fontFamily: 'monospace',
        userSelect: dragging ? 'none' : 'auto'
      }}
    >

      {/* HEADER (DRAG HANDLE) */}
      <div
        onMouseDown={startDrag}
        style={{
          cursor: 'move',
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Terminal size={16} color="#34D399" />
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Help_bot.exe</span>
        </div>
        <X size={20} style={{ cursor: 'pointer' }} onClick={onClose} />
      </div>

      {/* MESSAGES */}
      <div style={{
        flex: 1,
        padding: '15px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
            padding: '10px 14px',
            borderRadius: '12px',
            borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
            borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
            background: msg.sender === 'user'
              ? 'linear-gradient(135deg, #059669, #34D399)'
              : 'rgba(255, 255, 255, 0.1)',
            fontSize: '13px',
            lineHeight: '1.5'
          }}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#888', fontSize: '12px', paddingLeft: '10px' }}>
            Typing.█.█.█.█.
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* INPUT */}
      <div style={{
        padding: '15px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Say something..."
          style={{
            flex: 1,
            background: 'rgba(0,0,0,0.3)',
            border: 'none',
            borderRadius: '8px',
            padding: '10px',
            color: 'white',
            outline: 'none',
            fontFamily: 'monospace'
          }}
        />
        <button
          onClick={handleSend}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#34D399' }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
