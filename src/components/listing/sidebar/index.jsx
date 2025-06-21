import { useState,useMemo,useEffect} from "react";
import SearchBox from "./SearchBox";
//import ListingStatus from "./ListingStatus";
//import PropertyType from "./PropertyType";
//import PriceSlider from "./PriceRange";
//import Bedroom from "./Bedroom";
//import Bathroom from "./Bathroom";
//import Location from "./Location";
//import SquareFeet from "./SquareFeet";
//import YearBuilt from "./YearBuilt";
//import OtherFeatures from "./OtherFeatures";
import Select from "react-select";
import Amenities from "../../common/advance-filter-two/Amenities";
import {useNavigate,useLocation} from 'react-router-dom';
const ListingSidebar = () => {
  var realViewprop=0;
  const mylocation = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(mylocation.search);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValue2, setSelectedValue2] = useState();
  const [selectedValue3, setSelectedValue3] = useState();
  const [selectedValue4, setSelectedValue4] = useState();
  const [selectedValue5, setSelectedValue5] = useState();
  const [selectedValue6, setSelectedValue6] = useState();
  const [selectedValue7, setSelectedValue7] = useState();
  const [selectedValue8, setSelectedValue8] = useState();
  const [clearable, setClearable] = useState(true);
  const catOptions = [
    { value: "9", label: "Agriculture land" },
    { value: "5", label: "Duplex Flat" },
    { value: "3", label: "Duplex house" },
    { value: "13", label: "Farm Land" },
    { value: "2", label: "Flat" },
    { value: "11", label: "G+1 independent house" },
    { value: "12", label: "G+2 independent house" },
    { value: "1", label: "Independent house" },
    { value: "7", label: "Open Plot" },
    { value: "8", label: "Pent house" },
    { value: "10", label: "Single room" },
    { value: "4", label: "Triplex House" },
    { value: "6", label: "Villa" }
  ];
  var priceOptions=[
    { value: "1000", label: "1000 Rs" },
    { value: "2000", label: "2000 Rs" },
    { value: "5000", label: "5000 Rs" },
    { value: "10000", label: "10000 Rs" },
    { value: "20000", label: "20000 Rs" },
    { value: "50000", label: "50000 Rs" },
    { value: "100000", label: "1 Lac" },
    { value: "250000", label: "2.5 Lacs" },
    { value: "500000", label: "5 Lacs" },
    { value: "750000", label: "7.5 Lacs" },
    { value: "1000000", label: "10 Lacs" },
    { value: "1250000", label: "12.5 Lacs" },
    { value: "1500000", label: "15 Lacs" },
    { value: "1750000", label: "17.5 Lacs" },
    { value: "2000000", label: "20 Lacs" },
    { value: "2250000", label: "22.5 Lacs" },
    { value: "2500000", label: "25 Lacs" },
    { value: "2750000", label: "27.5 Lacs" },
    { value: "3000000", label: "30 Lacs" },
    { value: "3250000", label: "32.5 Lacs" },
    { value: "3500000", label: "35 Lacs" },
    { value: "4000000", label: "40 Lacs" },
    { value: "4250000", label: "42.5 Lacs" },
    { value: "4500000", label: "45 Lacs" },
    { value: "4750000", label: "47.5 Lacs" },
    { value: "5000000", label: "50 Lacs" },
    { value: "5500000", label: "55 Lacs" },
    { value: "6000000", label: "60 Lacs" },
    { value: "6500000", label: "65 Lacs" },
    { value: "7000000", label: "70 Lacs" },
    { value: "7500000", label: "75 Lacs" },
    { value: "8000000", label: "80 Lacs" },
    { value: "8500000", label: "85 Lacs" },
    { value: "9000000", label: "90 Lacs" },
    { value: "9500000", label: "95 Lacs" },
    { value: "10000000", label: "1 Crs" },
    { value: "25000000", label: "2.5 Crs" },
    { value: "50000000", label: "5 Crs" },
    { value: "75000000", label: "7.5 Crs" },
    { value: "100000000", label: "10 Crs" },
    { value: "150000000", label: "15 Crs" },
    { value: "200000000", label: "20 Crs" },
    { value: "250000000", label: "25 Crs" },
    { value: "300000000", label: "30 Crs" },
    { value: "350000000", label: "35 Crs" },
    { value: "400000000", label: "40 Crs" },
    { value: "450000000", label: "45 Crs" },
    { value: "500000000", label: "50 Crs" }
  ];
  const transtype=[
    { value: "1", label: "New Property" },
    { value: "2", label: "Resale" }
  ];
  const bedrooms=[
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "5", label: "5 BHK" }
  ];
  const listedby=[
    { value: "1", label: "Agent" },
    { value: "2", label: "Owner" },
    { value: "3", label: "Builder" }
  ]
  const constructionstatus=[
    { value: "1", label: "Ready to move" },
    { value: "2", label: "Under construction" }
  ];
  const max_price = useMemo(() => { 
    if(selectedValue){
    setSelectedValue2(null);  
    var dropVal=parseInt(selectedValue.value);  
    return  priceOptions.filter((item)=>{ if(item.value>dropVal){ return item;} });
    }else{
      return priceOptions;
    }
  }, [selectedValue]);
  var searchamty=[];
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#3270FC"
          : isHovered
          ? "#f3f3f3"
          : isFocused
          ? "#f3f3f3"
          : undefined,
      };
    },
  };
  function resetfilter(){
    setSelectedValue(null); 
    setSelectedValue2(null);  
    setSelectedValue3(null);
    setSelectedValue4(null);
    setSelectedValue5(null);
    setSelectedValue6(null);  
    setSelectedValue7(null);  
    setSelectedValue8(null);  
    document.getElementById("min_area").value="";
    document.getElementById("max_area").value="";
    document.querySelectorAll(".propertyFeatures").forEach(function(element){
    element.checked=false;
  });
  }
  const advancefilter=()=>{
    let location=document.getElementById("autocomplete").value;
    if(location=="" ||  (document.getElementById("locality").value=="")){
      document.getElementById("autocomplete").value="";
      document.getElementById("searchflash").style.display='block';
      //setTimeout(()=>{document.getElementById("searchflash").style.display='none';},1500);
      return;
    }
    let locality=document.getElementById("locality").value;
    let postal_code=document.getElementById("postal_code").value;
    //let min_price=document.getElementById("minprce").value;
    //let max_price=document.getElementById("maxprce").value;
    let sublocation=document.getElementById("sublocality_level_1").value;
    let sublocation2=document.getElementById("sublocality_level_2").value;
    let sublocation3=document.getElementById("sublocality_level_3").value;
    let route=document.getElementById("route").value;
    let state=document.getElementById("administrative_area_level_1").value;
    let country=document.getElementById("country").value;
    let min_price=document.querySelector('#min_price > input').value;
    let max_price=document.querySelector('#max_price > input').value;
    let property_type=document.querySelector('#property_type > input').value;
    let transaction_type=document.querySelector('#transaction_type > input').value;
    let bedrooms=document.querySelector('#bedrooms > input').value;
    let listedby=document.querySelector('#listedby > input').value;
    let construction_status=document.querySelector('#construction_status > input').value;
    let min_area=document.querySelector('#min_area').value;
    let max_area=document.querySelector('#max_area').value;
    let status_type=document.querySelector('#p_status > input').value;
    let realview=realViewprop;
    let placeid=document.getElementById("placeid").value;
    // var amenty=[];
    // document.querySelectorAll(".propertyFeatures").forEach(function(item){
    
    //   if(item.checked==true){ 
    //     amenty.push(item.value);
    //   }
    // });
     var amenitie=searchamty.join(",");
     document.getElementById("sortBy").value="";
    let elem=document.getElementById("closebtn").click();
    navigate(`/list-view?location=${location}&locality=${locality}&postal_code=${postal_code}&min_price=${min_price}&max_price=${max_price}&sublocation=${sublocation}&sublocation2=${sublocation2}&sublocation3=${sublocation3}&route=${route}&state=${state}&country=${country}&property_type=${property_type}&transaction_type=${transaction_type}&beds=${bedrooms}&listedby=${listedby}&construction_status=${construction_status}&min_area=${min_area}&max_area=${max_area}&amenities=${amenitie}&status=${status_type}&realview=${realview}&placeid=${placeid}`);
  }
  useEffect(() => {
    document.getElementById("min_area").value=queryParams.get("min_area");
    document.getElementById("max_area").value=queryParams.get("max_area");
    var amen=queryParams.get("amenities")?queryParams.get("amenities").split(","):[];
    searchamty=amen;
    document.querySelectorAll(".propertyFeatures").forEach(function(item){
      if(amen.indexOf(item.value)>-1){
          item.checked=true;
      }
    });
    document.querySelectorAll(".propertyFeatures").forEach((item)=>{
        item.addEventListener("click",function(){
          if(searchamty.indexOf(item.value)>-1){
            let _index=searchamty.indexOf(item.value);
            searchamty.splice(_index,1);
          }else{
            searchamty.push(item.value);
          }
        });
    });
    if(queryParams.get("realview")>0){
      document.getElementById("realProp").checked=true;
    }
    });
    function realviewProperties(){
      let realviewproperties=document.getElementById("realProp");
      if(realviewproperties.checked){
        realViewprop=1;
      }else{
        realViewprop=0;
      }
    }
    const pstatus=[
      { value: "1", label: "Sale" },
      { value: "2", label: "Rent" }
    ];
  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper" style={{marginBottom:'10px'}}>
        {/* <h6 className="list-title">Find your home</h6> */}
        <SearchBox />
      </div>
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          <ListingStatus filterFunctions={filterFunctions} />
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Property Type</h6>
        <div className="checkbox-style1">
          <PropertyType filterFunctions={filterFunctions} />
        </div>
      </div> */}
      <div className="row" style={{marginBottom:'-25px'}}>
          <div className="col-lg-12">
            <div className="widget-wrapper">
                <div className="row">
                <div className="col-sm-4" id="realviewcol" style={{paddingTop:'6px'}}>
                <h6 className="list-title mb20">Realview360&deg;</h6>
                </div>
                  <div className="col-sm-8" style={{width:'50%'}}>
                    <div className="form-style2 input-group">
                    <label className="switch">
                      <input type="checkbox" id="realProp" onChange={()=>realviewProperties()} style={{float:'right',margin:'8px 5px'}}/>
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
      <div className="row">
            <div className="col-sm-12">
              <div className="widget-wrapper" style={{marginBottom:'10px'}}>
                <h6 className="list-title">Property Type</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={catOptions.filter((item)=>{ if(item.value==queryParams.get("property_type")){return item;}})}
                    value={selectedValue7}
                    placeholder="Property Type"
                    name="property_type"
                    id="property_type"
                    options={catOptions}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    onChange={(selectedValue7) => 
                    setSelectedValue7(selectedValue7)}
                    isClearable={clearable}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="widget-wrapper" style={{marginBottom:'10px'}}>
                <h6 className="list-title">Status</h6>
                <div className="form-style2 input-group">
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={pstatus.filter((item)=>{ if(item.value==queryParams.get("status")){return item;}})}
                    value={selectedValue8}
                    name="p_status"
                    id="p_status"
                    options={pstatus}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    placeholder="Status"
                    onChange={(selectedValue8) => 
                    setSelectedValue8(selectedValue8)} 
                    required
                  />
                </div>
                </div>
              </div>
            </div>
            {/* End .col-6 */}

            <div className="col-sm-12">
              <div className="widget-wrapper">
                <h6 className="list-title">Transaction Type</h6>
                <div className="form-style2 input-group">
                <Select
                    defaultValue={transtype.filter((item)=>{ if(item.value==queryParams.get("transaction_type")){return item;}})}
                    value={selectedValue3}
                    placeholder="Traction Type"
                    name="transaction_type"
                    id="transaction_type"
                    options={transtype}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    onChange={(selectedValue3) => 
                    setSelectedValue3(selectedValue3)}
                    isClearable={clearable}
                  />
                </div>
              </div>
            </div>
            {/* End .col-6 */}
          </div>
      
      {/* End .widget-wrapper */}

      <div className="widget-wrapper" style={{marginBottom:'10px'}}>
      <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper" style={{marginBottom:'10px'}}>
                <h6 className="list-title mb20">Price Range</h6>
                <div className="row">
                <div className="col-sm-12">
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={priceOptions.filter((item)=>{ if(item.value==queryParams.get("min_price")){return item;}})}
                    value={selectedValue}
                    name="min-price"
                    id="min_price"
                    options={priceOptions}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    placeholder="Min Price"
                    onChange={setSelectedValue}               
                    isClearable={clearable}
                  />
                </div>
                </div>
                <div className="col-sm-12 pt-10" style={{paddingTop:'20px'}}>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={priceOptions.filter((item)=>{ if(item.value==queryParams.get("max_price")){return item;}})}
                    value={selectedValue2}
                    name="max-price"
                    id="max_price"
                    options={max_price}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    placeholder="Max Price"
                    onChange={(selectedValue2) => 
                    setSelectedValue2(selectedValue2)} 
                    isClearable={clearable}
                  />
                </div>
                </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper" style={{marginBottom:'10px'}}>
      <div className="row">
            <div className="col-sm-12">
              <div className="widget-wrapper" style={{marginBottom:'10px'}}>
                <h6 className="list-title">Bedrooms</h6>
                {/* <div className="d-flex">
                  <Bedroom />
                </div> */}
                <div className="form-style2 input-group">
                <Select
                    defaultValue={bedrooms.filter((item)=>{ if(item.value==queryParams.get("beds")){return item;}})}
                    value={selectedValue4}
                    onChange={(selectedValue4) => 
                    setSelectedValue4(selectedValue4)}
                    placeholder="Bedrooms"
                    name="bedrooms"
                    id="bedrooms"
                    options={bedrooms}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    isClearable={clearable}
                  />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-12">
              <div className="widget-wrapper" style={{marginBottom:'10px'}}>
                <h6 className="list-title">Listed by </h6>
                <div className="form-style2 input-group">
                <Select
                    defaultValue={listedby.filter((item)=>{ if(item.value==queryParams.get("listedby")){return item;}})}
                    value={selectedValue5}
                    onChange={(selectedValue5) => 
                    setSelectedValue5(selectedValue5)}
                    placeholder="Listed by"
                    name="listedby"
                    id="listedby"
                    options={listedby}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    isClearable={clearable}
                  />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}
          </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper" style={{marginBottom:'10px'}}>
      <div className="row">
            <div className="col-sm-12">
              <div className="widget-wrapper">
                <h6 className="list-title">Construction Status</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={constructionstatus.filter((item)=>{ if(item.value==queryParams.get("construction_status")){return item;}})}
                    value={selectedValue6}
                    onChange={(selectedValue6) => 
                    setSelectedValue6(selectedValue6)}
                    placeholder="Construction Status"
                    name="construction_status"
                    id="construction_status"
                    styles={customStyles}
                    options={constructionstatus}
                    className="select-custom"
                    classNamePrefix="select"
                    isClearable={clearable}
                  />
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}

            <div className="col-sm-12">
              <div className="widget-wrapper" style={{marginBottom:'10px'}}>
                <h6 className="list-title">Square Feet</h6>
                <div className="space-area">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="form-style1">
                      <input
                        type="text"
                        name="min_area"
                        id="min_area"
                        className="form-control"
                        placeholder="Min."
                      />
                    </div>
                    <span className="dark-color">-</span>
                    <div className="form-style1">
                      <input
                        type="text"
                        name="max_area"
                        id="max_area"
                        className="form-control"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End .col-md-6 */}
          </div>
      </div>
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper advance-feature-modal">
        <h6 className="list-title">Location</h6>
        <div className="form-style2 input-group">
          <Location filterFunctions={filterFunctions} />
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Square Feet</h6>
        <SquareFeet filterFunctions={filterFunctions}/>
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Year Built</h6>
        <YearBuilt filterFunctions={filterFunctions}/>
      </div> */}
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <div className="feature-accordion">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-none">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button border-none p-0 after-none feature-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <span className="flaticon-settings" />Amenities
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0 mt15">
                  {/* <OtherFeatures filterFunctions={filterFunctions} /> */}
                  <div className="row" id="amenty">
                  <Amenities />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper mb20">
        <div className="btn-area d-grid align-items-center">
          <button className="ud-btn btn-thm"  onClick={() => advancefilter()}>
            <span className="flaticon-search align-text-top pr10" />
            Search
          </button>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div  onClick={() => resetfilter()} className="reset-button cursor" href="#">
          <span className="flaticon-turn-back" />
          <u>Reset all filters</u>
        </div>
        {/* <a className="reset-button" href="#">
          <span className="flaticon-favourite" />
          <u>Save Search</u>
        </a> */}
      </div>
    </div>
  );
};

export default ListingSidebar;
