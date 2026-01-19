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

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

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

  const toggleApp = ({ id, canOpen }) => {
    if (!canOpen) {
      console.log("App is locked:", id);
      return;
    }

    const win = windows[id];

    if (win?.isOpen) {
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
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              onClick={() => toggleApp({ id, canOpen })}   // ✅ clickable now
            >
              <img
                src={`images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
