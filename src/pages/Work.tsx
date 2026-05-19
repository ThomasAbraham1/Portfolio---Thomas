import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { logEvent } from '../utils/analytics';

// ─── Faith Connect Data ───────────────────────────────────────────────────────

const faithConnectScreenshots = [
    { src: "https://i.ibb.co/XxC47Tdf/Dashboard.png", label: "Dashboard" },
    { src: "https://i.ibb.co/fz1qcdHT/Untitled-design-11.png", label: "Member Profile" },
    { src: "https://i.ibb.co/67vQZM1m/Groups.png", label: "Groups" },
    { src: "https://i.ibb.co/PZgN6SK3/Public-Events-Page.png", label: "Public Events" },
    { src: "https://i.ibb.co/60jgyzks/Custom-form-Fields.png", label: "Custom Form Fields" },
    { src: "https://i.ibb.co/yBX9FGzh/Financials.png", label: "Financials" },
    { src: "https://i.ibb.co/DPsRhYyK/Untitled-design-12.png", label: "Reports" },
];

// ─── Lightbox Modal ───────────────────────────────────────────────────────────

function FaithConnectLightbox({ onClose }: { onClose: () => void }) {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent(i => (i - 1 + faithConnectScreenshots.length) % faithConnectScreenshots.length);
    const next = () => setCurrent(i => (i + 1) % faithConnectScreenshots.length);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 pt-20 md:pt-8"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 w-11 h-11 rounded-full bg-light/10 hover:bg-primary flex items-center justify-center text-light transition-all duration-300 z-10"
                aria-label="Close"
            >
                <X size={20} />
            </button>

            {/* Modal content — stop propagation so clicks inside don't close */}
            <div
                className="w-full max-w-[1400px] flex flex-col mt-8 md:mt-0"
                onClick={e => e.stopPropagation()}
            >
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl bg-dark/80 border border-light/5 shadow-2xl aspect-video w-full flex items-center justify-center group">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={current}
                            src={faithConnectScreenshots[current].src}
                            alt={faithConnectScreenshots[current].label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="w-full h-full object-scale-down"
                            draggable={false}
                        />
                    </AnimatePresence>

                    {/* Title overlay (ghosted) */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-dark/50 backdrop-blur-md px-3 py-1.5 md:px-5 md:py-3 rounded-lg md:rounded-xl flex items-center gap-2 md:gap-4 z-20 shadow-xl border border-light/10 max-w-[80%]">
                        <div className="hidden md:block">
                            <h3 className="text-xl font-bold text-white tracking-tight">Faith Connect</h3>
                            <p className="text-white/80 text-sm mt-0.5">{faithConnectScreenshots[current].label}</p>
                        </div>
                        <div className="md:hidden flex-1 min-w-0">
                            <p className="text-white font-bold text-xs truncate">{faithConnectScreenshots[current].label}</p>
                        </div>
                        <div className="h-4 md:h-10 w-[1px] bg-white/20 shrink-0" />
                        <span className="text-white/60 font-mono text-xs md:text-sm shrink-0">{current + 1} / {faithConnectScreenshots.length}</span>
                    </div>

                    {/* Prev / Next overlay arrows */}
                    <button
                        onClick={prev}
                        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-dark/80 border border-light/10 hover:bg-primary hover:border-primary flex items-center justify-center text-light transition-all duration-300 shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-dark/80 border border-light/10 hover:bg-primary hover:border-primary flex items-center justify-center text-light transition-all duration-300 shadow-lg"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2">
                    {faithConnectScreenshots.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-8 bg-primary' : 'w-1.5 bg-light/20'}`}
                        />
                    ))}
                </div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {faithConnectScreenshots.map((shot, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === current ? 'border-primary' : 'border-transparent opacity-50 hover:opacity-80'}`}
                        >
                            <img src={shot.src} alt={shot.label} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── Projects Data ────────────────────────────────────────────────────────────

const faithConnectProject = {
    title: "Faith Connect",
    category: "Software · Church Management System",
    image: "https://i.ibb.co/XxC47Tdf/Dashboard.png",
    isSoftware: true,
    url: "https://app.harpazotech.com",
};

const webProjects = [
    {
        title: "Tryfecta",
        category: "Business Management Platform",
        url: "https://management.tryfecta.biz/",
        image: "/assets/tryfecta.png"
    },
    {
        title: "Harrigan Academy",
        category: "English Language Learning",
        url: "https://harriganacademy.com/",
        image: "/assets/harrigan.png"
    },
    {
        title: "Aoki Brand Lab",
        category: "Brand Strategy & Design",
        url: "https://aokibrandlab.com",
        image: "https://i.ibb.co/3yFmxBZ2/Aoki-Brand-Lab.webp"
    },
    {
        title: "Barbera Transducers System",
        category: "E-commerce • Audio Equipment",
        url: "https://barbera-transducer-systems.onrender.com",
        image: "https://i.ibb.co/wZv4xFSL/Screenshot-2026-02-09-192140.webp"
    },
    {
        title: "Make1WayMaker",
        category: "Business Solutions Platform",
        url: "https://www.make1waymaker.com",
        image: "https://i.ibb.co/8DKSgFRV/Make-1-Waymaker.webp"
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

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index, onClick }: { project: any, index: number, onClick?: () => void }) {
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
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect || !e.touches[0]) return;
        x.set((e.touches[0].clientX - rect.left) / rect.width - 0.5);
        y.set((e.touches[0].clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => { x.set(0); y.set(0); };

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
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    style={{ translateZ: "50px" }}
                />
                {/* Hover CTA */}
                <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                    {project.isSoftware ? (
                        <>
                            <div className="w-20 h-20 bg-light/90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl pointer-events-auto hover:bg-primary hover:text-white transition-colors cursor-pointer">
                                <span className="text-xs font-bold uppercase text-center leading-tight px-2">View<br />Gallery</span>
                            </div>
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        logEvent('Work', 'External Link Clicked', project.title);
                                    }}
                                    className="w-20 h-20 bg-light/90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-150 shadow-xl pointer-events-auto hover:bg-primary hover:text-white transition-colors"
                                >
                                    <ArrowUpRight size={36} strokeWidth={1.5} />
                                </a>
                            )}
                        </>
                    ) : (
                        <div className="w-20 h-20 bg-light/90 backdrop-blur-sm rounded-full flex items-center justify-center text-dark transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-xl">
                            <ArrowUpRight size={36} strokeWidth={1.5} />
                        </div>
                    )}
                </div>
            </motion.div>

            <div className="flex flex-col gap-3 px-2">
                <div>
                    {project.isSoftware && (
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/40 px-2 py-0.5 rounded-full mb-2">
                            Software
                        </span>
                    )}
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

                {/* Mobile/Tablet action buttons (only visible on screens below desktop) */}
                {project.isSoftware ? (
                    <div className="flex lg:hidden gap-3 mt-3 w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onClick) onClick();
                            }}
                            className="flex-1 py-3 px-4 bg-dark/5 dark:bg-light/5 text-dark dark:text-light text-xs font-bold uppercase rounded-xl text-center border border-dark/10 dark:border-light/10 active:scale-95 transition-transform"
                        >
                            View Gallery
                        </button>
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 py-3 px-4 bg-primary text-white text-xs font-bold uppercase rounded-xl text-center active:scale-95 transition-transform shadow-lg shadow-primary/20"
                            >
                                Open App
                            </a>
                        )}
                    </div>
                ) : (
                    project.url && (
                        <div className="flex lg:hidden gap-3 mt-3 w-full">
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex-1 py-3 px-4 bg-primary text-white text-xs font-bold uppercase rounded-xl text-center active:scale-95 transition-transform shadow-lg shadow-primary/20"
                            >
                                Open Site
                            </a>
                        </div>
                    )
                )}
            </div>
        </>
    );

    const sharedMotionProps = {
        ref: ref as any,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleMouseLeave,
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1, duration: 0.8 },
        style: { perspective: 1000 },
    };

    // Software card — clickable div opening lightbox
    if (project.isSoftware && onClick) {
        return (
            <motion.div
                {...sharedMotionProps}
                onClick={onClick}
                className="block group cursor-pointer"
            >
                {CardContent}
            </motion.div>
        );
    }

    // No URL — non-interactive
    if (!project.url) {
        return (
            <motion.div
                {...sharedMotionProps}
                className="block group cursor-default"
            >
                {CardContent}
            </motion.div>
        );
    }

    // External link
    return (
        <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logEvent('Work', 'Project Clicked', project.title)}
            {...sharedMotionProps}
            className="block group"
        >
            {CardContent}
        </motion.a>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Work() {
    const [filter, setFilter] = useState<'web' | 'ads'>('web');
    const [lightboxOpen, setLightboxOpen] = useState(false);

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

            {/* ── Filter Toggle ── */}
            <div className="mb-24 flex">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex bg-dark/5 dark:bg-light/10 p-1 rounded-full relative"
                >
                    <div className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ${filter === 'web' ? 'left-1' : 'left-[calc(50%+2px)]'} w-[calc(50%-4px)]`} />
                    <button
                        onClick={() => setFilter('web')}
                        className={`relative w-40 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${filter === 'web' ? 'text-white' : 'text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light'}`}
                    >
                        Web Development
                    </button>
                    <button
                        onClick={() => setFilter('ads')}
                        className={`relative w-40 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${filter === 'ads' ? 'text-white' : 'text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light'}`}
                    >
                        Ad Campaigns
                    </button>
                </motion.div>
            </div>

            {/* ── Project Grid ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 min-h-[500px]"
                >
                    {filter === 'web' && (
                        // Faith Connect first — col 0 (no offset)
                        <div>
                            <ProjectCard
                                project={faithConnectProject}
                                index={0}
                                onClick={() => {
                                    logEvent('Work', 'Project Clicked', 'Faith Connect');
                                    setLightboxOpen(true);
                                }}
                            />
                        </div>
                    )}

                    {(filter === 'web' ? webProjects : adProjects).map((project, index) => (
                        <div key={index} className={(filter === 'web' ? (index + 1) : index) % 2 === 1 ? "md:mt-32" : ""}>
                            <ProjectCard project={project} index={index + 1} />
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightboxOpen && <FaithConnectLightbox onClose={() => setLightboxOpen(false)} />}
            </AnimatePresence>

            {/* ── Ready to Start CTA ── */}
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
                <div className="absolute inset-0 bg-dark/40 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-light px-6">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Ready to start?</h2>
                    <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl">Let's build something amazing together.</p>
                    <Link
                        to="/thomas/contact"
                        className="px-8 py-4 bg-primary text-light rounded-full text-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    >
                        Get in Touch <ArrowUpRight size={20} />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
