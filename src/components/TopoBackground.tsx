"use client";

export function TopoBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full text-gray-900 opacity-[0.02]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
         <pattern
            id="topo-pattern"
            x="0"
            y="0"
            width="100%"
            height="100%"
            patternUnits="userSpaceOnUse"
         >
             <path
                stroke="currentColor"
                strokeWidth="1"
                d="M0 100 C 30 50, 70 150, 100 100 S 170 0, 200 50 S 270 150, 300 100 S 370 0, 400 50 S 470 150, 500 100 S 570 0, 600 50 S 670 150, 700 100 S 770 0, 800 50 S 870 150, 900 100"
                fill="none"
                transform="scale(2)"
             />
             <path
                stroke="currentColor"
                strokeWidth="1"
                d="M0 200 C 50 150, 90 250, 140 200 S 220 100, 270 150 S 350 250, 400 200 S 480 100, 530 150 S 610 250, 660 200 S 740 100, 790 150 S 870 250, 920 200"
                fill="none"
                 transform="scale(2)"
             />
            {/* Simple wavy lines simulating topo map */}
         </pattern>
         <rect width="100%" height="100%" fill="url(#topo-pattern)" />
      </svg>
      {/* Fallback to image if the SVG is too simple, but the prompt asked for separate component */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.02] bg-[url('/topo-pattern.svg')] bg-repeat bg-center"
        style={{
            maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 100%)"
        }}
      ></div>
    </div>
  );
}
