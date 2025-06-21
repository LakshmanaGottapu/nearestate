import React from "react";

const FindHomeBlock = () => {
  const blocks = [
    {
      icon: "flaticon-search-1",
      number: "01",
      subtitle: "Search Location",
      text: "Enter your desired locality to find your dream Home",
    },
    {
      icon: "flaticon-chat",
      number: "02",
      subtitle: "RealView360° marker",
      text: "tap on RealView360° tagged map marker in search results to explore it.",
    },
    {
      icon: "flaticon-bird-house",
      number: "03",
      subtitle: "Neighbourhood",
      text: "Explore 360° property neighbourhood to get a clarity on locality surroundings.",
    },
    {
      icon: "flaticon-house-1",
      number: "04",
      subtitle: "Property Tour",
      text: "Explore Immersive 360° inside property tour realistic experience.",
    },
  ];

  return (
    <>
      {blocks.map((block, index) => (
        <div className="col-sm-6" key={index}>
          <div className="iconbox-style6">
            <span className={`icon ${block.icon}`} />
            <h3 className="title mb-1">{block.number}</h3>
            <h6 className="subtitle">{block.subtitle}</h6>
            <p className="iconbox-text">{block.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FindHomeBlock;
