import { useRef } from 'react';
import { gsap } from 'gsap';

export default function TimelineSection() {
    const boxA = useRef<HTMLDivElement>(null);
    const boxB = useRef<HTMLDivElement>(null);
    const boxC = useRef<HTMLDivElement>(null);
    const bar  = useRef<HTMLDivElement>(null);

    const resetBoxes = () => gsap.set([boxA.current, boxB.current, boxC.current], { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });

    const makeTimeline = () => {
        resetBoxes();
        if (bar.current) bar.current.style.width = '0%';
        return gsap.timeline({
            onUpdate() { if (bar.current) bar.current.style.width = (this.progress() * 100) + '%'; }
        });
    };

    const playSequential = () => {
        const tl = makeTimeline();
        tl.to(boxA.current, { x: 80, duration: 0.6, ease: 'power2.out' })
          .to(boxB.current, { y: -60, duration: 0.6, ease: 'power2.out' })
          .to(boxC.current, { rotation: 180, duration: 0.6, ease: 'back.out(1.7)' });
    };

    const playOverlap = () => {
        const tl = makeTimeline();
        tl.to(boxA.current, { x: 80, duration: 0.6, ease: 'power2.out' }, 0)
          .to(boxB.current, { y: -60, duration: 0.6, ease: 'power2.out' }, 0.2)
          .to(boxC.current, { rotation: 180, duration: 0.6, ease: 'back.out(1.7)' }, 0.4);
    };

    const playSimultaneous = () => {
        const tl = makeTimeline();
        tl.to(boxA.current, { x: 80, duration: 0.6, ease: 'power2.out' }, 0)
          .to(boxB.current, { y: -60, duration: 0.6, ease: 'power2.out' }, 0)
          .to(boxC.current, { rotation: 180, duration: 0.6, ease: 'back.out(1.7)' }, 0);
    };

    return (
        <section className="playground-section" id="timeline">
            <div className="section-label">Section 02</div>
            <h2 className="section-title">gsap.timeline() — Sequencing</h2>
            <p className="section-desc">
                A timeline chains animations together. The <strong>position parameter</strong> (3rd argument)
                controls WHEN each step starts on the shared timeline.
            </p>

            <div className="stage" style={{ flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                    <div ref={boxA} className="box box-purple">A</div>
                    <div ref={boxB} className="box box-pink">B</div>
                    <div ref={boxC} className="box box-green">C</div>
                </div>
                <div className="tl-progress">
                    <div ref={bar} className="tl-bar" />
                </div>
            </div>

            <div className="controls">
                <button className="primary" onClick={playSequential}>▶ Sequential (default)</button>
                <button onClick={playOverlap}>▶ Overlapping (position: 0, 0.2, 0.4)</button>
                <button onClick={playSimultaneous}>▶ Simultaneous (position: 0)</button>
                <button onClick={() => { resetBoxes(); if (bar.current) bar.current.style.width = '0%'; }}>↺ Reset</button>
            </div>

            <pre className="callout">{`// Sequential — each waits for the previous
const tl = gsap.timeline();
tl.to(A, { x: 80 })       // starts at 0
  .to(B, { y: -60 })      // starts at 0.5 (after A finishes)
  .to(C, { rotation:180}) // starts at 1.0 (after B finishes)

// Overlapping — position param = when to start
tl.to(A, { x: 80 },         0)   // starts at 0
  .to(B, { y: -60 },        0.2) // starts at 0.2 (overlaps A)
  .to(C, { rotation: 180 }, 0.4) // starts at 0.4 (overlaps B)

// Simultaneous — all start at 0 (like your ParallaxHero buildings!)
tl.to(A, { x: 80 },         0)
  .to(B, { y: -60 },        0)
  .to(C, { rotation: 180 }, 0)`}</pre>
        </section>
    );
}
