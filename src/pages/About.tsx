import { motion } from 'framer-motion';

export default function About() {
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group"
                >
                    <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                        <img
                            src="https://i.ibb.co/B5V29GMK/1763261864219.webp"
                            alt="Thomas Abraham"
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray/20 rounded-full blur-3xl -z-10"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tighter">About Me.</h2>

                    <div className="space-y-8 text-lg md:text-xl text-dark/80 dark:text-light/80 leading-relaxed font-light">
                        <p>
                            Hi, I’m Thomas Abraham — a full-stack developer who turns beautiful designs into fast, functional, and conversion-focused websites.
                        </p>
                        <p>
                            I specialize in taking a stunning template or a rough idea and delivering a pixel-perfect, modern site in days — not weeks. My clients get clean, professional websites that feel like they cost three times more than they actually did.
                        </p>
                        <p>
                            Whether it’s a high-converting Shopify store, a sleek agency portfolio, or a startup landing page that actually generates leads — I build sites that load fast, look expensive, and work flawlessly on every device.
                        </p>
                        <p>
                            I work with creative agencies, e-commerce brands, and ambitious startups worldwide. When I’m not coding, I’m probably optimizing load times or exploring the next big framework.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Section */}
            <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="aspect-square rounded-xl overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Coding" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="aspect-square rounded-xl overflow-hidden md:translate-y-16 relative group"
                >
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80" alt="Workspace" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="aspect-square rounded-xl overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" alt="Laptop" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </motion.div>
            </div>
        </div>
    );
}
