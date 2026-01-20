import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable"; 
import { X, Terminal as TerminalIcon } from "lucide-react"; // Back to generic icon
import useWindowStore from "#store/window";

const Terminal = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const zIndex = windows.terminal?.zIndex || 50; 

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { text: "Arch Linux 6.8.9-arch1-1 (tty1)", type: "system" },
    { text: "Type 'help' to see available commands.", type: "system" },
  ]);
  
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const nodeRef = useRef(null); 

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let output = "";
      let type = "text";

      switch (cmd) {
        case "help":
          output = "Available: help, clear, whoami, neofetch, ls, cat <file>";
          break;
        case "clear":
          setHistory([]);
          setInput("");
          return;
        case "whoami":
          output = "aditya@portfolio";
          break;
        case "ls":
          output = "Projects/  Resume.pdf  Contact.txt  secrets.sh";
          break;
        case "neofetch":
          type = "ascii";
          // THE REAL ARCH LINUX LOGO
          output = `
                   /\\
                  /  \\
                 /    \\      User: Aditya
                /      \\     OS: Arch Linux
               /   ,,   \\    Uptime: 20 years
              /   |  |   \\   Shell: zsh
             /_-''    ''-_\\  Theme: Liquid Glass
                             Skills: React, Node, C++
          `;
          break;
        default:
          if (cmd) output = `zsh: command not found: ${cmd}`;
          if (cmd) type = "error";
      }

      if (cmd) setHistory([...history, { text: `➜  ~  ${cmd}`, type: "command" }, { text: output, type }]);
      setInput("");
    }
  };

  return (
    <Draggable 
        nodeRef={nodeRef} 
        handle=".window-header" 
        defaultPosition={{x: 200, y: 100}} 
    >
      <div 
        ref={nodeRef}
        style={{ zIndex }} 
        onMouseDown={() => focusWindow("terminal")}
        onClick={() => inputRef.current?.focus()}
        className="
          absolute w-[600px] h-[400px] 
          rounded-xl overflow-hidden 
          bg-gray-900/60 
          backdrop-blur-3xl 
          backdrop-saturate-200 
          shadow-[0_30px_60px_rgba(0,0,0,0.5)] 
          border border-white/10 
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]
          flex flex-col font-mono text-sm
        "
      >
        {/* Title Bar - Reverted to generic TerminalIcon */}
        <div className="window-header bg-white/5 h-9 flex items-center justify-between px-4 select-none border-b border-white/5 cursor-move active:cursor-grabbing">
          <div className="flex gap-2 group">
            <div 
                onMouseDown={(e) => e.stopPropagation()}
                onClick={() => closeWindow("terminal")} 
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer flex items-center justify-center shadow-inner"
            >
               <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner" />
          </div>
          
          <div className="text-gray-400/80 text-xs flex items-center gap-1.5 font-medium">
               <TerminalIcon size={11} /> 
               <span>aditya — -zsh</span>
          </div>
          <div className="w-10" />
        </div>

        {/* Body */}
        <div className="flex-1 p-4 overflow-y-auto scrollbar-hide text-gray-200 selection:bg-white/20 cursor-text">
          {history.map((line, i) => (
            <div key={i} className={`${line.type === "error" ? "text-red-400" : ""} ${line.type === "ascii" ? "text-cyan-400 font-bold leading-tight" : ""} mb-1 whitespace-pre-wrap`}>
              {line.text}
            </div>
          ))}
          <div className="flex items-center gap-2 text-[#27c93f]">
            <span>➜</span> <span className="text-blue-400">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </Draggable>
  );
};

export default Terminal;