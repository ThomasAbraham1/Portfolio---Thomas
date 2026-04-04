import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Settings, ArrowRight } from 'lucide-react';

export default function UnderConstruction() {
    return (
        <div className="min-h-screen bg-dark text-light flex flex-col items-center justify-center relative overflow-hidden font-sans cursor-default">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-light rounded-full blur-[100px]" />
            </div>

            <motion.div 
                className="z-10 flex flex-col items-center text-center px-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="mb-8"
                >
                    <Settings size={80} className="text-primary opacity-80" />
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Harpazo Tech is <br /> <span className="text-primary italic">Under Construction</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-light/60 mb-12 max-w-2xl font-light">
                    We are currently building something amazing at the main site. In the meantime, feel free to explore our portfolio section.
                </p>

                <Link to="/thomas" className="group flex items-center gap-3 bg-light text-dark px-8 py-4 rounded-full text-lg font-medium hover:bg-primary hover:text-light transition-all duration-300 shadow-lg hover:shadow-primary/30">
                    <span>Visit Portfolio</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </div>
    );
}
