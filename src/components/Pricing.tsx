import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

type PricingTier = {
    title: string;
    subtitle: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    buttonText?: string;
};

const webDevTiers: PricingTier[] = [
    {
        title: "Quick Launch",
        subtitle: "Best for Events, Portfolios, Single Products",
        price: "₹5,000 - ₹8,000",
        features: [
            "One-page scrolling site",
            "Mobile Responsive",
            "Contact Form Integration",
            "3-5 Day Delivery"
        ]
    },
    {
        title: "Business Standard",
        subtitle: "Best for Cafes, Agencies, Local Services",
        price: "₹15,000 - ₹25,000",
        features: [
            "5-7 Custom Pages",
            "Basic SEO Setup",
            "Google Maps & Social Links",
            "2 Weeks Delivery"
        ],
        isPopular: true
    },
    {
        title: "Online Store",
        subtitle: "Best for Selling Products (Shopify/WooCommerce)",
        price: "₹30,000+",
        features: [
            "Full Store Setup",
            "Payment Gateway Integration",
            "Up to 10 Product Uploads",
            "Shopping Cart Functionality"
        ]
    }
];

const metaAdsTiers: PricingTier[] = [
    {
        title: "The Setup",
        subtitle: "One-Time Fee",
        price: "₹5,000 - ₹8,000",
        features: [
            "Pixel Installation & Tracking",
            "Audience Research",
            "3 Custom Ad Creatives",
            "Domain Verification"
        ],
        buttonText: "Book Setup"
    },
    {
        title: "Growth Partner",
        subtitle: "Monthly Retainer",
        price: "₹10,000 - ₹20,000",
        features: [
            "Daily Ad Monitoring",
            "A/B Testing Audiences",
            "Weekly Performance Reports",
            "Ad Spend is extra"
        ],
        buttonText: "Partner Up"
    }
];

export default function Pricing() {
    const [category, setCategory] = useState<'web' | 'ads'>('web');

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Pricing & Services
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-dark/60 dark:text-light/60 text-lg max-w-2xl mx-auto mb-10"
                    >
                        Transparent pricing for professional results. Choose the package that fits your goals.
                    </motion.p>

                    {/* Toggle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex bg-dark/5 dark:bg-light/10 p-1 rounded-full relative"
                    >
                        <div
                            className={`absolute top-1 bottom-1 rounded-full bg-primary transition-all duration-300 ${category === 'web' ? 'left-1' : 'left-[calc(50%+2px)]'} w-[calc(50%-4px)]`}
                        ></div>
                        <button
                            onClick={() => setCategory('web')}
                            className={`relative w-40 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${category === 'web' ? 'text-white' : 'text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light'}`}
                        >
                            Web Development
                        </button>
                        <button
                            onClick={() => setCategory('ads')}
                            className={`relative w-40 py-3 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${category === 'ads' ? 'text-white' : 'text-dark/70 dark:text-light/70 hover:text-dark dark:hover:text-light'}`}
                        >
                            Meta Ads
                        </button>
                    </motion.div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`grid gap-8 max-w-7xl mx-auto ${category === 'web' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 max-w-4xl'}`}
                    >
                        {(category === 'web' ? webDevTiers : metaAdsTiers).map((tier, index) => (
                            <div
                                key={index}
                                className={`relative p-8 rounded-3xl border transition-all duration-300 group hover:-translate-y-2 ${tier.isPopular
                                    ? 'bg-dark text-light border-dark dark:bg-light dark:text-dark dark:border-light shadow-2xl scale-105 z-10'
                                    : 'bg-light dark:bg-dark/50 border-dark/10 dark:border-light/10 hover:border-primary/50 dark:hover:border-primary/50'
                                    }`}
                            >
                                {tier.isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className={`text-xl font-bold mb-2 ${tier.isPopular ? 'text-primary' : ''}`}>
                                        {tier.title}
                                    </h3>
                                    <p className={`text-sm ${tier.isPopular ? 'opacity-80' : 'text-dark/60 dark:text-light/60'}`}>
                                        {tier.subtitle}
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <span className="text-3xl font-bold">{tier.price}</span>
                                    {category === 'ads' && tier.price.includes('month') && <span className="text-sm opacity-60"></span>}
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm">
                                            <Check size={18} className={`shrink-0 mt-0.5 ${tier.isPopular ? 'text-primary' : 'text-primary'}`} />
                                            <span className={tier.isPopular ? 'opacity-90' : 'text-dark/80 dark:text-light/80'}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    to="/contact"
                                    className={`w-full py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3 ${tier.isPopular
                                        ? 'bg-primary text-white hover:bg-primary/90'
                                        : 'bg-dark text-white dark:bg-light dark:text-dark hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white'
                                        }`}
                                >
                                    {tier.buttonText || "Get Started"}
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
