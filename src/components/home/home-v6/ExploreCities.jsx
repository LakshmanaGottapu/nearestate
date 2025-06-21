import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const ExploreCities = () => {
  var end=5,result=[];
  const [posts, setPosts] = useState([]);
  var cities = [
    {
      id: 1,
      name: "Adibatla",
      image: "/images/listings/Explore-localities_Adibatla.jpg",
      url:'https://www.nearestate.in/map-view?location=Adibatla,%20Telangana,%20India&locality=Adibatla&postal_code=501510&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJkfsklHKkyzsRr758v0sxbAQ',
    },
    {
      id: 2,
      name: "A. S. Rao Nagar",
      image:"/images/listings/Explore_localities_AS_Rao_Nagar.jpg",
      url:'https://www.nearestate.in/map-view?location=A.%20S.%20Rao%20Nagar,%20Secunderabad,%20Telangana,%20India&locality=Secunderabad&postal_code=&min_price=&max_price=&sublocation=A.%20S.%20Rao%20Nagar&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJ9Ui6l56byzsReWFdoD7jSVg',
    },
    {
      id: 3,
      name: "B.N Reddy Nagar",
      image: "/images/listings/Explore-localities_BN_Reddy_Nagar.jpg",
      url:'https://www.nearestate.in/map-view?location=B.N%20Reddy%20Nagar,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=B.N%20Reddy%20Nagar&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJc9JgvCGiyzsRx6oc3pwovk8',
    },
    {
      id: 4,
      name: "Boduppal",
      image: "/images/listings/Explore-localities_Boduppal.jpg",
      url:'https://www.nearestate.in/map-view?location=Boduppal,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Boduppal&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJadR1w76eyzsRukLBeE9C7B8',
    },
    {
      id: 5,
      name: "Bowrampet",
      image: "/images/listings/Explore-localities_Bowrampet.jpg",
      url:'https://www.nearestate.in/map-view?location=Bowrampet,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Bowrampet&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJCQsuwWGOyzsR0w53jbUH3yk',
    },
    {
      id: 6,
      name: "Dammaiguda",
      image: "/images/listings/Explore-localities_Dammaiguda.jpg",
      url:'https://www.nearestate.in/map-view?location=Dammaiguda,%20Secunderabad,%20Telangana,%20India&locality=Secunderabad&postal_code=500083&min_price=&max_price=&sublocation=Dammaiguda&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJ3RL_cumcyzsRKDZmcgzc1oM',
    },
    {
      id: 7,
      name: "Hafeezpet",
      image: "/images/listings/Explore-localities_Hafeezpet.jpg",
      url:'https://www.nearestate.in/map-view?location=Hafeezpet,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Hafeezpet&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJoTV-Kj-SyzsRKYgxgW5--YA',
    },
    {
      id: 8,
      name: "Hastinapuram",
      image: "/images/listings/Explore-localities_Hastinapuram.jpg",
      url:'https://www.nearestate.in/map-view?location=Hastinapuram,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Hastinapuram&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJVVyQyQ-iyzsRSu2izIR1ikA',
      encryptid:'rmmHnA=='
    },
    {
      id: 9,
      name: "Hayathnagar",
      image: "/images/listings/Explore-localities_Hayathnagar.jpg",
      url:'https://www.nearestate.in/map-view?location=Hayathnagar,%20Telangana,%20India&locality=Hayathnagar_Khalsa&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJh8popM-hyzsRf42ILRX6QvI',
      encryptid:'rmmFnQ=='
    },
    {
      id: 10,
      name: "Hitech City",
      image: "/images/listings/Explore-localities_Hitech_City.jpg",
      url:'https://www.nearestate.in/map-view?location=Hitech%20City,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=500081&min_price=&max_price=&sublocation=HITEC%20City&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJ32ldjNyTyzsR7qB_VeuLaBk',
    },
    {
      id: 11,
      name: "Kompally",
      image: "/images/listings/Explore-localities_Kompally.jpg",
      url:'https://www.nearestate.in/map-view?location=Kompally,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Kompally&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJz03fml6FyzsRh08lrwLp1Gw',
    },
    {
      id: 12,
      name: "Kondapur",
      image: "/images/listings/Explore-localities_Kondapur.jpg",
      url:'https://www.nearestate.in/map-view?location=Kondapur,%20Telangana,%20India&locality=Kondapur&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJa6NJKMmTyzsR-hJVkDTADd4',
    },
    {
      id: 13,
      name: "L.B. Nagar",
      image: "/images/listings/Explore-localities_LB_Nagar.jpg",
      url:'https://www.nearestate.in/map-view?location=L.%20B.%20Nagar,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=L.%20B.%20Nagar&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJkQLBra6YyzsR3ioiJ6p_Lm4',
    },
    {
      id: 14,
      name: "Madhapur",
      image: "/images/listings/Explore-localities_Madhapur.jpg",
      url:'https://www.nearestate.in/map-view?location=Madhapur,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Madhapur&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJBbIB8liRyzsRG0GSd77nuxE',
    },
    {
      id: 15,
      name: "Malkajgiri",
      image: "/images/listings/Explore-localities_Malkajgiri.jpg",
      url:'https://www.nearestate.in/map-view?location=Malkajgiri,%20Secunderabad,%20Telangana,%20India&locality=Secunderabad&postal_code=&min_price=&max_price=&sublocation=Malkajgiri&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=1&placeid=ChIJdRIOrsubyzsR0x-UrJmo4T0',
    },
    {
      id: 16,
      name: "Manikonda",
      image: "/images/listings/Explore-localities_Manikonda.jpg",
      url:'https://www.nearestate.in/map-view?location=Manikonda,%20Telangana,%20India&locality=Manikonda&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&placeid=ChIJ97MvUyKUyzsR8SouPdD6k8c',
    },
    {
      id: 17,
      name: "Moula Ali",
      image: "/images/listings/Explore-localities_Moula_Ali.jpg",
      url:'https://www.nearestate.in/map-view?location=Moula%20Ali,%20Secunderabad,%20Telangana,%20India&locality=Secunderabad&postal_code=&min_price=&max_price=&sublocation=Moula%20Ali&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJt6-LW4ybyzsRR_aVFd2PG3k',
    },
    {
      id: 18,
      name: "Nallagandla",
      image: "/images/listings/Explore-localities_Nallagandla.jpg",
      url:'https://www.nearestate.in/map-view?location=Nallagandla,%20Telangana,%20India&locality=Nallagandla&postal_code=500019&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJW7VICNqSyzsR_YH_QKDXHYs',
    },
    {
      id: 19,
      name: "Patancheru",
      image: "/images/listings/Explore-localities_Patancheru.jpg",
      url:'https://www.nearestate.in/map-view?location=Patancheru,%20Telangana,%20India&locality=Patancheruvu&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJj_FdVb7yyzsRvTd-y1UKM0o',
    },
    {
      id: 20,
      name: "Peerzadiguda",
      image: "/images/listings/Explore-localities_Peerzadiguda.jpg",
      url:'https://www.nearestate.in/map-view?location=Peerzadiguda,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Peerzadiguda&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJda9LXEWeyzsRoeT1x6gaUow',
    },
    {
      id: 21,
      name: "Pragathi Nagar",
      image: "/images/listings/Explore-localities_Pragathi_Nagar.jpg",
      url:'https://www.nearestate.in/map-view?location=Moula%20Ali,%20Secunderabad,%20Telangana,%20India&locality=Secunderabad&postal_code=&min_price=&max_price=&sublocation=Moula%20Ali&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJt6-LW4ybyzsRR_aVFd2PG3k',
    },
    {
      id: 22,
      name: "Serlingampalli",
      image: "/images/listings/Explore-localities_Serlingampalli.jpg",
      url:'https://www.nearestate.in/map-view?location=Serilingampally,%20Telangana,%20India&locality=Serilingampalle%20(M)&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJTzX1acaSyzsRIe-QD4_2xos',
    },
    {
      id: 23,
      name: "Turkayamjal",
      image: "/images/listings/Explore-localities_Turkayamjal.jpg",
      url:'https://www.nearestate.in/map-view?location=Turkayamjal,%20Telangana,%20India&locality=Turkayamjal&postal_code=501510&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJhcuakRShyzsRi2aBDVlMEBY',
    },
    {
      id: 24,
      name: "Uppal",
      image: "/images/listings/Explore-localities_Uppal.jpg",
      url:'https://www.nearestate.in/map-view?location=Uppal,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Uppal&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJfRbPLjaZyzsRbUNmG1XXto8',
    },
    {
      id: 25,
      name: "Vanasthalipuram",
      image: "/images/listings/Explore-localities_Vanasthalipuram.jpg",
      url:'https://www.nearestate.in/map-view?location=Vanasthalipuram,%20Telangana,%20India&locality=Vanasthalipuram&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJS0Ov1_mhyzsRoJN2IWqHBro',
    },
    {
      id: 26,
      name: "Ameenpur",
      image: "/images/listings/Explore-localities_Ameenpur.jpg",
      url:'https://www.nearestate.in/map-view?location=Ameenpur,%20Miyapur,%20Telangana,%20India&locality=Miyapur&postal_code=&min_price=&max_price=&sublocation=&sublocation2=Ameenpur&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJ5yuyN2-NyzsRsrew1Uqs2f0',
    },
    {
      id: 27,
      name: "Ameerpet",
      image: "/images/listings/Explore-localities_Ameerpet.jpg",
      url:'https://www.nearestate.in/map-view?location=Ameerpet,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Ameerpet&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJgzG0W8WQyzsRAyfuI1sTvBo',
    },
    {
      id: 28,
      name: "Bachupally",
      image: "/images/listings/Explore-localities_Bachupally.jpg",
      url:'https://www.nearestate.in/map-view?location=Bachupally,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Bachupally&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJzdPtU8aNyzsR4wOi8k7dQkE',
    },
    {
      id: 29,
      name: "Badangpet",
      image: "/images/listings/Explore-localities_Badangpet.jpg",
      url:'https://www.nearestate.in/map-view?location=Badangpet,%20Telangana,%20India&locality=Badangpet&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJx6JzAjaiyzsRONTfUD4FmKs',
    },
    {
      id: 30,
      name: "Balapur",
      image: "/images/listings/Explore-localities_Balapur.jpg",
      url:'https://www.nearestate.in/map-view?location=Balapur,%20Telangana,%20India&locality=Balapur&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJnx0TtOSiyzsRO4qPUZyJ6i4',
    },
    {
      id: 31,
      name: "Beeramguda",
      image: "/images/listings/Explore-localities_Beeramguda.jpg",
      url:'https://www.nearestate.in/map-view?location=Beeramguda,%20Ramachandrapuram,%20Telangana,%20India&locality=Ramachandrapuram&postal_code=502032&min_price=&max_price=&sublocation=&sublocation2=Beeramguda&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJ7yw0BVeNyzsRXLOn0YODFCY',
    },
    {
      id: 32,
      name: "Chandanagar",
      image: "/images/listings/Explore-localities_Chandanagar.jpg",
      url:'https://www.nearestate.in/map-view?location=Chandanagar,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Chanda%20Nagar&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJi2raC_KSyzsRDBz3h0WgETQ',
    },
    {
      id: 33,
      name: "Gajularamaram",
      image: "/images/listings/Explore-localities_Gajularamaram.jpg",
      url:'https://www.nearestate.in/map-view?location=Gajularamaram,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Gajularamaram&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJ1ywZHy-OyzsRuy_Gy--Mvuo',
    },
    {
      id: 34,
      name: "Gandi Maisamma",
      image: "/images/listings/Explore-localities_Gandi_Maisamma.jpg",
      url:'https://www.nearestate.in/map-view?location=Gandi%20Maisamma,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=500043&min_price=&max_price=&sublocation=Gandi%20Maisamma&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJUb1EieSOyzsRrv0DnElTZNE',
    },
    {
      id: 35,
      name: "Ibrahim Bagh",
      image: "/images/listings/Explore-localities_Ibrahim_Bagh.jpg",
      url:'https://www.nearestate.in/map-view?location=Ibrahim%20Bagh,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Ibrahim%20Bagh&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=&placeid=ChIJIdwSuS6UyzsRAwwFcJcn91w',
    },
    {
      id: 36,
      name: "Jillelaguda",
      image: "/images/listings/Explore-localities_Jillelaguda.jpg",
      url:'https://www.nearestate.in/map-view?location=Jillelaguda,%20Telangana,%20India&locality=Jillalguda&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=0&placeid=ChIJP35pxXmiyzsRAAczaveJp8s',
    },
    {
      id: 37,
      name: "Kukatpally",
      image: "/images/listings/Explore-localities_Kukatpally.jpg",
      url:'https://www.nearestate.in/map-view?location=Kukatpally,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Kukatpally&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=0&placeid=ChIJPfRiAeyRyzsRSM9YQ_7GiDI',
    },
    {
      id: 38,
      name: "Meerpet",
      image: "/images/listings/Explore-localities_Meerpet.jpg",
      url:'https://www.nearestate.in/map-view?location=Meerpet,%20Telangana,%20India&locality=Meerpet&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=0&placeid=ChIJBdPK926iyzsRka_1RQmufUc',
    },
    {
      id: 39,
      name: "Miyapur",
      image: "/images/listings/Explore-localities_Miyapur.jpg",
      url:'https://www.nearestate.in/map-view?location=Miyapur,%20Telangana,%20India&locality=Miyapur&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=0&placeid=ChIJHY9vZ3mSyzsRik_UTjv7U20',
    },
    {
      id: 40,
      name: "Nagole",
      image: "/images/listings/Explore-localities_Nagole.jpg",
      url:'https://www.nearestate.in/map-view?location=Nagole,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Nagole&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=0&placeid=ChIJO_r1PtKYyzsRoprcOyFt_QI',
    },
    {
      id: 41,
      name: "SR Nagar",
      image: "/images/listings/Explore-localities_SR_Nagar.jpg",
      url:'https://www.nearestate.in/map-view?location=SR%20Nagar,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=500038&min_price=&max_price=&sublocation=SR%20Nagar&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=1&realview=0&placeid=ChIJxWJma-eQyzsRjst3sJVs2Zo',
    }
  ];
  useEffect(() => {
    result=cities.slice(0,end);
    setPosts(result);
    document.querySelector(".cities_next__active").addEventListener("click",function(){
      let endcnt=(document.getElementById("end2")?.value)?document.getElementById("end2").value:4;
      end=parseInt(endcnt)*2;
      document.getElementById("end2").value=end;
      result=cities.slice(0,end);
      setPosts(result);
    });
  }, ['']);
  function load_more(){
    let endcnt=(document.getElementById("end2")?.value)?document.getElementById("end2").value:4;
      end=parseInt(endcnt)+4;
      document.getElementById("end2").value=end;
      result=cities.slice(0,end);
      setPosts(result);
  }
  function realviewOpen(encryptid){
    //var _url="https://nearestate.in/3d_tour?id="+id+"#apartment-360-views";
    var _url="https://www.nearestate.in/realview/"+encryptid;
    let _login=document.getElementById("logcol").innerText;
      if(_login.includes("Login")){
        document.querySelectorAll(".showrealview").forEach(function(element){
          element.style.display="block"
        });
        document.querySelectorAll(".hideRealview").forEach(function(element){
          element.style.display="none" 
        });
        document.getElementById("realviewPopupflag").value=1;
        document.getElementById("tourUrl").value=_url;
        document.getElementById("loginBtn").click();return false;
      }else{
        var re = new RegExp("userid" + "=([^;]+)"); 
        var userId = re.exec(document.cookie);
        if(userId){
          openInNewTab(_url);
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
  function openCities(_url){
    let _login=document.getElementById("logcol").innerText;
    if(_login.includes("Login")){
        document.querySelectorAll(".showrealview").forEach(function(element){
          element.style.display="block"
        });
        document.querySelectorAll(".hideRealview").forEach(function(element){
          element.style.display="none" 
        });
        document.getElementById("realviewPopupflag").value=1;
        document.getElementById("tourUrl").value=_url;
        document.getElementById("loginBtn").click();return false;
      }else{
        var re = new RegExp("userid" + "=([^;]+)"); 
        var userId = re.exec(document.cookie);
        if(userId){
          openInNewTab(_url);
        }
      }
    // let _login=document.getElementById("logcol").innerText;
    // if(_login.includes("Login")){
    //   document.getElementById("cityexplore").value=1;
    //   document.getElementById("exploreurl").value=_url;
    //   document.getElementById("loginBtn").click();return false;
    // }
    // openInNewTab(_url);
  }
  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".cities_next__active",
          prevEl: ".cities_prev__active",
        }}
        pagination={{
          el: ".cities_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        onTouchStart={() => {
          load_more();
        }}
        onTouchEnd={() => {
        }} 
      >
        {posts.sort(function(a,b){  if(b.name>a.name) return -1;}).map((city) => (
          <SwiperSlide key={city.id}>
            <div className="item">
              {/* <Link onClick={()=>{realviewOpen(city.encryptid)}}>
                <div className="feature-style2 mb30">
                  <div className="feature-img">
                    <img
                      className="w-100 h-100 cover"
                      src={city.image}
                      alt="city listings"
                    />
                  </div>
                  <div className="feature-content pt20">
                    <h6 className="title mb-1">{city.name}</h6>
                  </div>
                </div>
              </Link> */}
              <a onClick={()=>openCities(city.url)}>
              <div className="feature-style2 mb30">
                  <div className="feature-img">
                    <img
                      className="w-100 h-100 cover"
                      src={city.image}
                      alt="city listings"
                    />
                    <div className="sale-sticker-wrap tourimg">
                      <img src="../images/real-View-360_new.png" id="ifrmimg" style={{height:"150px",cursor:"pointer",marginTop:'20px'}} />
                    </div>
                  </div>
                  <div className="feature-content pt20">
                    <h6 className="title mb-1">{city.name}</h6>
                  </div>
                </div>
              </a>
            </div>
            <input type="hidden" id="end2" />
            <input type="hidden" name="cityexplore" id="cityexplore" value={0}/>
            <input type="hidden" name="exploreurl" id="exploreurl"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ExploreCities;
