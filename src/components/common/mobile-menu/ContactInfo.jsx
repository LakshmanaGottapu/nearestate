import React from "react";

const ContactMeta = () => {
  const contactInfoList = [
    {
      title: "Customer Care",
      phone: "040 22222224",
      phoneLink: "tel:04022222224", // Changed phoneLink to tel: URI
    },
    {
      title: "Need Live Support?",
      mail: "info@nearestate.in",
      mailLink: "mailto:hi@info@nearestate.in", // Changed mailLink to direct email address
    },
  ];

  return (
    <div className="row mb-4 mb-lg-5" style={{marginTop:'60px'}}>
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
