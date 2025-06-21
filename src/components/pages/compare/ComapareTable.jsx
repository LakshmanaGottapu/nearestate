import React, { useState,useEffect } from 'react'
import axios from "axios";
import {Link}  from "react-router-dom";

const ComapareTable = () => {
  const [pageData,setPagedata]=useState([]);
  useEffect(() => {
  var re = new RegExp("compareid" + "=([^;]+)"); 
  var userId = re.exec(document.cookie);
  if(userId){
    var compareArray=[];
    let val=(userId != null) ? unescape(JSON.parse(userId[1])):'';
    val.split(",").forEach((item)=>{
      if(item && compareArray.indexOf(parseInt(item))==-1){
        compareArray.push(parseInt(item));
      }
    });
  var postObj={
      compareids:compareArray.slice(Math.max(compareArray.length - 3, 0)),
      requestType:'compare'
  }
  axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
    .then(response => {
      console.log(response);
      if(response.status=="200"){
        setPagedata(response.data);
      }
      document.getElementById("loaderimg").style.display="none";
      document.getElementById("noresults").style.display="block";
    })
    .catch(error => {
      console.error(error);
    }); 
  }else{
    document.getElementById("loaderimg").style.display="none";
    document.getElementById("noresults").style.display="block";
  }
  },[]);
  function deleteProperty(id){
    var re = new RegExp("compareid" + "=([^;]+)"); 
    var userId = re.exec(document.cookie);
    var compareArray=[];
    let val=(userId != null) ? unescape(JSON.parse(userId[1])):'';
    val.split(",").forEach((item)=>{
      if(item && compareArray.indexOf(parseInt(item))==-1){
        compareArray.push(parseInt(item));
      }
    });
    let _index=compareArray.indexOf(parseInt(id));
    if(_index>-1){
      compareArray.splice(_index,1);
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);
      document.cookie = "compareid="+JSON.stringify(compareArray)+"; expires="+now.toUTCString()+"; path=/";
      let newData=pageData.filter((item)=> item.id!=id);
      setPagedata(newData);
      if(newData.length==0){
      setTimeout(()=>{
      document.getElementById("loaderimg").style.display="none";  
      document.getElementById("noresults").style.display="block";
      },100);  
      }
    }
  }
  return (
    <>
    {pageData.length>0 && <table className="table table-borderless mb-0">
      <thead className="t-head">
        <tr>
          <th scope="col" />
          <th scope="col"><Link target="_blank" to={'/'+pageData[0]?.link}>{pageData[0]?.title}</Link></th>
          <th scope="col"><Link target="_blank" to={'/'+pageData[1]?.link}>{pageData[1]?.title}</Link></th>
          <th scope="col"><Link target="_blank" to={'/'+pageData[2]?.link}>{pageData[2]?.title}</Link></th>
        </tr>
      </thead>
      {/* End thead */}

      <thead className="t-head2">
        <tr>
          <th scope="col" />
          {/* End th */}

          <th scope="col">
            <div className="membership_header">
              <div className="thumb" style={{position:'relative'}}>
              {pageData[0]?.id&&<button className="tag-del" onClick={()=>deleteProperty(pageData[0]?.id)} title="Delete Compare" data-tooltip-id="delete-1" style={{border: 'none',left:'10px',top:'10px',position:'absolute'}} fdprocessedid="a19dmd"><span className="fas fa-trash-can"></span></button>}
                {pageData[0]?.image&&<img
                  className="img-fluid mb-3 w100"
                  style={{width:'212px',height:'157px'}}
                  src={pageData[0]?.image}
                  alt="compare-1"
                />}
                <div className="h6 price mt-1">{pageData[0]?.price}</div>
                <p className="address mb-0">{pageData[0]?.city} {pageData[0]?.location}</p>
              </div>
            </div>
          </th>
          {/* End th */}

          <th scope="col">
            <div className="membership_header">
              <div className="thumb" style={{position:'relative'}}>
              {pageData[1]?.id&&<button className="tag-del" onClick={()=>deleteProperty(pageData[1]?.id)} title="Delete Compare" data-tooltip-id="delete-1" style={{border: 'none',left:'10px',top:'10px',position:'absolute'}} fdprocessedid="a19dmd"><span className="fas fa-trash-can"></span></button>}
              {pageData[1]?.image&&<img
                  style={{width:'212px',height:'157px'}}
                  className="img-fluid mb-3 w100"
                  src={pageData[1]?.image}
                  alt="compare-1"
                />}
                 <div className="h6 price mt-1">{pageData[1]?.price}</div>
                <p className="address mb-0">{pageData[1]?.city} {pageData[1]?.location}</p>
              </div>
            </div>
          </th>
          {/* End th */}

          <th scope="col">
            <div className="membership_header">
              <div className="thumb" style={{position:'relative'}}>
              {pageData[2]?.id&&<button className="tag-del" onClick={()=>deleteProperty(pageData[2]?.id)} title="Delete Compare" data-tooltip-id="delete-1" style={{border: 'none',left:'10px',top:'10px',position:'absolute'}} fdprocessedid="a19dmd"><span className="fas fa-trash-can"></span></button>} 
              {pageData[2]?.image&&<img
                  className="img-fluid mb-3 w100"
                  style={{width:'212px',height:'157px'}}
                  src={pageData[2]?.image}
                  alt="compare-1"
                />}
                 <div className="h6 price mt-1">{pageData[2]?.price}</div>
                <p className="address mb-0">{pageData[2]?.city} {pageData[2]?.location}</p>
              </div>
            </div>
          </th>
          {/* End th */}
        </tr>
      </thead>
      {/* End thead2 */}

      <tbody className="t-body">
        <tr>
          <th className="text-end" scope="row">
            Property Type
          </th>
          <td>{pageData[0]?.property_type}</td>
          <td>{pageData[1]?.property_type}</td>
          <td>{pageData[2]?.property_type}</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Address
          </th>
          <td style={{width:'30%'}}>{pageData[0]?.address}</td>
          <td style={{width:'30%'}}>{pageData[1]?.address}</td>
          <td style={{width:'30%'}}>{pageData[2]?.address}</td>
        </tr>
        <tr>
          <th className="text-end" scope="row">
          Transaction Type
          </th>
          <td>{pageData[0]?.transaction_type}</td>
          <td>{pageData[1]?.transaction_type}</td>
          <td>{pageData[2]?.transaction_type}</td>
        </tr>
        <tr>
          <th className="text-end" scope="row">
          Construction Status
          </th>
          <td>{pageData[0]?.constron_status}</td>
          <td>{pageData[1]?.constron_status}</td>
          <td>{pageData[2]?.constron_status}</td>
        </tr>
        <tr>
          <th className="text-end" scope="row">
          Listed by
          </th>
          <td>{pageData[0]?.iam}</td>
          <td>{pageData[1]?.iam}</td>
          <td>{pageData[2]?.iam}</td>
        </tr>
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            City
          </th>
          <td>New York</td>
          <td>Chicago</td>
          <td>New York</td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            State/county
          </th>
          <td>New York</td>
          <td>New York</td>
          <td>New York</td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Zip/Postal Code
          </th>
          <td>10013</td>
          <td>10013</td>
          <td>10013</td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Country
          </th>
          <td>United States</td>
          <td>United States</td>
          <td>United States</td>
        </tr> */}
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Property Size
          </th>
          <td>{pageData[0]?.area}</td>
          <td>{pageData[1]?.area}</td>
          <td>{pageData[2]?.area}</td>
        </tr>
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Property ID
          </th>
          <td>R43</td>
          <td>R43</td>
          <td>R43</td>
        </tr> */}
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Bedrooms
          </th>
          <td>{pageData[0]?.beds}</td>
          <td>{pageData[1]?.beds}</td>
          <td>{pageData[2]?.beds}</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Bathrooms{" "}
          </th>
          <td>{pageData[0]?.bathrooms}</td>
          <td>{pageData[1]?.bathrooms}</td>
          <td>{pageData[2]?.bathrooms}</td>
        </tr>
        {/* End tr */}

        <tr>
          <th className="text-end" scope="row">
            Garage
          </th>
          <td>{pageData[0]?.garages}</td>
          <td>{pageData[1]?.garages}</td>
          <td>{pageData[2]?.garages}</td>
        </tr>
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Air Conditioning
          </th>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Barbeque
          </th>
          <td>
            <a className="check_circle_close" href="#">
              <span className="fas fa-xmark" />
            </a>
          </td>
          <td>
            <a className="check_circle_close" href="#">
              <span className="fas fa-xmark" />
            </a>
          </td>
          <td>
            <a className="check_circle_close" href="#">
              <span className="fas fa-xmark" />
            </a>
          </td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Gym
          </th>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            Swimming Pool
          </th>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
        </tr> */}
        {/* End tr */}

        {/* <tr>
          <th className="text-end" scope="row">
            TV Cable
          </th>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
          <td>
            <a className="check_circle" href="#">
              <span className="fas fa-check" />
            </a>
          </td>
        </tr> */}
        {/* End tr */}
      </tbody>
      {/* End tbody */}
    </table>}
    {pageData.length==0 && <div><div id='noresults' style={{textAlign:'center',display:'none',background:'#f3f3f3'}} className="alert alert-danger" role="alert"><i style={{color:'red'}} className="fa fa-exclamation-triangle" aria-hidden="true"></i>&nbsp;<strong style={{color:'#000'}}>No Properties Found.</strong></div><div id='loaderimg'><img src="images/favicongif.gif" id="loadericon" style={{position:'absolute',top:0,left:0,right:0,bottom:0,margin:'auto'}} width="100" /></div></div>}<span id='noresults'></span><span id='loaderimg'></span>
  </>
  );
};

export default ComapareTable;
