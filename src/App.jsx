import { useEffect } from "react"; 
// UPDATED: Added Safari, Photos, and Trash to imports
import { Navbar, Welcome, Dock, Terminal, Finder, Contact, Preview, Safari, Photos, Trash } from "#components"; 
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme"; 

const App = () => {
  const { windows } = useWindowStore();
  const { theme } = useThemeStore(); 

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

      {/* --- WINDOWS LAYER --- */}
      {/* These only render when their isOpen state is true */}
      
      {/* Utilities */}
      {windows.terminal?.isOpen && <Terminal />}
      {windows.finder?.isOpen && <Finder />}
      {windows.preview?.isOpen && <Preview />}
      
      {/* Apps */}
      {windows.contact?.isOpen && <Contact />}
      {windows.safari?.isOpen && <Safari />}    {/* Added Safari */}
      {windows.photos?.isOpen && <Photos />}    {/* Added Photos */}
      {windows.trash?.isOpen && <Trash />}      {/* Added Trash */}

      <Dock />
    </main>
  );
};

export default App;