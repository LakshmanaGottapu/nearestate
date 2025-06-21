// 
//import DefaultHeader from "@/components/common/DefaultHeader";
//import Footer from "@/components/common/default-footer";
//import MobileMenu from "@/components/common/mobile-menu";
//import EnergyClass from "@/components/property/property-single-style/common/EnergyClass";
//import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
//import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
//import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
//import OverView from "@/components/property/property-single-style/common/OverView";
//import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
//import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
//import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
//import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
//import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
//import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
//import PropertyViews from "@/components/property/property-single-style/common/property-view";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
//import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
//import AllReviews from "@/components/property/property-single-style/common/reviews";
//import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
//import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
//import PropertyGallery from "@/components/property/property-single-style/single-v6/PropertyGallery";
import React, { useState, useEffect } from "react";
//import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
//import WalkScore from "@/components/property/property-single-style/common/WalkScore";
import axios from "axios";
import MetaData from "@/components/common/MetaData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Link } from "react-router-dom";
import "photoswipe/dist/photoswipe.css";
import { useParams } from "react-router-dom";

const metaInformation = {
  title: "Nearestate - Property Details",
};

const Iframedata = () => {
  let params = useParams();
  const [listings, setPosts] = useState([] || null);
  const [flistings, setfPosts] = useState([] || null);
  const [featuresAmenitiesData, setAmenty] = useState([] || null);
  const [floorPlanData, setFloorplan] = useState([] || null);
  const [reviews, setReviews] = useState([] || null);
  
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  var fea_arr=[];
  fea_arr[1]=['Wi-Fi'];
  fea_arr[2]=['Ac'];
  fea_arr[3]=['Solar water Heater'];
  fea_arr[4]=['RO water purifier'];
  fea_arr[5]=['CCTV camera'];
  fea_arr[6]=['Intercom'];
  fea_arr[7]=['Lift'];
  fea_arr[8]=['Generator'];
  fea_arr[9]=['Gym'];
  fea_arr[10]=['Swimming pool'];
  fea_arr[11]=['Club house'];
  fea_arr[12]=['Childrens play area'];
  fea_arr[13]=['Laundry'];
  
  useEffect(() => {
    let postObj={
      requestType:'property_details',
      property_id:params?.id
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        if(response.data){
        setPosts(response.data);
        let listings=response.data;
        if(listings.amenties){
        setAmenty(listings.amenties.split(","));
        }
        setFloorplan(listings.floorplans);
        setReviews(listings.review);
        let myLatLng={lat: parseFloat(listings.latitude), lng: parseFloat(listings.longitude)};
        var center = myLatLng
        var map = new google.maps.Map(document.getElementById('map'), {zoom: 12, center: center,mapId:"475f881958a6435e"});
        const icon = {
          url: "https://www.nearestate.in/admin/themes/images/marker-single.png", 
          scaledSize: new google.maps.Size(40, 33), 
          origin: new google.maps.Point(0,0), 
          anchor: new google.maps.Point(13, 16),
      };
      var marker = new google.maps.Marker({
          position: myLatLng, 
          map: map, 
          icon: icon,
          draggarble: false
      });
      var information = new google.maps.InfoWindow({
        content: "<div class='info-window-content infobox'><h1>" + listings.title + "</h1> <p>" + listings.location+', '+listings.city + "</p></div>"
    });
    marker.addListener('click', function () {
        information.open(map, marker);
    });
      }
      })
      .catch(error => {
        console.error(error);
      });
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      var uId=(userId)?userId[1]:'';
      let postObj2={
        requestType:'featured_listings',
        userid:uId,
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj2,{headers: { 'Content-Type': 'application/json' }})
        .then(response => {
          setfPosts(response.data);
        })
        .catch(error => {
          console.error(error);
        });
  }, []);
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Bedroom",
      value: listings?.beds,
    },
    {
      icon: "flaticon-shower",
      label: "Bath",
      value: listings?.bathrooms,
    },
    {
      icon: "flaticon-event",
      label: "Year Built",
      value: new Date(listings?.date).getFullYear(),
    },
    {
      icon: "flaticon-garage",
      label: "Garage",
      value: listings?.garages,
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "Sqft",
      value: listings?.area,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Property Type",
      value: listings?.property_type,
    },
  ];
  const columns = [
    [
      {
        label: "Property ID",
        value: listings.property_id,
      },
      {
        label: "Price",
        value: listings.price,
      },
      {
        label: "Property Size",
        value: listings.area,
      },
      {
        label: "Bathrooms",
        value: listings.bathrooms,
      },
      {
        label: "Bedrooms",
        value: listings.beds,
      },
    ],
    [
      {
        label: "Garage",
        value: listings.garages,
      },
      {
        label: "Garage Size",
        value: "200 SqFt",
      },
      {
        label: "Year Built",
        value: new Date(listings.date).getFullYear(),
      },
      {
        label: "Property Type",
        value: listings.property_type,
      },
      {
        label: "Property Status",
        value: listings.property_status,
      },
    ],
  ];
  function popClose(){
    document.getElementById("modalClose").click();
  }
  function contactDetails(id){
    // let _login=document.getElementById("logcol").innerText;
    // if(_login.includes("Login")){
    //   document.getElementById("contactFlag").value=1;
    //   document.getElementById("fav_id").value=0;
    //   document.getElementById("loginBtn").click();return false;
    //}else{ 
      document.getElementById("contactFlag").value=1;
      document.getElementById("fav_id").value=0;
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      if(userId){
        document.getElementById("contactBtn").setAttribute("disabled",true);
        var postObj={
          userid:userId[1],
          propertyid:id,
          requestType:'viewContact'
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          console.log(response);
          if(response.status=="200"){
            if(response.data!=""){
             let contactDetails=response.data;
             document.getElementById("cont-mobile-col").innerText=contactDetails.mobile;
             document.getElementById("cont-email-col").innerText=(contactDetails.email)?contactDetails.email:'Not Available';
            }
          }
        })
        .catch(error => {
          console.error(error);
        }); 
      }
      return;
    //}
  }
  function favourite(id){
    //let _login=document.getElementById("logcol").innerText;
    //if(_login.includes("Login")){
      // document.getElementById("fav_id").value=1;
      // document.getElementById("contactFlag").value=0;
      // document.getElementById("loginBtn").click();return false;
    //}else{
      document.getElementById("fav_id").value=1;
      document.getElementById("contactFlag").value=0;
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      if(userId){
        var postObj={
          userid:userId[1],
          propertyid:id,
          requestType:'favourite'
      }
      console.log("postObj",postObj);
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          console.log(response);
          if(response.status=="200"){
            // document.getElementById("customPopup").click();
            // document.getElementById("customMsg").innerText="Favourite Added Successfully.";
          }
        })
        .catch(error => {
          console.error(error);
        });  
      }
      //}
      if(document.getElementById("likeIcon_"+id).classList.contains('liked')){
        document.getElementById("likeIcon_"+id).classList.remove("liked");
        document.getElementById("likeIcon_"+id).innerHTML='<svg class="m-0 likeIcon" viewBox="0 0 24 24" color="transparent" style="width: 17px; height: 17px; margin: 2px;"><path class="" fill="transparent" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style="transform: scale(1.5, 1.4); stroke: rgb(120, 118, 118); stroke-width: 1.5px; fill: transparent;"></path></svg>';
      }else{
      document.getElementById("likeIcon_"+id).classList.add("liked");
      document.getElementById("likeIcon_"+id).innerHTML='<svg class="m-0 likeIcon" viewBox="0 0 24 24" color="#fd3752" style="width: 18px; height: 18px; margin: 2px;"><path class="" fill="#fd3752" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style="transform: scale(1.5, 1.4);"></path></svg>';
      }
  }
  function printWindow(){
    window.print();
  }
  function contactbtn(){
    document.querySelector("a#contactBtn").focus();
    document.querySelector("a#contactBtn").click();
  }
  function Compare(id){
    var compareArray=[];
    var re = new RegExp("compareid" + "=([^;]+)"); 
    var value = re.exec(document.cookie);  
    if(value){ 
      let val=(value != null) ? unescape(JSON.parse(value[1])):'';
      val.split(",").forEach((item)=>{
        if(item){
          compareArray.push(parseInt(item));
        }
      });
    }
    compareArray.push(parseInt(id));
    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);
    document.cookie = "compareid="+JSON.stringify(compareArray)+"; expires="+now.toUTCString()+"; path=/";
    // document.getElementById("customPopup").click();
  
    // document.getElementById("customMsg").innerHTML="Property added to Compare Successfully.<br/>Add two are more properties and go to compare page and compare your desired properties";
  }
  function contactbtn(){
    document.querySelector("a#contactBtn").focus();
    document.querySelector("a#contactBtn").click();
  }
  return (
    <>
     <MetaData meta={{title:listings.page_title}} />
      {/* Main Header Nav */}
      {/* <DefaultHeader /> */}
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      {/* <MobileMenu /> */}
      {/* End Mobile Nav  */}

      {/* Property All Single  */}
      <section className="pt601 pb901 bgc-f7" style={{paddingTop:'10px'}}>
        <div className="container">
          <div className="row">
            {/* <PropertyHeader id={params.id} /> */}
          <div className="col-lg-8">
            <div className="single-property-content mb30-md">
              <h2 className="sp-lg-title">{listings.title}</h2>
              <div className="pd-meta mb15 d-md-flex align-items-center" style={{textAlign:'left'}}>
                <p className="text fz15 mb-0 bdrr1 pr10 bdrrn-sm">
                {listings.location}, {listings.city}
                </p>
                <a
                  className="ff-heading text-thm fz15 bdrr1 pr10 ml0-sm ml10 bdrrn-sm"
                >
                  <i className="fas fa-circle fz10 pe-2" />
                  For {listings.property_status}
                </a>
                <a
                  className="ff-heading bdrr1 fz15 pr10 ml10 ml0-sm bdrrn-sm"
                >
                  <i className="far fa-clock pe-2" />
                  {/* {Number(new Date().getFullYear()) -
                    Number(listings.date)}{" "} */}
                  {listings.date}
                </a>
                {/* <a className="ff-heading ml10 ml0-sm fz15">
                  <i className="flaticon-fullscreen pe-2 align-text-top" />
                  8721
                </a> */}
              </div>
              <div className="property-meta d-flex align-items-center">
                <a className="text fz15">
                  <i className="flaticon-bed pe-2 align-text-top" />
                  {listings.beds} bed
                </a>
                <a className="text ml20 fz15">
                  <i className="flaticon-shower pe-2 align-text-top" />
                  {listings.bathrooms} bath
                </a>
                <a className="text ml20 fz15">
                  <i className="flaticon-expand pe-2 align-text-top" />
                  {listings.area}
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="single-property-content">
              <div className="property-action text-lg-end">
                <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
                <a className="icon mr10" style={{cursor:'pointer'}} onClick={()=>favourite(listings.id)} id={'likeIcon_'+listings.id}>
                    {/* <span className="flaticon-like" /> */}
                    <svg className="m-0 likeIcon" viewBox="0 0 24 24" color="transparent" style={{width: '17px',height: '17px'}}><path className="" fill="transparent" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style={{transform: 'scale(1.5, 1.4)', stroke: 'rgb(120, 118, 118)',strokeWidth: '1.5px',fill: 'transparent'}}></path></svg>
                 </a>
                 <a className="icon mr10" style={{cursor:'pointer'}} title="Compare" onClick={()=>Compare(listings.id)}>
                    <span className="flaticon-new-tab" />
                  </a>
                  {/* <a className="icon mr10">
                    <span className="flaticon-new-tab" />
                  </a> */}
                  {/* <a className="icon mr10">
                    <span className="flaticon-share-1" />
                  </a> */}
                  <a className="icon" style={{cursor:'pointer'}}>
                    <span onClick={()=>printWindow()} className="flaticon-printer" />
                  </a>
                </div>
                <h3 className="price mb-0" style={{width:'50%',float:'left'}}>{listings.price}</h3>
                <a id="contactbtncol" className="text ml20 fz15 ud-btn btn-white2" onClick={()=>contactbtn()} style={{cursor: 'pointer',background: '#3c6afd',color: '#fff',float: 'right',marginTop: '-13px',marginRight: '17px',padding: '7px 8px 7px 0px',border: 'solid 1px #fff'}}><i className="flaticon-user pe-2 align-text-top"></i>View Contact Details</a>
                {/* <p className="text space fz15">
                  $
                  {(
                    Number(listings.price.split("$")[1].split(",").join("")) / data.sqft
                  ).toFixed(2)}
                </p> */}
              </div>
            </div>
          </div>
          </div>
          {/* End .row */}

          <div className="row wrap">
            <div className="col-lg-8">
              {/* <PropertyGallery data={listings.image_gallery} /> */}
              {listings.image_gallery && <div className="row">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="ps-v4-hero-tab">
                      <div
                        className="tab-content overflow-visible"
                        id="pills-tabContent2"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="pills-home"
                          role="tabpanel"
                          aria-labelledby="pills-home-tab"
                        >
                          <div className="container p-0">
                            <div className="row" data-aos="fade-up" data-aos-delay="300">
                              <div className="col-lg-12">
                                <div className="ps-v6-slider nav_none slider-1-grid owl-theme owl-carousel" id="fullimg">
                                  <Swiper
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={{
                                      prevEl: ".prev-btn",
                                      nextEl: ".next-btn",
                                    }}
                                    thumbs={{
                                      swiper:
                                        thumbsSwiper && !thumbsSwiper.destroyed
                                          ? thumbsSwiper
                                          : null,
                                    }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                  >
                                    {listings.image_gallery.map((item, i) => (
                                      <SwiperSlide key={i}>
                                        <img
                                          src={'https://www.nearestate.in/uploads/gallery/'+item}
                                          alt="gallery"
                                          className="w-100 h-auto bdrs12 full-img"
                                        />
                                      </SwiperSlide>
                                    ))}
                                  </Swiper>

                                  {listings.image_gallery.length>1 && <div className="row">
                                    <div className="col-lg-7 col-md-8">
                                      <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={4}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper mt20"
                                      >
                                        {listings.image_gallery.map((item, i) => (
                                          <SwiperSlide key={i}>
                                            <img
                                              src={'https://www.nearestate.in/uploads/gallery/'+item}
                                              alt="image"
                                              className="w-100 bdrs12 cover pointer smallimg"
                                              style={{height:'56px',width:'auto'}}
                                            />
                                          </SwiperSlide>
                                        ))}
                                      </Swiper>
                                    </div>
                                  </div>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End tab-pane */}

                        <div
                          className="tab-pane fade"
                          id="pills-profile"
                          role="tabpanel"
                          aria-labelledby="pills-profile-tab"
                        >
                          {/* <Map /> */}
                        </div>
                        {/* End map type listing */}

                        <div
                          className="tab-pane fade"
                          id="pills-contact"
                          role="tabpanel"
                          aria-labelledby="pills-contact-tab"
                        >
                          <iframe
                            className="h510 w-100"
                            src="https://www.google.com/maps/embed?pb=!4v1553797194458!6m8!1m7!1sR4K_5Z2wRHTk9el8KLTh9Q!2m2!1d36.82551718071267!2d-76.34864590837246!3f305.15097!4f0!5f0.7820865974627469"
                            allowFullScreen
                          />
                        </div>
                        {/* End map locatoin fnder */}
                      </div>
                    </div>
                    {/* End ps-v4-hero-tab content */}
                  </div>
              </div>}     


              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Overview</h4>
                <div className="row">
                  {/* {listings.length>0 && <OverView  data={listings}/>} */}
                  {overviewData.map((item, index) => (
                  <div
                      key={index}
                      className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
                    >
                      <div className="overview-element d-flex align-items-center">
                        <span className={`icon ${item.icon}`} />
                        <div className="ml15">
                          <h6 className="mb-0">{item.label}</h6>
                          <p className="text mb-0 fz15">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Property Description</h4>
                <ProperytyDescriptions data={listings.description} />
                {/* End property description */}

                <h4 className="title fz17 mb30 mt50">Property Details</h4>
                <div className="row">
                {/* {listings.length>0 && <PropertyDetails data={listings}/>} */}
                <div className="row">
                  {columns.map((column, columnIndex) => (
                    <div
                      key={columnIndex}
                      className={`col-md-6 col-xl-4${
                        columnIndex === 1 ? " offset-xl-2" : ""
                      }`}
                    >
                      {column.map((detail, index) => (
                        <div key={index} className="d-flex justify-content-between">
                          <div className="pd-list">
                            <p className="fw600 mb10 ff-heading dark-color">
                              {detail.label}
                            </p>
                          </div>
                          <div className="pd-list">
                            <p className="text mb10">{detail.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30 mt30">Address</h4>
                <div className="row">
                  {/* <PropertyAddress data={listings.address} /> */}
                  <p className="text mb10">{listings.address}</p>
                  <div className="col-md-12">
                  <div id="map" style={{height:"100px"}}></div>
                </div>
                </div>
              </div>
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Features &amp; Amenities</h4>
                <div className="row">
                {featuresAmenitiesData.map((item, rowIndex) => (
                  <div key={rowIndex} className="col-sm-6 col-md-4">
                    <div className="pd-list">
                        <p key={rowIndex} className="text mb10">
                          <i className="fas fa-circle fz6 align-middle pe-2" />
                          {fea_arr[item]}
                        </p>
                    </div>
                  </div>
                ))}
                {/* {listings.length>0 && <PropertyFeaturesAminites data={listings.amenties} />} */}
                </div>
              </div>
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Energy Class</h4>
                <div className="row">
                  <EnergyClass />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {floorPlanData.length>0 && <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Floor Plans</h4>
                <div className="row">
                  <div className="col-md-12">
                    <div className="accordion-style1 style2">
                    <div className="accordion" id="accordionExample">
                        {floorPlanData.map((floorPlan, index) => (
                          <div
                            className={`accordion-item ${index === 0 ? "active" : ""}`}
                            key={index}
                          >
                            <div
                              id={`collapse${index}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              aria-labelledby={`heading${index}`}
                              data-parent="#accordionExample"
                            >
                              <div className="accordion-body text-center">
                                <img
                                
                                  className="w-100 h-100 cover"
                                  src={'https://www.nearestate.in/uploads/floor_plans/'+floorPlan}
                                  alt="Floor Plan"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* <FloorPlans/> */}
                    </div>
                  </div>
                </div>
              </div>}
              {/* End .ps-widget */}

              {listings.video_link && <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                <h4 className="title fz17 mb30">Video</h4>
                <div className="row">
                  {/* <PropertyVideo /> */}
                  <iframe width="100%" style={{height:'350px'}} src={listings.video_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
              </div>}
              {/* End .ps-widget */}

              {listings.durl && <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">360° Virtual Tour</h4>
                <div className="row">
                <div className="col-md-12">
                  <iframe width="100%" id="realviewfrm" height="400px" frameBorder="0" allow="xr-spatial-
    	; gyroscope; accelerometer" allowFullScreen scrolling="no" src={listings.durl}></iframe>
                  </div>
                  {/* <VirtualTour360 /> */}
                </div>
              </div>}

              {listings.moreUnits?.length>0&&<div><h4 className="title fz17 mb30">Other units avaiable in this project</h4>{listings.moreUnits.map((item, rowIndex)=> (<div className="card mb-3" key={rowIndex}>
                <div className="row g-0">
                  <div className="col-md-3" style={{width:'25%'}}>
                  <a  href={item.link} target="_blank" className="realviewinfo"><img src={item.photo} style={{height:'100px',width:'150px'}} className="img-fluid rounded-start" alt="" /></a>
                  </div>
                  <div className="col-md-9" style={{width:'75%'}}>
                    <div className="card-body">
                      <h5 className="card-title"><a target="_blank" href={item.link} className="realviewinfo moreunitstitle">{item.property_title}</a></h5>
                      <p className="card-text"></p>
                      <p className="card-text"><small className="text-muted"><a><span className="flaticon-bed"></span> {item.beds}</a>&nbsp;&nbsp;<a><span className="flaticon-shower"></span> {item.bathrooms}</a>&nbsp;&nbsp;<a><span className="flaticon-expand"></span> {item.area}</a>&nbsp;&nbsp;<a>₹ {item.price}</a></small></p>
                    </div>
                  </div>
                </div>
              </div>))}</div>}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                <div className="row">
                  <PropertyNearby />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Walkscore</h4>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="fw400 mb20">
                      10425 Tabor St Los Angeles CA 90034 USA
                    </h4>
                    <WalkScore />
                  </div>
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Mortgage Calculator</h4>
                <div className="row">
                  <MortgageCalculator />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <PropertyViews />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Home Value</h4>
                <div className="row" >
                  <HomeValueChart />
                </div>
              </div> */}
              {/* End .ps-widget */}

              {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Get More Information</h4>
                <InfoWithForm />
              </div> */}
              {/* End .ps-widget */}

              {reviews.length>0 && <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  {/* <AllComments /> */}
                  {/* <AllReviews  reviews={listings} /> */}
                  <div className="product_single_content mb50">
                    <div className="mbp_pagination_comments">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="total_review d-flex align-items-center justify-content-between mb20">
                            {/* <h6 className="fz17 mb15">
                              <i className="fas fa-star fz12 pe-2" />
                              5.0 · 3 reviews
                            </h6> */}
                            
                          </div>
                        </div>
                        {/* End review filter */}

                        {/* <SingleReview reviews={review} /> */}
                  
                        {reviews.map((review, index) => (
                        <div className="col-md-12" key={index}>
                          <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
                            {review.image &&<div className="single-img mb30-sm"><img className="w90" src={'https://www.nearestate.in/uploads/user_images/'+review.image} alt="agent" /></div>}
                            {!review.image &&<i className="fal fa-user-circle" style={{fontSize:'60px',fontWeight:'bold',color:'#3270FC'}}></i>}
                            <div className="ml20">
                              <h6 className="mt-0 mb-0">{review.reviewname}</h6>
                              <div>
                                <span className="fz14">{review.date_added}</span>
                                <div className="blog-single-review">
                                  <ul className="mb0 ps-0">
                                    {[...Array(parseInt(review.rating))].map((_, i) => (
                                      <li className="list-inline-item me-0" key={i}>
                                        <a>
                                          <i className="fas fa-star review-color2 fz10" />
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* End .d-flex */}
                          <p className="text mt20 mb20">{review.description}</p>
                        </div>
                      ))}
                        {/* End reviews */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
              {/* End .ps-widget */}

              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">Leave A Review</h4>
                <div className="row">
                  <ReviewBoxForm propId={listings.id} />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}

            <div className="col-lg-4" style={{marginTop:'-30px'}}>
              <div className="column">
                {/* <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb5">Schedule a tour</h4>
                  <p className="text">Choose your preferred day</p>
                  <ScheduleTour />
                </div> */}
                {/* End .Schedule a tour */}

                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <div className="widget-wrapper mb-0">
                    <h6 className="title fz17 mb30">Get More Information</h6>
                    {/* <ContactWithAgent /> */}
                    <div className="agent-single d-sm-flex align-items-center pb25">
                      <div className="single-img mb30-sm">
                        {listings.image && <img
                          className="w90"
                          src={listings.image}
                          alt="avatar"
                        />}
                        {!listings.image && <div className="profileImges"><i className="fal fa-user-circle" style={{fontSize: '60px',fontWeight: 'bold',color:'#3270FC'}}></i></div>}
                      </div>
                      <div className="single-contant ml20 ml0-xs">
                        <h6 className="title mb-1">{listings.username}</h6>
                        <div className="agent-meta mb10 d-md-flex align-items-center">
                          <a className="text fz15">
                            <i className="fal fa-mobile"></i>&nbsp;
                            <span id="cont-mobile-col">{listings.mobile}</span>
                          </a>
                        </div>
                        <div className="agent-meta mb10 d-md-flex align-items-center">
                          <a className="text fz15">
                          <i className="fal fa-envelope"></i>&nbsp;
                          <span id="cont-email-col">{listings.email}</span>
                          </a>
                        </div>
                        {/* <Link
                          to="/agent-single/3"
                          className="text-decoration-underline fw600"
                        >
                          View Listings
                        </Link> */}
                      </div>
                    </div>
                    {/* End agent-single */}

                    <div className="d-grid">
                      <Link onClick={()=>contactDetails(listings.id)} id="contactBtn" className="ud-btn btn-white2">
                      View Contact Details
                        <i className="fal fa-arrow-right-long" />
                      </Link>
                    </div>
                    <input type="hidden" id="contactFlag"/><input type="hidden" id="reviewFlag" value="0" /><input type="hidden" name="tourUrl" id="tourUrl" value="0" /><input type="hidden" name="isfulldetails" id="isfulldetails" value="0" />
                    <input type="hidden" id="submitBtn" value="0" /><input type="hidden" id="fav_id" value="0" />
                    <input type="hidden" id="_isRealview" />
                    <input type="hidden" id="realviewPopupflag" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row mt30 align-items-center justify-content-between">
            <div className="col-auto">
              <div className="main-title">
                <h2 className="title">Discover RealView360° Listing</h2>
                {/* <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p> */}
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

          <div className="row">
            <div className="col-lg-12">
              <div className="property-city-slider">
                <NearbySimilarProperty data={flistings} />
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single   */}

      {/* Start Our Footer */}
      {/* <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section> */}
      {/* End Our Footer */}
      {/* <a id="customPopup" style={{display:'none'}} className="login-info d-flex align-items-center hider" data-bs-toggle="modal" data-bs-target="#successModal" role="button" >Modal</a> */}
      {/* <div className="signup-modal">
        <div
          className="modal fade"
          id="successModal"
          tabIndex={-1}
          aria-labelledby="successModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header" style={{padding:'15px'}}>
            <h5 className="modal-title" id="exampleModalToggleLabel">
              Success
            </h5>
          <button
          id="modalClose"
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        </div>
        <div className="modal-body" style={{textAlign:'center'}}>
        <img src="images/check-symbol-4794.png" />
        <span id="customMsg" style={{fontZize: '16px',fontWeight: 'bold',paddingLeft: '5px'}}></span>
        <div><button type="button" onClick={()=>{popClose()}} className="ud-btn btn-thm" style={{padding: '6px 14px'}}>Ok</button></div>
        </div>
        </div>
        </div>
        </div>
      </div> */}
      <span id="logcol" style={{display:'none'}}>xxxx</span>
    </>
  );
};

export default Iframedata;
