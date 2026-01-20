import { useRef } from "react";
import Draggable from "react-draggable";
import { X, Minus, Square, ExternalLink, Send } from "lucide-react";
import useWindowStore from "#store/window";

// CONFIGURATION: Premium Dark Cards with Brand Glows
const SOCIALS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "/icons/instagram.png", 
    link: "https://instagram.com/aditya_id__", 
    className: "bg-white/5 border-white/10 hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:shadow-[0_0_20px_rgba(225,48,108,0.2)]" 
  },
  {
    id: "whatsapp", 
    name: "WhatsApp", 
    icon: "/icons/whatsapp.png", 
    link: "https://wa.me/917366874487", 
    className: "bg-white/5 border-white/10 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "/icons/linkedin.png",
    link: "https://www.linkedin.com/in/aditya-raj-a321921b6/", 
    className: "bg-white/5 border-white/10 hover:border-[#0077b5] hover:bg-[#0077b5]/10 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]"
  },
  {
    id: "email",
    name: "Send Message",
    icon: "/icons/email.png", 
    link: "mailto:adityabu0907@gmail.com",
    className: "bg-white/5 border-white/10 hover:border-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
  },
];

const Contact = () => {
  const { closeWindow, focusWindow, windows } = useWindowStore();
  const zIndex = windows.contact?.zIndex || 40;
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} handle=".window-header" defaultPosition={{x: 300, y: 80}}>
      <div
        ref={nodeRef}
        style={{ zIndex }}
        onMouseDown={() => focusWindow("contact")}
        className="
          /* --- UPDATED DIMENSIONS --- */
          absolute w-[720px] h-[600px]  /* Increased height for more spacing */
          rounded-2xl overflow-hidden
          
          /* --- PREMIUM DARK THEME --- */
          bg-[#0f0f11]/95       
          backdrop-blur-3xl 
          border border-white/10 
          shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_20px_50px_rgba(0,0,0,0.7)]
          
          flex flex-col font-sans text-gray-200
        "
      >
        {/* --- TITLE BAR --- */}
        <div className="window-header h-12 flex items-center justify-between px-5 bg-white/5 border-b border-white/5 cursor-move active:cursor-grabbing">
            <div className="flex gap-2 group">
                <div onClick={() => closeWindow("contact")} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer flex items-center justify-center shadow-inner">
                   <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-inner flex items-center justify-center">
                    <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-inner flex items-center justify-center">
                    <Square size={7} fill="currentColor" className="text-black/50 opacity-0 group-hover:opacity-100" />
                </div>
            </div>
            <span className="text-xs font-bold text-gray-500 tracking-widest uppercase opacity-80">Contact Me</span>
            <div className="w-10" />
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-[-20%] left-[20%] w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[20%] w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Profile Section */}
            {/* Increased spacing (mb-12) and restored larger image size (w-24) */}
            <div className="flex flex-col items-center text-center gap-5 mb-12 z-10">
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-95 group-hover:opacity-30 blur transition duration-500"></div>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-1 border-black/50 shadow-2xl bg-black">
                        <img 
                            src="/images/profile.png" 
                            alt="Profile" 
                            onError={(e) => {e.target.src="https://github.com/shadcn.png"}} 
                            className="w-full h-30 object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>
                
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">Let's Connect</h2>
                    <p className="text-sm font-medium text-gray-400 mt-3 max-w-md mx-auto leading-relaxed">
                        Drop a message or connect via social media. I'm currently open to new opportunities.
                    </p>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl z-10">
                {SOCIALS.map((item) => (
                    <a 
                        key={item.id}
                        href={item.link}
                        target="_blank" 
                        rel="noreferrer"
                        className={`
                            group relative overflow-hidden rounded-xl p-4 h-24 flex items-center justify-between
                            transition-all duration-300 border
                            cursor-pointer
                            ${item.className}
                        `}
                    >
                        {/* Icon + Text Group */}
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-black/30 rounded-lg backdrop-blur-md border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                {item.id === 'email' ? (
                                    <Send size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                                ) : (
                                    <img 
                                        src={item.icon} 
                                        alt={item.name} 
                                        className="w-5 h-5 object-contain invert opacity-80 group-hover:opacity-100 transition-opacity" 
                                        onError={(e) => e.target.style.display = 'none'} 
                                    />
                                )}
                            </div>
                            <span className="text-gray-200 font-semibold text-base tracking-wide group-hover:text-white transition-colors">
                                {item.name}
                            </span>
                        </div>

                        {/* External Link Icon */}
                        <ExternalLink size={16} className="text-white/40 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                ))}
            </div>

        </div>
      </div>
    </Draggable>
  );
};

export default Contact;