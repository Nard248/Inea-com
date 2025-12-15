import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Calculators from '../components/sections/Calculators';
import About from '../components/sections/About';
import Blog from '../components/sections/Blog';
import CTA from '../components/sections/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      {/*<Calculators />*/}
      <About />
      <Blog />
      <CTA />
    </>
  );
};

export default HomePage;
