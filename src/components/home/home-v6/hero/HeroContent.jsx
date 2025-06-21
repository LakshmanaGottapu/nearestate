
import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom';

const HeroContent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("buy");
  var status_type=1;
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    status_type=(tab=="buy")?1:2;
    document.getElementById("prop_type").value=status_type;return;
  };
  useEffect(() => {
    
  //if(!document.querySelector(".pac-container")){ 
  document.querySelector(".pac-container")?.remove();
  var ac = new google.maps.places.Autocomplete((document.getElementById('autocomplete')), {address:'hyderabad', types: ['geocode'],componentRestrictions: {country:"in"}});ac.addListener('place_changed', function() { document.getElementById("locality").value=""; document.getElementById("sublocality_level_1").value=""; document.getElementById("sublocality_level_2").value=""; document.getElementById("sublocality_level_3").value="";document.getElementById("route").value="";document.getElementById("locality").value=""; document.getElementById("locality").value="";document.getElementById("postal_code").value=""; document.getElementById("administrative_area_level_1").value=""; document.getElementById("country").value="";var place = ac.getPlace();if (!place.geometry) { return; } document.getElementById("placeid").value=place.place_id;var componentForm = { street_number: 'short_name', sublocality_level_1: 'short_name', sublocality_level_2: 'short_name', sublocality_level_3: 'short_name', route: 'long_name', locality: 'long_name', administrative_area_level_1: 'short_name', postal_code: 'short_name', country:'short_name'};for (var i = 0; i < place.address_components.length; i++) {var addressType = place.address_components[i].types[0];if (componentForm[addressType]) { var val = place.address_components[i][componentForm[addressType]]; document.getElementById(addressType).value = val;}}});
 // }
  });
  function search(){
    let location=document.getElementById("autocomplete").value;
    //||  (document.getElementById("locality").value=="")
    if(location==""){
      document.getElementById("autocomplete").value="";
      document.getElementById("flash").style.display='block';
      document.querySelector("#flash p").style.paddingTop="10px";
      document.getElementById("flashcontent").textContent="Enter Address, City or State";
      setTimeout(()=>{document.getElementById("flash").style.display='none';},1500);
      return;
    }else{
      if(location.includes('Saroornagar')){
        document.getElementById("sublocality_level_1").value="Saroornagar";
      }
      let sublocality_level_1=document.getElementById("sublocality_level_1").value; 
      let locality=document.getElementById("locality").value; 
      if((sublocality_level_1=="" && locality=="Hyderabad") || (sublocality_level_1=="" && locality=="Secunderabad") || document.getElementById('autocomplete').value=="Telangana, India" || document.getElementById('autocomplete').value=="India"){
      document.querySelector("#flash p").style.paddingTop="6px";
      document.querySelector("#flash p").style.lineHeight="18px";
      document.getElementById("flashcontent").textContent="Enter Localities in your city eg: Madhapur, LB Nagar, etc"; 
      document.getElementById("flash").style.display='block';
      document.getElementById("autocomplete").value=""; 
      setTimeout(()=>{document.getElementById("flash").style.display='none';},1500);
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
    let status_type=(activeTab=='buy')?1:2;
    let placeid=document.getElementById('placeid').value;
    navigate(`/map-view?location=${location}&locality=${locality}&postal_code=${postal_code}&min_price=${min_price}&max_price=${max_price}&sublocation=${sublocation}&sublocation2=${sublocation2}&sublocation3=${sublocation3}&route=${route}&state=${state}&country=${country}&status=${status_type}&placeid=${placeid}`);
  }
  function chkLogin(){
    let _login=document.getElementById("logcol").innerText;
    if(_login.includes("Login")){
      document.getElementById("loginBtn").click();
      document.getElementById("autocomplete").value="";
      document.getElementById("autocomplete").blur();
      return false;
    }
    return false;
  }
  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    //{ id: "sold", label: "Sold" },
  ];

  return (
    <div className="advance-search-tab mt60 mt30-md mb25 animate-up-3">
      <ul className="nav nav-tabs p-0 m-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      {/* <div id="flash"><p><i className="far fa-warning fz16 me-1"></i>Please Enter Location</p></div>    */}
      <div id="flash"><p><i className="far fa-warning fz16 me-1"></i>&nbsp;<span id="flashcontent">Please Enter Location</span></p></div>  
      <div className="tab-content">
        {/* {tabs.map((tab) => ( */}
          <div>
            <div className="advance-content-style1">
              <div className="row">
                <div className="col-md-8 col-lg-9">
                  <div className="advance-search-field position-relative text-start">
                    <form className="form-search position-relative">
                      <div className="box-search">
                        <span className="icon flaticon-home-1" />
                        <input
                          className="form-control bgc-f7 bdrs12"
                          type="text"
                          id="autocomplete"
                          name=""
                          autoComplete="off"
                          onFocus={()=>chkLogin()}
                          onKeyUp={()=>chkLogin()}
                          onKeyDown={()=>chkLogin()}
                          // onInput={() => initialize()}
                          placeholder={`Enter Localities in your city eg: Madhapur, LB Nagar, etc`}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                {/* End .col-md-8 */}

                <div className="col-md-4 col-lg-3">
                  <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                    <button
                      className="advance-search-btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#advanceSeachModal"
                    >
                      <span className="flaticon-settings" style={{color:"#3c6afd"}} /> Advanced
                    </button>
                    <button
                      className="advance-search-icon ud-btn btn-thm ms-4"
                      type="button"
                      onClick={() => search()}
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* ))} */}
      </div>
      <form name="searchFrm" action="https://www.nearestate.in/map_view" method="get"><input type="hidden" name="location" id="location" /><input type="hidden" name="type" id="type" /><input type="hidden" name="min-price" id="minprce" /><input type="hidden" name="max-price" id="maxprce" /><input type="hidden" id="street_number" name="street_name" /> <input type="hidden" id="sublocality_level_1" name="sublocation" /> <input type="hidden" id="sublocality_level_2" name="sublocation2" /> <input type="hidden" id="sublocality_level_3" name="sublocation3" /> <input type="hidden" id="route" name="route"/> <input type="hidden" id="locality" name="locality"/> <input type="hidden" id="postal_code" name="postal_code"/> <input type="hidden" id="administrative_area_level_1" name="state"/> <input type="hidden" id="country" name="country"/><input type="hidden" id="prop_type" value={1} /><input type="hidden" id="placeid" name="placeid"/></form>
    </div>
  );
};

export default HeroContent;
