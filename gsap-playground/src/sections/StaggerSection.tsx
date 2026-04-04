import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function StaggerSection() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridRef.current.appendChild(cell);
        }
    }, []);

    const staggerFrom = (from: string) => {
        gsap.set('.grid-cell', { scale: 1, opacity: 1, backgroundColor: 'var(--border)' });
        gsap.to('.grid-cell', {
            scale: 1.15,
            backgroundColor: from === 'random' ? 'var(--accent2)' : 'var(--accent)',
            duration: 0.4,
            ease: 'back.out(1.5)',
            stagger: { amount: 0.8, from: from as gsap.Position, grid: [5, 5] },
            yoyo: true,
            repeat: 1,
        });
    };

    return (
        <section className="playground-section" id="stagger-section">
            <div className="section-label">Section 04</div>
            <h2 className="section-title">Stagger — Cascading Animations</h2>
            <p className="section-desc">
                Stagger applies an incremental delay between each element in a group.
                Change the <code>from</code> property to control the cascade direction.
            </p>

            <div className="stage">
                <div ref={gridRef} className="stagger-grid" />
            </div>

            <div className="controls">
                <button className="primary" onClick={() => staggerFrom('start')}>▶ From Start</button>
                <button onClick={() => staggerFrom('end')}>▶ From End</button>
                <button onClick={() => staggerFrom('center')}>▶ From Center</button>
                <button onClick={() => staggerFrom('random')}>▶ Random</button>
                <button onClick={() => gsap.set('.grid-cell', { scale: 1, opacity: 1, backgroundColor: 'var(--border)' })}>↺ Reset</button>
            </div>

            <pre className="callout">{`gsap.to('.grid-cell', {
  scale: 1.2,
  backgroundColor: 'purple',
  stagger: {
    amount: 0.8,       // total time spread across all elements
    from: 'center',    // 'start' | 'end' | 'center' | 'random'
    grid: [5, 5]       // tell GSAP the grid layout for 2D stagger
  }
})`}</pre>
        </section>
    );
}
