import Hero from '../components/sections/Hero';
import FeaturedServices from '../components/sections/FeaturedServices';
import Industries from '../components/sections/Industries';
import Calculators from '../components/sections/Calculators';
import About from '../components/sections/About';
import Blog from '../components/sections/Blog';
import CTA from '../components/sections/CTA';

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedServices />
      <Industries />
      {/*<Calculators />*/}
      <About />
      <Blog />
      <CTA />
    </>
  );
};

export default HomePage;
