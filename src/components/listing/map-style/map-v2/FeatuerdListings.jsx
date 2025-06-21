//import listings from "@/data/listings";
//import axios from "axios";
import { Link } from "react-router-dom";
import React from 'react';
import axios from "axios";
const FeaturedListings = ({data,colstyle,onChildData}) => {
  // const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   axios.get('https://www.nearestate.in/reactAPI.php')
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);
  function createMarkup(text) { return {__html: text}; };
  const handleTabClick = (id) => {
    onChildData(id);
    //openwindow=false;
    //google.maps.event.trigger(markers[id], 'click');
  };
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
    document.getElementById("customMsg").innerHTML="Property added to Compare Successfully.<br/>Add two are more properties and go to compare page and compare your desired properties";
  }
  function contactDetails(propertyId){
    //document.getElementById("contactdetailsPopup").click();return false;
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
    let _login=document.getElementById("logcol").innerText;
      //var _url="https://nearestate.in/3d_tour?id="+id+"#apartment-360-views";
      var _url="https://www.nearestate.in/realview/"+encryptid;
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
      {data.map((listing,index) => (
        <div className={` ${colstyle ? 'col-sm-12':'col-sm-12 col-lg-6'} `} onMouseOver={() => handleTabClick(index)} key={listing.id}>
          <div className={colstyle ? "listing-style1 listCustom listing-type mobview" : "listing-style1"}>
          {listing.D_url &&<div className="list-thumb"><a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}}>
              <img
                className="w-100 h-100 cover map-img"
                style={{height:'277px'}}
                src={listing.photo}
                alt="listings"
              />
              <div className="sale-sticker-wrap tourimg">
                <img src="../images/real-View-360_new.png" id="ifrmimg" style={{height:"116px",cursor:"pointer"}} />
              </div>

              {/* <div className="sale-sticker-wrap">
                {!listing.forRent && (
                  <div className="list-tag fz12">
                    <span className="flaticon-electricity me-2" />
                    FEATURED
                  </div>
                )}
              </div> */}

              <div className="list-price">
                {listing.price}
              </div>
              </a></div>}
            {!listing.D_url &&<div className="list-thumb">
              <Link to={listing.link} target="_blank">
              <img
                className="w-100 h-100 cover map-img"
                style={{height:'277px'}}
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
              {/* <p className="list-text">{listing.location}</p> */}
              <div className="list-meta d-flex align-items-center">
                <a>
                  <span className="flaticon-bed" /> {listing.beds}
                </a>
                <a>
                  <span className="flaticon-shower" /> {listing.bathrooms}
                </a>
                <a>
                  <span className="flaticon-expand" /> {listing.area}
                </a>
              </div>
              <p className="list-text2" dangerouslySetInnerHTML={createMarkup(listing.myDescription)} >
                
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
                <input type="hidden" id="fav_id" value={0} />
                <input type="hidden" id="submitBtn" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeaturedListings;
