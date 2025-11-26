import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="relative min-h-screen bg-light text-dark overflow-x-hidden selection:bg-primary selection:text-white font-sans transition-colors duration-300 dark:bg-dark dark:text-light">
            <CustomCursor />
            <div className="noise-overlay" />
            <Navbar />
            <main className="relative z-10 min-h-screen pt-20 md:pt-24">
                {children}
            </main>
            <Footer />
        </div>
    );
}
