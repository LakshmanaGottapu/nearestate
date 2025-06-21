import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ComapareTable from "@/components/pages/compare/ComapareTable";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Compare  || nearestate.in",
};

const Compare = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
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
                  <h2 style={{color:'#fff'}}><span>Your Compare List</span></h2>
                  <h4  style={{color:'#fff',fontSize:'12px'}}>compare properties now to made your decision easy</h4>
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
      {/* <section className="breadcumb-section3 p-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title text-white">Compare Properties</h2>
                <div className="breadcumb-list">
                  <a className="text-white" href="#">
                    Home
                  </a>
                  <a className="text-white" href="#">
                    Compare
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Breadcrumb Sections */}

      {/* Our Compare Area */}
      <section className="our-compare" style={{padding:'50px 0',background:'#fff'}}>
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-12">
              <div className="table-style2 table-responsive">
                <ComapareTable />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Compare Area */}

      {/* Our CTA */}
      {/* <CallToActions /> */}
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Compare;
