// src/components/SchoolReel.jsx
// Auto-playing 30-second cinematic slideshow reel that feels like a promotional video.
// Cycles through school infrastructure photos with crossfade transitions.

import { useEffect, useState, useRef } from 'react';

const slides = [
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=900&q=85', caption: 'Modern Classrooms' },
    { src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=85', caption: 'School Architecture' },
    { src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=85', caption: 'Science Laboratories' },
    { src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85', caption: 'Library Spaces' },
    { src: '/images/card_library.png', caption: 'Library & Reading Zones' },
    { src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=900&q=85', caption: 'Sports Courts' },
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=85', caption: 'Athletics & Fitness' },
    { src: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=900&q=85', caption: 'Swimming Pool' },
    { src: '/images/card_classroom.png', caption: 'Smart Classrooms' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85', caption: 'School Design' },
    { src: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=900&q=85', caption: 'Kindergarten Spaces' },
    { src: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=85', caption: 'School Furniture' },
    { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=85', caption: 'Campus Design' },
    { src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=85', caption: 'Learning Spaces' },
    { src: '/images/card_physics_lab.png', caption: 'Physics & STEM Labs' },
];

const INTERVAL_MS = 2000; // ~30 seconds total for 15 slides

const SchoolReel = () => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [transitioning, setTransitioning] = useState(false);
    const timerRef = useRef(null);

    const goNext = (idx) => {
        setPrev(idx);
        setTransitioning(true);
        const next = (idx + 1) % slides.length;
        setCurrent(next);
        setTimeout(() => {
            setPrev(null);
            setTransitioning(false);
        }, 900);
    };

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setCurrent((c) => {
                goNext(c);
                return c; // actual update happens inside goNext
            });
        }, INTERVAL_MS);
        return () => clearInterval(timerRef.current);
    }, []);

    // Simpler approach — just interval-driven crossfade
    useEffect(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, INTERVAL_MS);
        return () => clearInterval(timerRef.current);
    }, []);

    return (
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
            {/* Slides */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 2 : 1 }}
                >
                    <img
                        src={slide.src}
                        alt={slide.caption}
                        className="w-full h-full object-cover"
                        style={{ transform: i === current ? 'scale(1.04)' : 'scale(1)', transition: 'transform 2s ease-out' }}
                        onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80';
                        }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
            ))}

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex items-end justify-between">
                <div className="flex items-center gap-2">
                    {/* Animated REC dot */}
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white/90 text-xs font-semibold tracking-wide drop-shadow">
                        {slides[current].caption}
                    </span>
                </div>
                <span className="text-white/50 text-[10px] font-mono">
                    {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </span>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
                <div
                    className="h-full bg-sm-orange"
                    style={{
                        width: `${((current + 1) / slides.length) * 100}%`,
                        transition: 'width 0.5s ease',
                    }}
                />
            </div>

            {/* Slide dots */}
            <div className="absolute top-3 right-3 z-10 flex gap-1">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className="rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                            width: i === current ? '16px' : '5px',
                            height: '5px',
                            backgroundColor: i === current ? '#F97316' : 'rgba(255,255,255,0.4)',
                        }}
                    />
                ))}
            </div>

            {/* "LIVE" badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white text-[9px] font-bold uppercase tracking-widest">School Tour</span>
            </div>
        </div>
    );
};

export default SchoolReel;
