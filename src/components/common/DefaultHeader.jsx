import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import { Link,useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const { pathname } = useLocation();
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
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

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
    document.getElementById("logcol").addEventListener("click",function(e){ e.preventDefault(); e.stopImmediatePropagation();
      document.getElementById("_isRealview").value=0;
      if(document.getElementById("realviewPopupflag").value==0){
      document.querySelectorAll(".showrealview").forEach(function(element){
        element.style.display="none"
      });
      document.querySelectorAll(".hideRealview").forEach(function(element){
        element.style.display="";
      });
      }
      document.getElementById("realviewPopupflag").value=0;
    });
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  function logout(){
    document.cookie ='userid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.href="/";
  }
  function popClose(){
    document.getElementById("modalClose").click();
  }
  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${
          navbar ? "sticky slideInDown animated" : ""
        }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" to="/">
                      <img
                        
                        src="/images/header_logo.svg"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" to="/">
                      <img
                       
                        src="/images/header_logo.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

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
                              <div key={index}>
                                <p
                                  className={`fz15 fw400 ff-heading ${
                                    index === 0 ? "mb20" : "mt30"
                                  }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, index) => (
                                  <p key={index}>{item.href!="/login"&&<Link
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
                  <a id="customPopup" className="login-info d-flex align-items-center hider" data-bs-toggle="modal" data-bs-target="#successModal" role="button" >Modal</a>
                  <a id="contactdetailsPopup" className="login-info d-flex align-items-center hider" data-bs-toggle="modal" data-bs-target="#contactDetailsModal" role="button" >Modal</a>
                  <Link
                    className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                    to="/add-property"
                  >
                    Add Property
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                  <a
                    className="sidemenu-btn filter-btn-right"
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
                    <img
                     
                      className="img-2"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
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
      <div className="signup-modal">
        <div
          className="modal fade"
          id="contactDetailsModal"
          tabIndex={-1}
          aria-labelledby="contactModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
          <div className="modal-content">
          <div className="modal-header" style={{backgroundColor:'#3270fc'}}>
            <h5 className="modal-title" style={{color:'#fff'}} id="exampleModalToggleLabel">
              Contact Details 
            </h5>
          <button
          id="modalClose"
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        </div>
        <div className="modal-body" style={{paddingBottom:'0px'}}>
          <div id="propertyOwnerdetails">
          <div className="agent-single d-sm-flex align-items-center pb25">
            <div className="single-contant ml20 ml0-xs">
              <div className="agent-meta mb10 d-md-flex align-items-center"><a className="text fz15"><i style={{fontSize: '28px',fontWeight: 'bold',color: 'rgb(50, 112, 252)'}} className="fal fa-user-circle"></i>&nbsp;<span style={{marginTop: '-1px',position: 'absolute',marginLeft: '10px',fontSize: '16px'}} id="viewcontactName"></span></a></div>
              <div className="agent-meta mb10 d-md-flex align-items-center"><a className="text fz15"><i style={{fontSize: '28px',fontWeight: 'bold',color: 'rgb(50, 112, 252)'}} className="fal fa-phone"></i>&nbsp;<span  style={{marginTop: '-1px',position: 'absolute',marginLeft: '10px',fontSize: '16px'}} id="viewcontactMobile"></span></a></div>
              <div className="agent-meta mb10 d-md-flex align-items-center"><a className="text fz15"><i style={{fontSize: '28px',fontWeight: 'bold',color: 'rgb(50, 112, 252)'}} className="fal fa-envelope"></i>&nbsp;<span style={{marginTop: '-1px',position: 'absolute',marginLeft: '10px',fontSize: '16px'}} id="viewcontactEmail"></span></a></div>
              </div>
              </div>                         
          </div>                 
        </div>
        </div>
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
    </>
  );
};

export default DefaultHeader;
