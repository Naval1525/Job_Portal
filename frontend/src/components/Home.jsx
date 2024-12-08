import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Latestjob from "./Latestjob";
import Navbar from "./shared/Navbar";

function Home() {
  useGetAllJobs();
  return <div>
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    <CategoryCarousel></CategoryCarousel>
    <Latestjob></Latestjob>
    <Footer></Footer>
  </div>;
}
export default Home;
