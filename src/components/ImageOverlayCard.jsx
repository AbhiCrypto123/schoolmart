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
            className={`relative rounded-3xl overflow-hidden cursor-pointer group bg-white border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-lg ${tall ? 'h-64' : 'h-52'} ${className}`}
            onClick={onClick}
        >
            {/* Image section with light background */}
            <div className="w-full h-3/5 relative overflow-hidden">
                <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-"
                    onError={(e) => {
                        if (fallback) e.target.src = fallback;
                    }}
                />
            </div>

            {/* Category badge — small and clean */}
            {badge && (
                <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md shadow-sm text-gray-900 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-gray-100">
                        <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: badge.color || '#F97316' }}
                        />
                        {badge.label}
                    </span>
                </div>
            )}

            {/* Title & Description section */}
            <div className="p-5 flex flex-col justify-start">
                <h3 className="text-gray-900 font-black text-[12px] font-heading leading-tight uppercase tracking-tight group-hover:text-sm-blue transition-colors mb-1">
                    {title}
                </h3>
                {description && (
                    <p className="text-gray-400 text-[10px] font-bold leading-relaxed line-clamp-1 uppercase tracking-tight">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageOverlayCard;
