import React,{useState,useEffect} from "react";
import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import AddPropertyTabContent from "@/components/property/dashboard/dashboard-add-property";
import MetaData from "@/components/common/MetaData";
import {useParams} from 'react-router-dom';
import axios from "axios";
//import axios from "axios";
const metaInformation = {
  title: "nearestate - add property",
};


const DashboardAddProperty = () => {
  const params = useParams();
  const [userId,setUserid]=useState();
  //const [editId,setEditid]=useState(0);
  //const [propertyData,setPropertydata]=useState([]);
  useEffect(() => {
    // if(params?.id){
    //   setEditid(params?.id);
    //   var re = new RegExp("userid" + "=([^;]+)"); 
    //   var value = re.exec(document.cookie);
    //   if(value){
    //     let postObj={
    //       requestType:'propertyInfo',
    //       userid:value[1],
    //       propertyid:params?.id
    //     }
    //     axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
    //       .then(response => {
    //       if(response.status==200 && response.data){
    //         setPropertydata(response.data);
    //       }
    //     });
    //   }else{
    //     location.href="/";
    //   }
    // }
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
  }, []);
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
        <div className="dashboard dashboard_wrapper pr30 pr0-md">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md" style={{paddingLeft:(userId)?'300px':'0px'}}>
            <div className="dashboard__content property-page bgc-f7">
              <div className="row pb401 d-block d-lg-none">
                <div className="col-lg-12">
                  {userId && <DboardMobileNavigation />}
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}

              <div className="row align-items-center" style={{paddingBottom:'0px'}}>
                <div className="col-lg-12">
                  <div className="dashboard_title_area" style={{paddingLeft:'15px'}}>
                    <h4>Add New Property</h4>
                    {/* <p className="text">We are glad to see you again!</p> */}
                  </div>
                </div>
              </div>
              {/* End .row */}

              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt301 mb30 overflow-hidden position-relative">
                    <div className="navtab-style1">
                      <AddPropertyTabContent />
                    </div>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardAddProperty;
