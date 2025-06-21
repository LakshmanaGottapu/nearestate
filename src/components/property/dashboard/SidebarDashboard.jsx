
import { Link } from "react-router-dom";
import React,{useState,useEffect} from "react";
import {useLocation } from "react-router-dom";
import axios from "axios";
const SidebarDashboard = () => {
  const { pathname } = useLocation()
  const [userId,setUserid]=useState();
  const sidebarItems = [
    {
      title: "MAIN",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
        {
          href: "/dashboard-message",
          icon: "flaticon-chat-1",
          text: "Message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          href: "/add-property",
          icon: "flaticon-new-tab",
          text: "Add New Property",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "My Properties",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "My Favorites",
        },
        {
          href: "/dashboard-saved-search",
          icon: "flaticon-search-2",
          text: "Saved Search",
        },
        {
          href: "/dashboard-reviews",
          icon: "flaticon-review",
          text: "Reviews",
        },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          href: "/dashboard-my-package",
          icon: "flaticon-protection",
          text: "My Package",
        },
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "My Profile",
        },
        {
          href: "/login",
          icon: "flaticon-logout",
          text: "Logout",
        },
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
            // var re2 = new RegExp("username" + "=([^;]+)"); 
            // var loginVal = re2.exec(document.cookie);
            // if(loginVal){
            //   setName(loginVal[1]);
            // }
          }
        });
    }
    // window.addEventListener("scroll", changeBackground);
    // return () => {
    //   window.removeEventListener("scroll", changeBackground);
    // };
  }, []);
  return (
    <div className={`dashboard__sidebar  d-none d-lg-block ${(userId)?'':'hideClass'}`} style={{display:(userId)?'block':'none'}}>
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}
            >
              {section.title}
            </p>

            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">{item.href!="/login"&&<Link
                key={itemIndex}
                className={`dropdown-item ${
                  pathname == item.href ? "-is-active" : ""
                } `}
                to={item.href}
              >
                <i className={`${item.icon} mr10`} />
                {item.text}
              </Link>}{item.href=="/login"&&<a
                key={itemIndex}
                className={`dropdown-item ${
                  pathname == item.href ? "-is-active" : ""
                } `}
                style={{cursor:'pointer'}}
                onClick={()=>logout()}
              >
                <i className={`${item.icon} mr10`} />
                {item.text}
              </a>}</div>
            ))}    
            {/* {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  to={item.href}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
