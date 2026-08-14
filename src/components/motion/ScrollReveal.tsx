import { useEffect, useRef, useState } from "react";

type ScrollRevealProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
};

function ScrollReveal({
    children,
    className = "",
    delay = 0,
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const element = elementRef.current;
        
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.2,
            },
        );
        
        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);
    
    return (
        <div
            ref={elementRef}
            className={`scroll-reveal ${
                isVisible ? "scroll-reveal-visible" : ""
            } ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default ScrollReveal;