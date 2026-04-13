import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSBlock } from '../hooks/useCMSBlock';
import { formatImgUrl } from '../utils/formatters';

const DEFAULTS = {
    heading: 'FEATURED PRODUCTS',
    items: [
        {
            title: 'C-Shape Dynamic Stool',
            price: '3,500.00',
            img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80',
            path: '/furniture'
        },
        {
            title: 'Lab Workstation V2',
            price: '18,500.00',
            img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
            path: '/furniture'
        },
        {
            title: 'Ergonomic Faculty Chair',
            price: '7,500.00',
            img: 'https://images.unsplash.com/photo-1582213793728-9cc0034a34ea?w=600&q=80',
            path: '/furniture'
        },
        {
            title: 'Stem Robotics Station',
            price: '36,000.00',
            img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
            path: '/furniture'
        },
        {
            title: 'Digital Hub Monitor',
            price: '18,500.00',
            img: 'https://images.unsplash.com/photo-1558448231-314777598379?w=600&q=80',
            path: '/digital'
        }
    ]
};

const ProductCarousel = () => {
    const { data } = useCMSBlock('home', 'product_carousel', DEFAULTS);
    const d = { ...DEFAULTS, ...data };
    const items = d.items?.length ? d.items : DEFAULTS.items;

    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: true, 
        align: 'start',
        slidesToScroll: 1,
    });

    useEffect(() => {
        if (!emblaApi) return;
        const intervalId = setInterval(() => {
            emblaApi.scrollNext();
        }, 4000); 
        return () => clearInterval(intervalId);
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="relative group/carousel">
            {/* Manual Controls - Side Buttons */}
            <button 
                onClick={scrollPrev} 
                className="absolute left-0 top-[55%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-2xl border border-gray-100 flex items-center justify-center hover:bg-sm-blue hover:text-white transition-all transform active:scale-90 -ml-4 opacity-0 group-hover/carousel:opacity-100"
            >
                <ChevronLeft size={20} />
            </button>
            <button 
                onClick={scrollNext} 
                className="absolute right-0 top-[55%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-2xl border border-gray-100 flex items-center justify-center hover:bg-sm-blue hover:text-white transition-all transform active:scale-90 -mr-4 opacity-0 group-hover/carousel:opacity-100"
            >
                <ChevronRight size={20} />
            </button>

            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex -ml-2">
                    {items.map((item, i) => (
                        <div key={i} className="embla__slide flex-[0_0_70%] sm:flex-[0_0_35%] lg:flex-[0_0_25%] min-w-0 pl-2">
                            <a 
                                href={`https://schoolmart.store/search?q=${encodeURIComponent(item.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group/card relative bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1"
                            >
                                <div className="aspect-square relative overflow-hidden bg-gray-50">
                                    <img 
                                        src={formatImgUrl(item.img)} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-sm-blue shadow-sm">
                                            <ShoppingBag size={14} />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="text-gray-900 font-bold text-[13px] uppercase tracking-wide mb-1 group-hover/card:text-sm-blue transition-colors">
                                        {item.title}
                                    </h3>
                                    <div className="text-sm-blue font-black text-[14px]">
                                        ₹{item.price}
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;
