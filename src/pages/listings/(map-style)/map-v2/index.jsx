import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringThree from "@/components/listing/map-style/map-v2/PropertyFilteringThree";

import React from "react";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "nearestate.in - search results",
};
 
const mapV2 = () => {
  return (
    <div className="bgc-f7">
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Start */}
      {/* <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Blog</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Blog</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Breadcrumb Start */}

      {/* Blog Section Area */}
      <div id="map_div">
          <PropertyFilteringThree/>
      </div>
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
     
      {/* End Our Footer */}
    </div>
  );
};

export default mapV2;
