
import React from "react";

const Office = () => {
  const offices = [
    {
      id: 1,
      city: "Our Phones",
      icon: "/images/icon/Phone_Icon.png",
      address: "Our Call center associates are ready answer your queries",
      phoneNumber: "(040) 22222224",
    },
    {
      id: 2,
      city: "Our Mails",
      icon: "/images/icon/Mail_Icon.png",
      address: "simply write us to below email",
      phoneNumber: "info@nearestate.in",
    },
    {
      id: 3,
      city: "Our Adress",
      icon: "/images/icon/Location_Icon.png",
      address: "T-Hub Phase 2, Hyderabad Knowledge City",
      phoneNumber: "Hyderabad",
    },
    // Add more office objects here...
  ];

  return (
    <>
      {offices.map((office) => (
        <div className="col-sm-6 col-lg-4" key={office.id}>
          <div className="iconbox-style8 text-center">
            <div className="icon">
              <img  src={office.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{office.city}</h4>
              <p className="text mb-1">{office.address}</p>
              <h6 className="mb10">{office.phoneNumber}</h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Office;
