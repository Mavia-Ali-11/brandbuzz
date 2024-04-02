import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Slider from "react-slick";
import { PrimaryButton } from '../components';
import Client1Img from "../assets/images/clients/client1.png"
import Client2Img from "../assets/images/clients/client2.png"
import Client3Img from "../assets/images/clients/client3.png"
import Client4Img from "../assets/images/clients/client4.png"
import Client5Img from "../assets/images/clients/client5.png"
import Client6Img from "../assets/images/clients/client6.png"
import ForBrands from "../assets/images/for-brands.png"
import ForPublishers from "../assets/images/for-publishers.png"
import { scrollToSection, scrollToTop } from '../utils/common';

const Home = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const settings = {
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      }
    ],
  };

  useEffect(() => {
    if(window.location.pathname === "/features") scrollToSection("home-features");
    else scrollToTop();
  }, [pathname]);

  return (
    <>
      <section className="py-[60px] px-[30px] home-banner">
        <div className="text-center">
          <h1 className="text-black text-xxlarge font-[800] leading-[62px]">
            Brandzbuzz:
            <br />
            Editorial Coverage, Made Simple
          </h1>
          <p className="text-silver mt-[12px]">Made for Brands and Publishers, by Brands and Publishers</p>
          <div className="mt-[55px] action-buttons">
            <PrimaryButton
              type="link"
              to="/signup"
              text="Join us now"
              className="mr-[20px] max-w-[180px]"
            />
            <PrimaryButton
              type="link"
              text="Request demo"
              className="max-w-[180px]"
              variant="secondary"
            />
          </div>
        </div>
      </section>

      <section className="py-[50px] px-[30px]">
        <h3 className="text-[24px] text-silver font-[700] text-center mb-[60px]">
          Get Coverage From
        </h3>

        <Grid container style={{ justifyContent: "center" }}>
          <Grid xs={10}>
            <Slider {...settings}>
              <div>
                <img src={Client1Img} width={180} className="m-auto" alt="client" />
              </div>
              <div>
                <img src={Client2Img} width={180} className="m-auto" alt="client" />
              </div>
              <div>
                <img src={Client3Img} width={180} className="m-auto" alt="client" />
              </div>
              <div>
                <img src={Client4Img} width={180} className="m-auto" alt="client" />
              </div>
              <div>
                <img src={Client5Img} width={180} className="m-auto" alt="client" />
              </div>
              <div>
                <img src={Client6Img} width={180} className="m-auto" alt="client" />
              </div>
            </Slider>
          </Grid>
        </Grid>
      </section>

      <section className="px-[60px] home-ad-tiles" id="home-features">
        <h2 className="text-xlarge text-black font-[700] text-center mb-[85px]">
          Helping Brands get on the Map
        </h2>

        <Grid container>
          <Grid xs={12} sm={7} className="flex items-center">
            <div className="pr-[40px] ad-content">
              <h4 className="text-medium text-black font-[700] mb-[5px]">
                For Brands: Get Coverage & Clicks
              </h4>
              <p className="text-silver">
                We make it simple and straightforward for brands to
                <br /> easily get featured on publications, and get clicks
              </p>
              <div className="my-[25px]">
                <PrimaryButton
                  type="link"
                  text="Try now"
                  className="mr-[12px] p-[8px] max-w-[110px]"
                />
                <PrimaryButton
                  type="link"
                  text="Learn more"
                  className="p-[8px] max-w-[110px] border-white hover:border-dark_orange"
                  variant="secondary"
                />
              </div>
            </div>
          </Grid>
          <Grid xs={12} sm={5}>
            <img src={ForBrands} width="100%" alt="for brands" />
          </Grid>
        </Grid>

        <Grid container style={{ marginTop: 60 }}>
          <Grid xs={12} sm={7}>
            <img src={ForPublishers} className="w-[75%] home-publisher-img" alt="for publishers" />
          </Grid>
          <Grid xs={12} sm={5} className="flex items-center">
            <div className="pr-[40px] ad-content">
              <h4 className="text-medium text-black font-[700] mb-[5px]">
                For Publishers: Earn Simply
              </h4>
              <p className="text-silver">
                Connect your media outlets, and let the cash roll in by itself.
              </p>
              <div className="mt-[25px]">
                <PrimaryButton
                  type="link"
                  to="/"
                  text="Try now"
                  className="mr-[12px] p-[8px] max-w-[110px]"
                />
                <PrimaryButton
                  type="link"
                  to="/"
                  text="Learn more"
                  className="p-[8px] max-w-[110px] border-white hover:border-dark_orange"
                  variant="secondary"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </section>

      <section className="py-[60px] px-[30px]">
        <Grid container style={{ justifyContent: "center" }}>
          <Grid xs={12} sm={10}>
            <div style={{ position: 'relative', paddingBottom: '56.12813370473538%', height: 0 }}>
              <iframe
                title="brandzbuzz"
                src="https://www.loom.com/embed/3d029f2547b24ada97b2101f60a258b9?sid=afb366e2-9eea-4326-8b90-b20cb45df2ea"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 8 }}
              ></iframe>
            </div>
          </Grid>
        </Grid>
      </section>
    </>
  )
}

export default Home;