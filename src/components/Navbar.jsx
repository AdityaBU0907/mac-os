import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
import useTheme from "../hooks/useTheme"; // Ensure this path matches your alias or relative path
import useWindowStore from "#store/window";
import { navLinks } from "#constants";

// Import Panels
import WifiPanel from "./WifiPanel";
import ProfilePanel from "./ProfilePanel";
import Spotlight from "./Spotlight"; 

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { toggleWindow, focusWindow } = useWindowStore(); // Added toggleWindow to open apps

  const [activeMenu, setActiveMenu] = useState(null); 
  const [currentTime, setCurrentTime] = useState(dayjs().format("ddd D MMM h:mm A"));

  const wifiRef = useRef(null);
  const wifiBtnRef = useRef(null);
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);

  // --- Clock Logic (Updates every minute) ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("ddd D MMM h:mm A"));
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // --- Toggle Menu Logic ---
  const toggleMenu = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // --- Handle Navigation Clicks (Projects, Resume, Contact) ---
  const handleNavClick = (type) => {
    if (type === "resume") {
        // Special case for resume preview
        focusWindow("preview");
        toggleWindow("preview", { url: "/resume.pdf", label: "Resume" });
    } else {
        // Standard apps (finder, contact)
        focusWindow(type);
        toggleWindow(type);
    }
  };

  // --- Keyboard Shortcut (Cmd+K) ---
  useEffect(() => {
    const handleShortcut = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault(); 
        setActiveMenu((prev) => (prev === "spotlight" ? null : "spotlight"));
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // --- Click Outside to Close Panels ---
  useEffect(() => {
    const handleClickOutside = (e) => {
        if (
            activeMenu === 'wifi' && 
            wifiRef.current && !wifiRef.current.contains(e.target) &&
            wifiBtnRef.current && !wifiBtnRef.current.contains(e.target)
        ) {
            setActiveMenu(null);
        }
        if (
            activeMenu === 'profile' && 
            profileRef.current && !profileRef.current.contains(e.target) &&
            profileBtnRef.current && !profileBtnRef.current.contains(e.target)
        ) {
            setActiveMenu(null);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenu]);

  return (
    <>
        <nav className="fixed top-0 w-full h-8 bg-[#1e1e2e]/50 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4 text-gray-200 text-xs font-medium select-none">
            
            {/* LEFT SIDE: Logo & Navigation */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer">
                    <img src="/images/logo.svg" alt="logo" className="w-3.5 h-3.5" />
                </div>
                
                <span className="font-semibold hidden sm:block">Aditya's Portfolio</span>

                <ul className="flex items-center gap-1 ml-2">
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id}>
                            <button
                                onClick={() => handleNavClick(type)}
                                className="px-3 py-1 rounded hover:bg-white/10 transition-colors cursor-default active:scale-95"
                            >
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT SIDE: Status Icons & Time */}
            <div className="flex items-center gap-4 relative">
                <ul className="flex items-center gap-2">
                    {/* WIFI */}
                    <li>
                        <div 
                            ref={wifiBtnRef}
                            onClick={() => toggleMenu('wifi')}
                            className={`p-1 rounded cursor-pointer transition-colors hover:bg-white/10 ${activeMenu === 'wifi' ? 'bg-white/10' : ''}`}
                        >
                            <img src="/icons/wifi.svg" alt="wifi" className="w-4 h-4 invert opacity-80" />
                        </div>
                    </li>

                    {/* SEARCH */}
                    <li>
                        <div 
                            onClick={() => toggleMenu('spotlight')}
                            className={`p-1 rounded cursor-pointer transition-colors hover:bg-white/10 ${activeMenu === 'spotlight' ? 'bg-white/10' : ''}`}
                        >
                             <img src="/icons/search.svg" alt="search" className="w-3.5 h-3.5 invert opacity-80" />
                        </div>
                    </li>

                    {/* PROFILE */}
                    <li>
                        <div 
                            ref={profileBtnRef}
                            onClick={() => toggleMenu('profile')}
                            className={`p-1 rounded cursor-pointer transition-colors hover:bg-white/10 ${activeMenu === 'profile' ? 'bg-white/10' : ''}`}
                        >
                             <img src="/icons/user.svg" alt="user" className="w-3.5 h-3.5 invert opacity-80" />
                        </div>
                    </li>

                    {/* THEME TOGGLE */}
                    <li>
                        <div 
                            onClick={toggleTheme} 
                            className="p-1 rounded cursor-pointer transition-colors hover:bg-white/10"
                        >
                            <img src="/icons/mode.svg" alt="theme" className="w-4 h-4 invert opacity-80" />
                        </div>
                    </li>
                </ul>

                {/* --- PANELS (Absolute Positioned) --- */}
                {activeMenu === 'wifi' && <WifiPanel ref={wifiRef} />}
                {activeMenu === 'profile' && <ProfilePanel ref={profileRef} />}
                
                {/* CLOCK */}
                <time className="font-semibold tabular-nums min-w-[60px] text-center hidden sm:block">
                    {currentTime}
                </time>
            </div>
        </nav>

        {/* SPOTLIGHT (Overlay) */}
        {activeMenu === 'spotlight' && (
            <Spotlight onClose={() => setActiveMenu(null)} />
        )}
    </>
  );
};

export default Navbar;