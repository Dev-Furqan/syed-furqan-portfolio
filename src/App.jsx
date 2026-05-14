import { useEffect } from 'react';
import { HelmetData } from './constants/site';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AmbientBackground from './components/common/AmbientBackground';
import CustomCursor from './components/common/CustomCursor';
import ScrollProgress from './components/common/ScrollProgress';
import PageTransition from './components/layout/PageTransition';
import { useLenis } from './hooks/useLenis';
import { useScrollCinematics } from './hooks/useScrollCinematics';

export default function App() {
  useLenis();
  useScrollCinematics();

  useEffect(() => {
    document.title = HelmetData.title;
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-ink text-frost selection:bg-cyan/30 selection:text-white">
      <AmbientBackground />
      <ScrollProgress />
      <CustomCursor />
      <div className="relative z-10">
        <Navbar />
        <PageTransition>
          <AppRoutes />
        </PageTransition>
        <Footer />
      </div>
    </div>
  );
}
