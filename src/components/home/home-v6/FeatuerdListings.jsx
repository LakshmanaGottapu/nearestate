
import axios from "axios";
//import listings from "@/data/listings";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const FeaturedListings = (Data) => {
  const [posts, setPosts] = useState(Data?.dataFromServer?Data.dataFromServer:[]);
  var end=4;
  useEffect(() => {
    var re = new RegExp("userid" + "=([^;]+)"); 
    var userId = re.exec(document.cookie);
    var uId=(userId)?userId[1]:'';
    if(posts?.length==0){
      let postObj={
        requestType:'featured_listings',
        userid:uId,
        start:0,
        end:end,
      }
      listings(postObj);
    }

    // let postObj2={
    //   requestType:'autosuggest',
    //   userid:12,
    //   query:'jillelguda'
    // }
    // axios.post('https://www.nearestate.in/reactAPI.php',postObj2,{headers: { 'Content-Type': 'application/json' }})
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
    //   .then(response => {
    //     setPosts(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    //listings(postObj);
    // document.querySelectorAll(".swiper-slide").forEach(function(draggableElement){
    //   draggableElement.addEventListener('dragstart', function(event) {
    //       console.log("draggg");
    //   });
    // });
    document.querySelector(".featured-next__active").addEventListener("click",function(){
      let endcnt=(document.getElementById("end")?.value)?document.getElementById("end").value:4;
      end=parseInt(endcnt)+4;
      document.getElementById("end").value=end;
      let postObj={
        requestType:'featured_listings',
        userid:uId,
        start:0,
        end:end,
      }
      listings(postObj);
    });
  }, ['']);
    function loadMore(){
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      var uId=(userId)?userId[1]:'';
      let endcnt=(document.getElementById("end")?.value)?document.getElementById("end").value:4;
      end=parseInt(endcnt)+2;
      document.getElementById("end").value=end;
      let postObj={
        requestType:'featured_listings',
        userid:uId,
        start:0,
        end:end,
      }
      listings(postObj);
    }
    function listings(postObj){
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    }
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
                }
              })
              .catch(error => {
                console.error(error);
              }); 
          }
        }
        if(document.getElementById("likeIcon_"+id).classList.contains('liked')){
          document.getElementById("likeIcon_"+id).classList.remove("liked");
          document.getElementById("likeIcon_"+id).innerHTML='<svg class="m-0 likeIcon" viewBox="0 0 24 24" color="transparent" style="width: 17px; height: 17px; margin: 2px;"><path class="" fill="transparent" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style="transform: scale(1.5, 1.4); stroke: rgb(120, 118, 118); stroke-width: 1.5px; fill: transparent;"></path></svg>';
        }else{
        document.getElementById("likeIcon_"+id).classList.add("liked");
        document.getElementById("likeIcon_"+id).innerHTML='<svg class="m-0 likeIcon" viewBox="0 0 24 24" color="#fd3752" style="width: 18px; height: 18px; margin: 2px;"><path class="" fill="#fd3752" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style="transform: scale(1.5, 1.4);"></path></svg>';
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
    function realviewOpen(id,encryptid){
      //var _url="https://nearestate.in/3d_tour?id="+id+"#apartment-360-views";
      var _url="https://www.nearestate.in/realview/"+encryptid;
      //document.getElementById("realviewfrm").setAttribute("src",_url);
      //document.getElementById("realviewPopup").click();
      let _login=document.getElementById("logcol").innerText;
      if(_login.includes("Login")){
          document.querySelectorAll(".showrealview").forEach(function(element){
            element.style.display="block"
          });
          document.querySelectorAll(".hideRealview").forEach(function(element){
            element.style.display="none" 
          });
          document.getElementById("realviewPopupflag").value=1;
          setTimeout(()=>{
          document.getElementById("tourUrl").value=_url;
          },1000);
          document.getElementById("loginBtn").click();return false;
        }else{
          var re = new RegExp("userid" + "=([^;]+)"); 
          var userId = re.exec(document.cookie);
          if(userId){
            openInNewTab(_url);
          }
        }
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
    function openInNewTab(href) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: href,
      }).click();
    }
  return (
    <>
      <Swiper
        className="overflow-visible"
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        onTouchStart={() => {
          loadMore();
        }}
        onTouchEnd={() => {
        }}  
      >
            
        {posts.map((listing) => (
          <SwiperSlide key={listing.id}>
            <div className="item">
              <div className="listing-style1">
              {listing.D_url &&
                <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}}>
                <div className="list-thumb22" style={{position:'relative'}}>
                  <img
                    className="w-100 h-100 cover propertyimg" 
                    src={listing.photo}
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap tourimg">
                      <img src="../images/real-View-360_new.png" id="ifrmimg" style={{height:"150px",cursor:"pointer",marginTop:'26px'}} />
                  </div>
                  <div className="list-price">
                    {listing.price}
                  </div>
                </div></a>}
                {!listing.D_url &&
                <Link to={listing.link} target="_blank">
                <div className="list-thumb11" style={{position:'relative'}}>
                  <img
                    className="w-100 h-100 cover propertyimg"
                    src={listing.photo}
                    alt="listings"
                  />
                  <div className="list-price">
                    {listing.price}
                  </div>
                </div></Link>}
                <div className="list-content">
                  <h6 className="list-title">
                  {!listing.D_url && <Link to={listing.link} target="_blank">{listing.property_title}</Link>}
                  {listing.D_url && <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}}>{listing.property_title}</a>}
                  </h6>
                  {!listing.D_url && <Link to={listing.link} target="_blank">
                  <p className="list-text">{listing.location}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a>
                      <span className="flaticon-bed" /> {listing.beds} bed
                    </a>
                    <a>
                      <span className="flaticon-shower" /> {listing.bathrooms} bath
                    </a>
                    <a>
                      <span className="flaticon-expand" /> {listing.area}
                    </a>
                  </div>
                  </Link>}
                  {listing.D_url && <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}}>
                  <p className="list-text">{listing.location}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a>
                      <span className="flaticon-bed" /> {listing.beds} bed
                    </a>
                    <a>
                      <span className="flaticon-shower" /> {listing.bathrooms} bath
                    </a>
                    <a>
                      <span className="flaticon-expand" /> {listing.area}
                    </a>
                  </div>
                  </a>}
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    {/* <span className="for-what">For {listing.property_status}</span> */}
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
                  </div>
                </div>
              </div>
              <input type="hidden" id="contactDetailsflag" />
              <input type="hidden" id="end" />
              <input type="hidden" id="realViewprop" />
              <input type="hidden" id="submitBtn" />
              <input type="hidden" id="fav_id" />
              <input type="hidden" id="contactFlag" />
              <input type="hidden" id="contactFlag"/><input type="hidden" id="reviewFlag" value="0" /><input type="hidden" name="tourUrl" id="tourUrl" value="0" /><input type="hidden" name="isfulldetails" id="isfulldetails" value="0" /><input type="hidden" id="isreview" /><input type="hidden" id="loginPopup"  value={1}/><input type="hidden" id="realviewPopupflag"  value={0}/><input type="hidden" id="_isRealview" value={0} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeaturedListings;
