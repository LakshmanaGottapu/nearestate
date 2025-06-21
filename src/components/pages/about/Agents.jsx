
// import agents from "@/data/agents";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const Agents = () => {
  const agents=[
    {
    id: 1,
    city: "Hyderabad",
    category: "Founder",
    name: "VenkataRamana Guddeti",
    image: "/images/Team_Venkat.png",
  },
  {
    id: 2,
    city: "Hyderabad",
    category: "Co Founder & CEO",
    name: "Rajesh Myakala",
    image: "/images/Team_Rajesht.png",
  },
  {
    id: 3,
    city: "Hyderabad",
    category: "CFO",
    name: "Akhil Myakala",
    image: "/images/Akhil_Team.png",
  },
  // {
  //   id: 4,
  //   city: "Hyderabad",
  //   category: "Principal Developer",
  //   name: "Srinivas Reddy",
  //   image: "/images/Srinevas_Team.png",
  // }
  ];
  return (
    <>
      <Swiper
        spaceBetween={50}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".agent_next__active",
          prevEl: ".agent_prev__active",
        }}
        pagination={{
          el: ".agent_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          // 1024: {
          //   slidesPerView: 4,
          // },
          // 1200: {
          //   slidesPerView: 5,
          // },
        }}
        autoplay={{ delay: 3000 }} // Set the desired delay for autoplay
      >
        {agents.slice(0, 4).map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="item" key={index}>
                <div className="team-style1">
                  <div className="team-img">
                    <img
                      className="w-100 h-100 cover"
                      src={agent.image}
                      alt="agent team"
                    />
                  </div>
                  <div className="team-content pt20" style={{textAlign:'center'}}>
                    <h6 className="name mb-1">{agent.name}</h6>
                    <p className="text fz15 mb-0">{agent.category}</p>
                  </div>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Agents;
