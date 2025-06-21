import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
//import Pagination from "@/components/property/Pagination";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
//import FilterHeader from "../../../../components/property/dashboard/dashboard-my-properties/FilterHeader";
//import PropertyDataTable from "@/components/property/dashboard/dashboard-my-properties/PropertyDataTable";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";

import MetaData from "@/components/common/MetaData";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from 'react'
import { Tooltip as ReactTooltip } from "react-tooltip";
import axios from "axios";
const metaInformation = {
  title: "Dashboard Properties || nearestate.in",
};

const DashboardMyProperties = () => {
  const [propertyData,setPropertydata]=useState([]);
  const [userId,setUserid]=useState('');
  var selectedid=0;
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
      requestType:'myproperties',
      userid:value[1]
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
      .then(response => { 
        if(response.status==200 && response.data.length>0){
          setPropertydata(response.data);
        }else{
          document.getElementById("noresultsFound").style.display="";
        }
        document.getElementById("loadericon").style.display="none";
      });
    }else{
      location.href="/";
    }
  },[]);
  // const propertyData = [
  //   {
  //     id: 1,
  //     title: "Equestrian  Family Home",
  //     imageSrc: "/images/listings/list-1.jpg",
  //     location: "California City, CA, USA",
  //     price: "$14,000/mo",
  //     datePublished: "December 31, 2022",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     title: "Luxury villa in Rego Park",
  //     imageSrc: "/images/listings/list-2.jpg",
  //     location: "California City, CA, USA",
  //     price: "$14,000/mo",
  //     datePublished: "December 31, 2022",
  //     status: "Published",
  //   },
  //   {
  //     id: 3,
  //     title: "Villa on Hollywood Boulevard",
  //     imageSrc: "/images/listings/list-3.jpg",
  //     location: "California City, CA, USA",
  //     price: "$14,000/mo",
  //     datePublished: "December 31, 2022",
  //     status: "Processing",
  //   },
  //   {
  //     id: 4,
  //     title: "Equestrian Family Home",
  //     imageSrc: "/images/listings/list-4.jpg",
  //     location: "California City, CA, USA",
  //     price: "$14,000/mo",
  //     datePublished: "December 31, 2022",
  //     status: "Pending",
  //   },
  //   {
  //     id: 5,
  //     title: "Luxury villa in Rego Park",
  //     imageSrc: "/images/listings/list-5.jpg",
  //     location: "California City, CA, USA",
  //     price: "$14,000/mo",
  //     datePublished: "December 31, 2022",
  //     status: "Published",
  //   },
  // ];
  
  const getStatusStyle = (status) => {
    switch (status) {
      case "0":
        return "pending-style style1";
      case "1":
        return "pending-style style2";
      case "Processing":
        return "pending-style style3";
      default:
        return "";
    }
  };
  function deleteProperty(propid){
    selectedid=propid;
    document.getElementById("customPopup2").click();
    document.getElementById("customMsg2").innerText="Are you sure want to delete this property?";  
    return false;
  }
  function confirmDelete(){
    if(selectedid>0 && userId){
      let postObj={
        requestType:'deleteproperty',
        userid:userId,
        propertyid:selectedid
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => { 
          console.log(response);
          if(response.status==200 && response.data>0){
            document.getElementById("customPopup").click();
            document.getElementById("customMsg").innerText="Property Deleted Successfully.";
            let prData=propertyData.filter((item)=>{ return item.id!=selectedid; });
            setPropertydata(prData);
          }
      });
    }
  }
  function popClose(){
    document.getElementById("modalClose2").click();
  }
  function openLeadpopup(propertyid){
    document.getElementById("leadsfrm").setAttribute("src","https://www.nearestate.in/admin/leads_table.php?id="+propertyid);
    document.getElementById("leadsPopup").click();
  }
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
            <div className="dashboard__content bgc-f7" style={{padding:'30px 20px 20px',background:'#f7f7f7'}}>
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center pb10">
                <div className="col-xxl-3">
                  <div className="dashboard_title_area">
                    <h2>My Properties</h2>
                    <p className="text">We are glad to see you again!</p>
                  </div>
                </div>
                <div className="col-xxl-9" style={{zIndex:'0',marginTop:'30px'}}>
                  {/* <FilterHeader /> */}
                  <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
                  <div className="item1 mb15-sm">
                    <div className="search_area">
                      <input
                        type="text"
                        className="form-control bdrs12"
                        placeholder="Search"
                        required
                      />
                      <label>
                        <span className="flaticon-search" />
                      </label>
                    </div>
                  </div>
                  {/* End item1 */}

                  <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
                    <div className="pcs_dropdown d-flex align-items-center">
                      <span style={{ minWidth: "50px" }} className="title-color">
                        Sort by:
                      </span>
                      <select className="form-select show-tick">
                        <option>Price Low</option>
                        <option>Price High</option>
                      </select>
                    </div>
                  </div>
                  <Link className="ud-btn btn-thm" to={"/add-property"}>Add New Property
                    <i className="fal fa-arrow-right-long" /></Link>
                </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p300 mb30 overflow-hidden position-relative">
                    <div className="packages_table table-responsive">
                      {/* <PropertyDataTable /> */}
                      <table className="table-style3 table at-savesearch">
                        <thead className="t-head">
                          <tr>
                            <th scope="col">Listing title</th>
                            <th scope="col">Date Published</th>
                            <th scope="col">Status</th>
                            <th scope="col">Leads</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody className="t-body">
                          {propertyData.length>0 && propertyData.map((property) => (
                            <tr key={property.id}>
                              <th scope="row">
                                <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                                  <div className="list-thumb">
                                    <img
                                    
                                      className="w-100"
                                      src={(property.image)?property.image:'images/no_photos.png'}
                                      alt="property"
                                    />
                                  </div>
                                  <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                                    <div className="h6 list-title">
                                      <Link target="_blank" to={`/${property.link}`}>{property.title}</Link>
                                    </div>
                                    <p className="list-text mb-0">{property.address}</p>
                                    <div className="list-price">
                                      <a>{property.price}</a>
                                    </div>
                                  </div>
                                </div>
                              </th>
                              <td className="vam">{property.date_added}</td>
                              <td className="vam">
                                <span className={getStatusStyle(property.status)}>
                                  {(property.status==0)?'Pending':'Published'}
                                </span>
                              </td>
                              <td className="vam"><a onClick={()=>openLeadpopup(property.encryptid)} style={{cursor:"pointer"}}>{property.leads}</a></td>
                              <td className="vam">
                                <div className="d-flex">
                                  <Link type="button"
                                    className="icon"
                                    style={{ border: "none" }}
                                    data-tooltip-id={`edit-${property.encryptid}`}
                                    to={'/edit-property/'+property.encryptid}
                                  >
                                    <span className="fas fa-pen fa" />
                                  </Link>
                                  <button
                                    className="icon"
                                    style={{ border: "none" }}
                                    data-tooltip-id={`delete-${property.encryptid}`}
                                    onClick={()=>deleteProperty(property.encryptid)}
                                  >
                                    <span className="flaticon-bin" />
                                  </button>

                                  <ReactTooltip
                                    id={`edit-${property.id}`}
                                    place="top"
                                    content="Edit"
                                  />
                                  <ReactTooltip
                                    id={`delete-${property.id}`}
                                    place="top"
                                    content="Delete"
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                          {propertyData.length==0&& <tr><td colSpan="5" style={{textAlign:'center'}}><span id="noresultsFound" style={{fontWeight:'bold',display:'none'}}>No Results Found</span></td></tr>}
                        </tbody>
                      </table>
                      <div className="mt30">
                        {/* <Pagination /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      <a id="customPopup2" className="login-info d-flex align-items-center hider" data-bs-toggle="modal" data-bs-target="#warningModal" role="button">Modal</a>
      <div className="signup-modal">
        <div
          className="modal fade"
          id="warningModal"
          tabIndex={-1}
          aria-labelledby="warningModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header" style={{padding:'15px'}}>
            <h5 className="modal-title" id="exampleModalToggleLabel">
              Warning
            </h5>
          <button
          id="modalClose2"
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        </div>
        <div className="modal-body" style={{textAlign:'center',padding:'15px 22px 30px'}}>
        <svg width="22" style={{marginTop:'-7px'}} height="22" fill="#fec901" className="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
        </svg>
        <span id="customMsg2" style={{fontZize: '16px',fontWeight:'bold',paddingLeft:'5px'}}></span>
        <div style={{paddingTop:'10px'}}><button type="button" onClick={()=>{confirmDelete()}} className="ud-btn btn-thm" style={{padding: '6px 14px'}}>Ok</button>&nbsp;&nbsp;<button type="button" onClick={()=>{popClose()}} className="ud-btn btn-thm" style={{padding: '6px 14px'}}>Cancel</button></div>
        </div>
        </div>
        </div>
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyProperties;
