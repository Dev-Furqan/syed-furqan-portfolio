import { useEffect } from 'react';
import { HelmetData } from './constants/site';
import AppRoutes from './routes/AppRoutes';

export default function App() {

  useEffect(() => {
    document.title = HelmetData.title;
  }, []);

  return (
    <AppRoutes />
  );
}
