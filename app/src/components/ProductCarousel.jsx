import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSBlock } from '../hooks/useCMSBlock';

const DEFAULTS = {
  heading: 'Recommended Products',
  items: [
    {
      title: 'C-SHAPE STOOL',
      price: '3,500.00',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
      path: '/furniture',
      cartLink: '#'
    },
    {
      title: 'chemistry lab workstation',
      price: '7,500.00',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      path: '/furniture',
      cartLink: '#'
    },
    {
      title: 'Lab Work Tables with Gas & Sink ...',
      price: '36,000.00',
      img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
      path: '/furniture',
      cartLink: '#'
    }
  ]
};

const ProductCarousel = () => {
    const { data } = useCMSBlock('home', 'product_carousel', DEFAULTS);
    const d = { ...DEFAULTS, ...data };
    const items = d.items?.length ? d.items : DEFAULTS.items;

    const [emblaRef, emblaApi] = useEmblaCarousel({ 
        loop: false, 
        align: 'start',
        slidesToScroll: 1,
        containScroll: 'trimSnaps'
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="py-2">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2">
                <h2 className="text-gray-900 text-xl font-black font-heading uppercase tracking-tight">
                    {d.heading}
                </h2>
                <div className="flex gap-2">
                    <button onClick={scrollPrev} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm focus:outline-none">
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <button onClick={scrollNext} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm focus:outline-none">
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {items.map((item, i) => (
                        <div key={i} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pr-4 first:pl-0">
                            <div className="bg-white border border-gray-200 p-2 rounded-sm group transition-all duration-300 hover:shadow-md h-full flex flex-col">
                                {/* Image Box */}
                                <Link to={item.path || '#'} className="block aspect-square overflow-hidden bg-white mb-3 border border-gray-100 p-2">
                                    <img 
                                        src={item.img} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                                    />
                                </Link>
                                
                                {/* Content */}
                                <div className="px-1 flex flex-col flex-1 justify-between gap-3">
                                    <div>
                                        <h3 className="text-gray-800 font-medium text-sm line-clamp-2 leading-tight uppercase font-sans tracking-tight mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="text-gray-900 font-bold text-lg leading-none">
                                            ₹{item.price || '0.00'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <a 
                                            href={item.cartLink || '#'} 
                                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold uppercase transition-colors rounded-sm tracking-tighter"
                                        >
                                            <ShoppingBag size={14} className="stroke-[2.5px]" />
                                            ADD TO CART
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;
