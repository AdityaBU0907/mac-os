// import { navIcons, navLinks } from "#constants"

// import dayjs from "dayjs"

// const Navbar = () => {
//   return (
//     <nav>
//         <div>
//             <img src="/images/logo.svg" al={true} />
//             <p className='font-bold px-0.5'>Aditya's Portfolio</p>

//             <ul>
//                 {navLinks.map(({id,name}) => (
//                     <li key={id}>
//                         <p>{name}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>

//         {/* right side */}
//         <div> 
//             <ul>
//                 {
//                     navIcons.map(({id,img}) =>(
//                         <li key={id}>
//                             <img src={img} className="icon-hover" alt={`icon-${id}`} />
//                         </li>
//                     ))
//                 }
//             </ul>
//             <time>{dayjs().format("dddd D MMM h:mm A")}</time>

//         </div>



//     </nav>
//   )
// }

// export default Navbar
import dayjs from "dayjs";
import { useState, useRef, useEffect } from "react";
import useTheme from "../hooks/useTheme";
import useWindowStore from "#store/window";
import { navLinks } from "#constants";

// Import Panels
import WifiPanel from "./WifiPanel";
import ProfilePanel from "./ProfilePanel";
import Spotlight from "./Spotlight"; // Import the new component

const Navbar = () => {
  const { toggleTheme } = useTheme();
  const { openWindow } = useWindowStore();

  const [activeMenu, setActiveMenu] = useState(null); 

  const wifiRef = useRef(null);
  const wifiBtnRef = useRef(null);
  const profileRef = useRef(null);
  const profileBtnRef = useRef(null);

  const toggleMenu = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // --- SHORTCUT LISTENER (CMD+K / CTRL+K) ---
  useEffect(() => {
    const handleShortcut = (e) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault(); // Stop browser default (usually search bar)
        setActiveMenu((prev) => (prev === "spotlight" ? null : "spotlight"));
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  // --- CLICK OUTSIDE LOGIC ---
  useEffect(() => {
    const handleClickOutside = (e) => {
        // ... (Keep your existing WiFi/Profile close logic here) ...
        
        // Spotlight usually handles its own "close on backdrop click" internally 
        // via the component prop, so we don't strictly need logic here for it.
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
        <nav>
        {/* Left side */}
        <div>
            <img src="/images/logo.svg" alt="logo" />
            <p className="font-bold px-0.5">Aditya's Portfolio</p>

            <ul>
            {navLinks.map(({ id, name }) => (
                <li key={id}>
                <p>{name}</p>
                </li>
            ))}
            </ul>
        </div>

        {/* Right side */}
        <div className="relative">
            <ul>
            {/* WIFI */}
            <li>
                <img
                ref={wifiBtnRef}
                src="/icons/wifi.svg"
                className={`icon-hover cursor-pointer ${activeMenu === 'wifi' ? 'bg-black/10 dark:bg-white/10 rounded-md' : ''}`}
                alt="wifi"
                onClick={() => toggleMenu('wifi')}
                />
            </li>

            {/* SEARCH (SPOTLIGHT) */}
            <li>
                <img
                src="/icons/search.svg"
                className={`icon-hover cursor-pointer ${activeMenu === 'spotlight' ? 'bg-black/10 dark:bg-white/10 rounded-md' : ''}`}
                alt="search"
                // Toggle spotlight state
                onClick={() => toggleMenu('spotlight')}
                />
            </li>

            {/* PROFILE */}
            <li>
                <img
                ref={profileBtnRef}
                src="/icons/user.svg"
                className={`icon-hover cursor-pointer ${activeMenu === 'profile' ? 'bg-black/10 dark:bg-white/10 rounded-md' : ''}`}
                alt="user"
                onClick={() => toggleMenu('profile')}
                />
            </li>

            {/* THEME */}
            <li>
                <img
                src="/icons/mode.svg"
                className="icon-hover cursor-pointer"
                alt="theme"
                onClick={toggleTheme}
                />
            </li>
            </ul>

            {/* --- Render Panels --- */}
            {activeMenu === 'wifi' && <WifiPanel ref={wifiRef} />}
            {activeMenu === 'profile' && <ProfilePanel ref={profileRef} />}
            
            <time>{dayjs().format("dddd D MMM h:mm A")}</time>
        </div>
        </nav>

        {/* Render Spotlight outside the nav structure, so it centers on screen */}
        {activeMenu === 'spotlight' && (
            <Spotlight onClose={() => setActiveMenu(null)} />
        )}
    </>
  );
};

export default Navbar;