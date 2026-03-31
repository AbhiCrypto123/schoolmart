import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMSBlock } from '../hooks/useCMSBlock';

const DEFAULTS = {
  heading: 'RECOMMENDED PRODUCTS',
  items: [
    {
      title: 'C-SHAPE STOOL',
      price: '3,500.00',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
      path: '/furniture',
      cartLink: '#'
    },
    {
      title: 'CHEMISTRY LAB WORKSTATION',
      price: '7,500.00',
      img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
      path: '/furniture',
      cartLink: '#'
    },
    {
      title: 'LAB WORK TABLES WITH GAS & SINK ...',
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
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#1a1a1a] text-2xl font-black font-heading uppercase tracking-tight">
                    {d.heading}
                </h2>
                <div className="flex gap-2">
                    <button onClick={scrollPrev} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm focus:outline-none bg-white">
                        <ChevronLeft size={16} className="text-gray-600" />
                    </button>
                    <button onClick={scrollNext} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm focus:outline-none bg-white">
                        <ChevronRight size={16} className="text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                    {items.map((item, i) => (
                        <div key={i} className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pr-4 first:pl-0">
                            <div className="bg-white border border-gray-100 p-3 rounded-md group transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                                {/* Image Box */}
                                <Link to={item.path || '#'} className="block aspect-[1.1] overflow-hidden bg-white mb-4 border border-gray-100 p-4 transition-colors group-hover:border-gray-200 shadow-inner">
                                    <img 
                                        src={item.img} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                                    />
                                </Link>
                                
                                {/* Content */}
                                <div className="px-1 flex flex-col flex-1 gap-2">
                                    <h3 className="text-[#333333] font-bold text-sm leading-tight uppercase font-heading tracking-tight line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <div className="text-[#1a1a1a] font-extrabold text-xl leading-none mb-4">
                                        ₹{item.price || '0.00'}
                                    </div>
                                    
                                    <div className="mt-auto">
                                        <a 
                                            href={item.cartLink || '#'} 
                                            className="inline-flex items-center bg-[#f4f4f4] hover:bg-gray-200 text-[#555555] text-[10px] font-black uppercase transition-all rounded-md overflow-hidden group/btn shadow-sm"
                                        >
                                            <span className="p-2 border-r border-gray-300 flex items-center justify-center bg-gray-50 group-hover/btn:bg-white transition-colors">
                                                <ShoppingBag size={14} className="stroke-[2.5px]" />
                                            </span>
                                            <span className="px-3 py-1.5 tracking-tighter">ADD TO CART</span>
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
