
import AboutUs from "../../../Components/Shared/AboutUs/AboutUs";
import Banner from "../../../Components/Shared/Banner/Banner";
import ScholarshipCategories from "../../../Components/Shared/ScholarshipCategories/ScholarshipCategories";
import Featured from "../Featured/Featured";

const Home = () => {
    return (

        <div>
            <Banner></Banner>
            <Featured></Featured>
            <ScholarshipCategories />
            <AboutUs></AboutUs>
        </div>
        
    );
};

export default Home;

