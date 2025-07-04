import AboutSection from "../components/AboutSection";
import CategoriesSection from "../components/CategoriesSection";
import ContactSection from "../components/Contact";
import FaqSection from "../components/FQASection";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <AboutSection/>
      <CategoriesSection />
      <FaqSection/>
      <ContactSection/>
    </main>
  );
};

export default Home;
