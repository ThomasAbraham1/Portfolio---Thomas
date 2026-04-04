import { useRef } from 'react';
import { gsap } from 'gsap';

export default function BasicsSection() {
    const box1 = useRef<HTMLDivElement>(null);
    const box2 = useRef<HTMLDivElement>(null);
    const box3 = useRef<HTMLDivElement>(null);

    const all = () => [box1.current, box2.current, box3.current];

    return (
        <section className="playground-section" id="basics">
            <div className="section-label">Section 01</div>
            <h2 className="section-title">gsap.to() — The Basics</h2>
            <p className="section-desc">
                Click the buttons to fire one-shot animations on the boxes.
                Change the property values directly in the code to experiment!
            </p>

            <div className="stage">
                <div ref={box1} className="box box-purple">BOX 1</div>
                <div ref={box2} className="box box-pink">BOX 2</div>
                <div ref={box3} className="box box-green">BOX 3</div>
            </div>

            <div className="controls">
                <button className="primary" onClick={() => gsap.to(box1.current, { x: 100, duration: 1, ease: 'power2.out' })}>
                    Move →
                </button>
                <button onClick={() => gsap.to(box2.current, { rotation: 360, duration: 1, ease: 'back.out(1.7)' })}>
                    Spin
                </button>
                <button onClick={() => gsap.to(box3.current, { scale: 1.5, opacity: 0.5, duration: 0.5 })}>
                    Scale / Fade
                </button>
                <button onClick={() => gsap.to(box2.current, { y: -80, yoyo: true, repeat: 3, duration: 0.4 })}>
                    Bounce
                </button>
                <button onClick={() => gsap.to(all(), { y: -60, stagger: 0.15, duration: 0.5, ease: 'power3.out', yoyo: true, repeat: 1 })}>
                    Stagger Jump
                </button>
                <button onClick={() => gsap.to(all(), { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.6 })}>
                    ↺ Reset All
                </button>
            </div>

            <pre className="callout">{`gsap.to(element, { x: 100, duration: 1, ease: 'power2.out' })

// Try changing:  x  →  y  →  rotation  →  scale  →  opacity
// Try eases:    'bounce.out'  'elastic.out(1, 0.3)'  'back.out(2)'  'none'`}</pre>
        </section>
    );
}
