import { blogDataTwo } from "@/data/blogs";

import { Link } from "react-router-dom";

const Blog = (blogData) => {
  return (
    <>
      {blogData.map((item, index) => (
        <div
          className="blog-style1 list-style bgc-white d-block d-md-flex align-items-xl-center2 blogItems"
          key={index} 
        >
          <div className="blog-img flex-shrink-0">
            <img
              className="w-100 h-100 cover"
              src={item.blogImgUrl}
              alt="blog"
            />
            <div className="date">
              <span className="month">{item.date_added}</span>
              {/* <span className="day">{item.date.day}</span> */}
            </div>
          </div>
          <div className="blog-content pl30 pb20 flex-grow-1">
            <a className="tag" href="#">
              {item.tag}
            </a>
            <h4 className="title mt-1 mb20">
              <Link to={`/${item.blogUrl}`}>{item.blogTitle}</Link>
            </h4>
            <p className="text mb0">{item.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
