import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import Pagination from "@/components/property/Pagination";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AllReviews from "@/components/property/dashboard/dashboard-reviews";
import MetaData from "@/components/common/MetaData";
import React, { useState,useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
const metaInformation = {
  title: "Dashboard Reviews || nearestate.in",
};

const DashboardReviews = () => {
  const [propertyData,setPropertydata]=useState([]);
  const [userId,setUserid]=useState('');
  const [mobile,setMobile]=useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
  useEffect(() => {
    var re = new RegExp("userid" + "=([^;]+)"); 
    var value = re.exec(document.cookie);
    if(value){
      let postObj={
        requestType:'checkLogin',
        userid:value[1]
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          if(response.status==200 && response.data){
            setUserid(value[1]);
          }
        });
    }
    if(value){
    //setUserid(value[1]);
    let postObj={
      requestType:'myReviews',
      userid:value[1]
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
      .then(response => { 
        document.getElementById("loadericon").style.display='none';
        document.getElementById("loaderimg").style.display='none';
        if(response.status==200 && response.data.length>0){
          setPropertydata(response.data);
        }else{
          document.getElementById("noresults").style.display="block";
        }
      });
    }else{
      location.href="/";
    }
  },[]);
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
            <div className="dashboard__content bgc-f7" style={{padding:'30px 20px 20px',background:'#f7f7f7'}}>
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
                    <h2>Reviews</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}
              {propertyData.length==0 &&<div><div id='noresults' style={{textAlign:'center',background:'#f3f3f3',display:'none',marginTop:'18%',marginBottom:'18%'}} className="alert alert-danger" role="alert"><i style={{color:'red'}} className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;<strong style={{color:'#000'}}>No Records Found.</strong></div><div id='loaderimg'><img src="images/favicongif.gif" id="loadericon" style={{position:'absolute',top:0,left:0,right:0,bottom:0,margin:'auto'}} width="100" /></div></div>}
              {propertyData.length>0 &&<div className="row">
              <div id='loaderimg'><img src="images/favicongif.gif" id="loadericon" style={{position:'absolute',top:0,left:0,right:0,bottom:0,margin:'auto'}} width="100" /></div>
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    {/* <AllReviews /> */}
                    <div className="product_single_content mb50">
                      <div className="mbp_pagination_comments">
                        <div className="row">
                          {/* <div className="col-lg-12">
                            <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
                              <h6 className="fz17 mb15">
                                <i className="fas fa-star fz12 pe-2" />
                                5.0 · 3 reviews
                              </h6>
                              <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                                <div className="pcs_dropdown mb15 d-flex align-items-center">
                                  <span style={{ minWidth: "60px" }}>Sort by</span>
                                  <select className="form-select">
                                    {sortOptions.map((option, index) => (
                                      <option key={index}>{option}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div> */}
                          {/* End review filter */}
                          {propertyData.map((review, index) => (
                            <div className="col-md-12" key={index}>
                              <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
                              {!isMobile &&<div className="blog-single-review" style={{top:'auto',marginRight:'10px'}}>
                                <ul className="mb0 ps-0">
                                  {[...Array(parseInt(review.rating))].map((_, i) => (
                                    <li className="list-inline-item me-0" key={i}>
                                      <a style={{cursor:'pointer'}}>
                                        <i className="fas fa-star review-color2 fz10" />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>}
                                {!review.image_url &&<img
                                  src={review.image_url}
                                  className="mr-3"
                                  alt="comments-2.png"
                                  width="86" height="86" style={{borderRadius:'50%'}} 
                                />}
                                {review.image_url && <div className="profileImges"><i className="fal fa-user-circle" style={{fontSize: '72px',fontWeight: 'bold',color:'#3270FC'}}></i></div>}
                                <h6 style={{paddingLeft:'5px'}}><Link  to={review.property_url} target="_blank"><span>{review.property_title}</span></Link></h6>
                              </div>
                              <div className="ml50 mt10">
                                {/* <h6 className="mt-0 mb-0">{review.username}</h6> */}
                                <div>
                                  <span style={{display:'block'}} className="fz14">{review.ratingTitle}</span>
                                  <span style={{display:'block'}} className="fz14">{review.description}</span>
                                  <span style={{display:'block'}} className="fz14">Posted on {review.date}</span>
                                </div>
                              </div>
                              {isMobile &&<div className="blog-single-review">
                                <ul className="mb0 ps-0">
                                  {[...Array(parseInt(review.rating))].map((_, i) => (
                                    <li className="list-inline-item me-0" key={i}>
                                      <a style={{cursor:'pointer'}}>
                                        <i className="fas fa-star review-color2 fz10" />
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>}
                            </div>
                          ))}
                          {/* <SingleReview /> */}
                          {/* End reviews */}
                        </div>  
                      </div>
                    </div>
                    <div className="mt30">
                      {/* <Pagination /> */}
                    </div>
                  </div>
                </div>
              </div>}
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

export default DashboardReviews;
