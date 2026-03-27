// src/components/ImageOverlayCard.jsx
// Reusable card: full-bleed image with gradient overlay, badge at top-left, title+desc at bottom-left

const ImageOverlayCard = ({
    img,
    title,
    description,
    badge,          // { label: string, color: string } — the dot color + text
    fallback,
    tall = false,   // taller aspect for featured/wide cards
    className = '',
    onClick,
}) => {
    return (
        <div
            className={`relative rounded-2xl overflow-hidden cursor-pointer group ${tall ? 'h-56' : 'h-40'} ${className}`}
            onClick={onClick}
            style={{ isolation: 'isolate' }}
        >
            {/* Background image */}
            <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                onError={(e) => {
                    if (fallback) e.target.src = fallback;
                }}
            />

            {/* Gradient overlay — dark at bottom, fades to transparent */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 100%)',
                }}
            />

            {/* Category badge — top left */}
            {badge && (
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
                        <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: badge.color || '#F97316' }}
                        />
                        {badge.label}
                    </span>
                </div>
            )}

            {/* Text overlay — bottom left */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
                <h3 className="text-white font-bold text-base font-heading leading-snug mb-0.5 drop-shadow">
                    {title}
                </h3>
                {description && (
                    <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageOverlayCard;
