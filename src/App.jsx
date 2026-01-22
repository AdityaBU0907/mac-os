import { useEffect, useState } from "react"; // ✅ Added useState
import { Navbar, Welcome, Dock, Terminal, Finder, Contact, Preview, Safari, Photos, Trash } from "#components"; 
// 👇 Import your new Bot components
// If you added them to your index.js, import from "#components". 
// If not, import relative like this:
import ChatWindow from "./components/ChatWindow"; 
import DesktopIcon from "./components/DesktopIcon";

import useWindowStore from "#store/window";
import useThemeStore from "#store/theme"; 

const App = () => {
  const { windows } = useWindowStore();
  const { theme } = useThemeStore(); 
  
  // ✅ Local state for the ChatBot (so you don't have to edit your Store yet)
  const [isChatOpen, setIsChatOpen] = useState(false);

  // --- THE MAGIC SYNC ---
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]); 

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[url('/images/wallpaper.jpg')] bg-cover bg-center font-sans transition-colors duration-500">
      
      <Navbar />
      <Welcome />

      {/* --- DESKTOP ICONS LAYER --- */}
      {/* ✅ Placed absolutely on the desktop (Top Left) */}
      <div className="absolute top-20 left-5 z-10">
        <DesktopIcon onClick={() => setIsChatOpen(true)} />
      </div>

      {/* --- WINDOWS LAYER --- */}
      
      {/* 1. Existing Store-Managed Windows */}
      {windows.terminal?.isOpen && <Terminal />}
      {windows.finder?.isOpen && <Finder />}
      {windows.preview?.isOpen && <Preview />}
      {windows.contact?.isOpen && <Contact />}
      {windows.safari?.isOpen && <Safari />}
      {windows.photos?.isOpen && <Photos />}
      {windows.trash?.isOpen && <Trash />}

      {/* 2. ✅ The New ChatBot Window (Managed Locally) */}
      {isChatOpen && (
        <ChatWindow onClose={() => setIsChatOpen(false)} />
      )}

      <Dock />
    </main>
  );
};

export default App;