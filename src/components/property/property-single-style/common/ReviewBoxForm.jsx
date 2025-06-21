import Select from "react-select";
import React, { useState } from 'react';
import axios from "axios";
const ReviewBoxForm = (data) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    email: '',
    rating:'',
  });

  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };
  const handleChange2 = (event) => {
    const name='rating';
    const value = event.value;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); 
  };
  const inqueryType = [
    { value: "5", label: "Five Star" },
    { value: "4", label: "Four Star" },
    { value: "3", label: "Three Star" },
    { value: "2", label: "Two Star" },
    { value: "1", label: "One Star" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#3270FC"
          : isHovered
          ? "#f3f3f3"
          : isFocused
          ? "#f3f3f3"
          : undefined,
      };
    },
  };

const handleSubmit = (event) => {
    event.preventDefault();
    // Validation logic
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Please enter title.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Please enter description.';
    }
    if (!formData.rating.trim()) {
      newErrors.rating = 'Please enter rating.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter email.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted with data:', formData);
      let _login=document.getElementById("logcol").innerText;
      if(_login.includes("Login")){
        document.getElementById("isreview").value=1;
        document.getElementById("fav_id").value=0;
        document.getElementById("contactFlag").value=0;
        document.getElementById("loginBtn").click();return false;
      }else{
        var re = new RegExp("userid" + "=([^;]+)"); 
        var userId = re.exec(document.cookie);
        if(userId){
          var postObj={
            userid:userId[1],
            propertyid:data.propId,
            requestType:'add_review',
            message:formData.description,
            rating:formData.rating,
            title:formData.title
        }
        axios.post('https://www.nearestate.in/reactAPI.php',postObj,{headers:{'Content-Type': 'application/json'}})
          .then(response => {
            console.log(response);
            if(response.status=="200"){
              alert("Review Added Successfully.");
            }
          })
          .catch(error => {
            console.error(error);
          });  
        }
      }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form className="comments_form mt30" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange} 
            />
            {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
          </div>
        </div>
        {/* End .col-12 */}

        <div className="col-md-6">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}    
            />
            {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-6">
          <div className="widget-wrapper sideborder-dropdown mb-4">
            <label className="fw600 ff-heading mb-2">Rating</label>
            <div className="form-style2 input-group">
              <Select
                defaultValue={[inqueryType[0]]}
                name="rating"
                options={inqueryType}
                styles={customStyles}
                className="custom-react_select"
                classNamePrefix="select"
                required
                isClearable={false}
                onChange={handleChange2}
              />
              {errors.rating && <div style={{ color: 'red' }}>{errors.rating}</div>}
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-md-12">
          <div className="mb-4">
            <label className="fw600 ff-heading mb-2">Review</label>
            <textarea
              className="pt15"
              name="description"
              rows={6}
              placeholder="Write a Review"
              defaultValue={""}
              onChange={handleChange} 
            />
            {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
          </div>
          <button type="submit" id="reviewBtn" className="ud-btn btn-white2" style={{color:'#000'}}>
            Submit Review
            <i className="fal fa-arrow-right-long" />
          </button>
        </div>
        <input type="hidden" id="isreview" />
        {/* End .col-6 */}
      </div>
    </form>
  );
};

export default ReviewBoxForm;
