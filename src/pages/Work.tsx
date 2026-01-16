import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { logEvent } from '../utils/analytics';

const webProjects = [
    {
        title: "Aoki Brand Lab",
        category: "Brand Strategy & Design",
        url: "https://aokibrandlab.com",
        image: "https://i.ibb.co/3yFmxBZ2/Aoki-Brand-Lab.webp"
    },
    {
        title: "Make1WayMaker",
        category: "E-commerce",
        url: "https://www.make1waymaker.com",
        image: "https://i.ibb.co/8DKSgFRV/Make-1-Waymaker.webp"
    },
    {
        title: "YourBinoculars",
        category: "Travel & Exploration",
        url: "https://www.yourbinoculars.com",
        image: "https://i.ibb.co/3mz0pjsP/Your-Binoculars.webp"
    },
    {
        title: "Faith Connect",
        category: "SaaS Platform",
        url: "https://faithconnect.store",
        image: "https://i.ibb.co/67fnGHT4/Faith-Connect.webp"
    }
];

const adProjects = [
    {
        title: "Christmas Campaign",
        category: "Meta Ads • 60k+ Impressions",
        url: "",
        image: "/assets/ad-campaign-proof.png",
        stats: [
            { label: "Conversion Cost", value: "₹11.49" },
            { label: "Total Conversions", value: "879" },
            { label: "Total Spend", value: "₹10,097" }
        ]
    }
];

// ... ProjectCard component (keep existing logic but maybe adapt for stats) ...
function ProjectCard({ project, index }: { project: any, index: number }) {
    const ref = useRef<HTMLElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect || !e.touches[0]) return;

        const width = rect.width;
        const height = rect.height;

        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;

        const xPct = touchX / width - 0.5;
        const yPct = touchY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const CardContent = (
        <>
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative aspect-video rounded-2xl overflow-hidden bg-gray/10 mb-8 shadow-lg group-hover:shadow-2xl transition-shadow duration-500"
            >
                <div className="absolute inset-0 bg-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ translateZ: "50px" }}
                />
                {project.url && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                        <div className="w-20 h-20 bg-light/90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                            <ArrowUpRight size={36} strokeWidth={1.5} />
                        </div>
                    </div>
                )}
            </motion.div>

            <div className="flex flex-wrap justify-between items-end gap-3 px-2">
                <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors dark:text-light">{project.title}</h3>
                    <p className="text-dark/60 dark:text-light/60 text-lg">{project.category}</p>

                    {project.stats && (
                        <div className="flex gap-4 mt-4">
                            {project.stats.map((stat: any, i: number) => (
                                <div key={i} className="text-sm">
                                    <p className="text-dark/40 dark:text-light/40 uppercase text-xs font-bold tracking-wider">{stat.label}</p>
                                    <p className="font-mono text-primary">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    if (!project.url) {
        return (
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseLeave}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="block group cursor-default"
                style={{ perspective: 1000 }}
            >
                {CardContent}
            </motion.div>
        );
    }

    return (
        <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref as any}
            onClick={() => logEvent('Work', 'Project Clicked', project.title)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="block group"
            style={{ perspective: 1000 }}
        >
            {CardContent}
        </motion.a>
    );
}

export default function Work() {
    const [filter, setFilter] = useState<'web' | 'ads'>('web');

    return (
        <div className="container mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-bold mb-12 tracking-tighter"
            >
                Selected <br className="hidden md:block" /> Work.
            </motion.h1>

            {/* Filter Toggle */}
            <div className="mb-24 flex">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex bg-dark/5 dark:bg-light/10 p-1 rounded-full relative"
                >
                    <div
                        className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ${filter === 'web' ? 'left-1 w-[calc(50%-4px)]' : 'left-[calc(50%+2px)] w-[calc(50%-4px)]'}`}
                    ></div>
                    <button
                        onClick={() => setFilter('web')}
                        className={`relative px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${filter === 'web' ? 'text-white' : 'text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light'}`}
                    >
                        Web Development
                    </button>
                    <button
                        onClick={() => setFilter('ads')}
                        className={`relative px-8 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${filter === 'ads' ? 'text-white' : 'text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light'}`}
                    >
                        Ad Campaigns
                    </button>
                </motion.div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 min-h-[500px]"
                >
                    {(filter === 'web' ? webProjects : adProjects).map((project, index) => (
                        <div key={index} className={index % 2 === 1 ? "md:mt-32" : ""}>
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Ready to Start CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="mt-32 w-full h-[500px] rounded-3xl overflow-hidden relative group"
            >
                <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2000&q=80"
                    alt="Ready to start"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-light px-6">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to start?</h2>
                    <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl">Let's build something amazing together.</p>
                    <Link
                        to="/contact"
                        className="px-8 py-4 bg-primary text-light rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                        Get in Touch <ArrowUpRight size={20} />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
