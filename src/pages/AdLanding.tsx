import { useState } from 'react';
import { motion } from 'framer-motion';
import Pricing from '../components/Pricing';
import { trackEvent } from '../components/MetaPixel';

export default function AdLanding() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Form Field State
    const [formData, setFormData] = useState({
        goal: [] as string[],
        domain: '',
        features: [] as string[],
        timeline: '',
        clarity: '',
        budget: '',
        communication: '',
        contactInfo: '', // Name, Phone, Email
        references: ''
    });

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: string, value: string) => {
        const current = (formData as any)[field] as string[];
        if (current.includes(value)) {
            handleChange(field, current.filter(item => item !== value));
        } else {
            handleChange(field, [...current, value]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Construct Google Form Data
        const data = new FormData();

        // 1. Goal (Checkbox) - ID: 1106252275
        formData.goal.forEach(val => data.append('entry.1106252275', val));

        // 2. Domain (Radio) - ID: 1865502516
        if (formData.domain) data.append('entry.1865502516', formData.domain);

        // 3. Features (Checkbox) - ID: 28711345
        formData.features.forEach(val => data.append('entry.28711345', val));

        // 4. Timeline (Radio) - ID: 1845683727
        if (formData.timeline) data.append('entry.1845683727', formData.timeline);

        // 5. Clarity (Scale 0-10) - ID: 747881630
        if (formData.clarity) data.append('entry.747881630', formData.clarity);

        // 6. Budget (Radio) - ID: 1894709501
        if (formData.budget) data.append('entry.1894709501', formData.budget);

        // 7. Communication (Radio) - ID: 671152149
        if (formData.communication) data.append('entry.671152149', formData.communication);

        // 8. Contact Info (Text) - ID: 1168545201
        if (formData.contactInfo) data.append('entry.1168545201', formData.contactInfo);

        // 9. References (Text) - ID: 36999727
        if (formData.references) data.append('entry.36999727', formData.references);

        try {
            await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdcEXDkcBQ7UonenYKMo0t0yUr1FOITi0VJW-smTAal7T0Ymw/formResponse', {
                method: 'POST',
                body: data,
                mode: 'no-cors' // Use no-cors for Google Forms
            });

            // Track Lead in Pixel
            trackEvent('Lead');

            setSubmitted(true);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Submission error', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-32 pb-20 container mx-auto px-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl mx-auto bg-primary/10 p-12 rounded-3xl"
                >
                    <h2 className="text-4xl font-bold mb-4">Request Received!</h2>
                    <p className="text-xl opacity-80 mb-8">
                        Thanks for sharing your project details. I'll review them and get back to you shortly via your preferred communication method.
                    </p>
                    <a href="/" className="px-8 py-3 bg-primary text-white rounded-full font-medium">Return Home</a>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <div className="container mx-auto px-6 mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Website Request Form</h1>
                <p className="text-dark/60 dark:text-light/60 max-w-2xl mx-auto">
                    Help us understand your website needs so we can provide the best solution and a tailored quote.
                </p>
            </div>

            <div className="container mx-auto px-4 md:px-6 mb-24 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-12 bg-white dark:bg-dark/50 p-8 md:p-12 rounded-3xl shadow-xl border border-dark/5 dark:border-light/5">

                    {/* 1. Goal */}
                    <Section title="What is the primary goal of your new website?">
                        {["Generate Sales/E-commerce", "Lead Generation (Collect Contact Info)", "Company/Brand Information and Presence", "Online Portfolio or Personal Blog", "Internal Tool or Web Application", "Other"].map(opt => (
                            <Checkbox
                                key={opt}
                                label={opt}
                                checked={formData.goal.includes(opt)}
                                onChange={() => handleCheckboxChange('goal', opt)}
                            />
                        ))}
                    </Section>

                    {/* 2. Domain */}
                    <Section title="Do you already own a domain name (e.g., yourcompany.com)?">
                        {["Yes, I already own one.", "No, I need help registering one.", "Not sure/I'll decide later."].map(opt => (
                            <Radio
                                key={opt}
                                label={opt}
                                name="domain"
                                checked={formData.domain === opt}
                                onChange={() => handleChange('domain', opt)}
                            />
                        ))}
                    </Section>

                    {/* 3. Features */}
                    <Section title="Which of these features are essential for your website?">
                        {["E-commerce/Online Store functionality", "Blog or News section", "Contact Form / Inquiry Form", "User Registration/Login (Member Area)", "Payment Gateway Integration (e.g., Razorpay, Stripe)", "Booking/Appointment System", "Multilingual Support", "SEO Optimization Setup"].map(opt => (
                            <Checkbox
                                key={opt}
                                label={opt}
                                checked={formData.features.includes(opt)}
                                onChange={() => handleCheckboxChange('features', opt)}
                            />
                        ))}
                    </Section>

                    {/* 4. Timeline */}
                    <Section title="What is your target timeline for launching the website?">
                        {["Urgent (Within 4 weeks)", "Standard (1-3 months)", "Flexible (3+ months)", "Not sure yet"].map(opt => (
                            <Radio
                                key={opt}
                                label={opt}
                                name="timeline"
                                checked={formData.timeline === opt}
                                onChange={() => handleChange('timeline', opt)}
                            />
                        ))}
                    </Section>

                    {/* 5. Clarity */}
                    <Section title="How would you rate the current clarity of your website content and design requirements? (0 - Vague, 10 - Detailed)">
                        <div className="flex flex-wrap gap-2 justify-between">
                            {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => handleChange('clarity', val)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${formData.clarity === val
                                            ? 'bg-primary text-white border-primary'
                                            : 'hover:border-primary/50 border-dark/20 dark:border-light/20'
                                        }`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between text-sm opacity-60 mt-2">
                            <span>Very Vague Idea</span>
                            <span>Fully Detailed Plan</span>
                        </div>
                    </Section>

                    {/* 6. Budget */}
                    <Section title="What is your estimated budget range (in Indian Rupees - INR)?">
                        {["Under ₹25,000", "₹25,000 - ₹50,000", "₹50,001 - ₹1,00,000", "₹1,00,001 - ₹2,50,000", "Above ₹2,50,000"].map(opt => (
                            <Radio
                                key={opt}
                                label={opt}
                                name="budget"
                                checked={formData.budget === opt}
                                onChange={() => handleChange('budget', opt)}
                            />
                        ))}
                    </Section>

                    {/* 7. Communication */}
                    <Section title="Preferred method of communication?">
                        {["Email", "Phone Call", "WhatsApp"].map(opt => (
                            <Radio
                                key={opt}
                                label={opt}
                                name="communication"
                                checked={formData.communication === opt}
                                onChange={() => handleChange('communication', opt)}
                            />
                        ))}
                    </Section>

                    {/* 8. Contact Info */}
                    <Section title="Please provide your name, phone number, and email address.">
                        <textarea
                            required
                            className="w-full bg-transparent border-b border-dark/20 dark:border-light/20 focus:border-primary outline-none py-2 min-h-[80px]"
                            placeholder="John Doe, +91 9876543210, john@example.com"
                            value={formData.contactInfo}
                            onChange={(e) => handleChange('contactInfo', e.target.value)}
                        />
                    </Section>

                    {/* 9. References */}
                    <Section title="Reference websites or additional details (Optional)">
                        <textarea
                            className="w-full bg-transparent border-b border-dark/20 dark:border-light/20 focus:border-primary outline-none py-2 min-h-[80px]"
                            placeholder="I like the design of apple.com..."
                            value={formData.references}
                            onChange={(e) => handleChange('references', e.target.value)}
                        />
                    </Section>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>

                </form>
            </div>

            {/* Pricing Section Ref */}
            <div className="bg-dark/5 dark:bg-light/5">
                <Pricing />
            </div>
        </div>
    );
}

// Helper Components
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex flex-col gap-3">
            {children}
        </div>
    </div>
);

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-start gap-3 cursor-pointer group">
        <div className={`w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-dark/30 dark:border-light/30 group-hover:border-primary'}`}>
            {checked && <div className="w-2.5 h-2.5 bg-white rounded-[1px]" />}
        </div>
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
        <span className="opacity-80 group-hover:opacity-100 transition-opacity text-sm md:text-base">{label}</span>
    </label>
);

const Radio = ({ label, name, checked, onChange }: { label: string, name: string, checked: boolean, onChange: () => void }) => (
    <label className="flex items-start gap-3 cursor-pointer group">
        <div className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center transition-colors ${checked ? 'border-primary' : 'border-dark/30 dark:border-light/30 group-hover:border-primary'}`}>
            {checked && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
        </div>
        <input type="radio" name={name} className="hidden" checked={checked} onChange={onChange} />
        <span className="opacity-80 group-hover:opacity-100 transition-opacity text-sm md:text-base">{label}</span>
    </label>
);
