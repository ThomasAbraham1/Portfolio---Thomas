import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Testimonials() {
    return (
        <div className="container mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-8xl font-bold mb-24 tracking-tighter"
            >
                Client Love.
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="p-12 border border-dark/5 rounded-3xl bg-white/40 backdrop-blur-sm relative hover:shadow-xl transition-shadow duration-500"
                    >
                        <Quote className="text-primary mb-8 w-12 h-12 opacity-30" />
                        <div className="space-y-4 mb-10 opacity-30">
                            <div className="h-4 bg-dark rounded w-full"></div>
                            <div className="h-4 bg-dark rounded w-11/12"></div>
                            <div className="h-4 bg-dark rounded w-5/6"></div>
                            <div className="h-4 bg-dark rounded w-4/6"></div>
                        </div>
                        <div className="flex items-center gap-4 opacity-40">
                            <div className="w-14 h-14 rounded-full bg-dark/20"></div>
                            <div>
                                <div className="h-5 bg-dark/20 rounded w-40 mb-2"></div>
                                <div className="h-4 bg-dark/10 rounded w-24"></div>
                            </div>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-sm uppercase tracking-widest text-dark/40 font-medium">Coming Soon</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
