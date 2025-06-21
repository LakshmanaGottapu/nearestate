// import CallToActions from "@/components/common/CallToActions";
 import DefaultHeader from "@/components/common/DefaultHeader";
// import Footer from "@/components/common/default-footer";
 import MobileMenu from "@/components/common/mobile-menu";
//import Faq1 from "@/components/pages/faq/Faq1";
//import Faq2 from "@/components/pages/faq/Faq2";
import { useState,useMemo,useEffect} from "react";
import MetaTags from "../../../../src/MetaTags";
import { useParams } from "react-router-dom";
import axios from "axios";

const Faq = ({dataFromServer}) => {
  const [userid, setUserid]=useState(dataFromServer?.metaData?.userid?dataFromServer.metaData.userid:'');
  const [listings, setPosts] = useState(dataFromServer?.Listing?dataFromServer.Listing:[]);
  function setVh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setVh();
window.addEventListener('message',function(event){
  // Optionally, validate the origin
  // if (event.origin !== 'https://your-iframe-origin.com') return;
  if (event.data === 'elementClicked'){
    let postObj={
      requestType:'projtitle',
      propertyid:params?.id
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
    .then(response => {
      if(response.status==200 && response.data){
        let pageData=response.data;
        window.history.pushState(null, null, pageData['url']);
        document.title=pageData['page_title'];
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical !== null) {
          canonical.href = pageData['url'];
        }
      }
    });
  }
  if (event.data === 'frameClosed'){
     window.history.pushState(null, null, "https://www.nearestate.in/realview/"+params?.id);
     //document.title="RealView360°";
  }
});

window.addEventListener('resize', setVh);
  let params = useParams();
  var pan2vrids=["pG4=","rmyEkA==","rmqGlw==","rmmAlw==","rmmGkQ==","rmmGkg==","rmmHkQ==","rmmHnA==","rmmElw==","rmmFnQ==","rmmKlQ==","rmmKkQ==","rmmKkg==","rmmLlA==","rmmLlw==","rmmLlg==","rmmLkQ==","rmmLnQ==","rmmLnA==","rmiCkQ==","rmiCkA==","rmiCnQ==","rmiCnA==","rmiDlA==","rmiDkg==","rmiDnA==","rmiAlw==","rmiAkw==","rmiBlA==","rmiBkQ==","rmiBkg==","rmiBnQ==","rmiBnA==","rmiGlQ==","rmiGlA==","rmiGlw==","rmiGlg==","rmiGkQ==","rmiHlQ==","rmiHlg==","rmiHkQ==","rmiHkg==","rmiHnA==","rmiElw==","rmiEkw==","rmmKkw=="]
  ;
  if(!params?.id){
    location.href="/";
  }
  var re = new RegExp("userid" + "=([^;]+)"); 
  var userId = re.exec(document.cookie);
  useEffect(()=>{
    if(!userId){
       setTimeout(()=>{
        document.querySelectorAll(".showrealview").forEach(function(element){
          element.style.display="block";
        });
       document.querySelectorAll(".hideRealview").forEach(function(element){
         element.style.display="none" 
       });
        document.getElementById("realviewPopupflag").value=1;
        var _url="https://www.nearestate.in/realview/"+params?.id+"-reload";
        document.getElementById("tourUrl").value=_url; 
        document.getElementById("loginBtn").click();
        document.getElementById("close-reg").style.display="none";
        document.querySelector(".modal-backdrop").classList.add("block_modal");
      },500);return;
     // location.href="/";
    }
    if(userId){
      let postObj={
        requestType:'checkLogin',
        userid:userId[1]
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          if(response.status==200 && response.data){
            setUserid((userId[1]));
            var url="https://www.nearestate.in/3d_tour.php?id="+params?.id+"#apartment-360-views";
            if(pan2vrids.indexOf(params?.id)==-1){
              url="https://www.nearestate.in/pan2vr/"+params?.id+"/index.php?type="+params?.type;
            }
            document.getElementById("realviewfrm")?.setAttribute("src",url);
            document.getElementById("realviewfrm")?.focus();
          }else{
            document.querySelectorAll(".showrealview").forEach(function(element){
              element.style.display="block";
            });
           document.querySelectorAll(".hideRealview").forEach(function(element){
             element.style.display="none" 
           });
            document.getElementById("realviewPopupflag").value=1;
            var _url="https://www.nearestate.in/realview/"+params?.id+"-reload";
            document.getElementById("tourUrl").value=_url; 
            document.getElementById("loginBtn").click();
            document.getElementById("close-reg").style.display="none";
            setTimeout(()=>{
            document.querySelector(".modal-backdrop").classList.add("block_modal");
            },1000);
          }
        });
    }    
    // if(!userId){
    //    setTimeout(()=>{
    //     document.querySelectorAll(".showrealview").forEach(function(element){
    //       element.style.display="block";
    //     });
    //    document.querySelectorAll(".hideRealview").forEach(function(element){
    //      element.style.display="none" 
    //    });
    //     document.getElementById("realviewPopupflag").value=1;
    //     var _url="https://www.nearestate.in/realview/"+params?.id+"-reload";
    //     document.getElementById("tourUrl").value=_url; 
    //     document.getElementById("loginBtn").click();
    //     document.getElementById("close-reg").style.display="none";
    //     document.querySelector(".modal-backdrop").classList.add("block_modal");
    //   },100);return;
    //  // location.href="/";
    // }else{ 
    //    document.getElementById("realviewfrm").setAttribute("src","https://www.nearestate.in/3d_tour.php?id="+params?.id+"#apartment-360-views");
    // }
  },[]);
  return (
    <>
    <MetaTags
          url={listings?.url}
          title={dataFromServer?.metaData?.page_title}
          description={dataFromServer?.metaData?.description}
          keywords={dataFromServer?.metaData?.keywords}
          image={`https://www.nearestate.in/og/${listings?.property_image}`}
          twitterAccount={''}
      />
      {/* Main Header Nav */}
      {!userId&&<DefaultHeader />}
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      {!userid&&<MobileMenu />}
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      {/* End Breadcrumb Sections */}

      {/* FAQ Section Area */}
      <section className="our-faq pb901 pt-0"  style={{padding:'0'}}>
        <div className="container" style={{maxWidth:'100%',padding:0,margin:0}}>
        {userId&&<iframe width="100%" id="realviewfrm" style={{'overflow':'hidden','width': '100%','height':'calc(var(--vh, 1vh) * 100)','border': 'none'}} frameBorder="0" allow="xr-spatial-
    	; gyroscope; accelerometer" allowFullScreen scrolling="no" src=""></iframe>}
        </div>
      </section>
      {/* End FAQ Section Area */}

      {/* Our CTA */}
      {/* Our CTA */}

      {/* Start Our Footer */}
      {/* End Our Footer */}
      <input type="hidden" id="realViewprop" />
      <input type="hidden" id="submitBtn" />
      <input type="hidden" id="fav_id" />
      <input type="hidden" id="contactFlag" />
      <input type="hidden" id="contactFlag"/><input type="hidden" id="reviewFlag" value="0" /><input type="hidden" name="tourUrl" id="tourUrl" value="0" /><input type="hidden" name="isfulldetails" id="isfulldetails" value="0" /><input type="hidden" id="isreview" /><input type="hidden" id="loginPopup"  value={1}/><input type="hidden" id="realviewPopupflag"  value={0}/><input type="hidden" id="_isRealview" value={0} />
    </>
  );
};

export default Faq;
