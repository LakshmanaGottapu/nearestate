//import { Link } from "react-router-dom";
import React,{useEffect,useState} from "react";
import axios from "axios";
import { left } from "@popperjs/core";
import ReactFlagsSelect from "react-flags-select";



const SignIn = () => {
  const [mobile,setMobile]=useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const countryLIst={"IN":"91","US":"1","GB":"44","AF":"93","AL":"355","DZ":"213","AS":"1684","AD":"376","AO":"244","AI":"1264","AG":"1268","AR":"54","AM":"374","AW":"297","AU":"61","AT":"43","AZ":"994","BS":"1242","BH":"973","BD":"880","BB":"1246","BY":"375","BE":"32","BZ":"501","BJ":"229","BM":"1441","BT":"975","BO":"591","BA":"387","BW":"267","BR":"55","IO":"246","VG":"1284","BN":"673","BG":"359","BF":"226","BI":"257","KH":"855","CM":"237","CA":"1","CV":"238","BQ":"599","KY":"1345","CF":"236","TD":"235","CL":"56","CN":"86","CX":"61","CC":"61","CO":"57","KM":"269","CD":"243","CG":"242","CK":"682","CR":"506","CI":"225","HR":"385","CU":"53","CW":"599","CY":"357","CZ":"420","DK":"45","DJ":"253","DM":"1767","DO":"1","EC":"593","EG":"20","SV":"503","GQ":"240","ER":"291","EE":"372","ET":"251","FK":"500","FO":"298","FJ":"679","FI":"358","FR":"33","GF":"594","PF":"689","GA":"241","GM":"220","GE":"995","DE":"49","GH":"233","GI":"350","GR":"30","GL":"299","GD":"1473","GP":"590","GU":"1671","GT":"502","GG":"44","GN":"224","GW":"245","GY":"592","HT":"509","HN":"504","HK":"852","HU":"36","IS":"354","ID":"62","IR":"98","IQ":"964","IE":"353","IM":"44","IL":"972","IT":"39","JM":"1876","JP":"81","JE":"44","JO":"962","KZ":"7","KE":"254","KI":"686","XK":"383","KW":"965","KG":"996","LA":"856","LV":"371","LB":"961","LS":"266","LR":"231","LY":"218","LI":"423","LT":"370","LU":"352","MO":"853","MK":"389","MG":"261","MW":"265","MY":"60","MV":"960","ML":"223","MT":"356","MH":"692","MQ":"596","MR":"222","MU":"230","YT":"262","MX":"52","FM":"691","MD":"373","MC":"377","MN":"976","ME":"382","MS":"1664","MA":"212","MZ":"258","MM":"95","NA":"264","NR":"674","NP":"977","NL":"31","NC":"687","NZ":"64","NI":"505","NE":"227","NG":"234","NU":"683","NF":"672","KP":"850","MP":"1670","NO":"47","OM":"968","PK":"92","PW":"680","PS":"970","PA":"507","PG":"675","PY":"595","PE":"51","PH":"63","PL":"48","PT":"351","PR":"1","QA":"974","RE":"262","RO":"40","RU":"7","RW":"250","BL":"590","SH":"290","KN":"1869","LC":"1758","MF":"590","PM":"508","VC":"1784","WS":"685","SM":"378","ST":"239","SA":"966","SN":"221","RS":"381","SC":"248","SL":"232","SG":"65","SX":"1721","SK":"421","SI":"386","SB":"677","SO":"252","ZA":"27","KR":"82","SS":"211","ES":"34","LK":"94","SD":"249","SR":"597","SJ":"47","SZ":"268","SE":"46","CH":"41","SY":"963","TW":"886","TJ":"992","TZ":"255","TH":"66","TL":"670","TG":"228","TK":"690","TO":"676","TT":"1868","TN":"216","TR":"90","TM":"993","TC":"1649","TV":"688","VI":"1340","UG":"256","UA":"380","AE":"971","UY":"598","UZ":"998","VU":"678","VA":"39","VE":"58","VN":"84","WF":"681","EH":"212","YE":"967","ZM":"260","ZW":"263","AX":"358"};
  const [selected, setSelected] = useState("IN");
  const handleSelect = (code) => {
    setSelected(code);
    setTimeout(()=>{ document.querySelector(".ReactFlagsSelect-module_label__27pw9").innerHTML="+"+countryLIst[code];},1);
  };
  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      handleSelect("IN");
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  const isMobile = width <= 768;
  useEffect(() => {
    // document.querySelector(".btn-close").addEventListener("click",function(){
    //   resetform();
    // });
    
    document.body.addEventListener("click",function(e){
      if(e.target.className=="modal fade"){
        resetform();
      }
    });

    document.getElementById("loginMobile").addEventListener("keypress",function(evt){
    document.getElementById("mobile_error").style.display="none";
      if(this.value==""){
        document.getElementById("mobile_error").style.display="block";
        document.getElementById("mobile_error").innerText="Please enter mobile number";
      }
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode > 31 && (charCode < 48 || charCode > 57)){
        evt.preventDefault();
        document.getElementById("loginMobile").value="";
        return false;
      }
    });
    document.getElementById("loginMobile").addEventListener("input",function(evt){
      document.getElementById("mobile_error").style.display="none";
        if(this.value==""){
          document.getElementById("mobile_error").style.display="block";
          document.getElementById("mobile_error").innerText="Please enter mobile number";
        }
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if(width>768){ 
        if(isNaN(this.value)){
          evt.preventDefault();
          document.getElementById("loginMobile").value="";
          return false;
        }  
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if(charCode > 31 && (charCode < 48 || charCode > 57)){
          evt.preventDefault();
          document.getElementById("loginMobile").value="";
          return false;
        }
        }else{
          if(isNaN(this.value)){
            evt.preventDefault();
            document.getElementById("loginMobile").value="";
            return false;
          }
        }
      });
    },[]);
    function resetform(){
      document.getElementById("step1").style.display="block";
      document.getElementById("step2").style.display="none";
      document.getElementById("step3").style.display="none";
      document.getElementById("step4").style.display="none";
      document.getElementById("loginMobile").value="";
      document.getElementById("otp").value="";
      document.getElementById("mobile_error").style.display="none";
      document.getElementById("otp_error").style.display="none";
    }
    function frmSubmit(){
      var invalid=false;
      if(document.getElementById("step2").style.display=="block" && document.getElementById("step3").style.display=="none"){
          let otp=document.getElementById("otp").value;
          let mobile =document.getElementById("loginMobile").value;
          if(otp==""){
            document.getElementById("otp_error").style.display="block";
            document.getElementById("otp_error").innerText="Please enter OTP";
            invalid=true;
          }else{ 
            //login apicall..
            let postObj={
              requestType:'verify_pwdotp',
              mobile:mobile,
              Otp:otp
            }
            axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: {'Content-Type': 'application/json'}})
            .then(response => {
                if(response.status==200 && response?.data!="ERROR"){
                  var now = new Date();
                  var time = now.getTime();
                  time += 3600 * 1000;
                  now.setTime(time);
                  let loginData=response.data;
                  let loginName=loginData.username;
                  let cCode=countryLIst[selected];
                  document.cookie = "userid="+loginData.userid+"; expires="+now.toUTCString()+"; path=/";
                  document.cookie = "username="+loginName+"; expires="+now.toUTCString()+"; path=/";
                  document.cookie = "countryCode="+cCode+"; expires="+now.toUTCString()+"; path=/";
                  document.getElementById("logcol").innerHTML='<ul class="mb0 d-flex justify-content-center justify-content-sm-end p-0"><li class=" user_setting"><div class="dropdown"><a class="login-info d-flex align-items-center show" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i class="far fa-user-circle fz16 me-2"></i><span id="logcol" class="d-none d-xl-block">'+loginName+'</span></a><div class="dropdown-menu" id="dropMenu" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 28px, 0px);"><div class="user_setting_content"><div><p class="fz15 fw400 ff-heading mb20">MAIN</p><p><a class="dropdown-item" onClick="openUrl('+"/dashboard-home"+')" href="/dashboard-home"><i class="flaticon-discovery mr10"></i>Dashboard</a></p><p><a class="dropdown-item" onClick="openUrl(/dashboard-message)" href="/dashboard-message"><i class="flaticon-chat-1 mr10"></i>Message</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE LISTINGS</p><p><a class="dropdown-item" onClick="openUrl(/add-property)" href="/add-property"><i class="flaticon-new-tab mr10"></i>Add New Property</a></p><p><a class="dropdown-item" onClick="openUrl(/dashboard-my-properties)" href="/dashboard-my-properties"><i class="flaticon-home mr10"></i>My Properties</a></p><p><a class="dropdown-item" href="/dashboard-my-favourites"><i class="flaticon-like mr10"></i>My Favorites</a></p><p><a class="dropdown-item" href="/dashboard-saved-search"><i class="flaticon-search-2 mr10"></i>Saved Search</a></p><p><a class="dropdown-item" href="/dashboard-reviews"><i class="flaticon-review mr10"></i>Reviews</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE ACCOUNT</p><p><a class="dropdown-item" href="/dashboard-my-package"><i class="flaticon-protection mr10"></i>My Package</a></p><p><a class="dropdown-item" href="/dashboard-my-profile"><i class="flaticon-user mr10"></i>My Profile</a></p><p><a class="dropdown-item" onClick="logout()" style="cursor: pointer;"><i class="flaticon-exit mr10"></i>Logout</a><p></div></div></div></div></li></ul>';
                  document.querySelector(".log_col").innerHTML='<ul class="mb0 d-flex justify-content-sm-end p-0"><li class=" user_setting"><div class="dropdown"><a class="login-info d-flex align-items-center show" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i class="far fa-user-circle fz16 me-2"></i><span id="logcol2" class="d-xl-block">'+loginName+'</span></a><div class="dropdown-menu" id="dropMenu"  data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 28px, 0px);"><div class="user_setting_content"><div><p class="fz15 fw400 ff-heading mb20">MAIN</p><p><a class="dropdown-item" onClick="openUrl('+"/dashboard-home"+')" href="/dashboard-home"><i class="flaticon-discovery mr10"></i>Dashboard</a></p><p><a class="dropdown-item" href="/dashboard-message"><i class="flaticon-chat-1 mr10"></i>Message</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE LISTINGS</p><p><a class="dropdown-item" href="/add-property"><i class="flaticon-new-tab mr10"></i>Add New Property</a></p><p><a class="dropdown-item" href="/dashboard-my-properties"><i class="flaticon-home mr10"></i>My Properties</a></p><p><a class="dropdown-item" href="/dashboard-my-favourites"><i class="flaticon-like mr10"></i>My Favorites</a></p><p><a class="dropdown-item" href="/dashboard-saved-search"><i class="flaticon-search-2 mr10"></i>Saved Search</a></p><p><a class="dropdown-item" href="/dashboard-reviews"><i class="flaticon-review mr10"></i>Reviews</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE ACCOUNT</p><p><a class="dropdown-item" href="/dashboard-my-package"><i class="flaticon-protection mr10"></i>My Package</a></p><p><a class="dropdown-item" href="/dashboard-my-profile"><i class="flaticon-user mr10"></i>My Profile</a></p><p><a class="dropdown-item" onClick="logout()" style="cursor: pointer;"><i class="flaticon-exit mr10"></i>Logout</a></p></div></div></div></div></li></ul>';
                  document.querySelector("#logcol3").innerHTML='<ul class="mb0 d-flex justify-content-sm-end p-0"><li class=" user_setting"><div class="dropdown"><a class="login-info d-flex align-items-center show" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i class="far fa-user-circle fz16 me-2"></i></a><div class="dropdown-menu" id="dropMenu3"  data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 28px, 0px);"><div class="user_setting_content"><div><p class="fz15 fw400 ff-heading mb20">MAIN</p><p><a class="dropdown-item" onClick="openUrl('+"/dashboard-home"+')" href="/dashboard-home"><i class="flaticon-discovery mr10"></i>Dashboard</a></p><p><a class="dropdown-item" href="/dashboard-message"><i class="flaticon-chat-1 mr10"></i>Message</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE LISTINGS</p><p><a class="dropdown-item" href="/add-property"><i class="flaticon-new-tab mr10"></i>Add New Property</a></p><p><a class="dropdown-item" href="/dashboard-my-properties"><i class="flaticon-home mr10"></i>My Properties</a></p><p><a class="dropdown-item" href="/dashboard-my-favourites"><i class="flaticon-like mr10"></i>My Favorites</a></p><p><a class="dropdown-item" href="/dashboard-saved-search"><i class="flaticon-search-2 mr10"></i>Saved Search</a></p><p><a class="dropdown-item" href="/dashboard-reviews"><i class="flaticon-review mr10"></i>Reviews</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE ACCOUNT</p><p><a class="dropdown-item" href="/dashboard-my-package"><i class="flaticon-protection mr10"></i>My Package</a></p><p><a class="dropdown-item" href="/dashboard-my-profile"><i class="flaticon-user mr10"></i>My Profile</a></p><p><a class="dropdown-item" onClick="logout()" style="cursor: pointer;"><i class="flaticon-exit mr10"></i>Logout</a></p></div></div></div></div></li></ul>';
                  document.querySelector(".btn-close").click();
                  if(document.getElementById("submitBtn").innerText=="Submit"){
                    document.getElementById("submitBtn").click();  
                  }
                  let favId=document.getElementById("fav_id").value;
                  if(favId>0){
                    document.getElementById("likeIcon_"+favId).click();
                  }
                  let contactFlag=document.getElementById("contactFlag").value;
                  if(contactFlag==1){
                    document.querySelector("a#contactBtn").click();
                    return false;
                  }
                  if(document.getElementById("isreview").value==1){
                    document.getElementById("reviewBtn").click();
                  }
                  if(document.getElementById("_isRealview").value==1){
                    let tourUrl=document.getElementById("tourUrl").value;
                    if(tourUrl!="" && tourUrl.includes("-reload")){
                      location.reload();
                    }
                    if(tourUrl!="" && !tourUrl.includes("-reload")){
                      if(isMobile){
                      document.getElementById("newTab").setAttribute('href',tourUrl);  
                      document.getElementById("newTab").click();
                      //location.href=tourUrl;
                      }else{
                        openInNewTab(tourUrl);
                      }
                    }
                  }
                  if(document.getElementById("contactDetailsflag")){
                    let flagVal=document.getElementById("contactDetailsflag").value;
                    if(flagVal>0){
                      document.getElementById("getOwnerDetails_"+flagVal).click();
                    }
                  }
                  setTimeout(()=>{
                  document.getElementById("customPopup").click();
                  document.getElementById("customMsg").innerText="You are successfully login into nearestate.in"; 
                  },100); 
                }else{
                  //invalid otp.
                  document.getElementById("otpError").style.display="block";
                }
            })
            .catch(error => {
              console.error(error);
            });
          }
      }
      if(document.getElementById("step3").style.display=="block"){
        let username=document.getElementById("username").value;
        let email=document.getElementById("email").value;
        let otp=document.getElementById("otp").value;
        let mobile =document.getElementById("loginMobile").value;
        if(otp==""){
          document.getElementById("otp_error").style.display="block";
          document.getElementById("otp_error").innerText="Please enter OTP";
          invalid=true;
        }
        
        if(username==""){
          document.getElementById("name_error").style.display="block";
          invalid=true;
        }
        if(username!=""){
          if(username.length<3){
          document.getElementById("name_length_error").style.display="block";
          invalid=true;
          }
        }
        if(email==""){
          document.getElementById("email_error").style.display="block";
          invalid=true;
        }
        if(email){
          var isValidmail=email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          if(!isValidmail){
            document.getElementById("email_error").style.display="block";
            document.getElementById("email_error").innerText="Please enter valid email address";
            invalid=true; return false;
          }
        }
        if(!invalid)
        {
          //register apicall..
          let postObj={
            requestType:'register_user',
            mobile:mobile,
            username:username,
            email:email,
            Otp:otp
          }
          axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: {'Content-Type': 'application/json'}})
          .then(response => {
            if(response.status==200 && response?.data!="ERROR"){
              var now = new Date();
              var time = now.getTime();
              time += 3600 * 1000;
              now.setTime(time);
              let loginName=response.data['username'];
              let cCode=countryLIst[selected];
              document.cookie = "userid="+JSON.stringify(response.data['userid'])+"; expires="+now.toUTCString()+"; path=/";
              document.cookie = "username="+JSON.stringify(loginName)+"; expires="+now.toUTCString()+"; path=/";
              document.cookie = "countryCode="+JSON.stringify(cCode)+"; expires="+now.toUTCString()+"; path=/";

              document.getElementById("logcol").innerHTML='<ul class="mb0 d-flex justify-content-center justify-content-sm-end p-0"><li class=" user_setting"><div class="dropdown"><a class="login-info d-flex align-items-center show" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i class="far fa-user-circle fz16 me-2"></i><span id="logcol" class="d-none d-xl-block">'+loginName+'</span></a><div class="dropdown-menu" id="dropMenu" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 28px, 0px);"><div class="user_setting_content"><div><p class="fz15 fw400 ff-heading mb20">MAIN</p><p><a class="dropdown-item" onClick="openUrl('+"/dashboard-home"+')" href="/dashboard-home"><i class="flaticon-discovery mr10"></i>Dashboard</a></p><p><a class="dropdown-item" onClick="openUrl(/dashboard-message)" href="/dashboard-message"><i class="flaticon-chat-1 mr10"></i>Message</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE LISTINGS</p><p><a class="dropdown-item" onClick="openUrl(/add-property)" href="/add-property"><i class="flaticon-new-tab mr10"></i>Add New Property</a></p><p><a class="dropdown-item" onClick="openUrl(/dashboard-my-properties)" href="/dashboard-my-properties"><i class="flaticon-home mr10"></i>My Properties</a></p><p><a class="dropdown-item" href="/dashboard-my-favourites"><i class="flaticon-like mr10"></i>My Favorites</a></p><p><a class="dropdown-item" href="/dashboard-saved-search"><i class="flaticon-search-2 mr10"></i>Saved Search</a></p><p><a class="dropdown-item" href="/dashboard-reviews"><i class="flaticon-review mr10"></i>Reviews</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE ACCOUNT</p><p><a class="dropdown-item" href="/dashboard-my-package"><i class="flaticon-protection mr10"></i>My Package</a></p><p><a class="dropdown-item" href="/dashboard-my-profile"><i class="flaticon-user mr10"></i>My Profile</a></p><p><a class="dropdown-item" onClick="logout()" style="cursor: pointer;"><i class="flaticon-exit mr10"></i>Logout</a><p></div></div></div></div></li></ul>';
              

              document.querySelector(".log_col").innerHTML='<ul class="mb0 d-flex justify-content-sm-end p-0"><li class=" user_setting"><div class="dropdown"><a class="login-info d-flex align-items-center show" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i class="far fa-user-circle fz16 me-2"></i><span id="logcol2" class="d-xl-block">'+loginName+'</span></a><div class="dropdown-menu" id="dropMenu"  data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 28px, 0px);"><div class="user_setting_content"><div><p class="fz15 fw400 ff-heading mb20">MAIN</p><p><a class="dropdown-item" onClick="openUrl('+"/dashboard-home"+')" href="/dashboard-home"><i class="flaticon-discovery mr10"></i>Dashboard</a></p><p><a class="dropdown-item" href="/dashboard-message"><i class="flaticon-chat-1 mr10"></i>Message</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE LISTINGS</p><p><a class="dropdown-item" href="/add-property"><i class="flaticon-new-tab mr10"></i>Add New Property</a></p><p><a class="dropdown-item" href="/dashboard-my-properties"><i class="flaticon-home mr10"></i>My Properties</a></p><p><a class="dropdown-item" href="/dashboard-my-favourites"><i class="flaticon-like mr10"></i>My Favorites</a></p><p><a class="dropdown-item" href="/dashboard-saved-search"><i class="flaticon-search-2 mr10"></i>Saved Search</a></p><p><a class="dropdown-item" href="/dashboard-reviews"><i class="flaticon-review mr10"></i>Reviews</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE ACCOUNT</p><p><a class="dropdown-item" href="/dashboard-my-package"><i class="flaticon-protection mr10"></i>My Package</a></p><p><a class="dropdown-item" href="/dashboard-my-profile"><i class="flaticon-user mr10"></i>My Profile</a></p><p><a class="dropdown-item" onClick="logout()" style="cursor: pointer;"><i class="flaticon-exit mr10"></i>Logout</a></p></div></div></div></div></li></ul>';
              document.querySelector("#logcol3").innerHTML='<ul class="mb0 d-flex justify-content-sm-end p-0"><li class=" user_setting"><div class="dropdown"><a class="login-info d-flex align-items-center show" href="#" data-bs-toggle="dropdown" aria-expanded="true"><i class="far fa-user-circle fz16 me-2"></i></a><div class="dropdown-menu" id="dropMenu3"  data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 28px, 0px);"><div class="user_setting_content"><div><p class="fz15 fw400 ff-heading mb20">MAIN</p><p><a class="dropdown-item" onClick="openUrl('+"/dashboard-home"+')" href="/dashboard-home"><i class="flaticon-discovery mr10"></i>Dashboard</a></p><p><a class="dropdown-item" href="/dashboard-message"><i class="flaticon-chat-1 mr10"></i>Message</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE LISTINGS</p><p><a class="dropdown-item" href="/add-property"><i class="flaticon-new-tab mr10"></i>Add New Property</a></p><p><a class="dropdown-item" href="/dashboard-my-properties"><i class="flaticon-home mr10"></i>My Properties</a></p><p><a class="dropdown-item" href="/dashboard-my-favourites"><i class="flaticon-like mr10"></i>My Favorites</a></p><p><a class="dropdown-item" href="/dashboard-saved-search"><i class="flaticon-search-2 mr10"></i>Saved Search</a></p><p><a class="dropdown-item" href="/dashboard-reviews"><i class="flaticon-review mr10"></i>Reviews</a></p></div><div><p class="fz15 fw400 ff-heading mt30">MANAGE ACCOUNT</p><p><a class="dropdown-item" href="/dashboard-my-package"><i class="flaticon-protection mr10"></i>My Package</a></p><p><a class="dropdown-item" href="/dashboard-my-profile"><i class="flaticon-user mr10"></i>My Profile</a></p><p><a class="dropdown-item" onClick="logout()" style="cursor: pointer;"><i class="flaticon-exit mr10"></i>Logout</a></p></div></div></div></div></li></ul>';

              document.querySelector(".btn-close").click();
             if(document.getElementById("submitBtn").innerText=="Submit"){
                document.getElementById("submitBtn").click();  
              }
              let favId=document.getElementById("fav_id").value;
              if(favId>0){
                document.getElementById("likeIcon_"+favId).click();
              }
              let contactFlag=document.getElementById("contactFlag").value;
              if(contactFlag==1){
                document.getElementById("contactBtn").click();
              }
              if(document.getElementById("isreview").value==1){
                document.getElementById("reviewBtn").click();
              }
              if(document.getElementById("_isRealview").value==1){
                let tourUrl=document.getElementById("tourUrl").value;
                if(tourUrl!="" && tourUrl.includes("-reload")){
                  location.reload();
                }
                if(tourUrl!="" && !tourUrl.includes("-reload")){
                  if(isMobile){
                     document.getElementById("newTab").setAttribute('href',tourUrl);  
                     document.getElementById("newTab").click();
                    //location.href=tourUrl;
                    }else{
                      openInNewTab(tourUrl);
                    }
                }
              }
              if(document.getElementById("contactDetailsflag")){
                let flagVal=document.getElementById("contactDetailsflag").value;
                if(flagVal>0){
                  document.getElementById("getOwnerDetails_"+flagVal).click();
                }
              }
              setTimeout(()=>{
              document.getElementById("customPopup").click();
              document.getElementById("customMsg").innerText="You are successfully login into nearestate.in";  
              },100);
            }else{
              //invalid otp.
              document.getElementById("otpError").style.display="block";
            }
            console.log(response);
        })
          .catch(error => {
            console.error(error);
          });
        }
      }
      if(invalid){return;}
      let mobile =document.getElementById("loginMobile").value;
      if(username==""){
        document.getElementById("name_error").style.display="block";
        invalid=true;
      }
      if(mobile==""){
         document.getElementById("mobile_error").style.display="block";
         document.getElementById("mobile_error").innerText="Please enter mobile number";
         return;
      }
      if(mobile!="" && mobile.length<10){
        document.getElementById("mobile_error").style.display="block";
        document.getElementById("mobile_error").innerText="Please enter valid mobile number";
        return;
     }
     if(document.getElementById("step1").style.display=="block"){
      setMobile(mobile);
        document.querySelectorAll(".showrealview").forEach(function(element){
          if(element.style.display=="block"){
            document.getElementById("_isRealview").value=1;
          }
          element.style.display="none"
        });
        document.querySelectorAll(".hideRealview").forEach(function(element){
          element.style.display=""; 
        });
      //send otp apicall..
      //const [posts, setPosts] = useState([]);
        var country_code = countryLIst[selected];
        let postObj={
          requestType:'verify_mobile',
          mobile:mobile,
          countryCode:country_code
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
          .then(response => {
            modalPopUp(60000); document.getElementById('time-col').style.display='block';document.getElementById('resend-col').style.display='none';
            if(response.data>0){
              document.getElementById("step1").style.display="none";
              document.getElementById("step2").style.display="block";
            }else{
              document.getElementById("step1").style.display="none";
              document.getElementById("step2").style.display="block";
              document.getElementById("step3").style.display="block";
              document.getElementById("step4").style.display="block";
            }
          })
          .catch(error => {
            console.error(error);
          });
        }
    }
    function openInNewTab(href) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: href,
      }).click();
    }
    function changemobile(){
      document.getElementById("step1").style.display="block";
      document.getElementById("step2").style.display="none";
      document.getElementById("step3").style.display="none";
      document.getElementById("step4").style.display="none";
      if(document.getElementById("_isRealview").value==1){
        document.querySelectorAll(".showrealview").forEach(function(element){
          element.style.display="block"
        });
        document.querySelectorAll(".hideRealview").forEach(function(element){
          element.style.display="none" 
        });
      }
    }
    function validateinput(id){
      if(id=="username"){
        document.getElementById(id).value=document.getElementById(id).value.replace(/[0-9]/g, '');
      }
      document.getElementById("otpError").style.display="none";
      let val=document.getElementById(id).value;
      document.getElementById(id).nextSibling.style.display='none';
      document.getElementById("name_length_error").style.display='none';
      if(val==""){
        document.getElementById(id).nextSibling.style.display='block';
      }else{
        if(id=="username" && val.length<3){
          document.getElementById("name_length_error").style.display='block';
        }
      }
    }
    function modalPopUp(time) {
    var remainingTime = time - 60000;
    var timeCount = document.getElementById('time-remain');
    setTimeout(function() { 
    var mm=setInterval(function(){         
      time= time - 1000; 
      if(time==0){
      window.clearInterval(mm); 
      document.getElementById("time-col").style.display='none'; 
      document.getElementById("resend-col").style.display='block';
      }
      timeCount.innerHTML = (time/1000)%60;
    }, 1000);
    }, remainingTime);
  }
  function resendOtp(){
    //send otp apicall..
    var country_code = countryLIst[selected];
    let postObj={
      requestType:'resendOtp',
      mobile:mobile,
      countryCode:country_code
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        modalPopUp(60000); document.getElementById('time-col').style.display='block';document.getElementById('resend-col').style.display='none';
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <form className="form-style1">
      <div className="mb25" id="step1" style={{display:'block'}}>
        <label className="form-label fw600 dark-color">Your WhatsApp Number <span color="red;">*</span></label>
        <div className="row col-md-12">
        <div className="col-md-3" id="col_left" style={{paddingRight:'1px'}}>
          <ReactFlagsSelect 
            selected={selected}
            onSelect={handleSelect}
            className="custom-flags-select"
            countries={[
              "IN",
              "US",
              "GB",
              "AF",
              "AL",
              "DZ",
              "AS",
              "AD",
              "AO",
              "AI",
              "AG",
              "AR",
              "AM",
              "AW",
              "AU",
              "AT",
              "AZ",
              "BS",
              "BH",
              "BD",
              "BB",
              "BY",
              "BE",
              "BZ",
              "BJ",
              "BM",
              "BT",
              "BO",
              "BA",
              "BW",
              "BR",
              "IO",
              "VG",
              "BN",
              "BG",
              "BF",
              "BI",
              "KH",
              "CM",
              "CA",
              "CV",
              "BQ",
              "KY",
              "CF",
              "TD",
              "CL",
              "CN",
              "CX",
              "CC",
              "CO",
              "KM",
              "CD",
              "CG",
              "CK",
              "CR",
              "CI",
              "HR",
              "CU",
              "CW",
              "CY",
              "CZ",
              "DK",
              "DJ",
              "DM",
              "DO",
              "EC",
              "EG",
              "SV",
              "GQ",
              "ER",
              "EE",
              "ET",
              "FK",
              "FO",
              "FJ",
              "FI",
              "FR",
              "GF",
              "PF",
              "GA",
              "GM",
              "GE",
              "DE",
              "GH",
              "GI",
              "GR",
              "GL",
              "GD",
              "GP",
              "GU",
              "GT",
              "GG",
              "GN",
              "GW",
              "GY",
              "HT",
              "HN",
              "HK",
              "HU",
              "IS",
              "IN",
              "ID",
              "IR",
              "IQ",
              "IE",
              "IM",
              "IL",
              "IT",
              "JM",
              "JP",
              "JE",
              "JO",
              "KZ",
              "KE",
              "KI",
              "XK",
              "KW",
              "KG",
              "LA",
              "LV",
              "LB",
              "LS",
              "LR",
              "LY",
              "LI",
              "LT",
              "LU",
              "MO",
              "MK",
              "MG",
              "MW",
              "MY",
              "MV",
              "ML",
              "MT",
              "MH",
              "MQ",
              "MR",
              "MU",
              "YT",
              "MX",
              "FM",
              "MD",
              "MC",
              "MN",
              "ME",
              "MS",
              "MA",
              "MZ",
              "MM",
              "NA",
              "NR",
              "NP",
              "NL",
              "NC",
              "NZ",
              "NI",
              "NE",
              "NG",
              "NU",
              "NF",
              "KP",
              "MP",
              "NO",
              "OM",
              "PK",
              "PW",
              "PS",
              "PA",
              "PG",
              "PY",
              "PE",
              "PH",
              "PL",
              "PT",
              "PR",
              "QA",
              "RE",
              "RO",
              "RU",
              "RW",
              "BL",
              "SH",
              "KN",
              "LC",
              "MF",
              "PM",
              "VC",
              "WS",
              "SM",
              "ST",
              "SA",
              "SN",
              "RS",
              "SC",
              "SL",
              "SG",
              "SX",
              "SK",
              "SI",
              "SB",
              "SO",
              "ZA",
              "KR",
              "SS",
              "ES",
              "LK",
              "SD",
              "SR",
              "SJ",
              "SZ",
              "SE",
              "CH",
              "SY",
              "TW",
              "TJ",
              "TZ",
              "TH",
              "TL",
              "TG",
              "TK",
              "TO",
              "TT",
              "TN",
              "TR",
              "TM",
              "TC",
              "TV",
              "VI",
              "UG",
              "UA",
              "AE",
              "GB",
              "US",
              "UY",
              "UZ",
              "VU",
              "VA",
              "VE",
              "VN",
              "WF",
              "EH",
              "YE",
              "ZM",
              "ZW",
              "AX"
          ]}
            customLabels={{
              "IN":"+91 - India","US":"+1 - United States","GB":"+44 - United Kingdom","AF":"+93 - Afghanistan","AL":"+355 - Albania (Shqipëri)","DZ":"+213 - Algeria","AS":"+1684 - American Samoa","AD":"+376 - Andorra","AO":"+244 - Angola","AI":"+1264 - Anguilla","AG":"+1268 - Antigua and Barbuda","AR":"+54 - Argentina","AM":"+374 - Armenia (Հայաստան)","AW":"+297 - Aruba","AU":"+61 - Australia","AT":"+43 - Austria (Österreich)","AZ":"+994 - Azerbaijan (Azərbaycan)","BS":"+1242 - Bahamas","BH":"+973 - Bahrain","BD":"+880 - Bangladesh","BB":"+1246 - Barbados","BY":"+375 - Belarus (Беларусь)","BE":"+32 - Belgium (België)","BZ":"+501 - Belize","BJ":"+229 - Benin (Bénin)","BM":"+1441 - Bermuda","BT":"+975 - Bhutan (འབྲུག)","BO":"+591 - Bolivia","BA":"+387 - Bosnia and Herzegovina (Босна и Херцеговина)","BW":"+267 - Botswana","BR":"+55 - Brazil (Brasil)","IO":"+246 - British Indian Ocean Territory","VG":"+1284 - British Virgin Islands","BN":"+673 - Brunei","BG":"+359 - Bulgaria (България)","BF":"+226 - Burkina Faso","BI":"+257 - Burundi (Uburundi)","KH":"+855 - Cambodia","CM":"+237 - Cameroon (Cameroun)","CA":"+1 - Canada","CV":"+238 - Cape Verde (Kabu Verdi)","BQ":"+599 - Caribbean Netherlands","KY":"+1345 - Cayman Islands","CF":"+236 - Central African Republic (République centrafricaine)","TD":"+235 - Chad (Tchad)","CL":"+56 - Chile","CN":"+86 - China (中国)","CX":"+61 - Christmas Island","CC":"+61 - Cocos (Keeling) Islands","CO":"+57 - Colombia","KM":"+269 - Comoros","CD":"+243 - Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","CG":"+242 - Congo (Republic) (Congo-Brazzaville)","CK":"+682 - Cook Islands","CR":"+506 - Costa Rica","CI":"+225 - Côte d’Ivoire","HR":"+385 - Croatia (Hrvatska)","CU":"+53 - Cuba","CW":"+599 - Curaçao","CY":"+357 - Cyprus (Κύπρος)","CZ":"+420 - Czech Republic (Česká republika)","DK":"+45 - Denmark (Danmark)","DJ":"+253 - Djibouti","DM":"+1767 - Dominica","DO":"+1 - Dominican Republic (República Dominicana)","EC":"+593 - Ecuador","EG":"+20 - Egypt","SV":"+503 - El Salvador","GQ":"+240 - Equatorial Guinea (Guinea Ecuatorial)","ER":"+291 - Eritrea","EE":"+372 - Estonia (Eesti)","ET":"+251 - Ethiopia","FK":"+500 - Falkland Islands (Islas Malvinas)","FO":"+298 - Faroe Islands (Føroyar)","FJ":"+679 - Fiji","FI":"+358 - Finland","FR":"+33 - France","GF":"+594 - French Guiana (Guyane française)","PF":"+689 - French Polynesia (Polynésie française)","GA":"+241 - Gabon","GM":"+220 - Gambia","GE":"+995 - Georgia","DE":"+49 - Germany (Deutschland)","GH":"+233 - Ghana (Gaana)","GI":"+350 - Gibraltar","GR":"+30 - Greece (Ελλάδα)","GL":"+299 - Greenland (Kalaallit Nunaat)","GD":"+1473 - Grenada","GP":"+590 - Guadeloupe","GU":"+1671 - Guam","GT":"+502 - Guatemala","GG":"+44 - Guernsey","GN":"+224 - Guinea (Guinée)","GW":"+245 - Guinea-Bissau (Guiné Bissau)","GY":"+592 - Guyana","HT":"+509 - Haiti","HN":"+504 - Honduras","HK":"+852 - Hong Kong","HU":"+36 - Hungary (Magyarország)","IS":"+354 - Iceland","ID":"+62 - Indonesia","IR":"+98 - Iran","IQ":"+964 - Iraq","IE":"+353 - Ireland","IM":"+44 - Isle of Man","IL":"+972 - Israel","IT":"+39 - Italy (Italia)","JM":"+1876 - Jamaica","JP":"+81 - Japan","JE":"+44 - Jersey","JO":"+962 - Jordan","KZ":"+7 - Kazakhstan (Казахстан)","KE":"+254 - Kenya","KI":"+686 - Kiribati","XK":"+383 - Kosovo","KW":"+965 - Kuwait","KG":"+996 - Kyrgyzstan (Кыргызстан)","LA":"+856 - Laos (ລາວ)","LV":"+371 - Latvia","LB":"+961 - Lebanon","LS":"+266 - Lesotho","LR":"+231 - Liberia","LY":"+218 - Libya","LI":"+423 - Liechtenstein","LT":"+370 - Lithuania","LU":"+352 - Luxembourg","MO":"+853 - Macau (澳門)","MK":"+389 - Macedonia (FYROM) (Македонија)","MG":"+261 - Madagascar (Madagasikara)","MW":"+265 - Malawi","MY":"+60 - Malaysia","MV":"+960 - Maldives","ML":"+223 - Mali","MT":"+356 - Malta","MH":"+692 - Marshall Islands","MQ":"+596 - Martinique","MR":"+222 - Mauritania","MU":"+230 - Mauritius","YT":"+262 - Mayotte","MX":"+52 - Mexico (México)","FM":"+691 - Micronesia","MD":"+373 - Moldova (Republica Moldova)","MC":"+377 - Monaco","MN":"+976 - Mongolia (Монгол)","ME":"+382 - Montenegro (Crna Gora)","MS":"+1664 - Montserrat","MA":"+212 - Morocco","MZ":"+258 - Mozambique (Moçambique)","MM":"+95 - Myanmar (Burma)","NA":"+264 - Namibia (Namibië)","NR":"+674 - Nauru","NP":"+977 - Nepal (नेपाल)","NL":"+31 - Netherlands (Nederland)","NC":"+687 - New Caledonia (Nouvelle-Calédonie)","NZ":"+64 - New Zealand","NI":"+505 - Nicaragua","NE":"+227 - Niger (Nijar)","NG":"+234 - Nigeria","NU":"+683 - Niue","NF":"+672 - Norfolk Island","KP":"+850 - North Korea (조선 민주주의 인민 공화국)","MP":"+1670 - Northern Mariana Islands","NO":"+47 - Norway (Norge)","OM":"+968 - Oman","PK":"+92 - Pakistan","PW":"+680 - Palau","PS":"+970 - Palestine","PA":"+507 - Panama (Panamá)","PG":"+675 - Papua New Guinea","PY":"+595 - Paraguay","PE":"+51 - Peru (Perú)","PH":"+63 - Philippines","PL":"+48 - Poland (Polska)","PT":"+351 - Portugal","PR":"+1 - Puerto Rico","QA":"+974 - Qatar","RE":"+262 - Réunion (La Réunion)","RO":"+40 - Romania (România)","RU":"+7 - Russia (Россия)","RW":"+250 - Rwanda","BL":"+590 - Saint Barthélemy (Saint-Barthélemy)","SH":"+290 - Saint Helena","KN":"+1869 - Saint Kitts and Nevis","LC":"+1758 - Saint Lucia","MF":"+590 - Saint Martin (Saint-Martin (partie française))","PM":"+508 - Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","VC":"+1784 - Saint Vincent and the Grenadines","WS":"+685 - Samoa","SM":"+378 - San Marino","ST":"+239 - São Tomé and Príncipe (São Tomé e Príncipe)","SA":"+966 - Saudi Arabia","SN":"+221 - Senegal","RS":"+381 - Serbia","SC":"+248 - Seychelles","SL":"+232 - Sierra Leone","SG":"+65 - Singapore","SX":"+1721 - Sint Maarten","SK":"+421 - Slovakia (Slovensko)","SI":"+386 - Slovenia (Slovenija)","SB":"+677 - Solomon Islands","SO":"+252 - Somalia (Soomaaliya)","ZA":"+27 - South Africa","KR":"+82 - South Korea (대한민국)","SS":"+211 - South Sudan","ES":"+34 - Spain","LK":"+94 - Sri Lanka","SD":"+249 - Sudan","SR":"+597 - Suriname","SJ":"+47 - Svalbard and Jan Mayen","SZ":"+268 - Swaziland","SE":"+46 - Sweden (Sverige)","CH":"+41 - Switzerland (Schweiz)","SY":"+963 - Syria","TW":"+886 - Taiwan","TJ":"+992 - Tajikistan","TZ":"+255 - Tanzania","TH":"+66 - Thailand","TL":"+670 - Timor-Leste","TG":"+228 - Togo","TK":"+690 - Tokelau","TO":"+676 - Tonga","TT":"+1868 - Trinidad and Tobago","TN":"+216 - Tunisia","TR":"+90 - Turkey (Türkiye)","TM":"+993 - Turkmenistan","TC":"+1649 - Turks and Caicos Islands","TV":"+688 - Tuvalu","VI":"+1340 - U.S. Virgin Islands","UG":"+256 - Uganda","UA":"+380 - Ukraine (Україна)","AE":"+971 - United Arab Emirates","UY":"+598 - Uruguay","UZ":"+998 - Uzbekistan (Oʻzbekiston)","VU":"+678 - Vanuatu","VA":"+39 - Vatican City (Città del Vaticano)","VE":"+58 - Venezuela","VN":"+84 - Vietnam (Việt Nam)","WF":"+681 - Wallis and Futuna","EH":"+212 - Western Sahara","YE":"+967 - Yemen","ZM":"+260 - Zambia","ZW":"+263 - Zimbabwe","AX":"+358 - Åland Islands"
            }}
            placeholder="Select a country"
          />
        </div>
        <div className="col-md-9" id="col_right" style={{paddingLeft:'1px'}}>
        <i className="fal fa-mobile" style={{position:'absolute',marginTop:'15px',paddingLeft:'10px'}}></i>  
        <input
          type="text"
          className="form-control"
          placeholder="Mobile Number"
          id="loginMobile"
          maxLength={10}
        /></div>
        </div>
        <span id="mobile_error" style={{display:'none',color:'red',fontSize:'12px'}}>Please enter mobile number</span>
      </div>
      {/* End email */}

      {/* <div className="mb15" id="step3" style={{display:'none'}}>
        <label className="form-label fw600 dark-color">Name <span>*</span></label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          placeholder="Name"
        />
      </div>
      <div className="mb15" id="step4" style={{display:'none'}}>
        <label className="form-label fw600 dark-color">Email Address</label>
        <input
          type="text"
          id="email"
          name="email"
          className="form-control"
          placeholder="Email Address"
        />
      </div> */}
      {/* End Password */}

      {/* <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div> */}
      {/* End  Lost your password? */}
      <div className="mb25" id="step2" style={{display:'none'}}>
      <div style={{fontSize:"16px"}}>OTP has been sent to <span id="otpMobile">{mobile}</span> <a onClick={()=>changemobile()} style={{color:"blue",cursor:'pointer'}}>Edit</a></div>
      <div className="mb15" id="step3" style={{display:'none'}}>
        <label className="form-label fw600 dark-color">Name <span>*</span></label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={()=>validateinput('username')}
          className="form-control"
          placeholder="Name"
        />
        <span id="name_error" className="errormsg" style={{display:'none',color:'red',fontSize:'12px'}}>Please enter name</span>
        <span id="name_length_error" className="errormsg" style={{display:'none',color:'red',fontSize:'12px'}}>Please enter at least 3 characters</span>
      </div>
      <div className="mb15" id="step4" style={{display:'none'}}>
        <label className="form-label fw600 dark-color">Email Address</label>
        <input
          type="text"
          id="email"
          name="email"
          onChange={()=>validateinput('email')}
          className="form-control"
          placeholder="Email Address"
        />
        <span id="email_error" className="errormsg" style={{display:'none',color:'red',fontSize:'12px'}}>Please enter email address</span>
      </div>
        <p id="otpError" className="errors" style={{textAlign:'center'}}>Invalid OTP.</p>
        <label className="form-label fw600 dark-color">OTP<span>*</span></label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter OTP"
          id="otp"
          onChange={()=>validateinput('otp')}
          maxLength={4}
        />
        <span id="otp_error" className="errormsg" style={{display:'none',color:'red',fontSize:'12px'}}>Please enter valid otp</span>
        <div className="clearfix"><p id="time-col" style={{fontSize:'12px'}}>don't receive OTP?, you can Resend in <span id="time-remain" style={{fontWeight:'bold'}}></span>secs</p><p id="resend-col" onClick={()=>resendOtp()} style={{display:'none',textAlign:'center'}}><a  style={{color:'blue',cursor:'pointer'}}>Resend OTP</a></p></div>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" onClick={()=>frmSubmit()} type="button">
          Login <i className="fal fa-arrow-right-long" />
        </button>
      </div>
      <a href="" id="newTab" className="hider" target="_blank">new</a>
      {/* End submit */}

      {/* <div className="hr_content mb20">
        <hr />
        <span className="hr_top_text">OR</span>
      </div> */}

      {/* <div className="d-grid mb10">
        <button className="ud-btn btn-white" type="button">
          <i className="fab fa-google" /> Continue Google
        </button>
      </div>
      <div className="d-grid mb10">
        <button className="ud-btn btn-fb" type="button">
          <i className="fab fa-facebook-f" /> Continue Facebook
        </button>
      </div>
      <div className="d-grid mb20">
        <button className="ud-btn btn-apple" type="button">
          <i className="fab fa-apple" /> Continue Apple
        </button>
      </div>
      <p className="dark-color text-center mb0 mt10">
        Not signed up?{" "}
        <Link className="dark-color fw600" to="/register">
          Create an account.
        </Link>
      </p> */}
    </form>
  );
};

export default SignIn;
