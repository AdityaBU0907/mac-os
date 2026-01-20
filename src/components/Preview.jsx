import { useRef } from "react";
import Draggable from "react-draggable";
import { X, Minus, Square, Download } from "lucide-react"; // Added Download icon
import useWindowStore from "#store/window";

const Preview = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  
  // Get window state
  const winState = windows.preview;
  const zIndex = winState?.zIndex || 50;
  
  // Data
  const pdfUrl = winState?.data?.url || "/resume.pdf"; 
  const fileName = winState?.data?.label || "Resume.pdf";
  
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{x: 350, y: 50}}>
      <div
        ref={nodeRef}
        style={{ zIndex }}
        onMouseDown={() => focusWindow("preview")}
        className="
          absolute w-[600px] h-[750px]
          rounded-xl overflow-hidden
          
          /* Theme: Light/Dark Frosted Glass */
          bg-gray-100/95 dark:bg-[#1e1e1e]/95
          backdrop-blur-2xl
          border border-black/5 dark:border-white/10
          shadow-2xl
          
          flex flex-col font-sans transition-colors duration-300
        "
      >
        {/* --- TITLE BAR --- */}
        <div className="window-header h-12 flex items-center justify-between px-4 bg-gray-200/50 dark:bg-[#252525] border-b border-black/5 dark:border-white/5 cursor-move">
            
            {/* 1. Traffic Lights */}
            <div className="flex gap-2 group w-20">
                <div onClick={() => closeWindow("preview")} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer flex items-center justify-center shadow-inner">
                   <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner flex items-center justify-center">
                    <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner flex items-center justify-center">
                    <Square size={7} fill="currentColor" className="text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
            </div>
            
            {/* 2. Window Title */}
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 opacity-90 truncate max-w-[200px]">
                Preview — {fileName}
            </span>

            {/* 3. DOWNLOAD BUTTON (New) */}
            <div className="w-20 flex justify-end">
                <a 
                    href={pdfUrl} 
                    download={fileName} // HTML5 Attribute triggers download
                    className="
                        p-1.5 rounded-md 
                        text-gray-500 dark:text-gray-400 
                        hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-800 dark:hover:text-white
                        transition-colors
                    "
                    title="Download File"
                >
                    <Download size={18} />
                </a>
            </div>
        </div>

        {/* --- PDF VIEWING AREA --- */}
        <div className="flex-1 bg-white dark:bg-[#2d2d2d] relative group">
            <iframe 
                src={`${pdfUrl}#toolbar=0&navpanes=0`} 
                title="Resume Preview"
                className="w-full h-full border-none" 
            />
            {/* Overlay for dragging the very top edge if iframe steals focus */}
            <div className="absolute top-0 left-0 w-full h-4 z-10" />
        </div>
      </div>
    </Draggable>
  );
};

export default Preview;