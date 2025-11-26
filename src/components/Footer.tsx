import { Mail, Linkedin, MessageCircle } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-20 bg-dark text-light/60 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center gap-8">
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em]">
                        © 2025 Thomas Abraham • Based in Asia
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-6">
                        <a
                            href="mailto:cta102938@gmail.com"
                            className="group w-16 h-16 rounded-full border-2 border-light/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                            aria-label="Email"
                        >
                            <Mail size={28} className="text-light/60 group-hover:text-primary transition-colors duration-300" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/thomas-abraham-97a847210/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-16 h-16 rounded-full border-2 border-light/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={28} className="text-light/60 group-hover:text-primary transition-colors duration-300" />
                        </a>

                        <a
                            href="https://wa.me/919385341273"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-16 h-16 rounded-full border-2 border-light/20 flex items-center justify-center hover:border-primary hover:bg-primary/10 transition-all duration-300"
                            aria-label="WhatsApp"
                        >
                            <MessageCircle size={28} className="text-light/60 group-hover:text-primary transition-colors duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
