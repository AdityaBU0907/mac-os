import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { X, Minus, Square, RotateCw, ChevronLeft, ChevronRight, Search, Globe, Lock } from "lucide-react";
import useWindowStore from "#store/window";

const Safari = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const zIndex = windows.safari?.zIndex || 40;
  const nodeRef = useRef(null);
  const [url, setUrl] = useState("https://google.com");

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{x: 100, y: 50}}>
      <div
        ref={nodeRef}
        style={{ zIndex }}
        onMouseDown={() => focusWindow("safari")}
        className="
          absolute w-[900px] h-[600px] rounded-xl overflow-hidden
          bg-[#1e1e2e]/95 backdrop-blur-3xl border border-white/10 shadow-2xl
          flex flex-col font-sans
        "
      >
        {/* --- BROWSER HEADER --- */}
        <div className="window-header h-12 flex items-center justify-between px-4 bg-[#2a2a3b] border-b border-white/5 cursor-move">
           {/* Traffic Lights */}
           <div className="flex gap-2 w-20">
                <div onClick={() => closeWindow("safari")} className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
           </div>

           {/* Toolbar Controls */}
           <div className="flex gap-4 text-gray-400">
               <ChevronLeft size={18} />
               <ChevronRight size={18} />
               <RotateCw size={16} className="cursor-pointer hover:text-white"/>
           </div>

           {/* Address Bar */}
           <div className="flex-1 max-w-lg mx-4 bg-[#1e1e2e] h-8 rounded-lg flex items-center px-3 text-xs text-gray-300 border border-white/5 shadow-inner">
               <Lock size={10} className="mr-2 text-green-400" />
               <input 
                 type="text" 
                 value={url} 
                 onChange={(e) => setUrl(e.target.value)}
                 className="flex-1 bg-transparent outline-none text-center font-medium" 
               />
           </div>
           <div className="w-20" />
        </div>

        {/* --- BROWSER CONTENT (START PAGE) --- */}
        <div className="flex-1 bg-[#121215] flex flex-col items-center justify-center text-gray-200">
            <h1 className="text-4xl font-bold mb-8 tracking-tight">Safari</h1>
            
            {/* Favorites Grid */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { name: "Google", icon: "G", color: "bg-red-500" },
                    { name: "GitHub", icon: "gh", color: "bg-gray-700" },
                    { name: "Twitter", icon: "X", color: "bg-blue-500" },
                    { name: "LinkedIn", icon: "in", color: "bg-blue-700" }
                ].map((site) => (
                    <div key={site.name} className="flex flex-col items-center gap-3 group cursor-pointer hover:scale-105 transition-transform">
                        <div className={`w-16 h-16 rounded-2xl ${site.color} flex items-center justify-center text-2xl font-bold shadow-lg text-white`}>
                            {site.icon}
                        </div>
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white">{site.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Safari;