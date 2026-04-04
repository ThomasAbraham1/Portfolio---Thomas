import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollSection() {
    const card1 = useRef<HTMLDivElement>(null);
    const card2 = useRef<HTMLDivElement>(null);
    const card3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = [card1.current, card2.current, card3.current];
        const triggers = cards.map(card =>
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            })
        );
        return () => triggers.forEach(t => t.scrollTrigger?.kill());
    }, []);

    return (
        <section id="scroll-section" style={{ display: 'block', paddingTop: 0, paddingBottom: 0, minHeight: '220vh', borderBottom: '1px solid var(--border)' }}>
            <div style={{ padding: '120px 60px 40px' }}>
                <div className="section-label">Section 03</div>
                <h2 className="section-title">ScrollTrigger — Viewport-triggered</h2>
                <p className="section-desc">
                    Scroll down. Each card animates in when it crosses 80% of the viewport.
                    This is a <strong>one-shot trigger</strong> — not scrubbed.
                </p>
                <pre className="callout">{`gsap.to(card, {
  opacity: 1, y: 0,
  scrollTrigger: {
    trigger: card,
    start: 'top 80%',           // when card top hits 80% of viewport height
    toggleActions: 'play none none reverse'
  }
})`}</pre>
            </div>

            <div ref={card1} className="scroll-card">
                <h3>🃏 Card 1</h3>
                <p>Triggered when I enter the viewport.</p>
            </div>
            <div ref={card2} className="scroll-card">
                <h3>🃏 Card 2</h3>
                <p>I wait until you scroll further.</p>
            </div>
            <div ref={card3} className="scroll-card">
                <h3>🃏 Card 3</h3>
                <p>Last to appear — deepest in the scroll.</p>
            </div>
        </section>
    );
}
