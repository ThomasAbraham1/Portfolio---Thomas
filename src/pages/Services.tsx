import { motion } from 'framer-motion';

const services = [
    {
        title: "Custom Fast-Track Websites",
        description: "Beautiful, fully custom websites built from scratch or your favorite template — delivered in 5–10 days."
    },
    {
        title: "Shopify Store Setup & Optimization",
        description: "High-converting Shopify stores with custom sections, speed optimization, and mobile-first design."
    },
    {
        title: "WordPress & Wix Development",
        description: "Professional WordPress or Wix sites — from template customization to full custom functionality."
    },
    {
        title: "Landing Pages That Convert",
        description: "Single-page sites for launches, lead generation, or product drops — built to turn visitors into customers."
    },
    {
        title: "Website Redesign & Speed Boost",
        description: "Take your existing slow or outdated site and make it fast, modern, and beautiful again."
    },
    {
        title: "Ongoing Support & Updates",
        description: "Monthly maintenance, new features, or quick fixes — so your site always stays perfect."
    }
];

export default function Services() {
    return (
        <div className="container mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-bold mb-24 tracking-tighter"
            >
                Services.
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={index < 3 ? undefined : { opacity: 1, y: 0 }}
                        animate={index < 3 ? { opacity: 1, y: 0 } : undefined}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group p-10 border border-dark/10 rounded-2xl hover:bg-dark hover:text-light transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-150"></div>

                        <h3 className="text-2xl font-bold mb-6 group-hover:text-primary transition-colors relative z-10 dark:text-light">{service.title}</h3>
                        <p className="text-dark/70 dark:text-light/70 group-hover:text-light/80 leading-relaxed transition-colors relative z-10 text-lg font-light">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Decorative Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="mt-32 w-full h-[500px] rounded-3xl overflow-hidden relative"
            >
                <img
                    src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80"
                    alt="Office"
                    className="w-full h-full object-cover parallax-image"
                />
                <div className="absolute inset-0 bg-dark/20 mix-blend-multiply"></div>
                <div className="absolute bottom-10 left-10 md:bottom-20 md:left-20 text-light max-w-xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to start?</h2>
                    <p className="text-lg md:text-xl opacity-90">Let's build something amazing together.</p>
                </div>
            </motion.div>
        </div>
    );
}
