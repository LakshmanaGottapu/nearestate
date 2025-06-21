import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import MetaData from "@/components/common/MetaData";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from "axios";
const metaInformation = {
  title: "Blog Post  || nearestate.in",
};
 
const BlogV2 = () => {
  const [pageData,setPagedata]=useState([]);
  const [blogPosts,setblogPosts]=useState([]);
  const [blogCategory,setblogCategory]=useState([]);
  const [blogTags,setblogTags]=useState([]);
  useEffect(() => {
    var postObj={
        requestType:'blogs',
    }
    axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
      .then(response => {
        if(response.status=="200"){
          setPagedata(response.data);
          setblogPosts(response.data.blog);
          setblogCategory(response.data.categories);
          setblogTags(response.data.tags);
        }
      })
      .catch(error => {
        console.error(error);
      }); 
    }, []);
    function createMarkup(text) { return {__html: text}; };         
  return (
    <div className="bgc-f7">
    <MetaData meta={metaInformation} />
      <DefaultHeader />
      <MobileMenu />
      <section className="our-blog pt-0" style={{backgroundColor:'#f7f7f7'}}>
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-8">
            <div className="breadcumb-list" style={{height:'50px',paddingTop:'14px'}}>
            <Link to={'/'} style={{textDecoration:'underline'}}>Home</Link>&nbsp;&nbsp;
              <a>Blog</a>
            </div>
            {blogPosts.map((item, index) => (
                <div
                  className="blog-style1 list-style bgc-white d-block d-md-flex align-items-xl-center2 blogItems"
                  key={index} style={{marginBottom:'30px',paddingBottom:'0px'}}
                >
                  <div className="blog-img flex-shrink-0">
                    <img
                      className="w-100 h-100 cover blogImg"
                      src={item.blogImgUrl}
                      alt="blog"
                    />
                    <div className="date">
                      <span className="month">{item.date_added.split(" ")[0]}</span>
                      <span className="day">{item.date_added.split(" ")[1]}</span>
                    </div>
                  </div>
                  <div className="blog-content pl30 pb20 flex-grow-1">
                    <a className="tag" href="#">
                      {item.tag}
                    </a>
                    <h4 className="title mt-1 mb20">
                      <Link target="_blank" to={`/${item.blogUrl}`}>{item.blogTitle}</Link>
                    </h4>
                    <p className="text mb0" dangerouslySetInnerHTML={createMarkup(item.description)}></p>
                  </div>
                </div>
             ))}
            </div>
            <div className="col-lg-4" id="blog-sidebar" style={{paddingTop:'80px'}}>
            <div className="blog-sidebar">
              <div className="sidebar-widget mb30">
                <h6 className="widget-title">Categories</h6>
                <div className="category-list d-flex flex-column mt20">
                  {blogCategory.map((catgry, index) => (
                    <a style={{cursor:'pointer'}} key={index}>
                      {catgry.category} <span className="blogCategory">{catgry.count}</span>
                    </a>
                  ))}
                </div>
              </div>
              <div className="sidebar-widget mb30 pb20">
                <h6 className="widget-title">Popular Tags</h6>
                <div className="tag-list mt20">
                  {blogTags.map((tag, index) => (
                    <a style={{cursor:'pointer'}} key={index}>
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </div>
  );
};

export default BlogV2;
