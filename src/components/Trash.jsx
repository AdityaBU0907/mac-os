import { useRef } from "react";
import Draggable from "react-draggable";
import { X, Minus, Square, Trash2 } from "lucide-react";
import useWindowStore from "#store/window";

const Trash = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const zIndex = windows.trash?.zIndex || 40;
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{x: 400, y: 200}}>
      <div
        ref={nodeRef}
        style={{ zIndex }}
        onMouseDown={() => focusWindow("trash")}
        className="
          absolute w-[500px] h-[350px] rounded-xl overflow-hidden
          bg-[#1e1e2e]/95 backdrop-blur-2xl border border-white/10 shadow-2xl
          flex flex-col font-sans
        "
      >
        <div className="window-header h-10 flex items-center justify-between px-4 bg-white/5 border-b border-white/5 cursor-move">
             <div className="flex gap-2">
                <div onClick={() => closeWindow("trash")} className="w-3 h-3 rounded-full bg-[#ff5f56] cursor-pointer hover:opacity-80" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-xs font-semibold text-gray-500">Trash</span>
            <button className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 hover:bg-white/20">Empty</button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <Trash2 size={48} strokeWidth={1} className="mb-4 opacity-50" />
            <p className="text-sm font-medium">Trash is empty</p>
            <p className="text-xs opacity-60 mt-1">Items moved to trash will be deleted forever.</p>
        </div>
      </div>
    </Draggable>
  );
};

export default Trash;