import React,{useEffect,useState,useRef} from "react";
//import PropertyDescription from "./property-description";
//import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
//import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import Select from "react-select";
import { Tooltip as ReactTooltip } from "react-tooltip";
import axios from "axios";
import {useNavigate,useParams} from 'react-router-dom';

const EditPropertyTabContent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [clearable, setClearable] = useState(true);
  const [categoryValue,setCategory]=useState();
  const [ptypeValue,setPtypevalue]=useState();
  const [transValue,setTransvalue]=useState()
  const [areatypeValue,setAreatypevalue]=useState();
  const [cnstatusValue,setCnstatusvalue]=useState();
  const [bedsValue,setBedsvalue]=useState();
  const [bathValue,setBathvalue]=useState();
  const [carparkingValue,setparkingvalue]=useState();
  const [iamValue,setiamvalue]=useState();
  const [gatedValue,setGatedvalue]=useState();
  const [uploadedImages, setUploadedImages] = useState([]);
  const [filenames, setFileNames] = useState([]);
  const fileInputRef = useRef(null);
  const [editId,setEditid]=useState('');
  const [propertyData,setPropertydata]=useState([]);
  const catergoryOptions=[
    { value: "1", label: "Sale" },
    { value: "2", label: "Rent" },
  ];
  const listedIn = [
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
  const PropertyStatus = [
    { value: "1", label: "NewProperty" },
    { value: "2", label: "Resale" }
  ];
  const areaunits=[
    { value: "1", label: "Sq.Ft" },
    { value: "2", label: "Sq.Yds" },
    { value: "3", label: "Acres" }
  ];
  const conStatus=[
    { value: "1", label: "Ready to move" },
    { value: "2", label: "Under construction" }
  ];
  const bedrooms=[
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" }
  ];
  const bathrooms=[
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" }
  ];
  const carparking=[
    { value: "0", label: "0" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ]
  const iam=[
    { value: "1", label: "Owner" },
    { value: "2", label: "Agent" },
    { value: "3", label: "Builder" }
  ]
  const gated=[
    { value: "1", label: "Yes" },
    { value: "2", label: "No" }
  ];
  const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#f3f3f3"
          : isFocused
          ? "#f3f3f3"
          : undefined,
          zIndex: 99999999,
      };
    },
  };
  useEffect(() => {
    if(params){ 
      setEditid(params?.id);
      var re = new RegExp("userid" + "=([^;]+)"); 
      var value = re.exec(document.cookie);
      if(value){
        let postObj={
          requestType:'propertyInfo',
          userid:value[1],
          propertyid:params?.id
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
          .then(response => {
          if(response.status==200 && response.data){
            setPropertydata(response.data);
              document.getElementById("propertyTitle").value=response.data?.title;
              document.getElementById("price").value=response.data?.price;
              document.getElementById("area").value=response.data?.area;
              document.getElementById("videoLink").value=response.data?.video_link;
              document.getElementById("latitude").value = response.data?.latitude;
              document.getElementById("longitude").value = response.data?.longitude;
              document.getElementById('address').value = response.data?.address;
              document.getElementById('address-map').value = response.data?.address;
              document.getElementById("locality").value=response.data?.city;
              document.getElementById("sublocality_level_1").value=response.data?.location;
              document.getElementById("administrative_area_level_1").value=response.data?.state;
              setTimeout(()=>{
                tinymce.activeEditor.setContent(response.data?.description);
               },1000);
              setCategory(catergoryOptions.filter((item)=>{ if(item.value==response.data?.property_status){return item;}}));
              let dbProp=listedIn.filter((item)=>{ if(item.value==response.data?.property_type){return item;}});
              setPtypevalue(dbProp);
              
              var id=response.data?.property_type;
              document.getElementById("ptypeerror").style.display="none";
              if(!id){
                document.getElementById("construction-status").style.display="block";
                document.getElementById("ptypeerror").style.display="block";
              }
              if (id == 7 || id == 9 || id == 13 || id==11 || id==12) {
                  document.querySelectorAll(".property_types").forEach(function(element){
                    element.style.display="none";
                  });
                  document.getElementById("amenities").style.display="none";
                  document.querySelectorAll(".pamenities").forEach(function(element){
                    element.checked=false;
                  });
                  setBedsvalue(null);setBathvalue(null);setparkingvalue(null);
              } else {
                document.querySelectorAll(".property_types").forEach(function(element){
                  element.style.display="block";
                });
                document.getElementById("amenities").style.display="block";
              }

              if(id == 1 || id == 2 || id == 3 || id == 4 || id == 5 || id == 6 || id == 11 || id == 12) {
                  document.getElementById("construction-status").style.display="block";
              }else if(id>0){
                document.getElementById("construction-status").style.display="none";
                setCnstatusvalue(null);
              }


              setTransvalue(PropertyStatus.filter((item)=>{ if(item.value==response.data?.transaction_type){return item;}}));
              setGatedvalue(gated.filter((item)=>{ if(item.value==response.data?.isgated){return item;}}))
              setAreatypevalue(areaunits.filter((item)=>{ if(item.value==response.data?.area_type){return item;}})); 
              setCnstatusvalue(conStatus.filter((item)=>{ if(item.value==response.data?.constron_status){return item;}})); 
              setBedsvalue(bedrooms.filter((item)=>{ if(item.value==response.data?.beds){return item;}}));
              setBathvalue(bathrooms.filter((item)=>{ if(item.value==response.data?.bathrooms){return item;}}));
              setparkingvalue(carparking.filter((item)=>{ if(item.value==response.data?.garages){return item;}}));
              setiamvalue(iam.filter((item)=>{ if(item.value==response.data?.iam){return item;}}));
              setFileNames(response.data?.image_gallery);
              var amenty_arr=response.data?.amenties;
              if(amenty_arr){
              amenty_arr=amenty_arr.split(",");  
              document.querySelectorAll(".pamenities").forEach(function(element){
                if(amenty_arr.indexOf(element.value)>-1){
                  element.checked=true;
                }
              });
            }
            if(response.data?.image_gallery.length>0){
            document.getElementById("img_row").innerHTML="";
            let gallery=response.data?.image_gallery;
            let galleryLength=gallery.length;
            var img_string="";
            for(var i=0;i<galleryLength;i++){
              img_string+='<div class="col-2" id="img_'+gallery[i]+'"><div class="profile-img mb20 position-relative"><img class="w-100 bdrs12 cover" src="https://www.nearestate.in/uploads/gallery/'+gallery[i]+'" alt="Uploaded Image 1"><button class="tag-del" title="Delete Image" id="'+gallery[i]+'" type="button" data-tooltip-id="delete-0" style="border: none;"><span class="fas fa-trash-can"></span></button></div></div>';
            }
            document.getElementById("img_row").innerHTML+=img_string;
            }
          }
        });
      }else{
        location.href="/";
      }
    }
   
    tinymce?.activeEditor?.destroy();
    tinymce.init({
      selector: '#description',
      branding: false,
      plugins: ['casechange','formatpainter', 'linkchecker', 'lists', 'checklist', 'powerpaste', 'table' ,'advtable'],
      toolbar: 'table | numlist | bullist | sizeselect | bold italic | fontfamily | fontsize',
      font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
      font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
      toolbar_mode: 'floating',
      tinycomments_mode: 'embedded',
      tinycomments_author: 'Author name',
      browser_spellcheck: true,
      height: 300
   }); 
   
   document.getElementById("price").addEventListener("keypress",function(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode > 31 && (charCode < 48 || charCode > 57)){
        evt.preventDefault();
        document.getElementById("price").value="";
        return false;
      }
    });
    document.getElementById("price").addEventListener("input",function(evt){
      var price = document.getElementById("price").value;
      if(isNaN(price)){
        document.getElementById("price").value="";
      }
    });
    document.getElementById("area").addEventListener("input",function(evt){
      var area = document.getElementById("area").value;
      if(isNaN(area)){
        document.getElementById("area").value="";
      }
    });
    document.getElementById("area").addEventListener("keypress",function(evt){
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(charCode > 31 && (charCode < 48 || charCode > 57)){
        evt.preventDefault();
        document.getElementById("area").value="";
        return false;
      }
    });
    setTimeout(()=>{
    document.querySelectorAll(".tag-del").forEach(function(element){
      element.addEventListener("click",function(e){
         let _id=element.getAttribute("id");
        // setFileNames(filenames);
        // var _index=filenames.indexOf(_id.toString());
        // if(_index>-1){
        //   filenames.splice(_index,1);
        //   setFileNames(filenames);
        // }
        if(document.getElementById("img_"+_id)){
        document.getElementById("img_"+_id).remove();
        }
        var re = new RegExp("userid" + "=([^;]+)"); 
        var value = re.exec(document.cookie);
        if(value){
        let postObj={
          requestType:'deleteIMage',
          propertyid:params?.id,
          imagename:_id,
          userid:value[1],
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
          .then(response => { console.log(response);
          if(response.status==200 && response.data){

          }
        }); 
        }
      });
    });
    },500);
  },[]);
  function propertyChange(ptype){
    setPtypevalue(ptype);
    //setTimeout(()=>{
      //var id = document.querySelector('#property_type > input').value;
      var id=ptype?.value;
      document.getElementById("ptypeerror").style.display="none";
      if(!id){
        document.getElementById("construction-status").style.display="block";
        document.getElementById("ptypeerror").style.display="block";
      }
      if (id == 7 || id == 9 || id == 13 || id==11 || id==12) {
          document.querySelectorAll(".property_types").forEach(function(element){
            element.style.display="none";
          });
          document.getElementById("amenities").style.display="none";
          document.querySelectorAll(".pamenities").forEach(function(element){
            element.checked=false;
          });
          setBedsvalue(null);setBathvalue(null);setparkingvalue(null);
          //$('#beds,#bathrooms,#garages').removeClass('validate');
          //$('#beds,#bathrooms,#garages').val("");
          // document.getElementById("beds").value="";
          // document.getElementById("bathrooms").value="";
          // document.getElementById("garages").value="";
      } else {
        document.querySelectorAll(".property_types").forEach(function(element){
          element.style.display="block";
        });
        document.getElementById("amenities").style.display="block";
          //$('#beds,#bathrooms,#garages').addClass('validate');
      }

      if(id == 1 || id == 2 || id == 3 || id == 4 || id == 5 || id == 6 || id == 11 || id == 12) {
          document.getElementById("construction-status").style.display="block";
         // $("#construction-status").show();
        //  $("#constructionStatus").addClass('validate');
      }else if(id>0){
        document.getElementById("construction-status").style.display="none";
        setCnstatusvalue(null);
        //document.getElementById("construction-status").value="";
          // $("#constructionStatus").val('');
          // $("#construction-status").hide();
          // $("#constructionStatus").removeClass('validate');
      }
  //},100);
  }
  function categoryChange(category){
    setCategory(category);
    //var statusid = document.querySelector('#category > input').value;
    var statusid=category?.value;
    document.getElementById("categoryerror").style.display="none";
    if(!statusid){
      document.getElementById("categoryerror").style.display="block";
    }
    var id = document.querySelector('#property_type > input').value;
    if(id==''){
        document.getElementById("transition-type").style.display="block";
        document.getElementById("construction-status").style.display="block";
        setTransvalue(null);setCnstatusvalue(null);
        //$("select#transitionType,#constructionStatus").addClass('validate');
        if (statusid == 2) {
            //$("#transition-type,#construction-status,hr#statusBar").hide();
            document.getElementById("transition-type").style.display="none";
            document.getElementById("construction-status").style.display="none";
            setTransvalue(null);setCnstatusvalue(null);
            //$("select#transitionType,#constructionStatus").removeClass('validate');
            //$("select#transitionType,#constructionStatus").val('');
        }
    } else {
        if (statusid == 2) {
          document.getElementById("transition-type").style.display="none";
          document.getElementById("construction-status").style.display="none";
          setTransvalue(null);setCnstatusvalue(null);
            // $("#transition-type,#construction-status,hr#statusBar").hide();
            // $("select#transitionType,#constructionStatus").removeClass('validate');
            // $("select#transitionType,#constructionStatus").val('');
        } else {
            //$("#transition-type,hr#statusBar").show();
            document.getElementById("transition-type").style.display="block";
            //$("select#transitionType").addClass('validate');
            if (id == 1 || id == 2 || id == 3 || id == 4 || id == 5 || id == 6 || id == 11 || id == 12) {
                //$("#construction-status").show();
                document.getElementById("construction-status").style.display="block";
                //$("#constructionStatus").addClass('validate');
            }
        }
    }
  }
  function areatypeChange(areatype){
    setAreatypevalue(areatype);
    var areatype=areatype?.value;
    document.getElementById("areatyperror").style.display="none";
    if(!areatype){
      document.getElementById("areatyperror").style.display="block";
    }
  }
  function gatedChange(gatedtype){
    setGatedvalue(gatedtype);
    var gatedtype=gatedtype?.value;
    document.getElementById("gatederror").style.display="none";
    if(!gatedtype){
      document.getElementById("gatederror").style.display="block";
    }
  }
  function cnstatusChange(cnstatus){
    setCnstatusvalue(cnstatus);
    var cnstatus=cnstatus?.value;
    document.getElementById("constructionerror").style.display="none";
    if(!cnstatus){
      document.getElementById("constructionerror").style.display="block";
    }
  }
  function bedsChange(beds){
    setBedsvalue(beds);
    var beds=beds?.value;
    document.getElementById("bedserror").style.display="none";
    if(!beds){
      document.getElementById("bedserror").style.display="block";
    }
  }
  function bathsChange(baths){
    setBathvalue(baths);
    var baths=baths?.value;
    document.getElementById("bathserror").style.display="none";
    if(!baths){
      document.getElementById("bathserror").style.display="block";
    }
  }
  function parkingChange(parking){
    setparkingvalue(parking);
    var parking=parking?.value;
    document.getElementById("carparkingerror").style.display="none";
    if(!parking){
      document.getElementById("carparkingerror").style.display="block";
    }
  }
  function iamChange(iam){
    setiamvalue(iam);
    var iam=iam?.value;
    document.getElementById("iamerror").style.display="none";
    if(!iam){
      document.getElementById("iamerror").style.display="block";
    }
  }
  function transactionChange(trans){
    setTransvalue(trans);
    var transtype=trans?.value;
    document.getElementById("transerror").style.display="none";
    if(!transtype){
      document.getElementById("transerror").style.display="block";
    }
    var statusid = document.querySelector('#category > input').value;
    var id = document.querySelector('#property_type > input').value;
    //var transtype=document.querySelector('#transtype > input').value;
    if ((id == 1 || id == 2 || id == 3 || id == 4 || id == 5 || id == 6 || id == 11 || id == 12) && statusid!=2) {
    //$("#construction-status").show();
    document.getElementById("construction-status").style.display="block";
    //$("#constructionStatus").addClass('validate');
    }
    if(transtype==2){
    //$("#constructionStatus").val("");
    //$("#construction-status").hide();
    //$("#constructionStatus").removeClass('validate');
    document.getElementById("construction-status").style.display="none";
    setCnstatusvalue(null);
    }
  }
  function submitProperty(){
    var tab1=true;
    var iam=document.querySelector('#iam > input').value;
    if(iam=="" || !iam){
      tab1=false;
      document.querySelectorAll('.select__input')[8].focus();
      document.getElementById("iamerror").style.display="block";
    }
    var parking=document.querySelector('#parking > input').value;
    if((parking=="" || !parking) && document.querySelectorAll(".property_types")[0].style.display=="block"){
      tab1=false;
      document.querySelectorAll('.select__input')[7].focus();
      document.getElementById("carparkingerror").style.display="block";
    }
    var bathrooms=document.querySelector('#bathrooms > input').value;
    if((bathrooms=="" || !bathrooms) && document.querySelectorAll(".property_types")[0].style.display=="block"){
      tab1=false;
      document.querySelectorAll('.select__input')[6].focus();
      document.getElementById("bathserror").style.display="block";
    }
    var bedrooms=document.querySelector('#bedrooms > input').value;
    if((bedrooms=="" || !bedrooms) && document.querySelectorAll(".property_types")[0].style.display=="block"){
      tab1=false;
      document.querySelectorAll('.select__input')[5].focus();
      document.getElementById("bedserror").style.display="block";
    }
    var category= document.querySelector('#category > input').value;
    var constatus=document.querySelector('#constatus > input').value;
    if((constatus=="" || !constatus) && document.getElementById("construction-status").style.display=="block" && category!=2){
      tab1=false;
      document.querySelectorAll('.select__input')[4].focus();
      document.getElementById("constructionerror").style.display="block";
    }
    var areatype=document.querySelector('#areatype > input').value;
    if(areatype=="" || !areatype){
      tab1=false;
      document.querySelectorAll('.select__input')[3].focus();
      document.getElementById("areatyperror").style.display="block";
    }
    var area = document.getElementById("area");
    document.getElementById("areaerror").style.display='none';
    if(area.value=='' || !area.value){
      tab1=false;
      area.focus();
      document.getElementById("areaerror").style.display='block';
    }
    var price = document.getElementById("price");
    document.getElementById("priceerror").style.display='none';
    if(price.value=='' || !price.value){
      tab1=false;
      price.focus();
      document.getElementById("priceerror").style.display='block';
    }
    var gatedtype=document.querySelector('#gatedcommunity > input').value;
    if((gatedtype=="" || !gatedtype) && document.querySelectorAll(".property_types")[0].style.display=="block"){
      tab1=false;
      document.querySelectorAll('.select__input')[2].focus();
      document.getElementById("gatederror").style.display="block";
    }
    var transtype=document.querySelector('#transtype > input').value;
    if((transtype=="" || !transtype) && document.getElementById("transition-type").style.display=="block"){
      tab1=false;
      document.querySelectorAll('.select__input')[2].focus();
      document.getElementById("transerror").style.display="block";
    }
    var propType = document.querySelector('#property_type > input').value;
    if(propType=="" || !propType){
      tab1=false;
      document.querySelectorAll('.select__input')[1].focus();
      document.getElementById("ptypeerror").style.display="block";
    }
    document.getElementById("categoryerror").style.display="none";
    if(category=="" || !category){
      tab1=false;
      document.querySelectorAll('.select__input')[0].focus();
      document.getElementById("categoryerror").style.display="block";
    }
    var editorContent = tinymce.activeEditor.getContent({ format: 'html' });
    document.getElementById("descerror").style.display='none';
    if(editorContent==""){
      document.getElementById("dummydesc").focus();
      document.getElementById("descerror").style.display='block';
      tab1=false;
    }
    var title = document.getElementById("propertyTitle");
    document.getElementById("titleerror").style.display='none';
    if(title.value=='' || !title.value){
       tab1=false;
       title.focus();
       document.getElementById("titleerror").style.display='block';
    }
    let tab=document.querySelector(".nav-link.active").getAttribute("id");
    if(tab1==false && tab=="nav-item1-tab"){
      return false;
    }
    document.getElementById("prvBtn").style.display='inline-block';
    if(tab=="nav-item3-tab"){
        var latitude=document.getElementById("latitude").value;
        if(latitude==""){
          document.getElementById("address-map").focus();
          document.getElementById("addrerror").style.display="block";
          return false;
        }else{
          let _login=document.getElementById("logcol").innerText;
          if(_login.includes("Login")){
            document.getElementById("loginBtn").click();return false;
          }else{
            var re = new RegExp("userid" + "=([^;]+)"); 
            var userId = re.exec(document.cookie);
            if(userId){
            var amenty=[];
            document.querySelectorAll(".pamenities").forEach(function(item){
              if(item.checked){
                amenty.push(item.value);
              }
            });

            var updatedFiles=filenames.slice(Math.max(filenames.length - uploadedImages.length, 0));
            let postObj={
              requestType:'edit_property',
              propertyTitle:title?.value,
              description:editorContent,
              category:category,
              propertyType:propType,
              transactionType:transtype,
              price:price?.value,
              area:area?.value,
              areaType:areatype,
              constructionStatus:constatus,
              bedrooms:bedrooms,
              bathrooms:bathrooms,
              carParking:parking,
              iam:iam,
              images:updatedFiles,
              imgsrc:uploadedImages,
              address:document.getElementById("address").value,
              state:document.getElementById("administrative_area_level_1").value,
              city:document.getElementById("locality").value,
              location:document.getElementById("sublocality_level_1").value,
              political:document.getElementById("political").value,
              sublocality:document.getElementById("sublocality").value,
              zipcode:document.getElementById("postal_code").value,
              latitude:document.getElementById("latitude").value,
              longitude:document.getElementById("longitude").value,
              video_link:document.getElementById("videoLink").value,
              user_id:userId[1],
              propertyFeatures:amenty,
              isgated:gatedtype,
              editid:editId
            }
            console.log("postObj",postObj);
            if(editId!="" && editId!=0){
            axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers: {'Content-Type': 'application/json'}})
            .then(response => { console.log("response",response);
                if(response.status==200 && response?.data=="success"){
                  navigate("/dashboard-my-properties");
                }else{
                  alert("Error while updating property.");
                }
            }).catch(error => {
              console.error(error);
            });
            }
           }
          }
          return false;
        }
    }
    
    if(tab=="nav-item2-tab"){
       
       if(document.getElementById("img_row").innerHTML==""){
         document.getElementById("uploadError").style.display="block";
         document.getElementById("dummyfiles").focus();
         return false;
       }
       document.getElementById("submitBtn").innerText="Submit"; 
    }else{
      document.getElementById("submitBtn").innerText="Next"; 
    }
    let nextTab=document.getElementById(tab).nextElementSibling;
    //let prvTab=document.getElementById(tab).previousElementSibling;
   
    document.getElementById(tab).setAttribute("disabled",true);
    document.getElementById(nextTab.getAttribute("id")).removeAttribute("disabled");
    document.getElementById(nextTab.getAttribute("id")).click();
  }
  function prev(){
    document.getElementById("submitBtn").innerText="Next"; 
    let tab=document.querySelector(".nav-link.active").getAttribute("id");
    if(tab=='nav-item2-tab'){
      document.getElementById("prvBtn").style.display='none';
    }
    document.getElementById(tab).setAttribute("disabled",true);
    let prvTab=document.getElementById(tab).previousElementSibling;
    document.getElementById(prvTab.getAttribute("id")).removeAttribute("disabled");
    document.getElementById(prvTab.getAttribute("id")).click();
  }
  function titleChange(){
     var title = document.getElementById("propertyTitle").value;
     document.getElementById("titleerror").style.display='none';
     if(title=='' || !title){
        document.getElementById("titleerror").style.display='block';
     }
  }
  function priceChange(){
    document.getElementById("amountInwords").innerHTML="";
    var price = document.getElementById("price").value;
    document.getElementById("priceerror").style.display='none';
    if(price=='' || !price){
       document.getElementById("priceerror").style.display='block';
    }else{
      price = price.replace(',', '');
      if ((price = price.toString()).length > 9) return 'overflow';
      var n = ('000000000' + price).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
      if (!n) return;
      var str = '';
      str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
      str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
      str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
      str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
      str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
      if (str != '') {
          str = str + ' rupees only';
      }
      str = str.charAt(0).toUpperCase() + str.slice(1);
      document.getElementById("amountInwords").innerHTML=str;
    }
  }
  function areaChange(){
    var price = document.getElementById("area").value;
    document.getElementById("areaerror").style.display='none';
    if(price=='' || !price){
       document.getElementById("areaerror").style.display='block';
    }
  }
  const handleUpload = (files) => {
    const newImages = [...uploadedImages];
    const newFiles = [...filenames];
    for (const file of files) {
      if(file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg"){
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages(newImages);
        newFiles.push(file.name);
        setFileNames(newFiles);
        document.getElementById("uploadError").style.display="none";
      };
      reader.readAsDataURL(file);
     }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };
  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    const fileNames = [...filenames];
    newImages.splice(index, 1);
    fileNames.splice(index, 1);
    setUploadedImages(newImages);
    setFileNames(fileNames);
  };
  document.querySelectorAll(".tag-del").forEach(function(element){
    element.addEventListener("click",function(){
      if(element.getAttribute("id")>0){
      document.getElementById("img_"+element.getAttribute("id")).remove();
      }
    });
  });
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. Details
          </button>
          <button
            className="nav-link fw600"
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
            disabled
          >
            2. Media
          </button>
          <button
            className="nav-link fw600"
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
            disabled
          >
            3. Location
          </button>
          {/* <button
            className="nav-link fw600"
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            4. Detail
          </button> */}
          {/* <button
            className="nav-link fw600"
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            4. Amenities
          </button> */}
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative" id="propDescription">
          <form className="form-style1">
            <div className="row">
              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">Title</label>
                  <input
                    type="text"
                    id="propertyTitle"
                    name="propertyTitle"
                    className="form-control"
                    placeholder="Property Title"
                    onChange={()=>titleChange()}
                  />
                  <p id="titleerror" className="errors">Please enter property title</p>
                </div>
              </div>
              {/* End .col-12 */}

              <div className="col-sm-12">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Description
                  </label>
                  <textarea
                    cols={40}
                    rows={4}
                    id="description"
                    name="description"
                    className="form-control"
                    placeholder="Enter Property Description"
                    defaultValue={""}
                    style={{resize:'none'}}
                  />
                  <input type="text" id="dummydesc" style={{position:'absolute',zIndex:-1}} />
                  <p id="descerror" className="errors">Please enter property description</p>
                </div>
              </div>
              {/* End .col-6 */}

              <div className="col-sm-6 col-xl-4">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Select Category
                  </label>
                  <div className="location-area">
                    <Select
                      //defaultValue={catergoryOptions.filter((item)=>{ if(item.value==1){return item;}})}
                      name="category"
                      id="category"
                      options={catergoryOptions}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Category"
                      value={categoryValue}
                      onChange={(categoryValue)=>categoryChange(categoryValue)}
                    />
                    <p id="categoryerror" className="errors">Please select category</p>
                  </div>
                </div>
              </div>
              {/* End .col-6 */}

              <div className="col-sm-6 col-xl-4">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Property Type
                  </label>
                  <div className="location-area">
                    <Select
                      //defaultValue={[listedIn[1]]}
                      name="property_type"
                      id="property_type"
                      options={listedIn}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      value={ptypeValue}
                      onChange={(ptypeValue)=>propertyChange(ptypeValue)}
                      placeholder="Property Type"
                    />
                    <p id="ptypeerror" className="errors">Please select property type</p>
                  </div>
                </div>
              </div>
              {/* End .col-6 */}

              <div className="col-sm-6 col-xl-4" id="transition-type">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                    Transaction Type
                  </label>
                  <div className="location-area">
                    <Select
                    // defaultValue={[PropertyStatus[1]]}
                      name="transtype"
                      id="transtype"
                      options={PropertyStatus}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Transaction Type"
                      value={transValue}
                      onChange={(transValue)=>transactionChange(transValue)}
                    />
                    <p id="transerror" className="errors">Please select transaction type</p>
                  </div>
                </div>
              </div>
              {/* End .col-6 */}
              <div className="col-sm-6 col-xl-4 property_types">
                <div className="mb20">
                  <label className="heading-color ff-heading fw600 mb10">
                   is this property in Gated Community?
                  </label>
                  <div className="location-area">
                    <Select
                    // defaultValue={[PropertyStatus[1]]}
                      name="gatedcommunity"
                      id="gatedcommunity"
                      options={gated}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Gated Community"
                      value={gatedValue}
                      onChange={(gatedValue)=>gatedChange(gatedValue)}
                    />
                    <p id="gatederror" className="errors">Please select an option</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Price
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    id="price"
                    onChange={()=>priceChange()}
                  />
                  <p id="priceerror" className="errors">Please enter property price</p>
                  <p id="amountInwords"></p>
                </div>
              </div>
              {/* End .col-6 */}

              <div className="col-sm-6 col-xl-4">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Area
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Area"
                    name="area"
                    id="area"
                    onChange={()=>areaChange()}
                  />
                  <p id="areaerror" className="errors">Please enter area</p>
                </div>
              </div>
              {/* End .col-6 */}

              <div className="col-sm-6 col-xl-4">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Area Type
                  </label>
                  <Select
                      name="areatype"
                      id="areatype"
                      options={areaunits}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Area Type"
                      value={areatypeValue}
                      onChange={(areatypeValue)=>areatypeChange(areatypeValue)}
                    />
                    <p id="areatyperror" className="errors">Please select area type</p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4" id="construction-status">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Construction Status
                  </label>
                  <Select
                      name="constatus"
                      id="constatus"
                      options={conStatus}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Construction Status"
                      value={cnstatusValue}
                      onChange={(cnstatusValue)=>cnstatusChange(cnstatusValue)}
                    />
                    <p id="constructionerror" className="errors">Please select construction status</p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 property_types">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Bedrooms
                  </label>
                  <Select
                      name="bedrooms"
                      id="bedrooms"
                      options={bedrooms}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Bedrooms"
                      value={bedsValue}
                      onChange={(bedsValue)=>bedsChange(bedsValue)}
                    />
                    <p id="bedserror" className="errors">Please select bedrooms</p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 property_types">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Bathrooms
                  </label>
                  <Select
                      name="bathrooms"
                      id="bathrooms"
                      options={bathrooms}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Bathrooms"
                      value={bathValue}
                      onChange={(bathValue)=>bathsChange(bathValue)}
                    />
                    <p id="bathserror" className="errors">Please select bathroms</p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 property_types">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                  Car Parking
                  </label>
                  <Select
                      name="parking"
                      id="parking"
                      options={carparking}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="Car Parking"
                      value={carparkingValue}
                      onChange={(carparkingValue)=>parkingChange(carparkingValue)}
                    />
                    <p id="carparkingerror" className="errors">Please select car parking</p>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    I am
                  </label>
                  <Select
                      name="iam"
                      id="iam"
                      options={iam}
                      styles={customStyles}
                      className="select-custom pl-0"
                      classNamePrefix="select"
                      isClearable={clearable}
                      placeholder="I am"
                      value={iamValue}
                      onChange={(iamValue)=>iamChange(iamValue)}
                    />
                    <p id="iamerror" className="errors">Please select iam</p>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            <div className="ps-widget bgc-white overflow-hidden position-relative" id="amenities">
            <label className="heading-color ff-heading fw600 mb10">Select Amenities</label>
            <div className="row">
              <Amenities />
            </div>
          </div>
          </form>
            {/* <PropertyDescription /> */}
          </div>
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          {/* <UploadMedia /> */}
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
          <h4 className="title fz17 mb30">Upload photos of your property</h4>
          <form className="form-style1">
            <div className="row">
              <div className="col-lg-12">
                {/* <UploadPhotoGallery /> */}
                <div
                  className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="icon mb30">
                    <span className="flaticon-upload" />
                  </div>
                  <h4 className="title fz17 mb10">Upload/Drag photos of your property</h4>
                  <p className="text mb25">
                    Photos must be JPEG or PNG format and at least 2048x768
                  </p>
                  <input type="text" id="dummyfiles" style={{position:'absolute',zIndex:-1}} />
                  <label className="ud-btn btn-white">
                    Browse Files
                    <input
                      ref={fileInputRef}
                      id="fileInput"
                      type="file"
                      multiple
                      className="ud-btn btn-white"
                      onChange={(e) => handleUpload(e.target.files)}
                      style={{ display: "none" }}
                    />
                  </label>
                  <p id="uploadError" className="errors">Please upload property images</p>
                </div>
                {/* Display uploaded images */}
                <div className="row profile-box position-relative d-md-flex align-items-end mb50" id="img_row">
                  {uploadedImages.map((imageData, index) => (
                    <div className="col-2" key={index}>
                      <div className="profile-img mb20 position-relative">
                        <img
                        
                          className="w-100 bdrs12 cover"
                          src={imageData}
                          alt={`Uploaded Image ${index + 1}`}
                        />
                        <button
                          style={{ border: "none" }}
                          className="tag-del"
                          id="0"
                          title="Delete Image"
                          onClick={() => handleDelete(index)}
                          type="button"
                          data-tooltip-id={`delete-${index}`}
                        >
                          <span className="fas fa-trash-can" />
                        </button>

                        <ReactTooltip
                          id={`delete-${index}`}
                          place="right"
                          content="Delete Image"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <input type="hidden" className="tag-del" />
            {/* End col-12 */}

            <div className="row">
              <h4 className="title fz17 mb30">Video Presentation</h4>
              {/* <VideoOptionFiled /> */}
              <div className="col-sm-6 col-xl-12">
                <div className="mb30">
                  <div className="location-area">
                  <input
                      type="text"
                      className="form-control"
                      id="videoLink"
                      placeholder="Add youtube video link here"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        </div>
        {/* End tab for Upload photos of your property */}

        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17">Listing Location</h4>
            <LocationField />
          </div>
        </div>
        {/* End tab for Listing Location */}

        {/* <div
          className="tab-pane fade"
          id="nav-item4"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Listing Details</h4>
            <DetailsFiled />
          </div>
        </div> */}
        {/* End tab for Listing Details */}

        {/* <div
          className="tab-pane fade"
          id="nav-item5"
          role="tabpanel"
          aria-labelledby="nav-item5-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Select Amenities</h4>
            <div className="row">
              <Amenities />
            </div>
          </div>
        </div> */}
        <div style={{textAlign:'center',marginLeft:'5px'}}><button className="ud-btn btn-thm" id="prvBtn" style={{display:'none',marginRight:'5px'}} onClick={()=>prev()} type="button">Prev</button> <button style={{marginLeft:'5px'}} className="ud-btn btn-thm" id="submitBtn" onClick={()=>submitProperty()} type="button">Next</button></div>
        {/* End tab for Select Amenities */}
      </div>
    </>
  );
};

export default EditPropertyTabContent;
