import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const SearchBox = ({location}) => {
  const navigate = useNavigate();
  useEffect(() => {
    //if(!document.querySelector(".pac-container")){
    document.querySelector(".pac-container")?.remove();
    var ac = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {address:'hyderabad', types: ['geocode'],componentRestrictions: {country:"in"}});ac.addListener('place_changed', function() { document.getElementById("locality").value=""; document.getElementById("sublocality_level_1").value=""; document.getElementById("sublocality_level_2").value=""; document.getElementById("sublocality_level_3").value="";document.getElementById("route").value="";document.getElementById("locality").value=""; document.getElementById("locality").value="";document.getElementById("postal_code").value=""; document.getElementById("administrative_area_level_1").value=""; document.getElementById("country").value="";   var place = ac.getPlace();if (!place.geometry) { return; } document.getElementById("placeid").value=place.place_id;var componentForm = { street_number: 'short_name', sublocality_level_1: 'short_name', sublocality_level_2: 'short_name', sublocality_level_3: 'short_name', route: 'long_name', locality: 'long_name', administrative_area_level_1: 'short_name', postal_code: 'short_name', country:'short_name'};for (var i = 0; i < place.address_components.length; i++) {var addressType = place.address_components[i].types[0];if (componentForm[addressType]) { var val = place.address_components[i][componentForm[addressType]]; document.getElementById(addressType).value = val;}}setTimeout(()=>{ search();document.getElementById("sortBy").value=""; },500);});
    //}
    });
    function search(){
      let location=document.getElementById("autocomplete").value;
      //|| (document.getElementById("locality").value=="")
      if(location==""){
        document.getElementById("autocomplete").value="";
        document.getElementById("searchflash").style.display='block';
        document.querySelector("#searchflash p").style.paddingTop="16px";
        document.getElementById("flashcontent").textContent="Enter Address, City or State";
        setTimeout(()=>{document.getElementById("searchflash").style.display='none';},1500);
        return;
      }else{
        if(location.includes('Saroornagar')){
          document.getElementById("sublocality_level_1").value="Saroornagar";
        }
        let sublocality_level_1=document.getElementById("sublocality_level_1").value; 
        let locality=document.getElementById("locality").value; 
        if((sublocality_level_1=="" && locality=="Hyderabad")  || (sublocality_level_1=="" && locality=="Secunderabad") || document.getElementById('autocomplete').value=="Telangana, India" || document.getElementById('autocomplete').value=="India"){ document.querySelector("#searchflash p").style.paddingTop="0";  document.getElementById("flashcontent").textContent="Enter Localities in your city eg: Madhapur, LB Nagar, etc"; 
        document.querySelector("#searchflash p").style.paddingTop="10px";
        document.getElementById("searchflash").style.display='block';
        document.getElementById("autocomplete").value=""; 
        setTimeout(()=>{document.getElementById("searchflash").style.display='none';},1500);
        return false; 
        }
    }  
    let locality=document.getElementById("locality").value;
    let postal_code=document.getElementById("postal_code").value;
    let min_price=document.getElementById("minprce").value;
    let max_price=document.getElementById("maxprce").value;
    let sublocation=document.getElementById("sublocality_level_1").value;
    let sublocation2=document.getElementById("sublocality_level_2").value;
    let sublocation3=document.getElementById("sublocality_level_3").value;
    let route=document.getElementById("route").value;
    let state=document.getElementById("administrative_area_level_1").value;
    let country=document.getElementById("country").value;
    let placeid=document.getElementById("placeid").value;
    let status_type=1;
    navigate(`/list-view?location=${location}&locality=${locality}&postal_code=${postal_code}&min_price=${min_price}&max_price=${max_price}&sublocation=${sublocation}&sublocation2=${sublocation2}&sublocation3=${sublocation3}&route=${route}&state=${state}&country=${country}&status=${status_type}&placeid=${placeid}`);
    }
    function clearinput(){
      document.getElementById("autocomplete").value="";
      document.getElementById("locality").value=""; document.getElementById("sublocality_level_1").value=""; document.getElementById("sublocality_level_2").value=""; document.getElementById("sublocality_level_3").value="";document.getElementById("route").value="";document.getElementById("locality").value=""; document.getElementById("locality").value="";document.getElementById("postal_code").value=""; document.getElementById("administrative_area_level_1").value=""; document.getElementById("country").value="";document.getElementById("placeid").value="";
    }
    function chkLogin(){
      let _login=document.getElementById("logcol").innerText;
      if(_login.includes("Login")){
        document.getElementById("loginBtn").click();
        document.getElementById("autocomplete").value="";
        document.getElementById("autocomplete").blur();
        return false;
      }
    }
  return (
    <div className="search_area">
      <div id="searchflash"><p><i className="far fa-warning fz16 me-1"></i>&nbsp;<span id="flashcontent">Please Enter Location</span></p></div>
      <input
        type="text"
        className="form-control"
        id="autocomplete"
        onKeyUp={()=>chkLogin()}
        onKeyDown={()=>chkLogin()}
        placeholder={`Enter Localities in your city eg: Madhapur, LB Nagar, etc`}
        //value={location}
        onFocus={()=>{clearinput()}}
      />
      {/* <span className="flaticon-close align-text-top pr10" onClick={()=> clearinput()} style={{position: 'absolute',float: 'right',right: '0px',top: '8px',cursor:'pointer',fontSize:'16px'}}></span> */}
      <label>
        <span className="flaticon-search" />
      </label>
      <form name="searchFrm" action="https://www.nearestate.in/map_view" method="get"><input type="hidden" name="location" id="location" /><input type="hidden" name="type" id="type" /><input type="hidden" name="min-price" id="minprce" /><input type="hidden" name="max-price" id="maxprce" /><input type="hidden" id="street_number" name="street_name" /> <input type="hidden" id="sublocality_level_1" name="sublocation" /> <input type="hidden" id="sublocality_level_2" name="sublocation2" /> <input type="hidden" id="sublocality_level_3" name="sublocation3" /> <input type="hidden" id="route" name="route"/> <input type="hidden" id="locality" name="locality"/> <input type="hidden" id="postal_code" name="postal_code"/> <input type="hidden" id="administrative_area_level_1" name="state"/> <input type="hidden" id="country" name="country"/><input type="hidden" id="prop_type" value={1} /><input type="hidden" id="placeid" name="placeid"/></form>
    </div>
  );
};
export default SearchBox;
