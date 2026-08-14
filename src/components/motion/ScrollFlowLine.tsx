import { useEffect, useState } from "react";

type ScrollFlowLineProps = {
    className?: string;
};

function ScrollFlowLine({
    className = "",
}: ScrollFlowLineProps) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;

            const progress = Math.min(
                window.scrollY / viewportHeight,
                1,
            );
            
            setScrollProgress(progress);
        };
        
        handleScroll();
        
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, []);
    
    const translateY = scrollProgress * 140;
    const scaleX = 1 + scrollProgress * 0.12;
    const rotate = scrollProgress * -2;
    const opacity = 0.34 - scrollProgress * 0.08;

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 1000 280"
            fill="none"
            className={`scroll-flow-line ${className}`}
            style={{
                transform: `
                    translate3d(0, ${translateY}px, 0)
                    scaleX(${scaleX})
                    rotate(${rotate}deg)
                `,
                opacity,
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="scroll-flow-line-path"
                d="
                    M 10 145
                    C 130 55, 240 215, 370 130
                    C 500 45, 610 220, 750 120
                    C 840 58, 915 80, 990 145
                "
            />
        </svg>
    );
}

export default ScrollFlowLine;