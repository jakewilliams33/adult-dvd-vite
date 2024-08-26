import { HomePageSocials } from "../components/HomePageSocials";
import { ThreeScene } from "../ThreeScene";
import { Helmet } from "react-helmet-async";

export const HomePage = ({ setSignUpVisible }) => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="Home" content="Home Page" />
      </Helmet>
      <HomePageSocials />
      <ThreeScene setSignUpVisible={setSignUpVisible} />
    </>
  );
};
