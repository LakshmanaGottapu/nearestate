
import { Link } from "react-router-dom";
import {useLocation } from "react-router-dom";
//import ContactInfo from "./ContactInfo";
//import Social from "./Social";
//import ProSidebarContent from "./ProSidebarContent";
import React, { useEffect, useState } from "react";
import axios from "axios";
const MobileMenu = () => {
  const { pathname } = useLocation()
  const [topMenu, setTopMenu] = useState("");
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
          }
        });
    }
    document.getElementById("logcol2").addEventListener("click",function(e){ e.preventDefault(); e.stopImmediatePropagation();
      document.getElementById("_isRealview").value=0;
      if(document.getElementById("realviewPopupflag").value==0){
      document.querySelectorAll(".showrealview").forEach(function(element){
        element.style.display="none";
      });
      document.querySelectorAll(".hideRealview").forEach(function(element){
        element.style.display="";
      });
      }
      document.getElementById("realviewPopupflag").value=0;
    });
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
    document.getElementById("modalClose").click();
  }
  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <img
                 
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </a>
              <Link className="mobile_logo" to="/">
                <img
                  src="/images/header_logo.svg"
                  alt="logo"
                />
              </Link>
              <a></a>
              {!userId &&<span id="logcol3"><a
                href="#"
                className="mobile_logo"
                data-bs-toggle="modal"
                data-bs-target="#loginSignupModal"
                role="button"
              >
                <span className="icon fz18 far fa-user-circle" />
              </a></span>}
              {userId &&<ul className="mb0 d-flex justify-content-sm-end p-0">
                <li className=" user_setting">
                <div className="dropdown">
                    <a  className="login-info d-flex align-items-center" href="#" data-bs-toggle="dropdown">
                    <span className="icon fz18 far fa-user-circle" />
                    </a>
                    <div className="dropdown-menu" id="dropMenu3">
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
                              </Link>}{item.href=="/login"&&<a style={{cursor:'pointer'}}
                                className={`dropdown-item ${
                                  pathname == item.href ? "-is-active" : ""
                                } `}
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
            </div>
          </div>
        </div>
      </div>
      {/* /.mobile-menu meta */}

      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span className="far fa-times"></span>
            </div>
            {/* <h4 className="title"></h4> */}
          </div>
          {/* End header */}

          <div className="hsidebar-content ">
            <div className="hiddenbar_navbar_content">
              <aside data-testid="ps-sidebar-root-test-id" width="100%" className="ps-sidebar-root my-custom-class css-np5i73">
                  <div data-testid="ps-sidebar-container-test-id" className="ps-sidebar-container css-1mb249p">
                      <nav className="ps-menu-root css-vj11vy">
                          <ul className="css-ewdv3l" style={{padding:'0',margin:'0'}}>
                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'40px'}}>
                                <Link className={(pathname=='/home' || pathname=='/')?'menuActive ps-menu-button':'ps-menu-button'}  to="/">
                                    <span className="ps-menu-label css-12w9als">Home</span>
                                </Link>
                              </li>
                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'40px'}}>
                                <Link className={(pathname=='/about')?'menuActive ps-menu-button':'ps-menu-button'}  to="/about">
                                    <span className="ps-menu-label css-12w9als">About us</span>
                                </Link>
                              </li>
                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'40px'}}>
                                <Link className={(pathname=='/compare')?'menuActive ps-menu-button':'ps-menu-button'}  to="/compare">
                                    <span className="ps-menu-label css-12w9als">Compare</span>
                                </Link>
                              </li>
                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'40px'}}>
                                <Link className={(pathname=='/blog')?'menuActive ps-menu-button':'ps-menu-button'}  to="/blog">
                                    <span className="ps-menu-label css-12w9als">Blog</span>
                                </Link>
                              </li>
                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'40px'}}>
                                <Link className={(pathname=='/contact')?'menuActive ps-menu-button':'ps-menu-button'}  to="/contact">
                                    <span className="ps-menu-label css-12w9als">Contact us</span>
                                </Link>
                              </li>
                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'60px',paddingLeft:'16px'}}>
                              <Link className="ud-btn add-property menu-btn bdrs12 mx-2 mx-xl-4"
                                  to="/add-property"
                                >Add Property <i className="fal fa-arrow-right-long" />
                                </Link>
                              </li>


                              <li className="ps-menuitem-root ps-submenu-root css-16jesut" style={{height:'40px',paddingLeft:'24px'}}>
                              {userId &&<ul className="mb0 d-flex justify-content-sm-end p-0">
                                  <li className=" user_setting">
                                  <div className="dropdown">
                                      <a  className="login-info d-flex align-items-center" href="#" data-bs-toggle="dropdown">
                                        <i className="far fa-user-circle fz16 me-2" />{" "} <span id="logcol2" className="d-xl-block">{loginUsername}</span>
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
                                {!userId &&<span className="log_col" id="logcol"><a
                                  href="#"
                                  id="logcol2"
                                  className="login-info d-flex align-items-center"
                                  data-bs-toggle="modal"
                                  data-bs-target="#loginSignupModal"
                                  role="button"
                                >
                                  <i className="far fa-user-circle fz16 me-2" />{" "}
                                  <span className="d-xl-block" id="loginBtn">Login / Register</span>
                                </a></span>}
                                </li>
                          </ul>
                      </nav>
                  </div>
              </aside>
              {/* <ProSidebarContent /> */}
              {/* End .hiddenbar_navbar_menu */}

              {/* <div className="hiddenbar_footer position-relative bdrt1">
                <div className="row pt45 pb30 pl30">
                  <ContactInfo />
                </div>
                

                <div className="row pt30 pb30 bdrt1">
                  <div className="col-auto">
                    <div className="social-style-sidebar d-flex align-items-center pl30">
                      <h6 className="me-4 mb-0">Follow us</h6>
                      <Social />
                    </div>
                  </div>
                </div>
              </div> */}
              {/* hiddenbar_footer */}
            </div>
          </div>
          {/* End hsidebar-content */}
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
      <input type="hidden" className="searchbar" />
    </div>
  );
};

export default MobileMenu;
