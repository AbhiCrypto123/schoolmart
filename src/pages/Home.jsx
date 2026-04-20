import BannerSection from '../components/BannerSection';
import ResourceTiles from '../components/ResourceTiles';
import CTASection from '../components/CTASection';
import ClientLogos from '../components/ClientLogos';
import { useCMSPage } from '../hooks/useCMSBlock';

const Home = () => {
  const { loading } = useCMSPage('home');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sm-gray">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sm-orange"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen space-y-0 pb-4">
      {/* Promotional Banner */}
      <BannerSection />

      {/* Main Grid & Content Area (Now contains Carousel) */}
      <ResourceTiles />

      {/* CTA Section - Ready to Talk */}
      <CTASection />

      {/* Client Logos */}
      <ClientLogos />
    </main>
  );
};

export default Home;
