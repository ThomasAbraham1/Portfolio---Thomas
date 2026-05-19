import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Zap, Globe } from 'lucide-react';

export default function About() {
    return (
        <div className="container mx-auto px-6 py-20">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-start">
                {/* Image */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative shrink-0 mx-auto md:mx-0 mt-2 md:mt-6"
                >
                    <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl relative z-10 border-4 border-light dark:border-dark ring-1 ring-dark/5 dark:ring-light/5">
                        <img
                            src="https://i.ibb.co/hxqj340p/Whats-App-Image-2026-03-01-at-1-51-57-AM.jpg"
                            alt="Thomas Abraham"
                            loading="eager"
                            fetchPriority="high"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    <div className="absolute -top-8 -left-8 w-40 h-40 bg-gray/20 rounded-full blur-3xl -z-10"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex-1 text-center md:text-left"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">About Me.</h2>

                    <div className="space-y-6 text-lg md:text-xl text-dark/80 dark:text-light/80 leading-relaxed font-light">
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

            {/* What I Bring */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-40"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight text-center">What I Bring to the Table</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="p-8 rounded-2xl border border-dark/10 dark:border-light/10 hover:border-primary/50 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Zap className="text-primary" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 dark:text-light">Lightning Fast</h3>
                        <p className="text-dark/70 dark:text-light/70 leading-relaxed">
                            I deliver pixel-perfect websites in 5-10 days, not weeks. Speed without compromising quality.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="p-8 rounded-2xl border border-dark/10 dark:border-light/10 hover:border-primary/50 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Code2 className="text-primary" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 dark:text-light">Clean Code</h3>
                        <p className="text-dark/70 dark:text-light/70 leading-relaxed">
                            Every line is optimized for performance, SEO, and maintainability. Your site will load blazing fast.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="p-8 rounded-2xl border border-dark/10 dark:border-light/10 hover:border-primary/50 transition-all duration-300 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Globe className="text-primary" size={32} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 dark:text-light">Global Reach</h3>
                        <p className="text-dark/70 dark:text-light/70 leading-relaxed">
                            Working with agencies, e-commerce brands, and startups worldwide. Based in Asia, serving the globe.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-32 p-12 md:p-20 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border border-primary/20 text-center"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight dark:text-light">Let's Work Together</h2>
                <p className="text-xl md:text-2xl text-dark/70 dark:text-light/70 mb-10 max-w-2xl mx-auto">
                    Got an idea? Need a fast, beautiful site? Let's turn your vision into reality.
                </p>
                <Link
                    to="/thomas/contact"
                    className="inline-flex items-center gap-2 px-10 py-5 bg-dark dark:bg-light text-light dark:text-dark rounded-full text-lg font-medium hover:scale-105 transition-all duration-300 shadow-xl"
                >
                    Start Your Project →
                </Link>
            </motion.div>
        </div>
    );
}
