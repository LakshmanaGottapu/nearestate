import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
//import Partner from "@/components/common/Partner";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Agents from "@/components/pages/about/Agents";
import Features from "@/components/pages/about/Features";
//import FunFact from "@/components/pages/about/FunFact";
//import Mission from "@/components/pages/about/Mission";

import { Link } from "react-router-dom";

import MetaTags from "../../../../src/MetaTags";
import { useEffect, useState } from "react";
import FetchData from '../../../../core/FetchData.mjs';

const About = ({dataFromServer}) => {
  const [metaInfo, setMetadata] = useState(dataFromServer?.page_title?dataFromServer:[]);
  const fetchMetadata=async (apiInfo, dataForSend) => {
    let meta= await FetchData(apiInfo?.method, apiInfo?.url, dataForSend);
    setMetadata(meta);
  }
  useEffect(() => {
    if(!dataFromServer?.page_title){
      var dataForSend={
        requestType:'about_metadata'
        }
      var apiInfo ={
            method:'post',
            url:'https://www.nearestate.in/reactAPI.php'
        }
        fetchMetadata(apiInfo,dataForSend);
    }
    
  },[]);
  var cntr=0;
  setInterval(() => {cntr++;
    if(cntr%2==0){
      if(document.querySelector(".agent_next__active")){
         var menuOpen=false;
         document.querySelectorAll(".dropdown-menu").forEach(function(element){
           if(element.classList.contains("show")){
            menuOpen=true;
           }
         });  
         if(!menuOpen){
          document.querySelector(".agent_next__active").click();
         }
      }
      // if(document.getElementById("logcol").innerText.includes("Login")){
      //   if(document.querySelector(".agent_next__active")){
      //     document.querySelector(".agent_next__active").click();
      //     }
      // }else{
      //   if(document.querySelector(".agent_next__active") && !document.getElementById("dropMenu").classList.contains("show")){
      //     console.log("kkk",document.getElementById("dropMenu").classList);
      //     document.querySelector(".agent_next__active").click();
      //     }
      // }
    }else{
      if(document.querySelector(".agent_prev__active")){
         var menuOpen=false;
         document.querySelectorAll(".dropdown-menu").forEach(function(element){
          if(element.classList.contains("show")){
           menuOpen=true;
          }
        }); 
        if(!menuOpen){
         document.querySelector(".agent_prev__active").click();
        }
      }
      // if(document.getElementById("logcol").innerText.includes("Login")){
      //   if(document.querySelector(".agent_prev__active")){
      //     document.querySelector(".agent_prev__active").click();
      //   }
      // }else{
      //   if(document.querySelector(".agent_prev__active") && !document.getElementById("dropMenu").classList.contains("show")){
      //     document.querySelector(".agent_prev__active").click();
      //   }
      // }
    }
  }, 3000);
  return (
    <>
    <MetaTags
          url={`https://www.nearestate.in/about`}
          title={metaInfo?.page_title}
          description={metaInfo?.description}
          keywords={metaInfo?.keywords}
          image={`https://www.nearestate.in/images/favicon.png`}
          twitterAccount={''}
      />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      <section className="parallax-section single-par color-bg" id="about_section">
          <div className="container">
              <div className="section-title center-align big-title">
                  <h2 style={{color:'#fff'}}><span>About us</span></h2>
              </div>
              <div className="scroll-down-wrap">
                  <div className="mousey">
                      <div className="scroller"></div>
                  </div>
                  <span>Scroll Down To Discover</span>
              </div>
          </div>
          <div className="pwh_bg"></div>
          <div className="mrb_pin vis_mr mrb_pin3 "></div>
          <div className="mrb_pin vis_mr mrb_pin4 "></div>
      </section>
      {/* <section className="breadcumb-section2 p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 style={{color:'#fff'}}  className="title">About Us</h2>
                <div className="breadcumb-list">
                   <Link to="/" style={{color:'#fff'}}>Home</Link>
                  <a style={{color:'#fff'}}>About</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="breadcumb-section22"></div>
      </section> */}
      {/* End Breadcrumb Sections */}

      {/* Our About Area */}
      <section className="our-about pb901" style={{padding:'50px 0',background:'#fff'}}>
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
            <h2>
                About us
              </h2>
              <p className="text mb25">
              We are world’s first immersive <span className="realview2">RealView360&deg;</span> property market place. <span className="realview2">RealView360&deg;</span> is discovering your dream home and its vibrant neighbourhood and immerse yourself in every room and explore the local surroundings, all from the comfort of your device.
              </p>
              <span style={{fontWeight:'bold'}}>a DPIIT recognised startup - DIPP165602 - startupindia</span>
              <p className="text mb25" style={{fontSize:'16px',fontWeight:'bold',marginBottom:'10p',marginTop:'5px',width:'53%'}}>Background</p>
              <div>
              <p className="text mb25">Meet the Founder Mr.venkataRamana & the Co Founder Mr.Rajesh the visionary entrepreneurs who revolutionized the real estate industry with the creation of <span className="realview2">RealView360&deg;</span>, a groundbreaking property marketplace that bridges the gap between physical distance and immersive property experiences.</p>
              <p className="text mb25">
              Born with a relentless drive for innovation and a passion for technology, they faced a common challenge that many potential property buyers encounter: the inability to gain realistic or virtual experiences of properties located far away. Frustrated by the limitations of traditional property listings and static images, they set out on a mission to transform the way people explore and interact with real estate.
              </p>
              <p className="text mb25">Drawing on their expertise in both technology and real estate, they conceptualized and developed <span className="realview2">RealView360&deg;</span>, a platform that seamlessly integrates neighbourhood street views with immersive virtual property tours. By combining the power of advanced imaging technology with user-friendly interfaces, they created an unparalleled experience that allows users to explore properties as if they were physically present, regardless of their geographical location.</p>
              <p className="text mb25"><span className="realview2">RealView360&deg;</span> not only provides prospective buyers with an immersive and interactive way to view properties but also offers real estate agents and property developers a powerful tool for showcasing their listings in a dynamic and engaging manner. With its intuitive interface and high-resolution imagery, <span className="realview2">RealView360&deg;</span> has quickly become the go-to destination for anyone in search of their dream home or investment property.</p>
              <p className="text mb25"><span className="realview2">RealView360&deg;</span> was born from this vision—a platform that transcends physical boundaries, allowing users to step into properties as if they were there in person. Leveraging cutting-edge immersive technology, users can explore every nook and cranny of a property, gaining a comprehensive understanding of its layout, ambiance, and potential.</p>
              <p className="text mb25">Driven by a relentless commitment to innovation and a deep understanding of the needs of both buyers and sellers, they continues to lead <span className="realview2">RealView360&deg;</span> on its mission to revolutionize the real estate industry and redefine the way people experience properties around the world. Through their visionary leadership and groundbreaking technology, they have not only transformed the way we buy and sell real estate but has also opened up new possibilities for connectivity and exploration in an increasingly globalized world.</p>
              <p className="text mb25"></p>
              <input type="hidden" className="dropdown-menu" />
              </div>
              {/* <div className="row">
                <Mission />
              </div> */}
            </div>
          </div>
        </div>
      </section>
      {/* End Our About Area */}

      {/* About Banner */}
      <section className="our-about pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-12">
              <div className="about-page-img">
                <img
                 
                  className="w-100 h-100 cover"
                  src="/images/about/about-page-banner.png" style={{height:'500px',width:'1170px'}}
                  alt="about banner"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Banner */}

      {/* Funfact */}
      <section className="pt-0">
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {/* <FunFact /> */}
          </div>
        </div>
      </section>
      {/* End Funfact */}

      {/* Exclusive Agents */}
      <section className="pb90">
        <div className="container">
          <div className="row  justify-content-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="title">Our Team</h2>
                {/* <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p> */}
              </div>
            </div>
            <div className="col-auto mb30" style={{display:'none'}}>
              <div className="row align-items-center justify-content-center" style={{paddingTop:'8px'}}>
                <div className="col-auto">
                  <button className="agent_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination agent_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="agent_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>
            {/* End header */}
          </div>
          {/* End .row */}

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider about">
                <Agents />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Agents */}

      {/* Abut intro */}
      <section className="pt30 pb-0">
        <div className="cta-banner3 bgc-thm-light mx-auto maxw1600 pt100 pt60-lg pb90 pb60-lg bdrs24 position-relative overflow-hidden mx20-lg" style={{background:'#f1f2f2'}}>
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 col-lg-5 pl30-md pl15-xs"
                data-aos="fade-left"
                data-aos-delay="300"
              >
                <div className="mb30">
                  <h2 className="title text-capitalize">
                    Next-Level Immersive Listings with <font className="realview2">RealView360°</font>
                    {/* Let’s find the right <br className="d-none d-md-block" />{" "}
                    selling option for you */}
                  </h2>
                </div>
                <div className="why-chose-list style2">
                  <Features />
                </div>
                <Link to="/add-property" style={{background:'#3270fc',border:'solid 2px #3270fc'}} className="ud-btn btn-dark">
                  Add Property
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abut intro */}

      {/* Our Partners */}
      {/* <section className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h6>Trusted by the world’s best</h6>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Our Partners */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default About;
