import React from "react";

const amenitiesData = {
  column1: [
    { label: "Wi-Fi",value:1 },
    { label: "Ac",value:2},
    { label: "Solar water Heater",value:3},
    { label: "RO water purifier",value:4 },
    { label: "Gym",value:9 },
  ],
  column2: [
    { label: "CCTV camera",value:5 },
    { label: "Intercom",value:6 },
    { label: "Lift",value:7 },
    { label: "Generator",value:8 },
  ],
  column3: [
    { label: "Swimming pool",value:10 },
    { label: "Club house",value:11 },
    { label: "Childrens play area",value:12 },
    { label: "Laundry",value:13 }
  ]
};

const Amenities = () => {
  return (
    <div className="row">
      {Object.keys(amenitiesData).map((columnKey, index) => (
        <div key={index} className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            {amenitiesData[columnKey].map((amenity, amenityIndex) => (
              <label key={amenityIndex} className="custom_checkbox">
                {amenity.label}
                <input
                  type="checkbox"
                  className="pamenities"
                  value={amenity.value}
                  defaultChecked={amenity.defaultChecked}
                />
                <span className="checkmark" />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
