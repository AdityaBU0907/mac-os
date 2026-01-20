import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Dock from "./Dock";

// Group 1: Standard Exports
export { Navbar, Welcome, Dock };

// Group 2: Window Components (Export default as Named)
export { default as Terminal } from "./Terminal";
export { default as Finder } from "./Finder";
export { default as Contact } from "./Contact";
export { default as Preview } from "./Preview";

// Group 3: New Apps (Add these lines!)
export { default as Safari } from "./Safari";
export { default as Photos } from "./Photos";
export { default as Trash } from "./Trash";