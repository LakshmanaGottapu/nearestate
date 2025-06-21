import MobileMenu from "@/components/common/mobile-menu";
import Hero from "@/components/home/home-v6/hero";
import Footer from "@/components/home/home-v6/footer";
import Header from "@/components/home/home-v6/Header";

import FindHomeBlock from "@/components/home/home-v6/FindHomeBlock";
//import Cta from "@/components/home/home-v6/Cta";
//import Agents from "@/components/home/home-v6/Agents";
//import Pricing from "@/components/home/home-v6/Pricing";
//import FeatureProperties from "@/components/home/home-v6/FeatureProperties";
import Testimonial from "@/components/home/home-v6/Testimonial";
import About from "@/components/home/home-v6/About";
import ExploreCities from "@/components/home/home-v6/ExploreCities";
import FeaturedListings from "@/components/home/home-v6/FeatuerdListings";
//import { Link } from "react-router-dom";
import React, { useState,useEffect } from 'react';
import FetchData from '../../../../core/FetchData.mjs';
import MetaTags from "../../../../src/MetaTags";

const Home_V6 = ({dataFromServer}) => {
  const [metaInfo, setMetadata] = useState(dataFromServer?.metaData?dataFromServer.metaData:[]);
  const fetchMetadata=async (apiInfo, dataForSend) => {
    let meta= await FetchData(apiInfo?.method, apiInfo?.url, dataForSend);
    setMetadata(meta?.metaData);
  }
  useEffect(() => {
    if(!dataFromServer?.metaData){
      var dataForSend={
        requestType:'home_metadata'
        }
      var apiInfo ={
            method:'post',
            url:'https://www.nearestate.in/reactAPI.php'
        }
        fetchMetadata(apiInfo,dataForSend);
        
    }
    
  },[]);
  function howitworks(){
    document.getElementById("howitPopup").click();
  }
  return (
    <>
    <MetaTags
          url={`https://www.nearestate.in/`}
          title={metaInfo?.page_title}
          description={metaInfo?.description}
          keywords={metaInfo?.keywords}
          image={`https://www.nearestate.in/images/favicon.png`}
          twitterAccount={''}
      />
      {/* Main Header Nav */}
      <Header />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Home Banner Style V6 */}
      <section className="home-banner-style6 p0">
        <div className="home-style1">
          <div className="container">
            <div className="row">
              <div className="col-xl-10">
                <Hero />
              </div>
            </div>
          </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V6 */}

      {/* Explore Apartment Home */}
      <section className="pb30 pb30-md" style={{padding:'30px 0px'}}>
        <div className="container">
          <div className="row">
            <div className="col-xl-6" data-aos="fade-up" data-aos-delay="100">
              <div className="about-box2">
                <h4 className="title">
                  Join the future of home exploration today!
                </h4>
                <p className="text fz15" id="txt-content" style={{width:'50%'}}>
                  Experience the Immersive property & neighbourhood exploration today
                </p>
                <a style={{cursor:'pointer'}} onClick={()=>howitworks()}  className="ud-btn btn-thm">
                  How İt Works
                  <i className="fal fa-arrow-right-long" />
                </a>
                <img
                 
                  className="img-1 cover"
                  src="/images/about/home6-about-1.jpg"
                  alt="about"
                />
              </div>
            </div>
            {/* End .col-6 */}

            <div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
              <div className="row">
                <FindHomeBlock />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Explore Apartment Home */}

      {/* Featured Listings */}
      <section className="pt-0 pb0 pb30-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="title">Discover RealView360° Listings</h2>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="featured-prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination featured-pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="featured-next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row" style={{overflow:'hidden'}}>
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-listing-slider">
                <FeaturedListings dataFromServer={dataFromServer?.Listings} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Featured Listings */}

      {/* Property Cities */}
      <section className="pt0 pb0 pb50-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="title">Explore RealView360° Localities</h2>
              </div>
            </div>
            {/* End header */}

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="cities_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination cities_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="cities_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End .col for navigation and pagination */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider">
                <ExploreCities />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>
      {/* End property cities */}

      {/* <!-- About Us --> */}
      <section className="pb40-md bgc-f7" style={{padding:'30px 0px'}}>
        <div className="container">
          <About />
        </div>
      </section>
      {/*  <!-- End About Us --> */}

      {/* Our Testimonials */}
      <section className="our-testimonial" style={{padding:'30px 0px'}}>
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 mx-auto"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="main-title text-center">
                <h2 style={{textAlign:'center'}}>Testimonials</h2>
                {/* <p className="paragraph">
                  10,000+ unique online course list designs
                </p> */}
              </div>
              <div className="col-auto mb30" style={{display:'none'}}>
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="testmonials_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination testmonials_pagination__active" id="testmonialsBtn"/>
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="testmonials_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <div
              className="col-lg-8 m-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="testimonial-style2">
                <Testimonial />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* Featured Properties */}
      {/* <section className="our-testimonial pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto" data-aos-delay="300ms">
              <div className="main-title text-center">
                <h2>Featured Properties</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          </div>
          

          <div className="col-lg-12">
            <div className="home6-listing-single-slider" data-aos="fade-up">
              <FeatureProperties />
            </div>
          </div>
         
        </div>
        
      </section> */}
      {/* End Featured Properties */}

      {/* Pricing Section Area */}
      
      {/* Pricing Section Area */}

      {/* Exclusive Agents */}
      {/* Exclusive Agents */}

      {/* Our CTA */}
      {/* <Cta /> */}
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 at-home6 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V6;
