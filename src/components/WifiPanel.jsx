// import { forwardRef, useState } from "react";
// import { Wifi, Lock, Check, Settings, ChevronRight, Info } from "lucide-react";

// const WifiPanel = forwardRef((props, ref) => {
//   const [isWifiOn, setIsWifiOn] = useState(true);

//   return (
//     <div
//       ref={ref}
//       className="
//         absolute top-12 right-4 
//         w-80 /* Fixed narrow width for vertical menu */
//         rounded-2xl
//         bg-[#e5e5e5]/80 dark:bg-[#1e1e2e]/60 
//         backdrop-blur-xl backdrop-saturate-150
//         shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.4)]
//         p-2.5 text-[13px] z-50 select-none
//         font-sans text-gray-900 dark:text-gray-100
//         flex flex-col gap-2 /* This ensures vertical stacking */
//       "
//     >
//       {/* 1. HEADER ROW (Toggle) */}
//       <div className="flex items-center justify-between px-2 pt-1">
//         <span className="font-semibold text-[15px] pl-1">Wi-Fi</span>
//         <div 
//           onClick={() => setIsWifiOn(!isWifiOn)}
//           className={`
//             w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300
//             ${isWifiOn ? 'bg-blue-500' : 'bg-gray-500/30'}
//           `}
//         >
//           <div className={`
//             w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
//             ${isWifiOn ? 'translate-x-4' : 'translate-x-0'}
//           `} />
//         </div>
//       </div>

//       {/* DIVIDER */}
//       <div className="h-px w-full bg-black/5 dark:bg-white/10" />

//       {/* 2. NETWORK LIST CONTENT */}
//       {isWifiOn ? (
//         <div className="flex flex-col gap-3">
          
//           {/* A. Current Network (Blue Card) */}
//           <div>
//             <div className="px-3 pb-1.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider opacity-80">
//               Known Networks
//             </div>
//             <div className="
//                relative overflow-hidden
//                bg-blue-600 text-white 
//                rounded-xl p-3 shadow-lg
//                transition-all hover:scale-[1.02] active:scale-[0.98]
//             ">
//                <div className="flex items-start justify-between z-10 relative">
//                   <div className="flex flex-col gap-1">
//                       <div className="flex items-center gap-2">
//                           <span className="font-bold text-[14px]">Home Network</span>
//                       </div>
//                       <span className="text-[11px] text-blue-100/90 font-medium">Connected via 5GHz</span>
                      
//                       <div className="mt-2 flex flex-col gap-0.5 text-[10px] text-blue-200">
//                          <span className="flex items-center gap-1"><Lock size={10} /> WPA3 Security</span>
//                          <span className="flex items-center gap-1"><Info size={10} /> IPv4 • 120Mbps</span>
//                       </div>
//                   </div>
//                   <div className="bg-white/20 p-1 rounded-full">
//                     <Check size={14} className="text-white" />
//                   </div>
//                </div>
               
//                {/* Decorative background glow for the card */}
//                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 blur-xl rounded-full" />
//             </div>
//           </div>

//           {/* B. Other Networks List */}
//           <div>
//             <div className="px-3 pb-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider opacity-80">
//               Other Networks
//             </div>
//             <div className="flex flex-col gap-0.5">
//               {["Office WiFi", "Cafe_Free", "Neighbor_5G"].map((net) => (
//                 <div
//                   key={net}
//                   className="
//                     flex items-center justify-between
//                     px-3 py-2 rounded-lg
//                     hover:bg-black/5 dark:hover:bg-white/10
//                     active:bg-black/10 dark:active:bg-white/20
//                     transition-colors cursor-pointer group
//                   "
//                 >
//                   <div className="flex items-center gap-3">
//                     <Wifi size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
//                     <span className="font-medium">{net}</span>
//                   </div>
//                   <Lock size={12} className="text-gray-400 opacity-60" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* OFF STATE MESSAGE */
//         <div className="py-8 text-center text-gray-500 dark:text-gray-400">
//             <Wifi size={32} className="mx-auto mb-2 opacity-20" />
//             <p className="text-sm">Wi-Fi is Off</p>
//         </div>
//       )}

//       {/* 3. FOOTER */}
//       <div className="h-px w-full bg-black/5 dark:bg-white/10 mt-1" />
      
//       <div className="
//         group flex items-center justify-between 
//         px-3 py-2 rounded-lg
//         hover:bg-black/5 dark:hover:bg-white/10 
//         cursor-pointer transition-colors
//       ">
//         <span className="text-[12px] font-medium text-gray-600 dark:text-gray-300">Wi-Fi Settings...</span>
//         <ChevronRight size={14} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" />
//       </div>

//     </div>
//   );
// });

// export default WifiPanel;


