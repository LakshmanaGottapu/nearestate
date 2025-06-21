import React from "react";
import {Link} from "react-router-dom";
const footerLinks = [
  { text: "Privacy", href: "/privacy" },
  { text: "Terms", href: "/terms" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dashboard_footer pt30 pb10">
      <div className="container">
        <div className="row items-center justify-content-center justify-content-md-between">
          <div className="col-auto">
            <div className="copyright-widget">
              <p className="text">
                © nearestate.in {currentYear}{" "}
                - All rights reserved
              </p>
            </div>
          </div>

          <div className="col-auto">
            <div className="footer_bottom_right_widgets text-center text-lg-end">
              <p>
                {footerLinks.map((link, index) => (
                  <React.Fragment key={index}>
                    <Link to={link.href}>{link.text}</Link>
                    {index !== footerLinks.length - 1 && " · "}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
