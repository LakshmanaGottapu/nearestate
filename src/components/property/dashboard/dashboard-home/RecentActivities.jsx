import React, { useState, useEffect } from 'react';
import axios from "axios";
const activities = [
  {
    icon: "flaticon-home",
    text: "Your listing House on the Beverly Hills has been approved",
    highlight: "House on the Beverly Hills",
  },
  {
    icon: "flaticon-review",
    text: "Dollie Horton left a review on House on the Northridge",
    highlight: "House on the Northridge",
  },
  {
    icon: "flaticon-like",
    text: "Someone favorites your Triple Story House for Rent listing",
    highlight: "Triple Story House for Rent",
  },
  {
    icon: "flaticon-home",
    text: "Your listing House on the Beverly Hills has been approved",
    highlight: "House on the Beverly Hills",
  },
  {
    icon: "flaticon-review",
    text: "Dollie Horton left a review on House on the Northridge",
    highlight: "House on the Northridge",
  },
  {
    icon: "flaticon-like",
    text: "Someone favorites your Triple Story House for Rent listing",
    highlight: "Triple Story House for Rent",
  },
  {
    icon: "flaticon-home",
    text: "Your listing House on the Beverly Hills has been approved",
    highlight: "House on the Beverly Hills",
  },
];

const RecentActivities = () => {
  const [propertyData,setPropertydata]=useState([]);
  const [favData,setFavdata]=useState([]);
  const [reviewData,setreviewData]=useState([]);
  const [enqData,setEnqdata]=useState([]);
  useEffect(()=>{
  var re = new RegExp("userid" + "=([^;]+)"); 
  var userId = re.exec(document.cookie);
  var postObj={
    userid:userId[1],
    requestType:'recent_activities'
}
  axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
  .then(response => {
    console.log(response);
    if(response.status=="200"){
      setPropertydata(response.data.totalListings);
      setFavdata(response.data.fav);
      setreviewData(response.data.reviews);
      setEnqdata(response.data.enquiries);
    }
  })
  .catch(error => {
    console.error(error);
  }); 
  },[]);
  return (
    <>
      {propertyData.length>0 && propertyData.map((activity, index) => (
        <div
          key={index}
          className="recent-activity d-sm-flex align-items-center mb20"
        >
          <span className={`icon me-3 flaticon-home flex-shrink-0`} />
          <p className="text mb-0 flex-grow-1">
           Your listing <span className="fw600">{activity}</span> has been approved
            {/* {activity.text.split(activity.highlight).map((part, i, array) =>
              i === array.length - 1 ? (
                part
              ) : (
                <>
                  {part}
                  <span key={i} className="fw600">{activity.highlight}</span>
                </>
              )
            )} */}
          </p>
        </div>
      ))}
      {favData.length>0 && favData.map((activity, index) => (
        <div
          key={index}
          className="recent-activity d-sm-flex align-items-center mb20"
        >
          <span className={`icon me-3 flaticon-like flex-shrink-0`} />
          <p className="text mb-0 flex-grow-1">
           {activity.username} favorites your <span className="fw600">{activity.property_title}</span> listing
          </p>
        </div>
      ))}
      {reviewData.length>0 && reviewData.map((activity, index) => (
        <div
          key={index}
          className="recent-activity d-sm-flex align-items-center mb20"
        >
          <span className={`icon me-3 flaticon-review flex-shrink-0`} />
          <p className="text mb-0 flex-grow-1">
           {activity.username} left a review <span className="fw600">{activity.property_title}</span>
          </p>
        </div>
      ))}
       {enqData.length>0 && reviewData.map((activity, index) => (
        <div
          key={index}
          className="recent-activity d-sm-flex align-items-center mb20"
        >
          <span className={`icon me-3 flaticon-review flex-shrink-0`} />
          <p className="text mb-0 flex-grow-1">
           {activity.username} has enquired about your property <span className="fw600">{activity.property_title}</span>
          </p>
        </div>
      ))}
    </>
  );
};

export default RecentActivities;
