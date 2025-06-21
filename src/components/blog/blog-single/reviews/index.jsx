import React from "react";
import SingleReview from "./SingleReview";

// const sortOptions = [
//   "Newest",
//   "Best Seller",
//   "Best Match",
//   "Price Low",
//   "Price High",
// ];

const AllReviews = () => {
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
              <h6 className="fz17 mb15">
                <i className="fas fa-star fz12 pe-2" />
                {reviews.length}&nbsp;Reviews
              </h6>
              <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                {/* <div className="pcs_dropdown mb15 d-flex align-items-center">
                  <span style={{ minWidth: "60px" }}>Sort by</span>
                  <select className="form-select">
                    {sortOptions.map((option, index) => (
                      <option key={index}>{option}</option>
                    ))}
                  </select>
                </div> */}
              </div>
            </div>
          </div>
          {/* End review filter */}

          {/* <SingleReview /> */}
          {reviews.map((review, index) => (
            <div className="col-md-12" key={index}>
              <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
                <img
                  
                  src="/images/blog/comments-2.png"
                  className="mr-3"
                  alt="comments-2.png"
                />
                <div className="ml20">
                  <h6 className="mt-0 mb-0">{review.name}</h6>
                  <div>
                    <span className="fz14">{review.date}</span>
                    <div className="blog-single-review">
                      <ul className="mb0 ps-0">
                        {[...Array(review.rating)].map((_, i) => (
                          <li className="list-inline-item me-0" key={i}>
                            <a href="#">
                              <i className="fas fa-star review-color2 fz10" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .d-flex */}

              <p className="text mt20 mb20">{review.text}</p>
              <ul className="mb20 ps-0">
                {review.images.map((image, i) => (
                  <li className="list-inline-item mb5-xs" key={i}>
                    <img
                    
                      className="bdrs6"
                      src={image}
                      alt="review-img"
                    />
                  </li>
                ))}
              </ul>

              {/* <div className="review_cansel_btns d-flex bdrb1 pb30">
                <a href="#">
                  <i className="fas fa-thumbs-up" />
                  Helpful
                </a>
                <a href="#">
                  <i className="fas fa-thumbs-down" />
                  Not helpful
                </a>
              </div> */}
            </div>
            ))}
          {/* End reviews */}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
