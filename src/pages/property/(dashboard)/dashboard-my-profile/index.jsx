import DashboardHeader from "@/components/common/DashboardHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
//import ChangePasswordForm from "@/components/property/dashboard/dashboard-profile/ChangePasswordForm";
//import PersonalInfo from "@/components/property/dashboard/dashboard-profile/PersonalInfo";
//import ProfileBox from "@/components/property/dashboard/dashboard-profile/ProfileBox";
//import SocialField from "@/components/property/dashboard/dashboard-profile/SocialField";
import MetaData from "@/components/common/MetaData";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState,useEffect } from 'react';
import axios from "axios";
const metaInformation = {
  title: "Dashboard My Profile || nearestate.in",
};
const DashboardMyProfile = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedfile, setUploadedFile] = useState(null);
  const [propertyData,setPropertydata]=useState([]);
  const [userId,setUserid]=useState('');
  const handleUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file && (file.type=="image/jpeg" || file.type=="image/jpg" || file.type=="image/png")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("profileimage").setAttribute("src",e.target.result);
        setUploadedImage(e.target.result);
        setUploadedFile(file.name);
      };
      reader.readAsDataURL(file);
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
          }
        });
    }
    if(value){
    //setUserid(value[1]);
    let postObj={
      requestType:'myProfile',
      userid:value[1]
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
      .then(response => { console.log(response);
        //document.getElementById("loadericon").style.display='none';
        //document.getElementById("loaderimg").style.display='none';
        if(response.status==200 && response.data){
          setPropertydata(response.data);
          document.getElementById("userName").value=response.data.username;
          document.getElementById("emailid").value=response.data.email;
          document.getElementById("phone").value=response.data.phone;
          document.getElementById("firstName").value=response.data.first_name;
          document.getElementById("lastName").value=response.data.last_name;
          document.getElementById("about_me").value=response.data.about_me;
        }else{
         // document.getElementById("noresults").style.display="block";
        }
      });
    }else{
      location.href="/";
    }
    document.querySelectorAll(".required").forEach(function(element){
      element.addEventListener("input",function(e){
        let _id=element.getAttribute("id");
        if(element.value==""){
          document.getElementById(_id+"_error").style.display="block";
        }else{
          document.getElementById(_id+"_error").style.display="none";
        }
      });
    });
    document.querySelectorAll(".required2").forEach(function(element){
      element.addEventListener("input",function(e){
        let _id=element.getAttribute("id");
        if(element.value==""){
          document.getElementById(_id+"_error").style.display="block";
        }else{
          document.getElementById(_id+"_error").style.display="none";
        }
      });
    });
  },[]);
  function updateProfile(){
    var error=0;
    document.querySelectorAll(".required").forEach(function(element){
      if(element.value==""){error++;
        let _id=element.getAttribute("id");
        document.getElementById(_id).focus();
        document.getElementById(_id+"_error").style.display="block";
      }
    });
    if(error==0){
      let postObj={
        requestType:'profileUpdate',
        userid:userId,
        postData:{
          username:document.getElementById("userName").value,
          emailid:document.getElementById("emailid").value,
          phone:document.getElementById("phone").value,
          firstname:document.getElementById("firstName").value,
          lastname:document.getElementById("lastName").value,
          about_me:document.getElementById("about_me").value,
          imgsrc:uploadedImage,
          filename:uploadedfile
        }
      }
      console.log("postObj",postObj);
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          console.log("response",response);
          if(response.status==200 && response.data){
            document.getElementById("customPopup").click();
            document.getElementById("customMsg").innerText="Profile Updated Successfully.";
          }
        });
    }
    return false;
  }
  function changePassword(){
    var error=0;
    document.querySelectorAll(".required2").forEach(function(element){
      if(element.value==""){error++;
        let _id=element.getAttribute("id");
        document.getElementById(_id+"_error").style.display="block";
        document.getElementById(_id).focus();
      }
    });
    if(error==0){
      let oldPwd=document.getElementById("old_pwd").value;
      let newPwd=document.getElementById("new_pwd").value;
      let confPwd=document.getElementById("confirm_pwd").value;
      if(newPwd!=confPwd){
        document.getElementById("customPopup2").click();
        document.getElementById("customMsg2").innerText="New Password and Confirm Password Should be Same.";
      }else{
        let postObj={
          requestType:'changePassword',
          userid:userId,
          oldpwd:oldPwd,
          newpwd:newPwd,
          confpwd:confPwd
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          console.log("response",response);
          if(response.status==200 && response.data){
            document.getElementById("customPopup").click();
            document.getElementById("customMsg").innerText="Password Updated Successfully.";
          }
        });
      }
    }
    return false;
  }
  function deleteImg(){
    let postObj={
      requestType:'imagedelete',
      userid:userId,
      userimg:document.getElementById("profileimage").getAttribute("src")
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
    .then(response => {
      if(response.status==200 && response.data){
        document.getElementById("profileimage").setAttribute("src","/images/no_photos.png");
        document.getElementById("deleteImg").style.display="none";
      }
    });
  }
  function popClose(){
    document.getElementById("modalClose2").click();
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
          {/* <div className="progressdiv" style={{height: '77vh',position: 'relative',margin: 'auto',width: '32%',top:'16%',background:'#fff'}}><img style={{width:'100%'}} className="progressimg" src="images/icon/error-page-img.svg"/></div> */}
            <div className="dashboard__content bgc-f7" style={{padding:'30px 20px 20px',background:'#f7f7f7'}}>
              <div className="row pb10">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}
              </div>
              {/* End .row */}
              <div className="row align-items-center pb20">
                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>My Profile</h2>
                  </div>
                </div>
              </div>
              {/* End .row */}
              <div className="row">
                <div className="col-xl-12">
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <div className="col-xl-7">
                    <div className="profile-box position-relative d-md-flex align-items-end mb50">
                        <div className="profile-img new position-relative overflow-hidden bdrs12 mb20-sm">
                          <img
                            id="profileimage"
                            className="w-100 cover h-100"
                            src={propertyData.image || "/images/no_photos.png"}
                            alt="profile image"
                          />

                          {propertyData.image &&<button
                            className="tag-del"
                            id="deleteImg"
                            style={{ border: "none" }}
                            data-tooltip-id="profile_del"
                            onClick={() => deleteImg()}
                          >
                          <span className="fas fa-trash-can" />
                          </button>}
                          <ReactTooltip id="profile_del" place="right" content="Delete Image" />
                        </div>
                        {/* End .profile-img */}

                        <div className="profile-content ml30 ml0-sm">
                          <label className="upload-label pointer">
                            <input
                              type="file"
                              accept="image/jpeg,image/png"
                              onChange={handleUpload}
                              style={{ display: "none" }}
                            />
                            <div className="ud-btn btn-white2 mb30">
                              Upload Profile Files
                              <i className="fal fa-arrow-right-long" />
                            </div>
                          </label>
                          <p className="text">
                            Photos must be JPEG or PNG format and at least 2048x768
                          </p>
                        </div>
                      </div>
                      {/* <ProfileBox /> */}
                    </div>
                    {/* End ProfileBox */}

                    <div className="col-lg-12">
                    <form className="form-style1">
                        <div className="row">
                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">
                                Username
                              </label>
                              <input
                                type="text"
                                id="userName"
                                name="userName"
                                className="form-control required"
                                placeholder="Username"
                              />
                              <p id="userName_error" className="errors">Please enter username</p>
                            </div>
                          </div>
                          {/* End .col */}

                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">Email</label>
                              <input
                                type="text"
                                id="emailid"
                                name="emailid"
                                className="form-control"
                                placeholder="Email"
                              />
                              <p id="emailid_error" className="errors">Please enter email id</p>
                            </div>
                          </div>
                          {/* End .col */}

                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">Phone</label>
                              <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="form-control"
                                placeholder="phone"
                                readOnly
                              />
                            </div>
                          </div>
                          {/* End .col */}

                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="form-control required"
                                placeholder="First Name"
                              />
                              <p id="firstName_error" className="errors">Please enter first name</p>
                            </div>
                          </div>
                          {/* End .col */}

                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="form-control required"
                                placeholder="List Name"
                              />
                              <p id="lastName_error" className="errors">Please enter last name</p>
                            </div>
                          </div>
                          {/* End .col */}

                          <div className="col-md-12">
                            <div className="mb10">
                              <label className="heading-color ff-heading fw600 mb10">
                                About me
                              </label>
                              <textarea
                                cols={30}
                                rows={4}
                                id="about_me"
                                name="about_me"
                                className="required"
                                placeholder="About Me"
                              />
                              <p id="about_me_error" className="errors">Please enter about you</p>
                            </div>
                          </div>
                          {/* End .col */}

                          <div className="col-md-12">
                            <div className="text-end">
                              <button type="button" style={{background:'#3C6AFD',border:'solid 1px #3C6AFD'}} onClick={()=>updateProfile()} className="ud-btn btn-dark">
                                Update Profile
                                <i className="fal fa-arrow-right-long" />
                              </button>
                            </div>
                          </div>
                          {/* End .col */}
                        </div>
                      </form>
                      {/* <PersonalInfo /> */}
                    </div>
                    {/* End PersonalInfo */}
                  </div>
                  {/* End .ps-widget */}

                  {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Social Media</h4>
                    <SocialField />
                  </div> */}
                  {/* End .ps-widget */}

                  {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Change password</h4>
                      <form className="form-style1">
                        <div className="row">
                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">
                                Old Password
                              </label>
                              <input
                                type="text"
                                className="form-control required2"
                                placeholder="Old Password"
                                id="old_pwd"
                              />
                              <p id="old_pwd_error" className="errors">Please enter old password</p>
                            </div>
                          </div>
                        </div>
                       

                        <div className="row">
                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">
                                New Password
                              </label>
                              <input
                                type="text"
                                className="form-control required2"
                                placeholder="New Password"
                                id="new_pwd"
                              />
                              <p id="new_pwd_error" className="errors">Please enter new password</p>
                            </div>
                          </div>
                         

                          <div className="col-sm-6 col-xl-4">
                            <div className="mb20">
                              <label className="heading-color ff-heading fw600 mb10">
                                Confirm New Password
                              </label>
                              <input
                                type="text"
                                className="form-control required2"
                                placeholder="Confirm Password"
                                id="confirm_pwd"
                              />
                              <p id="confirm_pwd_error" className="errors">Please enter confirm password</p>
                            </div>
                          </div>
                          

                          <div className="col-md-12">
                            <div className="text-end">
                              <button type="button" style={{background:'#3C6AFD',border:'solid 1px #3C6AFD'}} onClick={()=>changePassword()} className="ud-btn btn-dark">
                                Change Password
                                <i className="fal fa-arrow-right-long" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                   
                  </div> */}
                 
                </div>
              </div>
              
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
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
        <div style={{paddingTop:'10px'}}><button type="button" onClick={()=>{popClose()}} className="ud-btn btn-thm" style={{padding: '6px 14px'}}>OK</button></div>
        </div>
        </div>
        </div>
        </div>
      </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
};

export default DashboardMyProfile;
