import useGetAllJobs from "@/hooks/useGetAllJobs";
import CategoryCarousel from "./CategoryCarousel";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import Latestjob from "./Latestjob";
import Navbar from "./shared/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  useGetAllJobs();
  const navigate = useNavigate();
  const {user}= useSelector(store=>store.auth);
  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate("/admin/companies")
    }

  },[]);
  return <div>
    <Navbar></Navbar>
    <HeroSection></HeroSection>
    {/* <CategoryCarousel></CategoryCarousel> */}
    <Latestjob></Latestjob>
    <Footer></Footer>
  </div>;
}
export default Home;
