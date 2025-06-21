// import Details from "@/components/blog/blog-single/Details";
// import Features from "@/components/blog/blog-single/Features";
// import Pagination from "@/components/blog/blog-single/Pagination";
import ReviewBoxForm from "@/components/blog/blog-single/ReviewBoxForm";
// import Social from "@/components/blog/blog-single/Social";
// import Tags from "@/components/blog/blog-single/Tags";
// import TopComments from "@/components/blog/blog-single/TopComments";
// import AllReviews from "@/components/blog/blog-single/reviews";
import Blog from "@/components/common/Blog";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import React, { useState,useEffect } from "react";
import MetaData from "@/components/common/MetaData";
import { useParams } from "react-router-dom";
import axios from "axios";
const metaInformation = {
  title: "Blog Details  || nearestate.in",
};

const BlogSingle = () => {
    let params = useParams();
    const [pageData,setPagedata]=useState([]);
    const [blogData,setblogdata]=useState([]);
    const [reviewsData,setReviewdata]=useState([]);
    useEffect(() => {
      var postObj={
          requestType:'blogsingle',
          property_id:params?.id
      }
      axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
        .then(response => {
          if(response.status=="200"){
            setPagedata(response.data);
            setblogdata(response.data.blog);
            setReviewdata(response.data.reviews);
          }
        })
        .catch(error => {
          console.error(error);
        }); 
      }, []);
      function createMarkup(text) { return {__html: text}; };   
  return (
    <>
    <MetaData meta={metaInformation} />
      <DefaultHeader />
      <MobileMenu />
      <section className="our-blog pt50">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12">
              <h2 className="blog-title">{blogData.title}</h2>
              <div className="blog-single-meta">
                <div className="post-author d-sm-flex align-items-center">
                {blogData.blogWriterimg &&<img
                   className="mr10"
                   src={blogData.blogWriterimg}
                   alt="blog"
                 />}
                 {!blogData.blogWriterimg &&<i className="fal fa-user-circle" style={{fontSize:'24px',fontWeight:'bold',color:'#3270FC'}}></i>}
                  <a className="pr15 bdrr1">
                    &nbsp;{blogData.Writer}
                  </a>
                  <a className="ml15 pr15 bdrr1">
                  {blogData.category}
                  </a>
                  <a className="ml15">
                  {blogData.date_added}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mx-auto maxw1600 mt60"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="large-thumb">
                <img
                  className="w-100 h-100 cover"
                   style={{maxHeight:'600px',objectFit:'cover'}}
                  src={blogData.blogImgUrl}
                  alt="blog"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="roww" data-aos="fade-up" data-aos-delay="500">
            <div className="col-xl-8 offset-xl-2">
            <div className="ui-content mt40 mb60" dangerouslySetInnerHTML={createMarkup(blogData.description)}>
            </div>
              {reviewsData && <div className="product_single_content mb50">
                <div className="mbp_pagination_comments">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
                        <h6 className="fz17 mb15" style={{display:'flex'}}>
                          <i className="fas fa-star fz12 pe-2" style={{paddingTop:'3px'}} />
                           {reviewsData.length}&nbsp;Reviews
                        </h6>
                        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
                        </div>
                      </div>
                    </div>
                    {reviewsData.map((review, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
                          {review.userImg && <img
                            src={review.userImg}
                            className="mr-3"
                            alt="comments-2.png"
                            style={{height:'48px'}}
                          />}
                          {!review.userImg &&<i className="fal fa-user-circle" style={{fontSize:'48px',fontWeight:'bold',color:'#3270FC'}}></i>}
                          <div className="ml20">
                            <h6 className="mt-0 mb-0">{review.username}</h6>
                            <div>
                              <span className="fz14">{review.date_added}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text mt20 mb20" dangerouslySetInnerHTML={createMarkup(review.comment)}></p>
                      </div>
                      ))}
                  </div>
                </div>
              </div>}
              <div className="bsp_reveiw_wrt">
                <h6 className="fz17">Leave A Review</h6>
                <ReviewBoxForm blogId={params?.id} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb90 pb20-md pt-0">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="main-title text-start text-md-center">
                <h2 className="title" style={{textAlign:'center'}}>Related Posts</h2>
              </div>
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog blogId={blogData.blogid}/>
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};
export default BlogSingle;