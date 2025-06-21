//import { Tooltip as ReactTooltip } from "react-tooltip";
//import listings from "@/data/listings";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import PaginationTwo from "../../../../../src/components/listing/PaginationTwo";
const ListingsFavourites = () => {
  // const [favoriteListings, setFavoriteListings] = useState(
  //   listings.slice(0, 8)
  // );

  // const handleDeleteListing = (id) => {
  //   const updatedListings = favoriteListings.filter(
  //     (listing) => listing.id !== id
  //   );
  //   setFavoriteListings(updatedListings);
  // };
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageData,setPagedata]=useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  useEffect(() => {
    setPageItems(sortedFilteredData
      .slice((pageNumber - 1) * 4, pageNumber * 4))
      setPageContentTrac([((pageNumber - 1) * 4) + 1 ,pageNumber * 4,sortedFilteredData.length])
  }, [pageNumber,sortedFilteredData])
  useEffect(() => {
    var re = new RegExp("userid" + "=([^;]+)"); 
    var userId = re.exec(document.cookie);
    if(userId){
    var uId=(userId)?userId[1]:''
    let postObj={
      requestType:'favourite_listings',
      userid:uId,
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        document.getElementById("loadericon").style.display='none';
        document.getElementById("loaderimg").style.display='none'; 
        if(response.status==200 && response.data.length>0){
          setPosts(response.data);
          setPageNumber(1);
          var pagenum=(pageNumber * 8) > response.data.length ? response.data.length :(pageNumber * 8);
          var pagestart =((pageNumber - 1) * 8);
          let pageData2=response.data.slice(pagestart,pagenum);
          setPagedata(pageData2);
        }else{
          document.getElementById("noresults").style.display="block";
        }
      })
      .catch(error => {
        console.error(error);
      });
    }else{
      location.href="/";
    }
  }, [posts==0]);
  useEffect(() => {
    var pagenum=(pageNumber * 8) > posts.length ? posts.length :(pageNumber * 8);
    var pagestart =((pageNumber - 1) * 8);
    var pageData2=posts.slice(pagestart,pagenum);
    setPagedata(pageData2);
    if(posts.length>0){
      //document.getElementById("noresults").style.display="none";
    }else{}
  },[posts,pageNumber]);
    function favourite(id){
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
                  document.getElementById("customMsg").innerText="Favourite Deleted Successfully.";
                  let new_data=posts.filter((item)=>{ return item.id!=id });
                  setPageNumber(1);
                  setPosts(new_data);
                  var pagenum=(pageNumber * 8) > new_data.length ? new_data.length :(pageNumber * 8);
                  var pagestart =((pageNumber - 1) * 8);
                  let pageData2=new_data.slice(pagestart,pagenum);
                  setPagedata(pageData2);
                }
              })
              .catch(error => {
                console.error(error);
              }); 
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
      var re = new RegExp("userid" + "=([^;]+)"); 
      var userId = re.exec(document.cookie);
      if(userId){
        openInNewTab(_url);
      }
    }
    function openInNewTab(href) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: href,
      }).click();
    }
    function deleteProperty(id){
      favourite(id);return false;
    }
    // document.querySelectorAll(".tag-del").forEach(function(element){
    //   element.addEventListener("click",function(e){ 
    //     if(element.getAttribute("id")>0){alert();
    //     //document.getElementById("listing_"+element.getAttribute("id")).remove();
    //     favourite(element.getAttribute("id")); 
    //     e.preventDefault();e.stopImmediatePropagation();e.stopPropagation();
    //     }
    //   });
    // });
  return (
    <>
      {posts.length === 0 ? (
        <div><div id='noresults' style={{textAlign:'center',background:'#f3f3f3',display:'none',marginTop:'20%',marginBottom:'20%'}} className="alert alert-danger" role="alert"><i style={{color:'red'}} className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;<strong style={{color:'#000'}}>No Records Found.</strong></div><div id='loaderimg'><img src="images/favicongif.gif" id="loadericon" style={{position:'absolute',top:0,left:0,right:0,bottom:0,margin:'auto'}} width="100" /></div></div>
      ) : (
        pageData.map((listing) => (
          <div className="col-md-6 col-lg-4 col-xl-3" key={listing.id}>
            <div className="listing-style1 style2">
            <button className="tag-del" onClick={()=>deleteProperty(listing.id)} title="Delete Favourite" data-tooltip-id="delete-1" style={{border: 'none',left:'10px'}} fdprocessedid="a19dmd"><span className="fas fa-trash-can"></span></button>
              {listing.D_url && <div className="list-thumb" style={{overflow:'unset'}}>
                  <a style={{cursor:'pointer'}} onClick={()=>{realviewOpen(listing.id,listing.encryptid)}} title="Full Details">
                  <img
                    className="w-100 h-100 cover listimg"
                    src={listing.photo}
                    alt="listings"
                  />
                  <div className="sale-sticker-wrap tourimg">
                      <img src="../images/real-View-360_new.png" id="ifrmimg" style={{height:"116px",cursor:"pointer"}} />
                  </div>
                  <div className="list-price">
                    {listing.price}
                  </div>
                </a></div>}
                {!listing.D_url && <div className="list-thumb" style={{overflow:'unset'}}>
                <Link to={listing.link} title="Full Details" target="_blank">
                  <img
                    className="w-100 h-100 cover listimg"
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
                  <p className="list-text">{(listing.location.length>25)?listing.location.substr(0,24)+'..':listing.location}</p>
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
                  <p className="list-text2" dangerouslySetInnerHTML={{ __html: listing.myDescription }} >
                  </p>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">For {listing.property_status}</span>
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
                      
                    <a style={{cursor:'pointer'}} className="liked" onClick={()=>favourite(listing.id)} id={'likeIcon_'+listing.id}>
                      {/* <span className="flaticon-like" /> */}
                      <svg className="m-0 likeIcon" viewBox="0 0 24 24" color="#fd3752" style={{width: '18px',height: '18px'}}><path fill="#fd3752" d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" style={{transform: 'scale(1.5, 1.4)'}}></path></svg>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
              <input type="hidden" id="realViewprop" />
              <input type="hidden" id="submitBtn" />
              <input type="hidden" id="fav_id" />
              <input type="hidden" id="contactFlag" />
              <input type="hidden" id="contactFlag"/><input type="hidden" id="reviewFlag" value="0" /><input type="hidden" name="tourUrl" id="tourUrl" value="0" /><input type="hidden" name="isfulldetails" id="isfulldetails" value="0" /><input type="hidden" id="isreview" /><input type="hidden" id="loginPopup"  value={1}/><input type="hidden" id="realviewPopupflag"  value={0}/><input type="hidden" id="_isRealview" value={0} />
          </div>
        ))
      )}
      {posts.length>0 && <div className="row text-center">
      <div id='loaderimg'><img src="images/favicongif.gif" id="loadericon" style={{position:'absolute',top:0,left:0,right:0,bottom:0,margin:'auto'}} width="100" /></div>
        <PaginationTwo pageCapacity={8} data={posts} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
        </div>}
      {/* <div className="col-xl-12">
      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
        <div className="mt30">
          <Pagination />
        </div>
      </div>
    </div> */}
    </>
  );
};

export default ListingsFavourites;
