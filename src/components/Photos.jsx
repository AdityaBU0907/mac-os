import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Mail, Search, LayoutGrid, Clock, Map, Users, Heart } from "lucide-react";
import useWindowStore from "#store/window";

// --- CONFIGURATION ---
const SIDEBAR_ITEMS = [
  { id: "library", label: "Library", icon: LayoutGrid },
  { id: "memories", label: "Memories", icon: Clock },
  { id: "places", label: "Places", icon: Map },
  { id: "people", label: "People", icon: Users },
  { id: "favorites", label: "Favorites", icon: Heart },
];

const GALLERY_IMAGES = [
  // The "Hero" image (spans 2 columns, 2 rows)
  { id: 1, src: "/gallery/gal16.jpg", span: "col-span-2 row-span-2" },
  // Surrounding images
  { id: 2, src: "/gallery/gal2.jpg", span: "col-span-1 row-span-1" },
  { id: 3, src: "/gallery/gal3.jpg", span: "col-span-1 row-span-1" },
  { id: 4, src: "/gallery/gal14.jpg", span: "col-span-1 row-span-1" },
  { id: 5, src: "/gallery/gal9.jpg", span: "col-span-1 row-span-1" },
  { id: 6, src: "/gallery/gal11.jpg", span: "col-span-1 row-span-1" },
  { id: 7, src: "/gallery/gal7.jpg", span: "col-span-1 row-span-1" },
  { id: 8, src: "/gallery/gal8.jpg", span: "col-span-1 row-span-1" },
];

const MEMORIES_IMAGES = [
  { id: 9, src: "/gallery/gal5.jpg" },
  { id: 10, src: "/gallery/gal10.jpg" },
  { id: 11, src: "/gallery/gal8.jpg" },
  { id: 12, src: "/gallery/gal12.jpg" },
  { id: 13, src: "/gallery/gal13.jpg" },
  { id: 14, src: "/gallery/gal1.jpg" },
  { id: 15, src: "/gallery/gal15.jpg" },
];

const Photos = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const zIndex = windows.photos?.zIndex || 40;
  const nodeRef = useRef(null);
  const [activeTab, setActiveTab] = useState("library");

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{x: 150, y: 80}}>
      <div
        ref={nodeRef}
        style={{ zIndex }}
        onMouseDown={() => focusWindow("photos")}
        className="
          absolute w-[850px] h-[550px] rounded-xl overflow-hidden
          
          /* --- THEME: More Transparent Dark Liquid Glass --- */
          bg-[#0f0f11]/70 
          backdrop-blur-3xl 
          border border-white/10 
          shadow-[0_20px_50px_rgba(0,0,0,0.5)]
          
          flex flex-col font-sans text-gray-200 transition-colors duration-300
        "
      >
        {/* --- HEADER --- */}
        <div className="window-header h-12 flex items-center justify-between px-5 bg-white/5 border-b border-white/5 cursor-move">
            {/* Traffic Lights */}
            <div className="flex gap-2 group">
                <div onClick={() => closeWindow("photos")} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner" />
            </div>

            {/* Title */}
            <span className="text-xs font-semibold text-gray-400 opacity-80 uppercase tracking-widest">Photos</span>

            {/* Right Icons */}
            <div className="flex items-center gap-4 text-gray-500">
                <Mail size={16} className="cursor-pointer hover:text-white transition-colors" />
                <Search size={16} className="cursor-pointer hover:text-white transition-colors" />
            </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 flex overflow-hidden">
            
            {/* LEFT SIDEBAR (Darker Glass) */}
            <div className="w-52 bg-black/20 border-r border-white/5 flex flex-col p-4 pt-6 backdrop-blur-md">
                <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                    Photos
                </h3>
                <nav className="space-y-1 flex flex-col">
                    {SIDEBAR_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`
                                    w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200
                                    ${isActive 
                                        ? "bg-white/10 text-white shadow-md border border-white/5" 
                                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"}
                                `}
                            >
                                <Icon size={16} className={isActive ? "text-blue-400" : "text-blue-500/70"} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* RIGHT GALLERY AREA */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                
                {/* LIBRARY VIEW */}
                {activeTab === 'library' && (
                  <div className="grid grid-cols-3 auto-rows-[160px] gap-4">
                      {GALLERY_IMAGES.map((img, i) => (
                          <div 
                              key={img.id} 
                              className={`
                                  group relative rounded-xl overflow-hidden cursor-pointer 
                                  border border-white/10 bg-white/5
                                  shadow-sm hover:shadow-lg hover:border-white/30
                                  transition-all duration-300
                                  ${img.span}
                              `}
                          >
                              <img 
                                  src={img.src} 
                                  alt={`Gallery ${i}`} 
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                      ))}
                  </div>
                )}

                {/* MEMORIES VIEW */}
                {activeTab === 'memories' && (
                  <div>
                    <h2 className="text-xl font-bold text-white mb-4">Memories</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {MEMORIES_IMAGES.map((img, i) => (
                            <div 
                                key={img.id} 
                                className="
                                    group relative rounded-xl overflow-hidden cursor-pointer 
                                    border border-white/10 bg-white/5
                                    shadow-sm hover:shadow-lg hover:border-white/30
                                    aspect-square transition-all duration-300
                                "
                            >
                                <img 
                                    src={img.src} 
                                    alt={`Memory ${i}`} 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                  </div>
                )}

            </div>

        </div>
      </div>
    </Draggable>
  );
};

export default Photos;