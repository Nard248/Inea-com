import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StructuredData from '../StructuredData';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <StructuredData />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
