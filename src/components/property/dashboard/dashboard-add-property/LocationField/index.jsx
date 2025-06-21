import React, { useState,useEffect } from "react";
//import SelectMulitField from "./SelectMulitField";
//import Map from "./Map";

const LocationField = () => {
  var inZoom=false;
  var geocoder = new google.maps.Geocoder();
  var marker ='';
  function geocodePosition(pos){
    geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if (responses && responses.length > 0) {
            console.log("responses",responses);
            document.getElementById("latitude").value=marker.getPosition().lat();
            document.getElementById("longitude").value=marker.getPosition().lng();
            document.getElementById('address').value = responses[1].formatted_address;
            document.getElementById("address-map").value=responses[0].formatted_address;
            ///$('#address').removeClass('errorField');
            //$('#address').next('.errortxt').remove();
            var componentForm = {
                // street_number: 'short_name',
                // route: 'long_name',
                locality: 'long_name',
                political: 'short_name',
                sublocality: 'short_name',
                sublocality_level_1: 'long_name',
                administrative_area_level_1: 'short_name',
                postal_code: 'short_name'
            };
            for (var i = 0; i < responses[1].address_components.length; i++) {
                var addressType = responses[1].address_components[i].types[0];
                if (componentForm[addressType]) {
                    var val = responses[1].address_components[i][componentForm[addressType]];
                    //$('#' + addressType).removeClass('errorField');
                    //$('#' + addressType).next('.errortxt').remove();
                    document.getElementById(addressType).value = val;
                }
            }
            //var autocomplete = new google.maps.places.Autocomplete(responses[0].formatted_address);
        } else {
            //updateMarkerAddress('Cannot determine address at this location.');
        }
    });
  }
  function getLocation() {
    if (navigator.geolocation) {
        document.getElementById("addrerror").style.display="none";
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    console.log(position.coords);
    document.getElementById("latitude").value = position.coords.latitude;
    document.getElementById("longitude").value = position.coords.longitude;
    google.maps.event.addDomListener(window, 'load', initSubmitMap(position.coords.latitude, position.coords.longitude));
    GetAddress();
  }
  useEffect(() => {
    document.getElementById("address-map").addEventListener("click",function(){
      if(!document.querySelector(".map-container").classList.contains("fixed-map")){
        this.blur();
        setTimeout(()=>{
            //document.body.find(".pac-container").style.display="none";
            this.removeAttribute("readonly");
        },500);
    }
    document.getElementById("addrerror").style.display="none";
    document.getElementById("submit-map").classList.add("fixed-map");
    document.getElementById("inputlocation").classList.add("fixed-map");
    document.getElementById("tip-floater").style.display='block';
    inZoom=true;
    document.getElementById("mapClose").style.display='block';
    document.getElementById("address-map").removeAttribute("readonly");
    document.getElementById("search_col").classList.add("searchBar");
  });
  document.getElementById("mapClose").addEventListener("click",function(){
      this.style.display="none";
      document.getElementById("submit-map").classList.remove("fixed-map");
      document.getElementById("inputlocation").classList.remove("fixed-map");
      document.getElementById("tip-floater").style.display='none';
      inZoom=false;
      document.getElementById("address-map").setAttribute("readonly",true);
      document.getElementById("search_col").classList.remove("searchBar");
      document.getElementById("mapClose").style.display='none';
      document.querySelectorAll(".pac-container").forEach(function(element){
        element.style.display='none';
      });
  });
    var _latitude = 20.5937;
    var _longitude = 78.9629;
    google.maps.event.addDomListener(window, 'load', initSubmitMap(_latitude, _longitude));
  },[]);
  function initSubmitMap(_latitude, _longitude){
    var mapCenter = new google.maps.LatLng(_latitude, _longitude);
    var mapOptions = {
        zoom: 6,
        center: mapCenter,
        disableDefaultUI: false,
        mapId:"475f881958a6435e",
        mapTypeControl: false,
        scaleControl: false,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl:false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER,
        },
    };
    var mapElement = document.getElementById('submit-map');
    var map = new google.maps.Map(mapElement, mapOptions);
    marker = new MarkerWithLabel({
        position: mapCenter,
        map: map,
        icon: 'images/marker-h.png',
        labelAnchor: new google.maps.Point(50, 0),
        anchorPoint: new google.maps.Point(0, -29),
        draggable: true
    });
    google.maps.event.addListener(map, 'mousemove', function(e) { 				
      if(document.getElementById('hid_count').value==0){
       marker.setPosition(e.latLng);
      }
    });
    var zoomlevel1=map.getZoom();
			if(zoomlevel1==4 && document.getElementById('hid_count').value==0){ marker.setMap(null); }else { marker.setMap(map); }
			marker.setMap(null);
      google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoomlevel=map.getZoom();
        if(zoomlevel<16 && document.getElementById('hid_count').value==0)
        {
          marker.setMap(null);
          map.setOptions({ draggableCursor : "auto" });
          document.getElementById("zoom_sugg").style.display="block";
          setTimeout(function() { 
            document.getElementById("zoom_sugg").style.display="none";
          }, 1500);
          document.getElementById("tip-floater-content").innerHTML='Enter the address of the property in to the search bar or zoom into the location to locate the property.';
          document.getElementById("tip-floater-title").innerHTML="Search for an address or zoom in to locate property";
        }
        else
        {
          document.getElementById("tip-floater-content").innerHTML='Click to drop the marker on top of the property where it is located.';
          document.getElementById("tip-floater-title").innerHTML="Locating Property";
          marker.setMap(map);
          map.setOptions({draggableCursor:"auto"}); 
          document.getElementById("zoom_sugg").style.display="none";
        }
        });
        google.maps.event.addListener(map, 'click', function(e) {
				if(document.getElementById('hid_count').value==0 || inZoom==false){
					 //$(".map-container,#submit-map").addClass("fixed-map");
           document.getElementById("submit-map").classList.add("fixed-map");
					 //$("#inputlocation").addClass("fixed-input");
           document.getElementById("inputlocation").classList.add("fixed-map");
					 //$("#tip-floater").show();
           document.getElementById("tip-floater").style.display='block';
					 inZoom=true;
           //$("#mapClose").show();
           document.getElementById("mapClose").style.display='block';
					 //$('#address-map').removeAttr("readonly");
           document.getElementById("address-map").removeAttribute("readonly");
           document.getElementById("search_col").classList.add("searchBar");
				}
				var zoomlevel=map.getZoom();
				map.setOptions({ draggableCursor : "auto" });
				if(zoomlevel>15 && document.getElementById('hid_count').value==0){
				document.getElementById('hid_count').value =1;
				let clickLocation = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());
				marker.setPosition(clickLocation);
				geocodePosition(marker.getPosition());
				document.getElementById('tip-floater').style.display='none';
				//$(".map-container,#submit-map").removeClass("fixed-map");
        document.getElementById("submit-map").classList.remove("fixed-map");
        document.getElementById("inputlocation").classList.remove("fixed-map");
					//$("#tip-floater").hide(500);
          document.getElementById("tip-floater").style.display='none';
					inZoom=false;
					//$('#address-map').prop('readonly', true);
          document.getElementById("address-map").setAttribute("readonly",true);
          document.getElementById("search_col").classList.remove("searchBar");
					//$("#mapClose").hide();
          document.getElementById("mapClose").style.display='none';
					map.setCenter(marker.getPosition());
          document.querySelectorAll(".pac-container").forEach(function(element){
            element.style.display='none';
          });
				}
			});
      google.maps.event.addListener(marker, 'dragstart', function() {});
        google.maps.event.addListener(marker, 'drag', function() {});
        google.maps.event.addListener(marker, 'dragend', function() {
        document.querySelector(".pac-container").style.display="none";  
				document.getElementById('hid_count').value=1;
        document.getElementById("submit-map").classList.remove("fixed-map");
        document.getElementById("inputlocation").classList.remove("fixed-map");
				document.getElementById("tip-floater").style.display='none';
				inZoom=false;
        document.getElementById("search_col").classList.remove("searchBar");
				document.getElementById("address-map").setAttribute("readonly",true);
				document.getElementById("mapClose").style.display='none';
        document.querySelectorAll(".pac-container").forEach(function(element){
          element.style.display='none';
        });
				map.setCenter(marker.getPosition())
    });
    document.getElementById('submit-map').classList.remove('fade-map');
    google.maps.event.addListener(marker, "mouseup", function(event) {
      var latitude = this.position.lat();
      var longitude = this.position.lng();
      document.getElementById("latitude").value=this.position.lat();
      document.getElementById("longitude").value=this.position.lng();
      GetAddress();
    });
    //Autocomplete
    var input = /** @type {HTMLInputElement} */ (document.getElementById('address-map'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);
        document.getElementById("addrerror").style.display="none";
        document.getElementById("latitude").value=marker.getPosition().lat();
        document.getElementById("longitude").value=marker.getPosition().lng();
        var address = '';
        var componentForm = {
            // street_number: 'short_name',
            // route: 'long_name',
            locality: 'long_name',
            political: 'short_name',
            sublocality: 'short_name',
            sublocality_level_1: 'long_name',
            administrative_area_level_1: 'short_name',
            postal_code: 'short_name'
        };
        document.getElementById('locality').value = '';
        document.getElementById('political').value = '';
        document.getElementById('sublocality').value = '';
        document.getElementById('sublocality_level_1').value = '';
        document.getElementById('administrative_area_level_1').value = '';
        document.getElementById('postal_code').value = '';
        //$('#address').removeClass('errorField');
        //$('#address').next('.errortxt').remove();
        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
                var val = place.address_components[i][componentForm[addressType]];
                //$('#' + addressType).removeClass('errorField');
                //$('#' + addressType).next('.errortxt').remove();
                document.getElementById(addressType).value = val;
            }
        }
        if (place.address_components) {
            //console.log(place.address_components);
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || ''),
                (place.address_components[3] && place.address_components[3].short_name || ''),
                (place.address_components[4] && place.address_components[4].short_name || ''),
                (place.address_components[5] && place.address_components[5].long_name || ''),
                (place.address_components[6] && place.address_components[6].short_name || ''),
            ].join(' ');
            document.getElementById('address').value = address;
            document.getElementById('address-map').value = address;
            document.getElementById("address-map").classList.remove("errorField");
            //$('#address-map').next('.errortxt').remove();
        }
    });
  }
  
  function GetAddress() {
    var lat = parseFloat(document.getElementById("latitude").value);
    var lng = parseFloat(document.getElementById("longitude").value);
    var latlng = new google.maps.LatLng(lat, lng);
    var geocoder = geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'latLng': latlng
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
                var componentForm = {
                    locality: 'long_name',
                    political: 'short_name',
                    sublocality: 'short_name',
                    sublocality_level_1: 'short_name',
                    administrative_area_level_1: 'short_name',
                    postal_code: 'short_name'
                };
                document.getElementById('address').value = results[1].formatted_address;
                document.getElementById('address-map').value = results[1].formatted_address;
                // $("#address-map").removeClass('errorField');
                // $('#address-map').next('.errortxt').remove();
                document.getElementById('locality').value = '';
                document.getElementById('political').value = '';
                document.getElementById('sublocality').value = '';
                document.getElementById('sublocality_level_1').value = '';
                document.getElementById('administrative_area_level_1').value = '';
                document.getElementById('postal_code').value = '';
                // $('#address').removeClass('errorField');
                // $('#address').next('.errortxt').remove();
                for (var i = 0; i < results[1].address_components.length; i++) {
                    var addressType = results[1].address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = results[1].address_components[i][componentForm[addressType]];
                        // $('#' + addressType).removeClass('errorField');
                        // $('#' + addressType).next('.errortxt').remove();
                        document.getElementById(addressType).value = val;
                    }
                }
            }
        }
    });
  }
  return (
    <form className="form-style1">
      <div className="row">
        {/* <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
            />
          </div>
        </div> */}
        {/* End col-12 */}

        {/* <SelectMulitField /> */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Zip</label>
            <input type="text" className="form-control" />
          </div>
        </div> */}
        {/* End col-4 */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Neighborhood
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Neighborhood"
            />
          </div>
        </div> */}
        {/* End col-4 */}

        <div className="col-sm-12">
          <div className="mb10 mt10">
            <label className="heading-color ff-heading fw600 mb10">
            Place Marker on map (OR) <a style={{cursor:'pointer'}} onClick={()=>getLocation()}> Use Current Location</a>
            </label>
            {/* <input type="text" id="dummyinput" style={{position:'absolute',zIndex:-1}} /> */}
            <div id="search_col">
            <label><span className="dec-icon"><i className="far fa-map-marker"></i></span></label>
            <input type="text" style={{paddingLeft:'53px',marginBottom:'20px'}} autoComplete="off" className="form-control" placeholder="Address" readOnly id="address-map" name="address2" />
            <p id="addrerror" className="errors">Please enter address</p>
            </div>
            <div className="map-container" id="inputlocation"><div style={{height:'300px'}} id="submit-map"></div></div>
            {/* <Map /> */}
          </div>
        </div>
        {/* End col-12 */}
      </div>
      {/* End .row */}
      {/* End .row */}
      <div id="tip-floater" className="hide-for-lightweight-ui pancake-add-place-hide">
          <div id="tip-floater-title-container"><span id="tip-floater-title">Search for an address or zoom in to locate property</span><a id="tip-floater-icon" title="list your home for sale or rent with redial.in"></a></div>
          <div id="tip-floater-content" style={{height:"50px",textAlign:'center',lineHeight:'20px'}}>Enter the address of the property in to the search bar or zoom into the location to locate the property.</div>
      </div>
      <div align="center" id="zoom_sugg">Enter the address of the property into the search bar or zoom into its location</div>
      <div className="add-list_wrap" id="mapClose" style={{float: 'right',position: 'fixed',right: '6px',zIndex: '999999999999',top: '10vh', display:'none'}}>
		<a className="add-list color-bg" style={{width: '44px',cursor:'pointer',paddingLeft:'20px'}}><i className="fal fa-close"></i></a>
	    </div>
      <input type="hidden" name="address" id="address" className="form-control" placeholder="Enter property address" />
      <input type="hidden" id="locality" name="city" className="form-control" placeholder="Town/City" />
      <input type="hidden" id="sublocality_level_1" name="location" className="form-control" />
      <input type="hidden" id="sublocality" name="sublocality" className="form-control" />
      <input type="hidden" id="political" name="political" className="form-control" />
      <input type="hidden" name="zipcode" id="postal_code" className="form-control" placeholder="Pin Code" />
      <input type="hidden" placeholder="State" name="state" id="administrative_area_level_1" className="form-control" />
      <input type="hidden" className="form-control" placeholder="Latitude" id="latitude" name="latitude" readOnly />
      <input type="hidden" className="form-control" placeholder="Longitude" id="longitude" name="longitude" readOnly />
      <input type="hidden" name="sign-in" id="sign-in" value="" />
      <input type="hidden" name="action" id="action" value="2" />
      <input type="hidden" name="loginPage" id="loginPage" value="100" />
      <input type="hidden" id="hid_count" value="0"/>
      {/* <input type="hidden" name="address" id="address" className="form-control" placeholder="Enter property address" /> */}
    </form>
  );
};

export default LocationField;
