import { useEffect } from 'react';
import { HelmetData } from './constants/site';
import AppRoutes from './routes/AppRoutes';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  useEffect(() => {
    document.title = HelmetData.title;
  }, []);

  return (
    <AppRoutes />
  );
}
