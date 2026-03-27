// src/components/FeatureCards.jsx
import { Link } from 'react-router-dom';
import ImageOverlayCard from './ImageOverlayCard';

const featureData = [
  {
    title: 'School Furniture',
    description: '1200+ ergonomic products for every classroom, lab and library',
    path: '/furniture',
    badge: { label: 'Furniture', color: '#F97316' },
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  },
  {
    title: 'Digital Infrastructure',
    description: 'Cutting-edge ed-tech, interactive panels and smart classrooms',
    path: '/digital',
    badge: { label: 'Technology', color: '#3B82F6' },
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  },
  {
    title: 'Sports Infrastructure',
    description: 'Professional-grade courts, equipment and sports facilities',
    path: '/sports',
    badge: { label: 'Sports', color: '#22C55E' },
    img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  },
  {
    title: 'School Architecture',
    description: 'NEP-ready campus planning and interior design by expert architects',
    path: '/school-building-design',
    badge: { label: 'Architecture', color: '#8B5CF6' },
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    title: 'Learning Environments',
    description: 'STEM labs, libraries, maker-spaces and activity rooms',
    path: '/environments',
    badge: { label: 'Environments', color: '#0EA5E9' },
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  },
  {
    title: 'School Design & Planning',
    description: 'End-to-end campus setup, expansion and renovation services',
    path: '/design',
    badge: { label: 'Design', color: '#EC4899' },
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
];

const FeatureCards = () => {
  return (
    <section className="py-5 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Full-width header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-gray-900 text-lg font-bold font-heading">Explore Our Solutions</h2>
          <Link to="/catalogues" className="text-gray-400 text-xs font-medium hover:text-gray-700 transition-colors duration-200">
            View All →
          </Link>
        </div>

        {/* 6-col single-row grid — narrow cards */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory gap-3 pb-2 sm:pb-0 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {featureData.map((item) => (
            <Link key={item.title} to={item.path} className="block focus:outline-none flex-none w-[70vw] sm:w-auto shrink-0 snap-center sm:snap-none">
              <ImageOverlayCard
                img={item.img}
                title={item.title}
                description={item.description}
                badge={item.badge}
                fallback="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80"
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeatureCards;
