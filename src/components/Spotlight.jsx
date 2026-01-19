import { useState, useEffect, useRef } from "react";
import { Search, Command, ArrowRight, Github, Mail, FileText, User, Layout, Terminal, X } from "lucide-react";
import useWindowStore from "#store/window";

const Spotlight = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { openWindow } = useWindowStore();

  // Ensure input is focused on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const commands = [
    { id: "about", label: "Open Profile", icon: User, action: () => openWindow("profile") },
    { id: "projects", label: "View Projects & Work", icon: Layout, action: () => openWindow("projects") },
    { id: "github", label: "Visit GitHub Profile", icon: Github, action: () => window.open("https://github.com/AdityaBU0907", "_blank") },
    { id: "email", label: "Send Email", icon: Mail, action: () => window.location.href = "mailto:adityabu0907@bennett.edu.in" },
    { id: "resume", label: "Open Resume PDF", icon: FileText, action: () => window.open("/resume.pdf", "_blank") },
    { id: "term", label: "Run Terminal Command", icon: Terminal, keywords: ["ls", "sudo", "arch", "pacman"], action: () => openWindow("terminal") },
  ];

  const filtered = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    (cmd.keywords && cmd.keywords.some(k => k.includes(query.toLowerCase())))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    // 1. Backdrop Overlay (Blur the world behind)
    <div 
        className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] animate-in fade-in duration-200"
        onClick={onClose}
    >
      <div className="absolute inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm" />

      {/* 2. The Main Glass Modal */}
      <div 
        className="
            relative w-[640px] max-w-[92vw]
            rounded-2xl overflow-hidden
            /* The core Glassmorphism styles */
            bg-gradient-to-br from-white/80 to-white/50 dark:from-[#1e1e2e]/80 dark:to-[#1e1e2e]/50
            backdrop-blur-2xl backdrop-saturate-[180%]
            /* Complex shadow and subtle 1px light border */
            shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_20px_40px_rgba(0,0,0,0.25)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)]
            flex flex-col
            animate-in zoom-in-95 slide-in-from-top-4 duration-300 ease-out
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Input Area */}
        <div className="flex items-center px-5 py-5 border-b border-black/5 dark:border-white/10">
            <Search className="w-6 h-6 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
                ref={inputRef}
                type="text"
                placeholder="Spotlight Search..."
                className="
                    flex-1 bg-transparent border-none outline-none 
                    px-4 text-[20px] font-medium
                    text-gray-800 dark:text-gray-100 
                    placeholder:text-gray-400/80 dark:placeholder:text-gray-500/80
                "
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
                 <X size={18} className="text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200 transition-colors" onClick={() => setQuery("")}/>
            ) : (
                <div className="flex items-center gap-1 bg-gray-200/50 dark:bg-white/10 px-2 py-1 rounded-md border border-black/5 dark:border-white/5">
                    <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">ESC</span>
                </div>
            )}
           
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-hide">
            {filtered.length > 0 ? (
                <div className="flex flex-col gap-1">
                    {filtered.map((cmd, index) => (
                        <button
                            key={cmd.id}
                            onClick={() => {
                                cmd.action();
                                onClose();
                            }}
                            className="
                                group w-full flex items-center justify-between
                                px-4 py-3 rounded-xl
                                text-left
                                /* Polished translucent hover states */
                                hover:bg-black/5 dark:hover:bg-white/10 dark:hover:backdrop-brightness-125
                                transition-all duration-200
                            "
                        >
                            <div className="flex items-center gap-4">
                                <cmd.icon size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                                <span className="text-[15px] font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                    {cmd.label}
                                </span>
                            </div>
                            {/* Subtle 'Return' hint on hover for top item */}
                            {index === 0 && query && (
                                <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <span>Open</span>
                                    <ArrowRight size={12} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                    <Command size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-medium">No results found for "{query}"</p>
                    <p className="text-xs mt-1 opacity-70">Try searching for projects, skills, or links.</p>
                </div>
            )}
        </div>
        
        {/* Subtle Footer/Hint Area */}
        {filtered.length > 0 && (
             <div className="px-5 py-2 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-between text-[11px] font-medium text-gray-500 dark:text-gray-400">
                <span>PRO TIP: Type "sudo" for a surprise.</span>
                <div className="flex gap-3">
                    <span>↑↓ to navigate</span>
                    <span>↵ to select</span>
                </div>
            </div>
        )}
       
      </div>
    </div>
  );
};

export default Spotlight;