//import { blogs } from "@/data/blogs";
import { Link } from "react-router-dom";
import React, { useState,useEffect } from "react";
import axios from "axios";

const Blog = (data) => { 
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
          //setPagedata(response.data);
          //let sortedData=response.data.blog.filter((item)=>{ return item.id!=blogIds;});
          setblogPosts(response.data.blog);
          //setblogCategory(response.data.categories);
          //setblogTags(response.data.tags);
        }
      })
      .catch(error => {
        console.error(error);
      }); 
    }, []);
    function createMarkup(text) { return {__html: text}; }; 
    setTimeout(()=>{
      let sortedData=blogPosts.filter((item)=>{ return item.id!=data.blogId;});
      setblogPosts(sortedData);
    },100);
  return (
    <>
      {blogPosts.map((blog) => (
        <div className="col-sm-6 col-lg-4" key={blog.id}>
          <div className="blog-style1">
            <div className="blog-img">
              <img
                className="w-100 h-100 cover"
                src={blog.blogImgUrl}
                alt="blog"
              />
            </div>
            <div className="blog-content">
              <div className="date">
                <span className="month">{blog.date_added.split(" ")[0]}</span>
                <span className="day">{blog.date_added.split(" ")[1]}</span>
              </div>
              {/* <a className="tag">
                {blog.tag}
              </a> */}
              <h6 className="title mt-1">
              <Link target="_blank" to={`/${blog.blogUrl}`}>{blog.blogTitle}</Link>
              </h6>
              <p className="text mb0" dangerouslySetInnerHTML={createMarkup(blog.description)}></p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
