import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyFilteringList from "@/components/listing/list-view/list-v1/PropertyFilteringList";

import React,{useState,useEffect} from "react";

import MetaData from "@/components/common/MetaData";
import {useNavigate,useLocation} from 'react-router-dom';
//import { posts } from "@/data/blogs";
import axios from "axios";

const metaInformation = {
  title: "nearestate.in - Search Results",
};

const ListV1 = () => {
  const [listings, setPosts] = useState([] || null);
  //const navigate = useNavigate();
  const mylocation = useLocation();
  const queryParams = new URLSearchParams(mylocation.search);

  useEffect(() => {
    document.getElementById('autocomplete').value=queryParams.get("location");
    document.getElementById('locality').value=queryParams.get("locality");
    document.getElementById('postal_code').value=queryParams.get("postal_code");
    document.getElementById('sublocality_level_1').value=queryParams.get("sublocation");
    document.getElementById('sublocality_level_2').value=queryParams.get("sublocation2");
    document.getElementById('sublocality_level_3').value=queryParams.get("sublocation3");
    document.getElementById('route').value=queryParams.get("route");
    document.getElementById('administrative_area_level_1').value=queryParams.get("state");
    document.getElementById('country').value=queryParams.get("country");
    document.getElementById('placeid').value=queryParams.get("placeid");
    var re = new RegExp("userid" + "=([^;]+)"); 
    var userId = re.exec(document.cookie);
    var uId=(userId)?userId[1]:'';
    let postObj={
      requestType:'search-results',
      query_Params:{
        location:queryParams.get("location"),
        locality:queryParams.get("locality"),
        postal_code:queryParams.get("postal_code"),
        min_price:queryParams.get("min_price"),
        max_price:queryParams.get("max_price"),
        sublocation:queryParams.get("sublocation"),
        sublocation2:queryParams.get("sublocation2"),
        sublocation3:queryParams.get("sublocation3"),
        route:queryParams.get("route"),
        state:queryParams.get("state"),
        country:queryParams.get("country"),
        property_type:queryParams.get("property_type"),
        transaction_type:queryParams.get("transaction_type"),
        beds:queryParams.get("beds"),
        listedby:queryParams.get("listedby"),
        construction_status:queryParams.get("construction_status"),
        min_area:queryParams.get("min_area"),
        max_area:queryParams.get("max_area"),
        amenities:queryParams.get("amenities"),
        realview:queryParams.get("realview"),
        status:queryParams.get("status"),
        placeid:queryParams.get("placeid"),
        userid:uId,
      }
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
    .then(response => {
      if(response.data.length>0){
        setPosts(response.data);
      }else{
        setPosts([]);
        document.getElementById("noresults").style.display="block";
      }
    })
    .catch(error => {
      console.error(error);
    });
  },[queryParams.get("location"),queryParams.get("min_price"),queryParams.get("max_price"),queryParams.get("property_type"),queryParams.get("beds"),queryParams.get("transaction_type"),queryParams.get("beds"),queryParams.get("listedby"),queryParams.get("construction_status"),queryParams.get("amenities"),queryParams.get("min_area"),queryParams.get("max_area"),queryParams.get("realview"),queryParams.get("status"),queryParams.get("placeid")]);
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      { <section className="breadcumb-section bgc-f7"  style={{padding:'10px 0'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                {/* <h2 className="title">List View</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">For Rent</a>
                </div> */}
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>}
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <PropertyFilteringList data={listings}/>
     
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* <form name="searchFrm" action="https://www.nearestate.in/map_view" method="get"><input type="hidden" name="location" id="location" /><input type="hidden" name="type" id="type" /><input type="hidden" name="min-price" id="minprce" /><input type="hidden" name="max-price" id="maxprce" /><input type="hidden" id="street_number" name="street_name" /> <input type="hidden" id="sublocality_level_1" name="sublocation" /> <input type="hidden" id="sublocality_level_2" name="sublocation2" /> <input type="hidden" id="sublocality_level_3" name="sublocation3" /> <input type="hidden" id="route" name="route"/> <input type="hidden" id="locality" name="locality"/> <input type="hidden" id="postal_code" name="postal_code"/> <input type="hidden" id="administrative_area_level_1" name="state"/> <input type="hidden" id="country" name="country"/><input type="hidden" id="prop_type" value={1} /></form> */}
      {/* End Our Footer */}
    </>
  );
};

export default ListV1;
