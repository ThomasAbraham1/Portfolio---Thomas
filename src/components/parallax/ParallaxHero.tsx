import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxHero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const nightOverlayRef = useRef<HTMLDivElement>(null);
    const bgBuildingsRef = useRef<HTMLDivElement>(null);
    const billboardRef = useRef<HTMLDivElement>(null);
    const fgBuildingsRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                }
            });

            // 1. Day to Night Transition (Overlay opacity)
            tl.to(nightOverlayRef.current, { opacity: 0.85, ease: "none" }, 0)

                // 2. Parallax movement
                .to(bgBuildingsRef.current, { y: 150, scale: 1.05, ease: "none" }, 0)
                .to(billboardRef.current, { y: -50, scale: 1.1, ease: "none" }, 0)
                // Match text container movement to billboard movement
                .to(textContainerRef.current, { y: -60, scale: 1.1, ease: "none" }, 0)
                .to(fgBuildingsRef.current, { y: -400, scale: 1.25, ease: "none" }, 0)

                // 3. Text sequence on the billboard
                .to(text1Ref.current, { opacity: 0, y: -30, duration: 10.5 }, 0.5)
                .fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 1.0)
                .to(text2Ref.current, { opacity: 0, y: -30, duration: 0.5 }, 2.0)
                .fromTo(text3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 2.5);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black">
            {/* LAYER 1: Sky */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/assets/Untitled design (6).jpg")' }}
            />
            {/* Night Overlay */}
            <div ref={nightOverlayRef} className="absolute inset-0 z-[1] bg-slate-900 opacity-0 pointer-events-none mix-blend-multiply" />

            {/* LAYER 2: Background Buildings */}
            <div
                ref={bgBuildingsRef}
                className="absolute inset-0 z-10 bg-cover bg-bottom bg-no-repeat opacity-80"
                style={{ backgroundImage: 'url("/assets/Untitled design (28).png")' }}
            />

            {/* LAYER 3: Billboard — extended 150px below viewport to compensate for upward travel */}
            <div
                ref={billboardRef}
                className="absolute z-20 bg-cover bg-center bg-no-repeat drop-shadow-2xl"
                style={{ backgroundImage: 'url("/assets/Untitled design (29).png")', top: 0, left: 0, right: 0, bottom: '-150px' }}
            />

            {/* LAYER 3.5: Billboard Text Container — matches billboard height */}
            <div ref={textContainerRef} className="absolute z-[25] flex items-center justify-center pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: '0px' }}>
                {/* Adjust w/h and translation to perfectly fit inside the billboard screen in the PNG */}
                <div className="relative w-[30%] md:w-[25%] h-[20%] flex flex-col items-center justify-center -translate-y-[10%] drop-shadow-lg">
                    <div ref={text1Ref} className="absolute text-center w-full">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-tight uppercase font-sans">
                            Thomas <br /> Abraham
                        </h1>
                    </div>

                    <div ref={text2Ref} className="absolute text-center w-full opacity-0">
                        <p className="text-xl md:text-3xl text-primary font-bold tracking-widest uppercase">
                            Full-Stack
                            <br />
                            Developer
                        </p>
                    </div>

                    <div ref={text3Ref} className="absolute text-center w-full opacity-0 pointer-events-auto">
                        <p className="text-lg md:text-xl text-white leading-snug font-medium drop-shadow-md">
                            I build clean, modern websites that feel<br />
                            <span className="text-primary font-bold mt-2 inline-block">3× more expensive</span>.
                        </p>
                    </div>
                </div>
            </div>

            {/* LAYER 4: Foreground — extended 400px below viewport to compensate for upward travel */}
            <div
                ref={fgBuildingsRef}
                className="absolute z-30 bg-cover bg-bottom bg-no-repeat pointer-events-none drop-shadow-2xl"
                style={{ backgroundImage: 'url("/assets/Untitled design (30).png")', top: 0, left: 0, right: 0, bottom: '-400px' }}
            />
        </div>
    );
}

