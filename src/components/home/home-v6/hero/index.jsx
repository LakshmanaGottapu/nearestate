import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";
import React, { useState,useEffect } from 'react'
//import Category from "./Category";

const Hero = () => {
  useEffect(() => {
    setTimeout(()=>{ document.getElementById("indicator").style.display="none";},6000);
  },[]);
  function hideinstruction(){
    document.getElementById("indicator").style.display="none";
    document.getElementById("indimg").style.display="none";
  }
  return (
    <>
      <div id="indicator">
		    <p>Please note: <font className="realview">RealView360</font>° is optimized for the best experience on Chrome Browser 
        {/* <span  id="svgclose" style={{float: 'right',margin: '-1px 8px',cursor: 'pointer',display:'block'}} onClick={()=>hideinstruction()}><svg width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg></span> */}
        </p>
	    </div>
      <div className="inner-banner-style6">
        <h2 className="hero-title text-white animate-up-1">
        Discover home and it’s neighbourhood with<br className="d-xl-block" />
        RealView360° 
        </h2>
        <HeroContent />
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
      <p className="h6 fw600 text-white fz14 animate-up-4 my-3 bottom-txt" id="callus">
      Or Call us <b className="realview">040 2222 2224</b>
      </p>
      {/* <Category /> */}
    
    </>
  );
};

export default Hero;