import { forwardRef, useState } from "react";
import { Wifi, Lock, Check, Github, ArrowUpRight, Cpu } from "lucide-react";

const WifiPanel = forwardRef((props, ref) => {
  const [isWifiOn, setIsWifiOn] = useState(true);

  // Function to handle GitHub navigation
  const handleGithubClick = () => {
    window.open("https://github.com/AdityaBU0907", "_blank"); // Replace with your actual GitHub URL
  };

  return (
    <div
      ref={ref}
      className="
        absolute top-12 right-4 
        w-80 
        rounded-2xl
        bg-[#e5e5e5]/90 dark:bg-[#1e1e2e]/80 
        backdrop-blur-2xl backdrop-saturate-200
        shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_40px_rgba(0,0,0,0.5)]
        p-2.5 text-[13px] z-50 select-none
        font-sans text-gray-900 dark:text-gray-100
        flex flex-col gap-2
      "
    >
      {/* 1. HEADER ROW */}
      <div className="flex items-center justify-between px-2 pt-1">
        <span className="font-semibold text-[15px] pl-1">Connectivity</span>
        <div 
          onClick={() => setIsWifiOn(!isWifiOn)}
          className={`
            w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300
            ${isWifiOn ? 'bg-blue-500' : 'bg-gray-500/30'}
          `}
        >
          <div className={`
            w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300
            ${isWifiOn ? 'translate-x-4' : 'translate-x-0'}
          `} />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-px w-full bg-black/5 dark:bg-white/10" />

      {/* 2. CONTENT */}
      {isWifiOn ? (
        <div className="flex flex-col gap-3">
          
          {/* A. ACTIVE "NETWORK" (Your Main Status) */}
          <div>
            <div className="px-3 pb-1.5 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider opacity-80">
              Current Focus
            </div>
            <div className="
               relative overflow-hidden
               bg-blue-600 text-white 
               rounded-xl p-3 shadow-lg
               transition-all hover:scale-[1.02] active:scale-[0.98]
               cursor-default
            ">
               <div className="flex items-start justify-between z-10 relative">
                  <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                          {/* Use a brain or CPU icon for 'Focus' */}
                          <span className="font-bold text-[14px] tracking-wide">Aditya's Brain</span>
                      </div>
                      <span className="text-[11px] text-blue-100/90 font-medium">Connected via Creativity</span>
                      
                      <div className="mt-2 flex flex-col gap-0.5 text-[10px] text-blue-200 font-mono">
                         <span className="flex items-center gap-1.5"><Cpu size={10} /> Latency: 0ms (Flow State)</span>
                         <span className="flex items-center gap-1.5"><Lock size={10} /> Open to Work</span>
                      </div>
                  </div>
                  <div className="bg-white/20 p-1 rounded-full">
                    <Check size={14} className="text-white" />
                  </div>
               </div>
               
               {/* Decorative Glow */}
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/20 blur-2xl rounded-full" />
            </div>
          </div>

          {/* B. "AVAILABLE NETWORKS" (Your Skills/Interests) */}
          <div>
            <div className="px-3 pb-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider opacity-80">
              Discoverable Skills
            </div>
            <div className="flex flex-col gap-0.5">
              {[
                { name: "Arch_Linux_BTW", strength: 3 },
                { name: "React_Ecosystem", strength: 3 },
                { name: "C++_Compiler", strength: 2 },
                { name: "Auto_Testing_Bot", strength: 3 },
              ].map((net) => (
                <div
                  key={net.name}
                  className="
                    flex items-center justify-between
                    px-3 py-2 rounded-lg
                    hover:bg-black/5 dark:hover:bg-white/10
                    active:bg-black/10 dark:active:bg-white/20
                    transition-colors cursor-pointer group
                  "
                >
                  <div className="flex items-center gap-3">
                    {/* Dynamic Icon Opacity based on 'strength' */}
                    <Wifi size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" />
                    <span className="font-medium font-mono text-[12px]">{net.name}</span>
                  </div>
                  <Lock size={12} className="text-gray-400 opacity-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            <Wifi size={32} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">Skills Offline</p>
        </div>
      )}

      {/* 3. FOOTER (Link to GitHub) */}
      <div className="h-px w-full bg-black/5 dark:bg-white/10 mt-1" />
      
      <div 
        onClick={handleGithubClick}
        className="
            group flex items-center justify-between 
            px-3 py-2 rounded-lg
            hover:bg-black/5 dark:hover:bg-white/10 
            cursor-pointer transition-colors
      ">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Github size={14} />
            <span className="text-[12px] font-medium">Explore my GitHub workspace</span>
        </div>
        <ArrowUpRight size={13} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-white transition-colors" />
      </div>

    </div>
  );
});

export default WifiPanel;