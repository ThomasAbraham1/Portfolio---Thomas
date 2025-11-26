import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if device is mobile/touch
        const checkMobile = () => {
            setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkMobile();
    }, []);

    useEffect(() => {
        // Don't add event listeners on mobile
        if (isMobile) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isMobile]);

    // Hide cursor on mobile devices
    if (isMobile) return null;

    return (
        <>
            {/* Spotlight */}
            <div
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(125, 161, 191, 0.15), transparent 80%)`
                }}
            />

            {/* Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-dark rounded-full pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 5,
                    y: mousePosition.y - 5,
                    scale: isHovering ? 0 : 1
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            />

            {/* Cursor Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border border-dark/50 rounded-full pointer-events-none z-[9999]"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? 'rgba(125, 161, 191, 0.1)' : 'transparent',
                    borderColor: isHovering ? 'transparent' : 'rgba(36, 38, 43, 0.3)'
                }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            />
        </>
    );
}
