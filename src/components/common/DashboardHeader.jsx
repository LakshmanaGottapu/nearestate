import MainMenu from "@/components/common/MainMenu";
//import Header from "../home/home-v6/Header";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import { Link,useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardHeader = () => {
  const { pathname } = useLocation()
  const [userId,setUserid]=useState();
  const [loginUsername,setName]=useState();
  const menuItems = [
    {
      title: "MAIN",
      items: [
        {
          icon: "flaticon-discovery",
          text: "Dashboard",
          href: "/dashboard-home",
        },
        {
          icon: "flaticon-chat-1",
          text: "Message",
          href: "/dashboard-message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          icon: "flaticon-new-tab",
          text: "Add New Property",
          href: "/add-property",
        },
        {
          icon: "flaticon-home",
          text: "My Properties",
          href: "/dashboard-my-properties",
        },
        {
          icon: "flaticon-like",
          text: "My Favorites",
          href: "/dashboard-my-favourites",
        },
        {
          icon: "flaticon-search-2",
          text: "Saved Search",
          href: "/dashboard-saved-search",
        },
        { icon: "flaticon-review", text: "Reviews", href: "/dashboard-reviews" },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          icon: "flaticon-protection",
          text: "My Package",
          href: "/dashboard-my-package",
        },
        {
          icon: "flaticon-user",
          text: "My Profile",
          href: "/dashboard-my-profile",
        },
        { icon: "flaticon-exit", text: "Logout", href: "/login" },
      ],
    },
  ];
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
            var re2 = new RegExp("username" + "=([^;]+)"); 
            var loginVal = re2.exec(document.cookie);
            if(loginVal){
              setName(loginVal[1]);
            }
          }else{
            document.getElementById("logcol").style.display="block";
          }
        });
    }else{
      document.getElementById("logcol").style.display="block";
    }
    // window.addEventListener("scroll", changeBackground);
    // return () => {
    //   window.removeEventListener("scroll", changeBackground);
    // };
  }, []);
  function logout(){
    document.cookie ='userid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.href="/";
  }
  function popClose(){
    document.getElementById("realviewfrm").setAttribute("src","https://www.nearestate.in/3d_tour.php?id="+params?.id+"#apartment-360-views");
    document.getElementById("modalClose").click();
  }
  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" to="/">
                      <img
                       
                        src="/images/header_logo.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <a
                    className="dashboard_sidebar_toggle_icon text-thm1 vam"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <img
                     
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}
              <div className="col-auto">
                <div className="d-flex align-items-center">
                {userId && <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    <li className=" user_setting">
                    <div className="dropdown">
                        <a  className="login-info d-flex align-items-center" href="#" data-bs-toggle="dropdown">
                          <i className="far fa-user-circle fz16 me-2" />{" "} <span id="logcol" className="d-none d-xl-block">{loginUsername}</span>
                        </a>
                        <div className="dropdown-menu" id="dropMenu">
                          <div className="user_setting_content">
                            {menuItems.map((section, index) => (
                              <div  key={index}>
                                <p 
                                  className={`fz15 fw400 ff-heading ${
                                    index === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, index) => (
                                  <p  key={index}>{item.href!="/login"&&<Link
                                    
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    to={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>}{item.href=="/login"&&<a
                                   
                                    className={`dropdown-item ${
                                      pathname == item.href ? "-is-active" : ""
                                    } `}
                                    style={{cursor:'pointer'}}
                                    onClick={()=>logout()}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </a>}</p>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>}
                  {!userId &&<span style={{display:'none'}} id="logcol"><a
                    href="#"
                    className="login-info d-flex align-items-center"
                    data-bs-toggle="modal"
                    data-bs-target="#loginSignupModal"
                    role="button"
                  >
                    <i className="far fa-user-circle fz16 me-2" />{" "}
                    <span className="d-none d-xl-block" id="loginBtn">Login / Register</span>
                  </a></span>}
                </div>
              </div>
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">
                    {/* <li className="d-none d-sm-block">
                      <Link className="text-center mr15" to="/login">
                        <span className="flaticon-email" />
                      </Link>
                    </li> */}
                    {/* End email box */}

                    {/* <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="#">
                        <span className="flaticon-bell" />
                      </a>
                    </li> */}
                    {/* End notification icon */}

                   
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* DesktopSidebarMenu */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
      <a id="leadsPopup" className="login-info d-flex align-items-center hider" data-bs-toggle="modal" data-bs-target="#leadsModal" role="button" >Modal</a>
      <div className="signup-modal">
        <div
          className="modal fade"
          id="leadsModal"
          tabIndex={-1}
          aria-labelledby="leadsModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered" style={{maxWidth:'56%'}}>
          <div className="modal-content">
          <div className="modal-header" style={{padding:'15px'}}>
            <h5 className="modal-title" id="exampleModalToggleLabel">
              Property Leads
            </h5>
          <button
          id="modalClose"
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        </div>
        <div className="modal-body">
        <iframe width="100%" id="leadsfrm" style={{height:'80vh','overflow':'hidden'}} frameBorder="0" allow="xr-spatial-
    	; gyroscope; accelerometer" allowFullScreen scrolling="no" src=""></iframe>         
        </div>
        </div>
        </div>
        </div>
      </div>
      <a id="customPopup" className="login-info d-flex align-items-center hider" data-bs-toggle="modal" data-bs-target="#successModal" role="button" >Modal</a>
      <div className="signup-modal">
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
        <img src="https://www.nearestate.in/images/check-symbol-4794.png" />
        <span id="customMsg" style={{fontZize: '16px',fontWeight: 'bold',paddingLeft: '5px'}}></span>
        <div><button type="button" onClick={()=>{popClose()}} className="ud-btn btn-thm" style={{padding: '6px 14px'}}>Ok</button></div>
        </div>
        </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
