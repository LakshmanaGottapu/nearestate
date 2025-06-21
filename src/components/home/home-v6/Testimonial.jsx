
import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
const testimonials = [
  {
    id: "1st",
    imageSrc: "/images/testimonials/testi-1.png",
    text: "RealView360° revolutionized the way I sold my property. Buyers were able to explore every corner of my property virtually, leading to more serious inquiries and a quicker sale.",
    name: "Sudhakar Reddy",
    designation: "Managing Director, Sudhakar Constructions",
  },
  {
    id: "2nd",
    imageSrc: "/images/testimonials/testi-2.png",
    text: "Thanks to RealView360°, I found my dream home without the hassle of visiting multiple properties in person. The virtual tours were incredibly detailed and realistic.",
    name: "Prashanth",
    designation: "",
  },
  {
    id: "third",
    imageSrc: "/images/testimonials/testi-3.png",
    text: "I highly recommend RealView360° to anyone selling their property. The 360° virtual tours with neighbourhood exploration gave potential buyers a true sense of the space, leading to more interest and a successful sale.",
    name: "Madhav Rao.",
    designation: "CEO, Mythri Developers",
  },
  {
    id: "4th",
    imageSrc: "/images/testimonials/testi-4.png",
    text: "As a busy professional, RealView360° was a lifesaver. This allowed me to thoroughly inspect properties immersively on my schedule, making the home-buying process much more convenient.",
    name: "Sandesh Shah.",
    designation: "Soft Professional, MNC",
  },
  {
    id: "5th",
    imageSrc: "/images/testimonials/testi-5.png",
    text: "RealView360° transformed my selling experience. The immersive tours allowed buyers to fully appreciate the space, layout & neighbourhood of my home, leading to faster and more confident offers.",
    name: "Vikrant",
    designation: "Owner, Individual",
  },
  // Add more testimonial objects if needed
];

const Testimonial = () => {
  var cntr=0;
  setInterval(() => {cntr++;
    if(cntr==6){
      cntr=0;
     }
     if(document.querySelectorAll("#testmonialsBtn .swiper-pagination-bullet")[cntr]){
      var menuOpen=false;
      document.querySelectorAll(".dropdown-menu").forEach(function(element){
        if(element.classList.contains("show")){
         menuOpen=true;
        }
      });  
      if(!menuOpen && !document.getElementById("loginSignupModal").classList.contains('show')){
        document.querySelectorAll("#testmonialsBtn .swiper-pagination-bullet")[cntr].click();
      }
     }
    //document.querySelector(".testmonials_next__active").click();
    // if(cntr%2==0){
    //   document.querySelector(".testmonials_next__active").click();
    // }else{
    //   document.querySelector(".testmonials_prev__active").click();
    // }
  }, 3000);
  return (
    <>
      <div id="testSwiper">
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".testmonials_next__active",
          prevEl: ".testmonials_prev__active",
        }}
        pagination={{
          el: ".testmonials_pagination__active",
          clickable: true,
        }}
        // breakpoints={{
        //   300: {
        //     slidesPerView: 1,
        //   },
        //   768: {
        //     slidesPerView: 2,
        //   },
        //   1024: {
        //     slidesPerView: 3,
        //   },
        //   1200: {
        //     slidesPerView: 4,
        //   },
        // }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="item">
              <div className="testi-content text-center">
                <span className="icon fas fa-quote-left" />
                <h4 className="testi-text">{testimonial.text}</h4>
                <h6 className="name">{testimonial.name}</h6>
                <p className="design">{testimonial.designation}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
      {/* <div className="tab-content" id="pills-tabContent">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={`tab-pane fade ${
              testimonial.id === "2nd" ? "show active" : ""
            }`}
            id={`pills-${testimonial.id}`}
            role="tabpanel"
            aria-labelledby={`pills-${testimonial.id}-tab`}
          >
            <div className="testi-content text-center">
              <span className="icon fas fa-quote-left" />
              <h4 className="testi-text">{testimonial.text}</h4>
              <h6 className="name">{testimonial.name}</h6>
              <p className="design">{testimonial.designation}</p>
            </div>
          </div>
        ))}
      </div> */}
      {/* End tab-content */}
      {/* <div className="tab-list position-relative">
        <ul
          className="nav nav-pills justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          {testimonials.map((testimonial) => (
            <li className="nav-item" role="presentation" key={testimonial.id}>
              <button
                className={`nav-link ${
                  testimonial.id === "1st" ? "ps-0" : ""
                } ${testimonial.id === "2nd" ? "active" : ""} ${
                  testimonial.id === "5th" ? "pe-0" : ""
                }`}
                id={`pills-${testimonial.id}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#pills-${testimonial.id}`}
                type="button"
                role="tab"
                aria-controls={`pills-${testimonial.id}`}
                aria-selected={testimonial.id === "2nd" ? "true" : "false"}
              >
                <img
                  src="images/icon/dot_icon.png"
                  alt=""
                  style={{height:'9px'}}
                />
              </button>
            </li>
          ))}
        </ul>
      </div> */}
      <input type="hidden" className="dropdown-menu" />
    </>
  );
};

export default Testimonial;
