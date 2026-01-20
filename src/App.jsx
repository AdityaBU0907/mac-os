import { useEffect } from "react"; 
// UPDATED: Import Contact and Preview
import { Navbar, Welcome, Dock, Terminal, Finder, Contact, Preview } from "#components"; 
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
      {windows.terminal?.isOpen && <Terminal />}
      {windows.finder?.isOpen && <Finder />}
      {windows.contact?.isOpen && <Contact />}   {/* Added Contact */}
      {windows.preview?.isOpen && <Preview />}   {/* Added Preview (for Resume) */}

      <Dock />
    </main>
  );
};

export default App;