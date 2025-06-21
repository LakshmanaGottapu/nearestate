import React from "react";
import { Link } from "react-router-dom";
const MenuWidget = () => {
  const menuSections = [
    {
      title: "Popular Search",
      links: [
        { label: "2BHK Apartment flats for sale", href: "/map-view?location=Uppal,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Uppal&sublocation2=&sublocation3=&route=&state=TS&country=IN&property_type=&transaction_type=&beds=2&listedby=&construction_status=&min_area=&max_area=&amenities=&status=1&realview=0" },
        { label: "3BHK Apartment flats for sale", href: "/map-view?location=Badangpet,%20Telangana,%20India&locality=Badangpet&postal_code=&min_price=&max_price=&sublocation=&sublocation2=&sublocation3=&route=&state=TS&country=IN&property_type=&transaction_type=&beds=3&listedby=&construction_status=&min_area=&max_area=&amenities=&status=1&realview=0" },
        { label: "2BHK Apartment flats for rent", href: "/map-view?location=Banjara%20Hills,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Banjara%20Hills&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=2&realview=" },
        { label: "3BHK Apartment flats for rent", href: "/map-view?location=Gachibowli,%20Hyderabad,%20Telangana,%20India&locality=Hyderabad&postal_code=&min_price=&max_price=&sublocation=Gachibowli&sublocation2=&sublocation3=&route=&state=TS&country=IN&status=2&realview=" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Terms of Use", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "About us", href: "/about" },
        { label: "Compare", href: "/compare" },
        { label: "Blog", href: "/blog" },
        { label: "Contact us", href: "/contact" },
        { label: "Sitemap", href: "/sitemap.php" }
      ],
    },
    // {
    //   title: "Discover",
    //   links: [
    //     { label: "Miami", href: "#" },
    //     { label: "Los Angeles", href: "#" },
    //     { label: "Chicago", href: "#" },
    //     { label: "New York", href: "#" },
    //   ],
    // },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  {link.label=="Sitemap" &&<Link target="_blank" to={link.href}>{link.label}</Link>}
                  {link.label!="Sitemap" &&<Link to={link.href}>{link.label}</Link>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
