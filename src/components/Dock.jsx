// import { useRef } from "react";
// import { dockApps } from "#constants";
// import { Tooltip } from "react-tooltip";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import useWindowStore from "#store/window";

// const Dock = () => {
//     const { openWindow,closeWindow,windows}=useWindowStore();
//   const dockRef = useRef(null);

//   useGSAP(() => {
//     const dock = dockRef.current;
//     if (!dock) return;

//     // Animate the IMAGES for best visual result
//     const icons = dock.querySelectorAll(".dock-icon img");

//     const animateIcons = (mouseX) => {
//       const { left } = dock.getBoundingClientRect();

//       icons.forEach((icon) => {
//         const { left: iconLeft, width } = icon.getBoundingClientRect();

//         const center = iconLeft - left + width / 2;
//         const distance = Math.abs(mouseX - center);

//         const intensity = Math.exp(-(distance ** 2) / 2000);

//         gsap.to(icon, {
//           scale: 1 + 0.35 * intensity,
//           y: -20 * intensity,
//           transformOrigin: "bottom center",
//           duration: 0.2,
//           ease: "power1.out",
//         });
//       });
//     };

//     const handleMouseMove = (e) => {
//       const { left } = dock.getBoundingClientRect();
//       animateIcons(e.clientX - left);
//     };

//     const resetIcons = () => {
//       icons.forEach((icon) =>
//         gsap.to(icon, {
//           scale: 1,
//           y: 0,
//           duration: 0.3,
//           ease: "power1.out",
//         })
//       );
//     };

//     dock.addEventListener("mousemove", handleMouseMove);
//     dock.addEventListener("mouseleave", resetIcons);

//     return () => {
//       dock.removeEventListener("mousemove", handleMouseMove);
//       dock.removeEventListener("mouseleave", resetIcons);
//     };
//   }, []);
//   const toggleApp = ({ id, canOpen }) => {
//   if (!canOpen) return;

//   const window = windows[id];

//   if (window?.isOpen) {
//     closeWindow(id);
//   } else {
//     openWindow(id);
//   }
// };



// //   const toggleApp = ({ id, canOpen }) => {
// //     if (!canOpen) return;
// //     console.log("Opening app:", id);
// //   };

//   return (
//     <section id="dock">
//       <div ref={dockRef} className="dock-container">
//         {dockApps.map(({ id, name, icon, canOpen }) => (
//           <div key={id} className="relative flex justify-center">
//             <button
//               type="button"
//               className="dock-icon"
//               data-tooltip-id="dock-tooltip"
//               data-tooltip-content={name}
//               data-tooltip-delay-show={150}
//               disabled={!canOpen}
//               onClick={() => toggleApp({ id, canOpen })}
//             >
//               <img
//                 src={`images/${icon}`}
//                 alt={name}
//                 loading="lazy"
//                 className={canOpen ? "" : "opacity-60"}
//               />
//             </button>
//           </div>
//         ))}

//         <Tooltip id="dock-tooltip" place="top" className="tooltip" />
//       </div>
//     </section>
//   );
// };

// export default Dock;


import { useRef } from "react";
import { dockApps } from "#constants";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  // --- 1. YOUR EXISTING HOVER EFFECT (PRESERVED) ---
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    // Targeted selector matches the HTML structure below
    const icons = dock.querySelectorAll(".dock-icon img");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();

        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2) / 2000);

        gsap.to(icon, {
          scale: 1 + 0.35 * intensity,
          y: -20 * intensity,
          transformOrigin: "bottom center",
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () => {
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );
    };

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  // --- 2. UPDATED TOGGLE LOGIC WITH BOUNCE ---
  const toggleApp = ({ id, canOpen }, e) => {
    if (!canOpen) return;

    const win = windows[id];
    const isClosed = !win || !win.isOpen;

    // A. The "Bounce" Animation on Click
    // We target the image inside the clicked button
    const iconImg = e.currentTarget.querySelector("img");
    
    // Only bounce if opening fresh
    if (isClosed && iconImg) {
       gsap.to(iconImg, {
         y: -30,       // Jump height
         duration: 0.2,
         yoyo: true,   // Go back down
         repeat: 1,    // Once
         ease: "power1.inOut"
       });
    }

    // B. Window Store Logic
    if (!isClosed) {
      console.log("Closing app:", id);
      closeWindow(id);
    } else {
      console.log("Opening app:", id);
      openWindow(id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          // Added 'group' and 'flex-col' to stack the Dot below the Icon
          <div key={id} className="relative flex flex-col items-center justify-end gap-1 group">
            
            <button
              type="button"
              className="dock-icon outline-none" // This class matches your GSAP selector
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              onClick={(e) => toggleApp({ id, canOpen }, e)}
            >
              <img
                src={`images/${icon}`}
                alt={name}
                loading="lazy"
                // Added transition for the disabled state
                className={`transition-opacity duration-200 ${canOpen ? "" : "opacity-60 grayscale"}`}
              />
            </button>

            {/* --- 3. THE ACTIVE DOT INDICATOR --- */}
            <div 
                className={`
                    w-1 h-1 rounded-full bg-black/50 dark:bg-white/80 shadow-sm
                    transition-all duration-300
                    ${windows[id]?.isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `} 
            />
            
          </div>
        ))}

        <Tooltip 
            id="dock-tooltip" 
            place="top" 
            className="!bg-black/60 !backdrop-blur-md !px-3 !py-1 !rounded-lg !text-xs" 
            offset={20}
        />
      </div>
    </section>
  );
};

export default Dock;