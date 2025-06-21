import SignIn from "./SignIn";
//mport SignUp from "./SignUp";

const LoginSignupModal = () => {
  function closePopup(){
    document.querySelector("button.btn-close").click();
  }
  return (
    <div className="modal-content">
      <div id="signinlogo" className="showrealview"><img src="images/login_view.jpg" style={{width:'100%'}} /></div>
      <div id="close-reg" onClick={()=>{closePopup()}} className="close-reg realcloseicon showrealview"><i className="fal fa-times"></i></div>
      <div className="modal-header hideRealview">
        <h5 className="modal-title" id="exampleModalToggleLabel">
          Login
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      {/* End header */}

      <div className="modal-body">
      <div id="realviewtxt" className="showrealview"><p style={{fontWeight:'600',fontSize:'16px',marginBottom:'0px'}} className="realview2">RealView360°</p>
        <p style={{fontSize:'13px',lineHeight:'17px'}}><span style={{display:'block',paddingBottom:'14px'}}>Please Login to Explore <font className="realview2">RealView360°</font> feature.</span> Discover your dream home and its vibrant neighborhood with <font className="realview2">RealView360°</font>.
            Immerse yourself in every room and explore the local surroundings, all from the comfort of your device.
            <span style={{display:'block'}}>Your next adventure starts here</span>
        </p>
        </div>
        <div className="log-reg-form">
          <div className="navtab-style2">
            {/* <nav>
              <div className="nav nav-tabs mb20" id="nav-tab" role="tablist">
                <button
                  className="nav-link active fw600"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Sign In
                </button>
                <button
                  className="nav-link fw600"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  New Account
                </button>
              </div>
            </nav> */}
            {/* End nav tab items */}

            <div className="tab-content" id="nav-tabContent2">
              <div
                className="tab-pane fade show active fz15"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <SignIn />
              </div>
              {/* End signin content */}

              {/* <div
                className="tab-pane fade fz15"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <SignUp />
              </div> */}
              {/* End signup content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
