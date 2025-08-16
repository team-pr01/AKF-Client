import Books from "../../components/HomePage/Books/Books";
import Hero from "../../components/HomePage/Hero/Hero";
import OurProjects from "../../components/HomePage/OurProjects/OurProjects";
import PageIconLinks from "../../components/HomePage/PageIconLinks/PageIconLinks";
import SearchBar from "../../components/HomePage/Searchbar/SearchBar";
import Navbar from "../../components/Shared/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="px-4 py-3 bg-light-primary dark:bg-primary">
        <SearchBar />
      </div>
      <PageIconLinks />
      <Books />
      <OurProjects />
    </div>
  );
};

export default Home;
