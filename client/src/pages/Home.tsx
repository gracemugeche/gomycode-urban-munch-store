import AboutSection from "../components/homesection/AboutSection";
import CategoriesSection from "../components/homesection/CategoriesSection";

import HeroSection from "../components/homesection/HeroSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection/>
      <CategoriesSection />
    </main>
  );
};

export default Home;
