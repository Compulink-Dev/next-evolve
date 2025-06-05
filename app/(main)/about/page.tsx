import Evolve from "@/components/Evolve";
import Information from "@/components/Information";
import Layout from "@/components/Layout";
import Mission from "@/components/Mission";
import Objectives from "@/components/Objectives";
import Partners from "@/components/Partner";
import Pricing from "@/components/Pricing";
import Subscribe from "@/components/Subscribe";
import Venue from "@/components/Venue";
import AboutInfo from "./_components/about-info";
import Values from "./_components/values";
import GeneralPartners from "@/components/general-partners";
import Ticketing from "../_components/ticketing";
import Partnership from "@/components/partnership";
import Speakers from "../_components/home-speakers";

function About() {
  return (
    <div className="">
      <div>
        {/* <Information /> */}
        <AboutInfo />
        <Values />
        {/* <Evolve />
                <Mission /> */}
        <Venue />
        <Subscribe />
        <Objectives />
        <Speakers />
        <Ticketing />
        {/* <Pricing /> */}
        {/* <GeneralPartners /> */}
        <Partnership />
      </div>
    </div>
  );
}

export default About;
