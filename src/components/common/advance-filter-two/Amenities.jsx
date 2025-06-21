const Amenities = () => {
  const amenities = [
    [
      { label: "Wi-Fi",value:1 },
      { label: "Ac",value:2},
      { label: "Solar water Heater",value:3},
      { label: "RO water purifier",value:4 },
    ],
    [
      { label: "CCTV camera",value:5 },
      { label: "Intercom",value:6 },
      { label: "Lift",value:7 },
      { label: "Generator",value:8 },
    ],
    [
      { label: "Gym",value:9 },
      { label: "Swimming pool",value:10 },
      { label: "Club house",value:11 },
      { label: "Childrens play area",value:12 },
      { label: "Laundry",value:13 }
    ],
  ];

  return (
    <>
      {amenities.map((column, columnIndex) => (
        <div className="col-sm-4" key={columnIndex}>
          <div className="widget-wrapper mb20">
            <div className="checkbox-style1">
              {column.map((amenity, amenityIndex) => (
                <label className="custom_checkbox" key={amenityIndex}>
                  {amenity.label}
                  <input
                    type="checkbox"
                    className="propertyFeatures"
                    value={amenity.value}
                  //  defaultChecked={amenity.defaultChecked}
                  />
                  <span className="checkmark" />
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Amenities;
