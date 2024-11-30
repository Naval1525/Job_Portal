import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import Navbar from "./shared/Navbar";

function Home() {
  return <div>
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <CategoryCarousel></CategoryCarousel>
  </div>;
}
export default Home;
