import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 🎨 DROP YOUR IMAGES IN /public AND EDIT HERE
// ─────────────────────────────────────────────
const LAYERS = {
  sky: '/sky.png',          // furthest back
  midground: '/Happening.png',    // middle layer
  foreground: '/your-foreground.png',   // closest to viewer
};

const TEXT_LINES = [
  'AOKI',
  'Full-Stack Dev',
  'I build things.',
];
// ─────────────────────────────────────────────

export default function App() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',   // ← increase for more scroll room
          scrub: 1,
          pin: true,
          markers: true,   // ← DELETE this line once you're happy with the positions
        }
      });

      // ── Parallax Layers ──────────────────────────────────────
      // All start at position 0. Change y values to control speed.
      // Negative y = moves UP. Positive y = moves DOWN.
      tl.to(overlayRef.current, { opacity: 0.8, ease: 'none' }, 0)
        .to(skyRef.current, { y: 120, scale: 1.05, ease: 'none' }, 0)
        .to(midRef.current, { y: 200, scale: 1.05, ease: 'none', duration: 1 }, 0)
        .to(fgRef.current, { y: -400, scale: 1.25, ease: 'none' }, 0)

        // ── Text Sequence ─────────────────────────────────────────
        // Position = when on the timeline it starts
        // Duration = how much of the scroll it occupies
        // text1: first ENTERS (rises up into place), then EXITS (floats away)
        .fromTo(text1Ref.current, { opacity: 1, y: '270px' }, { opacity: 1, y: '0px', duration: 0.5 }, 0)
        .to(text1Ref.current, { opacity: 0, y: 0, duration: 0.5 }, 1.0)
        .fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 1.5)
        .to(text2Ref.current, { opacity: 0, y: -30, duration: 0.5 }, 2.0) 
        .fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 2.5);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const layerBase: React.CSSProperties = {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      ref={sectionRef}
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'linear-gradient(to top, #b5dcdfff, #6cb6d3ff)' }}
    >
      {/* LAYER 1 — Sky (furthest back, moves SLOWEST) */}
      <div
        ref={skyRef}
        style={{ ...layerBase, bottom: 0, zIndex: 0, backgroundImage: `url('${LAYERS.sky}')`, backgroundColor: 'linear-gradient(to right, #b2b2f7ff, #6cb6d3ff)' }}
      />

      {/* Night Overlay — darkens as you scroll */}
      <div
        ref={overlayRef}
        style={{ ...layerBase, bottom: 0, zIndex: 1, background: 'rgba(10,6,40,0)', pointerEvents: 'none' }}
      />

      {/* LAYER 2 — Midground (moves at medium speed) */}
      {/* Extended 150px below viewport so the bottom edge never shows */}
      <div
        ref={midRef}
        style={{ ...layerBase, bottom: '0px', scale:1.2, zIndex: 10, backgroundImage: `url('${LAYERS.midground}')`, backgroundPosition: 'bottom' }}
      />

      {/* TEXT CONTAINER — sits on top of midground */}
      {/* Uses position:absolute + inset:0 so it covers the full screen */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Give this a real height so children with position:absolute have a bounding box */}
        <div style={{ position: 'relative', width: '60%', maxWidth: 600, height: 200, textAlign: 'center', color: '#fff' }}>

          <div ref={text1Ref} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 12rem)', fontWeight: 900, letterSpacing: '-2px', textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
              {TEXT_LINES[0]}
            </h1>
          </div>

          <div ref={text2Ref} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}>
            <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '6px', textTransform: 'uppercase', color: '#7c6dfa' }}>
              {TEXT_LINES[1]}
            </p>
          </div>

          <div ref={text3Ref} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0 }}>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 500, color: '#ccc' }}>
              {TEXT_LINES[2]}
            </p>
          </div>

        </div>
      </div>

      {/* LAYER 3 — Foreground (moves FASTEST, creates depth illusion) */}
      {/* Extended 400px below viewport — matches the y: -400 travel distance */}
      <div
        ref={fgRef}
        style={{ ...layerBase, bottom: '-400px', zIndex: 30, backgroundImage: `url('${LAYERS.foreground}')`, backgroundPosition: 'bottom', pointerEvents: 'none' }}
      />
    </div>
  );
}
