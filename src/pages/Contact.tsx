import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Mail, MessageCircle, Linkedin } from 'lucide-react';

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(false);

        // Replace these with your actual EmailJS service, template, and public key
        const serviceId = 'YOUR_SERVICE_ID';
        const templateId = 'YOUR_TEMPLATE_ID';
        const publicKey = 'YOUR_PUBLIC_KEY';

        if (serviceId === 'YOUR_SERVICE_ID') {
            // Fallback to mailto if keys are not set
            const formData = new FormData(formRef.current!);
            const subject = `Portfolio Contact from ${formData.get('user_name')}`;
            const body = `${formData.get('message')}\n\nFrom: ${formData.get('user_email')}`;
            window.location.href = `mailto:cta102938@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setLoading(false);
            setSuccess(true);
            return;
        }

        emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
            .then(() => {
                setSuccess(true);
                setLoading(false);
                if (formRef.current) formRef.current.reset();
            }, (error) => {
                console.error(error);
                setError(true);
                setLoading(false);
            });
    };

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-10 tracking-tighter">
                        Let's Talk.
                    </h1>
                    <p className="text-xl text-dark/70 dark:text-light/70 mb-12 max-w-md leading-relaxed">
                        Have a project in mind? I'd love to hear about it. Send me a message and I'll get back to you as soon as possible.
                    </p>

                    <div className="space-y-8">
                        <a href="mailto:cta102938@gmail.com" className="flex items-center gap-4 text-2xl hover:text-primary transition-colors group">
                            <div className="w-14 h-14 rounded-full border border-dark/20 dark:border-light/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-light transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <span className="group-hover:translate-x-2 transition-transform duration-300">cta102938@gmail.com</span>
                        </a>

                        <a href="https://www.linkedin.com/in/thomas-abraham-97a847210/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-2xl hover:text-primary transition-colors group">
                            <div className="w-14 h-14 rounded-full border border-dark/20 dark:border-light/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-light transition-all duration-300">
                                <Linkedin size={24} />
                            </div>
                            <span className="group-hover:translate-x-2 transition-transform duration-300">LinkedIn</span>
                        </a>

                        <a href="https://wa.me/919385341273" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-2xl hover:text-primary transition-colors group">
                            <div className="w-14 h-14 rounded-full border border-dark/20 dark:border-light/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-light transition-all duration-300">
                                <MessageCircle size={24} />
                            </div>
                            <span className="group-hover:translate-x-2 transition-transform duration-300">WhatsApp</span>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white/50 dark:bg-gray/20 backdrop-blur-sm p-10 rounded-3xl border border-dark/5 dark:border-light/20 shadow-xl"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="group">
                            <label className="block text-xs uppercase tracking-widest mb-2 text-dark/60 dark:text-light/90 group-focus-within:text-primary transition-colors">Name</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                className="w-full bg-transparent border-b-2 border-dark/20 dark:border-light/80 py-4 focus:outline-none focus:border-primary transition-colors text-lg dark:text-light dark:placeholder-light/40"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs uppercase tracking-widest mb-2 text-dark/60 dark:text-light/90 group-focus-within:text-primary transition-colors">Email</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                className="w-full bg-transparent border-b-2 border-dark/20 dark:border-light/80 py-4 focus:outline-none focus:border-primary transition-colors text-lg dark:text-light dark:placeholder-light/40"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-xs uppercase tracking-widest mb-2 text-dark/60 dark:text-light/90 group-focus-within:text-primary transition-colors">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-transparent border-b-2 border-dark/20 dark:border-light/80 py-4 focus:outline-none focus:border-primary transition-colors text-lg resize-none dark:text-light dark:placeholder-light/40"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-dark text-light py-5 rounded-full uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:shadow-primary/30 duration-300"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                            {!loading && <Send size={18} />}
                        </button>

                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-green-100 text-green-800 rounded-lg text-center"
                            >
                                Message sent successfully!
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-100 text-red-800 rounded-lg text-center"
                            >
                                Something went wrong. Please try again or email me directly.
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
