import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 }
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return () => {};

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];
    
    // Store mouse position to use inside the animation loop
    let mouse = { x: -1000, active: false }; // Start off-screen

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        mouse.x = e.clientX - left;
        mouse.active = true;
    };

    const handleMouseLeave = () => {
        mouse.active = false;
    };

    // --- THE LIVE LIQUID LOOP ---
    // This runs ~60 times per second to create the "moving" water effect
    const tick = (time, deltaTime) => {
        // 'time' is the total elapsed time in seconds
        
        letters.forEach((letter, index) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            // We need relative position inside container since 'mouse.x' is relative
            // But getBoundingClientRect is absolute. Let's fix relative math:
            const containerLeft = container.getBoundingClientRect().left;
            const center = (l - containerLeft) + w / 2;
            
            let distance = Math.abs(mouse.x - center);
            
            // If mouse left, treat distance as infinite (smooth fade out)
            if (!mouse.active) distance = 1000;

            // 1. Intensity (How close is the mouse?)
            // We use a lerp-like approach or just direct calculation
            const intensity = Math.exp(-(distance ** 2) / 4000);

            // 2. Weight Animation (Smooth transition)
            // We use the current style to lerp towards target for smoothness
            const currentWeight = parseFloat(letter.style.fontVariationSettings.split(' ')[1]) || base;
            const targetWeight = min + (max - min) * intensity;
            const newWeight = currentWeight + (targetWeight - currentWeight) * 0.1; // Smooth ease
            
            letter.style.fontVariationSettings = `'wght' ${newWeight}`;

            // 3. LIVE COLOR CALCULATION
            // Flow speed: time * 150
            // Wave shape: index * 15
            // This makes the color "move" constantly to the right
            const flowOffset = time * 150; 
            const hue = (index * 15 - flowOffset) % 360;

            const activeColor = `hsl(${hue}, 90%, 60%)`;
            const baseColor = "rgb(229, 231, 235)"; // Gray-200

            // Apply color only based on intensity
            if (intensity > 0.01) {
                // If we are hovering, mix the live color
                // Ideally we interpolate, but doing full CSS interpolation in JS loop is heavy.
                // Instead, we just switch to color if close enough, or set color directly.
                // For performance, we set color directly:
                letter.style.color = activeColor;
                // Use opacity or filter to blend? No, let's keep it sharp.
                // To make it fade out smoothly, we can use CSS transition on the color property.
                letter.style.transition = "color 0.1s ease-out"; 
            } else {
                letter.style.color = baseColor;
                letter.style.transition = "color 0.4s ease-out"; 
            }
        });
    };

    // Add listeners
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    // Start the GSAP Ticker
    gsap.ticker.add(tick);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        gsap.ticker.remove(tick);
    };
};

const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        const cleanup1 = setupTextHover(titleRef.current, "title");
        const cleanup2 = setupTextHover(subtitleRef.current, "subtitle");

        return () => {
            cleanup1?.();
            cleanup2?.();
        };
    }, []);

    return (
        <section id="welcome" className="flex flex-col items-center justify-center min-h-[60vh] text-center select-none cursor-default">
            <p ref={subtitleRef} className="text-gray-200">
                {renderText("Hey, I'm Aditya! Welcome to my", 'text-3xl font-georama', 200)}
            </p>
            <h1 ref={titleRef} className="mt-4 text-gray-200">
                {renderText("portfolio", "text-9xl italic font-georama")}
            </h1>

            <div className="small-screen">
                <p>This website is only made for laptop or tablet screens</p>
            </div>
        </section>
    );
};

export default Welcome;