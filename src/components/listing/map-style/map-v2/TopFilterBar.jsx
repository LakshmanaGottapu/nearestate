import React from "react";
import {useNavigate,useLocation} from 'react-router-dom';
const TopFilterBar = ({setCurrentSortingOption,colstyle,setColstyle,pageContentTrac}) => {
  const navigate = useNavigate();
  const mylocation = useLocation();
  const queryParams = new URLSearchParams(mylocation.search);
  function listview(){
    navigate(`/list-view?${window.location.href.split("?")[1]}`);
  }
  
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Showing {pageContentTrac[0]}–{pageContentTrac[2] < pageContentTrac[1] ? pageContentTrac[2] : pageContentTrac[1]} of {pageContentTrac[2]} results
          </p>
        </div>
      </div>
      {/* End .col-sm-6 */}

      <div className="col-sm-6">
        <div className="page_control_shorting d-flex align-items-center justify-content-center justify-content-sm-end">
          <div className="pcs_dropdown pr10 d-flex align-items-center">
            <span style={{ minWidth: "60px" }}>Sort by</span>
            <select className="form-select" id="sortBy" onChange={()=>{sortby()}} >
              <option value={""}>Select</option>
              <option value={1}>Price Low</option>
              <option value={2}>Price High</option>
            </select>
          </div>
          {/* <div className={`pl15 pr15 bdrl1 bdrr1 d-none d-md-block cursor  ${!colstyle? 'menuActive':'#' } `}   onClick={()=>setColstyle(false)}>
            Grid
          </div>
          <div className={`pl15 d-none d-md-block cursor  ${colstyle? 'menuActive':'#' }`} onClick={()=>setColstyle(true)}>
            List
          </div> */}
          <div className={`pl15 d-md-block cursor`} onClick={()=>listview()}><i className="far fa-list"></i>
            List View
          </div>
        </div>
      </div>
      {/* End .col-sm-6 */}
    </>
  );
};

export default TopFilterBar;
