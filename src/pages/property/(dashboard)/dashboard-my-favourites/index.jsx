import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
// import Pagination from "@/components/property/Pagination";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import ListingsFavourites from "@/components/property/dashboard/dashboard-my-favourites/ListingsFavourites";
import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dashboard My Favourites || nearestate.in",
};

const DashboardMyFavourites = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
          {/* <div className="progressdiv" style={{height: '77vh',position: 'relative',margin: 'auto',width: '32%',top:'16%'}}><img style={{width:'100%',background:'#fff'}} className="progressimg" src="images/icon/error-page-img.svg"/></div> */}
            <div className="dashboard__content bgc-f7" style={{padding:'30px 60px 20px',background:'#f7f7f7'}}>
              <div className="row pb401">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb10">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>My Favourites</h2>
                    {/* <p className="text">We are glad to see you again!</p> */}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <ListingsFavourites />
                {/* <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="mt30">
                      <Pagination />
                    </div>
                  </div>
                </div> */}
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyFavourites;
