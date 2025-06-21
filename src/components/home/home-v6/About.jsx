
import { Link } from "react-router-dom";

const About = () => {
  const featureList = [
    "Visual Information",
    "24/7 visiting availability",
    "Saves Time",
  ];
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xl-4">
          <div
            className="about-box-1 pe-4 mt100 mt0-lg mb30-lg "
            data-aos="fade-left"
          >
            <h2 className="title mb30" style={{fontSize:'24px'}}>
             "Go Global with RealView360&deg;—Your Property, Everywhere!"
            </h2>
            <p className="text mb25 fz15">
            RealView360° enable properties to be showcased to a global audience, allowing sellers to attract interest from buyers outside of their local area or even from other countries.
            </p>
            <div className="list-style1 mb50">
              <ul>
                {featureList.map((list, index) => (
                  <li key={index}>
                    <i className="far fa-check text-white bgc-dark fz15"></i>
                    {list}
                  </li>
                ))}
              </ul>
            </div>
            <Link to={`/add-property`} className="ud-btn btn-white2">
            Add property<i className="fal fa-arrow-right-long"></i>
            </Link>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-lg-9 col-xl-8 col-xxl-7 offset-xxl-1">
          <div className="position-relative mb35 mb0-sm" data-aos="fade-right">
            <div className="img-box-1 list-inline-item me-0">
              <img
               
                className="img-1"
                src="/images/building_Image_270_350.jpg" style={{height:'350px', width:'270px'}}
                alt="about"
              />
            </div>
            <div className="img-box-2 list-inline-item me-0">
              <img
                className="img-1"
                src="/images/happy_buyer.svg" style={{height:'520px',width:'320px'}}
                alt="about"
              />
            </div>
            <div className="img-box-3">
              <img
               
                className="img-1 bounce-y"
                src="/images/Floating-Image_276_146.jpg" style={{width:'276px', height:'146px'}}
                alt="about"
              />
            </div>
            <div className="img-box-4">
              <img
                
                className="img-1 spin-right"
                src="/images/about/element-1.png"
                alt="about"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
