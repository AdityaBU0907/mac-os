import { forwardRef, useState } from "react";
import { User, Mail, Github, Linkedin, FileText, Moon, Terminal, Smartphone } from "lucide-react";

const ProfilePanel = forwardRef((props, ref) => {
  const [isDND, setIsDND] = useState(false);

  const openLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div
      ref={ref}
      className="
        absolute top-12 right-12
        w-80
        rounded-2xl
        bg-[#e5e5e5]/90 dark:bg-[#1e1e2e]/80
        backdrop-blur-2xl backdrop-saturate-200
        shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5)]
        p-3 text-[13px] z-50 select-none
        font-sans text-gray-900 dark:text-gray-100
        flex flex-col gap-3
      "
    >
      {/* --- Section 1: User Card --- */}
      <div className="
         relative overflow-hidden
         bg-blue-600 text-white 
         rounded-xl p-3.5 shadow-lg
         group
      ">
         <div className="flex items-center gap-3 relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm shadow-inner border border-white/20">
                <User size={24} />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-[15px] tracking-wide">Aditya</span>
                <span className="text-[11px] text-blue-100 font-medium opacity-90">Full Stack Developer</span>
            </div>
         </div>
         <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-bl-full opacity-50" />
      </div>

      {/* --- Section 2: Quick Actions --- */}
      <div className="grid grid-cols-2 gap-2.5">
         <button 
            onClick={() => openLink("https://github.com/AdityaBU0907")}
            className="
            flex items-center gap-3 px-3 py-3 rounded-xl 
            bg-gray-200/50 dark:bg-white/5 
            hover:bg-gray-100 dark:hover:bg-white/10
            transition-all duration-200 active:scale-[0.98] w-full
         ">
            <div className="p-1.5 bg-black dark:bg-white rounded-full text-white dark:text-black">
                <Github size={14} />
            </div>
            <span className="font-semibold text-[12px]">GitHub</span>
         </button>

         <button 
            onClick={() => openLink("https://www.linkedin.com/in/aditya-raj-a321921b6/")}
            className="
            flex items-center gap-3 px-3 py-3 rounded-xl 
            bg-gray-200/50 dark:bg-white/5 
            hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600
            transition-all duration-200 active:scale-[0.98] group w-full
         ">
            <div className="p-1.5 bg-blue-600 rounded-full text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
                <Linkedin size={14} />
            </div>
            <span className="font-semibold text-[12px]">LinkedIn</span>
         </button>

         <button 
             onClick={() => openLink("/resume.pdf")}
             className="
            flex items-center gap-3 px-3 py-3 rounded-xl 
            bg-gray-200/50 dark:bg-white/5 
            hover:bg-gray-100 dark:hover:bg-white/10
            transition-all duration-200 active:scale-[0.98] w-full
         ">
            <div className="p-1.5 bg-orange-500 rounded-full text-white">
                <FileText size={14} />
            </div>
            <span className="font-semibold text-[12px]">Resume</span>
         </button>

         <button 
            onClick={() => window.location.href = 'mailto:adityabu0907@bennett.edu.in'}
            className="
            flex items-center gap-3 px-3 py-3 rounded-xl 
            bg-gray-200/50 dark:bg-white/5 
            hover:bg-green-500 hover:text-white dark:hover:bg-green-600
            transition-all duration-200 active:scale-[0.98] group w-full
         ">
            <div className="p-1.5 bg-green-500 rounded-full text-white group-hover:bg-white group-hover:text-green-500 transition-colors">
                <Mail size={14} />
            </div>
            <span className="font-semibold text-[12px]">Email</span>
         </button>
      </div>

      {/* --- Section 3: Status & System --- */}
      <div className="flex flex-col gap-2 mt-1">
          {/* DND Toggle */}
          <div className="
            flex items-center justify-between p-2.5 rounded-xl 
            bg-gray-200/40 dark:bg-white/5 
          ">
             <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-full ${isDND ? 'bg-purple-500 text-white' : 'bg-gray-400/30 text-gray-500'}`}>
                    <Moon size={14} fill={isDND ? "currentColor" : "none"} />
                </div>
                <span className="text-[12px] font-medium">Do Not Disturb</span>
             </div>
             <div 
                onClick={() => setIsDND(!isDND)}
                className={`
                    w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors duration-300
                    ${isDND ? 'bg-purple-500' : 'bg-gray-400/30'}
                `}
                >
                <div className={`
                    w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300
                    ${isDND ? 'translate-x-4' : 'translate-x-0'}
                `} />
            </div>
          </div>
          
          {/* UPDATED: System Info Badge */}
          <div className="
             group
             flex items-center justify-center gap-2 py-2.5 rounded-lg
             bg-gray-200/30 dark:bg-white/5
             border border-transparent hover:border-gray-300/50 dark:hover:border-white/10
             text-gray-600 dark:text-gray-300
             transition-all
          ">
             <Terminal size={13} className="opacity-80 group-hover:opacity-100" />
             <span className="text-[11px] font-mono tracking-wide font-medium">
                System: Arch Linux • 64-bit
             </span>
          </div>
      </div>
    </div>
  );
});

export default ProfilePanel;