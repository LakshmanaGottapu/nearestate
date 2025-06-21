//import listings from "@/data/listings";
import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
//import TopFilterBar from "./TopFilterBar";
//import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
//import Listing7 from "../all-list-style/Listing7";
import axios from "axios";
import { Link } from "react-router-dom";
//import { Item } from "react-photoswipe-gallery";
import {useNavigate,useLocation} from 'react-router-dom';

export default function PropertyFilteringList({data}) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");

  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const [pageData,setPagedata]=useState([]);
  const mylocation = useLocation();
  const queryParams = new URLSearchParams(mylocation.search);
  useEffect(() => {
    setPageItems(sortedFilteredData
      .slice((pageNumber - 1) * 4, pageNumber * 4))
      setPageContentTrac([((pageNumber - 1) * 4) + 1 ,pageNumber * 4,sortedFilteredData.length])
  }, [pageNumber,sortedFilteredData])

  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathroms, setBathroms] = useState(0);
  const [location, setLocation] = useState("All Cities");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
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
  useEffect(()=>{
    setPageNumber(1);
  },[queryParams.get("location"),queryParams.get("min_price"),queryParams.get("max_price"),queryParams.get("property_type"),queryParams.get("beds"),queryParams.get("transaction_type"),queryParams.get("beds"),queryParams.get("listedby"),queryParams.get("construction_status"),queryParams.get("amenities"),queryParams.get("min_area"),queryParams.get("max_area"),queryParams.get("realview"),queryParams.get("status"),queryParams.get("placeid")]);
  const isMobile = width <= 768;
  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathroms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, 2050]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathroms(elm);
  };
  const handlelocation = (elm) => {
    console.log(elm);
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const filterFunctions = {
    handlelistingStatus,
    handlepropertyTypes,
    handlepriceRange,
    handlebedrooms,
    handlebathroms,
    handlelocation,
    handlesquirefeet,
    handleyearBuild,
    handlecategories,
    priceRange,
    listingStatus,
    propertyTypes,
    resetFilter,

    bedrooms,
    bathroms,
    location,
    squirefeet,
    yearBuild,
    categories,
    setPropertyTypes,
    setSearchQuery,
  };
  var prlenth=0;
  if(data){
     prlenth=data.length;
  } 
  var pagenum=(pageNumber * 8) > data.length ? data.length :(pageNumber * 8);
  var pagestart =((pageNumber - 1) * 8);
  var pageData2=data.slice(pagestart,pagenum);
  useEffect(() => {
    setPagedata(pageData2);
    if(data.length>0){
      document.getElementById("noresults").style.display="none";
    }else{}
  },[data,pageNumber]);
 
  function createMarkup(text) { return {__html: htmlContent}; };
  function sortby(){
    let sortby=document.getElementById("sortBy").value;
    if(sortby==0){
      data=data.sort((a,b)=>{ return parseInt(b.id)-parseInt(a.id) });
    }
    if(sortby==1){
      data=data.sort((a,b)=>{ return parseInt(a.price_raw)-parseInt(b.price_raw) });
    }
    if(sortby==2){
      data=data.sort((a,b)=>{ return parseInt(b.price_raw)-parseInt(a.price_raw) });
    }
    
    setPageNumber(1);
    pagenum=(pageNumber * 8) > data.length ? data.length :(pageNumber * 8);
    pagestart =((pageNumber - 1) * 8);
    let pageData2=data.slice(pagestart,pagenum);
    setPagedata(pageData2);
   }
   function listview(){
    navigate(`/map-view?${window.location.href.split("?")[1]}`);
   }
   function favourite(id){
    let _login=document.getElementById("logcol").innerText;
    if(_login.includes("Login")){
      document.getElementById("fav_id").value=id;
      document.getElementById("loginBtn").click();return false;
    }else{
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      if(userId){
        var favTypeId=(document.getElementById("likeIcon_"+id).classList.contains('liked'))?0:1;
        var postObj={
            userid:userId[1],
            propertyid:id,
            requestType:'favourite',
            favouriteType:favTypeId
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
          .then(response => {
            console.log(response);
            if(response.status=="200"){
              document.getElementById("customPopup").click();
              let word=(favTypeId==1)?'Added':'Updated'
              document.getElementById("customMsg").innerText="Favourite "+word+" Successfully.";
              if(document.getElementById("likeIcon_"+id).classList.contains('liked')){
                document.getElementById("likeIcon_"+id).classList.remove("liked");
                document.getElementById("likeIcon_"+id).innerHTML='<svg class="m-0 likeIcon" viewBox="0 0 24 24" color="transparent" style="width: 17px; height: 17px; margin: 2px;"><path class="" fill="transparent" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style="transform: scale(1.5, 1.4); stroke: rgb(120, 118, 118); stroke-width: 1.5px; fill: transparent;"></path></svg>';
              }else{
              document.getElementById("likeIcon_"+id).classList.add("liked");
              document.getElementById("likeIcon_"+id).innerHTML='<svg class="m-0 likeIcon" viewBox="0 0 24 24" color="#fd3752" style="width: 18px; height: 18px; margin: 2px;"><path class="" fill="#fd3752" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style="transform: scale(1.5, 1.4);"></path></svg>';
              }
            }
          })
          .catch(error => {
            console.error(error);
          }); 
      }
    }
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
    document.getElementById("customPopup").click();
    document.getElementById("customMsg").innerHTML="Property added to Compare Successfully<br/>Add two are more properties and go to compare page and compare your desired properties";
  }
  function contactDetails(propertyId){
    document.getElementById("contactDetailsflag").value=propertyId;
    let _login=document.getElementById("logcol");
    if(_login.innerText.includes("Login")){
      document.getElementById("loginBtn").click();
    }else{
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      if(userId){
        var postObj={
            userid:userId[1],
            propertyid:propertyId,
            requestType:'viewContact'
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
          .then(response => {
            console.log(response);
            if(response.status=="200"){
              document.getElementById("contactdetailsPopup").click();
              var contactData=response.data;
              document.getElementById("viewcontactName").textContent=contactData?.username;
              document.getElementById("viewcontactMobile").textContent=contactData?.mobile;
              document.getElementById("viewcontactEmail").textContent=(contactData?.email)?contactData?.email:'Not Available';
            }
          })
          .catch(error => {
            console.error(error);
          }); 
      }
    }
  }
  function realviewOpen(id,encryptid){
    //var _url="https://nearestate.in/3d_tour?id="+id+"#apartment-360-views";
    var _url="https://www.nearestate.in/realview/"+encryptid;
    let _login=document.getElementById("logcol").innerText;
      if(_login.includes("Login")){
        document.querySelectorAll(".showrealview").forEach(function(element){
          element.style.display="block"
        });
        document.querySelectorAll(".hideRealview").forEach(function(element){
          element.style.display="none" 
        });
        document.getElementById("realviewPopupflag").value=1;
        document.getElementById("tourUrl").value=_url;
        document.getElementById("loginBtn").click();
        document.getElementById("_isRealview").value=1;return false;
      }else{
        var re = new RegExp("userid" + "=([^;]+)"); 
        var userId = re.exec(document.cookie);
        if(userId){
          openInNewTab(_url);
        }
      }
  }
  function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      rel: 'noopener noreferrer',
      href: href,
    }).click();
  }
  return (
    <>
      {pageData.length>0 && <h4 className="mb-1" id="list_title" style={{textAlign:'left',paddingLeft:'12%'}}>{pageData[0].city} properties for {pageData[0].property_status}</h4>}
      <section className="pt0 pb90 bgc-f7" style={{background:'#F7F7F8'}}>
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-4 d-none d-lg-block" style={{paddingTop:'22px'}}>
              {!isMobile &&<ListingSidebar />}
            </div>
            {/* End .col-lg-4 */}

            {/* start mobile filter sidebar */}
            <div
                className="offcanvas offcanvas-start p-0"
              tabIndex="-1"
              id="listingSidebarFilter"
              aria-labelledby="listingSidebarFilterLabel"
            >
              <div   className="offcanvas-header">
                <h5   className="offcanvas-title" id="listingSidebarFilterLabel">
                  More Filters
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  id="closebtn"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body p-0">
                {isMobile &&<ListingSidebar/>}
              </div>
            </div>
            {/* End mobile filter sidebar */}

            <div className="col-lg-8" style={{height:(prlenth>0)?'auto':'30vh'}}>
              {/* <div className="row align-items-center mb20">
                <TopFilterBar
                  pageContentTrac={pageContentTrac}
                  colstyle={colstyle}
                  setColstyle={setColstyle}
                  setCurrentSortingOption={setCurrentSortingOption}
                />
              </div> */}
              {/* End TopFilterBar */}

              <div className="row mt15">
                {/* <Listing7 colstyle={colstyle} /> */}
                {prlenth>0 &&<div className="row align-items-center mb20"><div className="col-sm-6"><div className="text-center text-sm-start"><p className="pagination_page_count mb-0">Showing 1–{(prlenth)>8?8:prlenth} of {prlenth} results</p></div></div><div className="col-sm-6"><div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end"><div className="pcs_dropdown pr10 d-flex align-items-center"><span style={{ minWidth: "60px" }}>Sort by</span><select className="form-select" id="sortBy" onChange={()=>{sortby()}}><option value={""}>Select</option><option value={1}>Price Low</option><option value={2}>Price High</option></select></div><div className={`pl15 d-md-block cursor`} onClick={()=>listview()}><i className="far fa-map-marker"></i> Map View</div></div></div></div>}
                
                {prlenth>0 &&<div style={{position:'relative',background:'#fff'}}><img src="https://www.nearestate.in/images/favicongif.gif" style={{position:'absolute',top:'0',left:'0',right:'0',bottom:'0',margin:'auto',marginTop:'11%'}} width="100" /></div>}
                {pageData.map((listing) => (
                  <div className="col-lg-12" key={listing.id}>
                    <div className="listing-style1 listing-type">
                    {listing.D_url && <div className="list-thumb" style={{overflow:'unset'}}>
                        <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}} title="Full Details">
                        <img
                          className="w-100 h-100 cover listimg"
                          src={listing.photo}
                          alt="listings"
                        />
                        <div className="sale-sticker-wrap tourimg">
                            <img src="../images/real-View-360_new.png" id="ifrmimg" style={{height:"116px",cursor:"pointer"}} />
                        </div>
                        <div className="list-price">
                          {listing.price}
                        </div>
                      </a></div>}
                      {!listing.D_url && <div className="list-thumb" style={{overflow:'unset'}}>
                      <Link to={listing.link} title="Full Details" target="_blank">
                        <img
                          className="w-100 h-100 cover listimg"
                          src={listing.photo}
                          alt="listings"
                        />
                        <div className="list-price">
                          {listing.price}
                        </div>
                      </Link></div>}
                      <div className="list-content">
                        <h6 className="list-title">
                        {!listing.D_url && <Link to={listing.link} target="_blank">{listing.property_title}</Link>}
                        {listing.D_url && <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}}>{listing.property_title}</a>}
                        </h6>
                        <p className="list-text">{listing.location}</p>
                        <div className="list-meta d-flex align-items-center">
                          <a>
                            <span className="flaticon-bed" /> {listing.beds} bed
                          </a>
                          <a>
                            <span className="flaticon-shower" /> {listing.bathrooms} bath
                          </a>
                          <a>
                            <span className="flaticon-expand" /> {listing.area}
                          </a>
                        </div>
                        <p className="list-text2" dangerouslySetInnerHTML={{ __html: listing.myDescription }} >
                        </p>
                        <hr className="mt-2 mb-2" />
                        <div className="list-meta2 d-flex justify-content-between align-items-center">
                        <span className="for-what">
                          <button className="w-full btn btn-primary btn-md" id={'getOwnerDetails_'+listing.id} onClick={()=>{contactDetails(listing.id)}} type="button" style={{fontSize: '12px',color: '#fff',fontWeight: '600'}}>Contact Info</button>
                        </span>
                          <div className="icons d-flex align-items-center">
                          {!listing.D_url && <Link to={listing.link} title="Full Details" target="_blank">
                            <span className="flaticon-fullscreen" />
                          </Link>}
                          {listing.D_url && <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}} title="Full Details">
                            <span className="flaticon-fullscreen" />
                          </a>}
                            <a style={{cursor:'pointer'}} title="Compare" onClick={()=>Compare(listing.id)}>
                              <span className="flaticon-new-tab" />
                            </a>
                            {!listing.favid && <a style={{cursor:'pointer'}} onClick={()=>favourite(listing.id)} id={'likeIcon_'+listing.id}>
                            {/* <span className="flaticon-like" /> */}
                            <svg className="m-0 likeIcon" viewBox="0 0 24 24" color="transparent" style={{width: '17px',height: '17px'}}><path className="" fill="transparent" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style={{transform: 'scale(1.5, 1.4)', stroke: 'rgb(120, 118, 118)',strokeWidth: '1.5px',fill: 'transparent'}}></path></svg>
                          </a>}
                          {listing.favid && <a style={{cursor:'pointer'}} className="liked" onClick={()=>favourite(listing.id)} id={'likeIcon_'+listing.id}>
                            {/* <span className="flaticon-like" /> */}
                            <svg className="m-0 likeIcon" viewBox="0 0 24 24" color="#fd3752" style={{width: '18px',height: '18px'}}><path fill="#fd3752" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style={{transform: 'scale(1.5, 1.4)'}}></path></svg>
                          </a>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input type='hidden' id='contactDetailsflag' />
                    <input type="hidden" id="realViewprop" />
                    <input type="hidden" id="submitBtn" />
                    <input type="hidden" id="fav_id" />
                    <input type="hidden" id="contactFlag" />
                    <input type="hidden" id="contactFlag"/><input type="hidden" id="reviewFlag" value="0" /><input type="hidden" name="tourUrl" id="tourUrl" value="0" /><input type="hidden" name="isfulldetails" id="isfulldetails" value="0" /><input type="hidden" id="isreview" /><input type="hidden" id="loginPopup"  value={1}/><input type="hidden" id="realviewPopupflag"  value={0}/><input type="hidden" id="_isRealview" value={0} />
                  </div>
                ))}
                {pageData.length>0 && <div className="row text-center">
                <PaginationTwo pageCapacity={8} data={data} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
                </div>}
                {/* <div id="noresults" className="noresults" style={{display:'none',top:'25%',left:'66%'}}><img src="/images/resource/no-data.jpg" /></div> */}
                <div id="noresults" style={{display:'none',top:'25%',left:'66%'}} className="noresults alert alert-warning">No Results Found For Your Search Criteria</div>
              </div>
              {/* End .row */}

              {/* <div className="row">
                <PaginationTwo
                  pageCapacity={6}
                  data={listings}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              </div> */}
              {/* End .row */}
            </div>
            {/* End .col-lg-8 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
    </>
  );
}
