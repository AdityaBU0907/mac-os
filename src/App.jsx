import { useEffect } from "react"; // <--- Import this
import { Navbar, Welcome, Dock, Terminal, Finder } from "#components";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme"; // <--- Import the new store

const App = () => {
  const { windows } = useWindowStore();
  const { theme } = useThemeStore(); // <--- Get current theme

  // --- THE MAGIC SYNC ---
  useEffect(() => {
    const root = window.document.documentElement;
    // Remove old class
    root.classList.remove("light", "dark");
    // Add new class
    root.classList.add(theme);
  }, [theme]); // Runs whenever theme changes

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[url('/images/wallpaper.jpg')] bg-cover bg-center font-sans transition-colors duration-500">
      {/* ... rest of your app ... */}
      <Navbar />
      <Welcome />
      {windows.terminal?.isOpen && <Terminal />}
      {windows.finder?.isOpen && <Finder />}
      <Dock />
    </main>
  );
};

export default App;