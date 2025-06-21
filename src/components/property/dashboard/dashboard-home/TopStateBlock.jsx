import React,{useState,useEffect} from "react";
import axios from "axios";
const statisticsData = [
  {
    text: "Properties Listed",
    title: "totalListings",
    icon: "flaticon-home",
  },
  {
    text: "Total Views",
    title: "totalEnquires",
    icon: "flaticon-search-chart",
  },
  {
    text: "Total Reviews",
    title: "totalReview",
    icon: "flaticon-review",
  },
  {
    text: "Total Favorites",
    title: "totalFavourites",
    icon: "flaticon-like",
  },
];

const TopStateBlock = () => {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    var re = new RegExp("userid" + "=([^;]+)"); 
    var userId = re.exec(document.cookie);
    if(userId){
    var uId=(userId)?userId[1]:''
    let postObj={
      requestType:'dashboard',
      userid:uId,
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: { 'Content-Type': 'application/json' }})
      .then(response => {
        if(response.status=="200"){
        setPosts(response.data);
        console.log("response",response);
        }
      })
      .catch(error => {
        console.error(error);
      });
    }else{
      location.href="/";
    }
  },[]);
  return (
    <>
      {statisticsData.map((data, index) => (
        <div key={index} className="col-sm-6 col-xxl-3">
          <div className="d-flex justify-content-between statistics_funfact">
            <div className="details">
              <div className="text fz25">{data.text}</div>
              <div className="title" style={{textAlign:'center'}}>{posts[data.title]}</div>
            </div>
            <div className="icon text-center">
              <i className={data.icon} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopStateBlock;
