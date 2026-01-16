import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-light/80 dark:bg-dark/80 backdrop-blur-md border-b border-dark/5 dark:border-light/5' : 'py-8 bg-transparent'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <Link to="/" className="z-[70] relative group flex items-center">
                        <img
                            src="https://i.ibb.co/B2mYNfbG/Untitled-design-64.webp"
                            alt="Thomas Abraham Logo"
                            className="h-16 md:h-28 w-auto transition-all duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-10 items-center">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`relative text-sm font-medium uppercase tracking-widest hover:text-primary transition-colors group ${location.pathname === link.path ? 'text-primary' : 'text-dark dark:text-light'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                            </Link>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center gap-4 z-[70] relative">
                        <ThemeToggle />
                        <button
                            className="p-2 dark:text-light relative z-[70]"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="fixed inset-0 bg-light dark:bg-dark flex flex-col items-center justify-center gap-8 md:hidden z-[60]"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-6 p-2 dark:text-light z-[70] hover:text-primary transition-colors"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>

                        {/* Menu Links */}
                        {links.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    to={link.path}
                                    className="text-4xl font-light uppercase tracking-widest hover:text-primary transition-colors dark:text-light"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
