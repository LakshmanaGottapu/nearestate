import React from "react";

const PropertyDetails = ({data}) => {
  const columns = [
    [
      {
        label: "Property ID",
        value: data.property_id,
      },
      {
        label: "Price",
        value: data.price,
      },
      {
        label: "Property Size",
        value: data.area,
      },
      {
        label: "Bathrooms",
        value: data.bathrooms,
      },
      {
        label: "Bedrooms",
        value: data.beds,
      },
    ],
    [
      {
        label: "Garage",
        value: data.garages,
      },
      {
        label: "Garage Size",
        value: "200 SqFt",
      },
      {
        label: "Year Built",
        value: new Date(data.date).getFullYear(),
      },
      {
        label: "Property Type",
        value: data.property_type,
      },
      {
        label: "Property Status",
        value: data.property_status,
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
