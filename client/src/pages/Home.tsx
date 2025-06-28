import AboutSection from "../components/AboutSection";
import CategoriesSection from "../components/CategoriesSection";
import FaqSection from "../components/FQASection";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <AboutSection/>
      <FaqSection/>
    </main>
  );
};

export default Home;
