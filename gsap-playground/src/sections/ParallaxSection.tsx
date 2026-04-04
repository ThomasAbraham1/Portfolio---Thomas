import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef  = useRef<HTMLDivElement>(null);
    const midRef = useRef<HTMLDivElement>(null);
    const fgRef  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=1500',
                    scrub: 1,
                    pin: true,
                }
            });

            // All start at position 0 — simultaneous, different speeds
            tl.to(bgRef.current,  { scale: 1.3, ease: 'none' }, 0)
              .to(midRef.current, { y: -80, scale: 0.9, opacity: 0, ease: 'none' }, 0)
              .to(fgRef.current,  { y: -120, opacity: 0, ease: 'none' }, 0);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="parallax-section" id="parallax-section">
            <div ref={bgRef}  className="p-layer p-bg">東京</div>
            <div ref={midRef} className="p-layer p-mid">THOMAS</div>
            <div ref={fgRef}  className="p-layer p-fg">Full-Stack Developer</div>
        </section>
    );
}
