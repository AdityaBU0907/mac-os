import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { X, Minus, Square, Search, ChevronRight } from "lucide-react";
import useWindowStore from "#store/window";

// --- ASSETS ---
const MAC_FOLDER_ICON = "/icons/gicon1.svg"; 
const FILE_ICON = "/icons/file.svg";         

// --- DATA CONFIGURATION ---
const SIDEBAR_ITEMS = [
  { category: "Favorites", items: [
      { id: "work", label: "Work", icon: "/icons/work.svg" },
      { id: "about", label: "About me", icon: "/icons/user.svg" },
      { id: "resume", label: "Resume", icon: "/icons/file.svg" },
  ]},
  { category: "Socials", items: [
      { id: "github", label: "GitHub", icon: "/icons/github.svg" },
      { id: "linkedin", label: "LinkedIn", icon: "/icons/linkedin.svg" },
      { id: "twitter", label: "Twitter", icon: "/icons/twitter.svg" },
  ]},
  { category: "Locations", items: [
      { id: "hd", label: "Macintosh HD", icon: "/icons/gicon2.svg" }, 
  ]},
  { category: null, items: [
      { id: "trash", label: "Trash", icon: "/icons/trash.svg" },
  ]}
];

const FOLDER_CONTENT = {
  work: [
    { id: 1, label: "Nike Ecommerce Website", type: "folder" },
    { id: 2, label: "Food Delivery App", type: "folder" },
    { id: 3, label: "AI Resume Analyzer", type: "folder" },
    { id: 4, label: "Portfolio v3 Design", type: "folder" },
  ],
  about: [],
  // Ensure this URL is correct!
  resume: [{ id: 99, label: "Aditya_Resume.pdf", type: "pdf", url: "/resume.pdf" }],
  
  github: [{ id: 101, label: "GitHub Profile", type: "link", url: "https://github.com/your-username" }],
  linkedin: [{ id: 102, label: "LinkedIn Profile", type: "link", url: "https://linkedin.com/in/your-username" }],
  twitter: [{ id: 103, label: "Twitter Profile", type: "link", url: "https://twitter.com/your-username" }],
  
  hd: [
      { id: 10, label: "Applications", type: "folder" },
      { id: 11, label: "Users", type: "folder" },
      { id: 12, label: "System", type: "folder" },
  ],
  trash: [],
};

const Finder = () => {
  // 1. GET 'openWindow' FROM STORE
  const { closeWindow, focusWindow, openWindow, windows } = useWindowStore();
  const zIndex = windows.finder?.zIndex || 40;
  const nodeRef = useRef(null);
  const [activeItem, setActiveItem] = useState("work");

  const currentContent = FOLDER_CONTENT[activeItem] || [];
  const activeGroup = SIDEBAR_ITEMS.flatMap(g => g.items).find(i => i.id === activeItem);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{x: 120, y: 80}}>
      <div
        ref={nodeRef}
        style={{ zIndex }}
        onMouseDown={() => focusWindow("finder")}
        className="
          absolute w-[850px] h-[550px] rounded-xl overflow-hidden
          bg-white/85 dark:bg-gray-900/80
          backdrop-blur-3xl backdrop-saturate-200 shadow-2xl
          border border-black/5 dark:border-white/10
          flex font-sans text-sm font-medium transition-colors duration-300
          text-gray-800 dark:text-gray-200
        "
      >
        {/* --- LEFT SIDEBAR --- */}
        <div className="w-60 bg-gray-50/50 dark:bg-black/20 border-r border-black/5 dark:border-white/10 flex flex-col transition-colors duration-300">
          <div className="window-header h-14 flex items-center px-5 gap-2 group cursor-default">
            <div onClick={() => closeWindow("finder")} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer flex items-center justify-center shadow-inner">
               <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner flex items-center justify-center">
                 <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner flex items-center justify-center">
                 <Square size={7} fill="currentColor" className="text-black/50 opacity-0 group-hover:opacity-100" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-5 scrollbar-hide">
            {SIDEBAR_ITEMS.map((group, index) => (
                <div key={index}>
                    {group.category && (
                        <h3 className="text-[11px] font-bold text-gray-500/80 uppercase tracking-wider mb-2 px-3">
                            {group.category}
                        </h3>
                    )}
                    <ul className="space-y-1">
                        {group.items.map((item) => (
                        <li key={item.id}>
                            <button
                            onClick={() => setActiveItem(item.id)}
                            className={`
                                w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[13px] transition-all
                                ${activeItem === item.id 
                                    ? "bg-black/10 dark:bg-white/10 text-black dark:text-white font-semibold" 
                                    : "text-gray-600 dark:text-gray-400/90 hover:bg-black/5 dark:hover:bg-white/5"}
                            `}
                            >
                            <img 
                                src={item.icon} 
                                alt={item.label} 
                                className={`w-4 h-4 object-contain ${activeItem === item.id ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                                style={{ filter: activeItem === item.id ? 'none' : 'grayscale(100%)' }}
                            />
                            {item.label}
                            </button>
                        </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT CONTENT --- */}
        <div className="flex-1 flex flex-col">
           <div className="h-14 flex items-center justify-between px-8 border-b border-black/5 dark:border-white/5 transition-colors duration-300">
               <div className="flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-100">
                   <img src={activeGroup?.icon} alt="current" className="w-5 h-5 opacity-80" />
                   <ChevronRight size={16} className="opacity-40" />
                   <span>{activeGroup?.label}</span>
               </div>
               <Search size={16} className="text-gray-500 opacity-70" />
           </div>
            
           <div className="flex-1 overflow-y-auto p-8">
             {currentContent.length > 0 ? (
                <div className="grid grid-cols-5 gap-x-4 gap-y-10">
                {currentContent.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        
                        // 2. UPDATED CLICK LOGIC
                        onClick={() => {
                            if (item.type === 'pdf') {
                                // OPEN PREVIEW WINDOW
                                openWindow("preview", { url: item.url, label: item.label });
                            } else if (item.type === 'link') {
                                // OPEN NEW TAB
                                window.open(item.url, '_blank');
                            }
                        }}
                    >
                        <img 
                            src={item.type === 'pdf' ? FILE_ICON : MAC_FOLDER_ICON} 
                            alt={item.label} 
                            className="w-[60px] h-[60px] drop-shadow-lg transition-transform group-hover:scale-105 group-active:scale-95"
                        />
                        <span className="text-center text-[13px] font-medium leading-tight px-2 py-0.5 rounded line-clamp-2 
                            text-gray-700 dark:text-gray-200 
                            group-hover:text-white group-hover:bg-blue-600/80 transition-colors"
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
                </div>
             ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-40">
                    <img src={activeGroup?.icon || MAC_FOLDER_ICON} className="w-16 h-16 opacity-20 mb-4 grayscale" alt="empty" />
                    <p className="text-lg font-light">Folder is empty</p>
                </div>
             )}
           </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Finder;