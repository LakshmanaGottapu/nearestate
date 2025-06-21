import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
//import FilteringAgent from "@/components/property/FilteringAgent";

import React from "react";

import MetaData from "@/components/common/MetaData";
import { Link } from "react-router-dom";
const metaInformation = {
  title: "Agents || nearestate.in",
};

const Agents = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section className="breadcumb-section2">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Privacy Policy</h2>
                <div className="breadcumb-list">
                  <Link to={'/'}>Home</Link>
                  <a style={{cursor:'pointer'}}>Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Agent Section Area */}
      {/* <FilteringAgent/> */}
      <section className="our-agents pt-0">
        <div className="container" style={{background:'#fff'}}>
        <p className="text mb25">This privacy policy describes how we handle your personal information. We collect, use, and share personal information to help the nearestate.in website ("nearestate.in") work and to keep it safe (details below). In formal terms, nearestate.in, acting itself and through its subsidiaries, is the "data controller" of your personal information. This policy is effective 05/04/2016</p>
        <h2>Collection:</h2> 
        <p className="text mb25">Information posted on nearestate.in is obviously publicly available. Our servers are located in USA. Therefore, if you choose to provide us with personal information, you are consenting to the transfer and storage of that information on our servers. We collect and store the following personal information:</p>
        
        <p className="text mb25 disk">email address, Mobile number, physical contact information, and (depending on the service used) sometimes financial information;</p>
        <p className="text mb25 disk">Computer sign-on data, statistics on page views, traffic to and from nearestate.in and Ad data (all through cookies – you can take steps to disable the cookies on your browser although this is likely to affect your ability to use the site);</p>
        <p className="text mb25 disk">Other information, including users IP address and standard web log information.</p>
        <h2>Use:</h2><p>We use users' personal information to:</p>
        <p className="text mb25 disk">provide our services;</p>
        <p className="text mb25 disk">resolve disputes, collect fees, and troubleshoot problems;</p>
        <p className="text mb25 disk">encourage safe trading and enforce our policies;</p>
        <p className="text mb25 disk">customize users' experience, measure interest in our services, and inform users about services and updates;</p>
        <p className="text mb25 disk">communicate marketing and promotional offers to you;</p>
        <p className="text mb25 disk">Do other things for users as described when we collect the information.</p>
        <h2>Disclosure:</h2>
        <p className="text mb25 disk">All information contained by nearestate.in is treated as strictly confidential and nearestate.in does not and will not disclose or share such confidential information to / with any external organization.</p>
        <p className="text mb25 disk">The users’ privacy is very important to us. We do not and shall not at any point in time, either sell or rent users’ personal information to third parties without users’ explicit consent.</p>
        <p className="text mb25 disk">We may be required from time to time to disclose users’ personal information to Governmental or law enforcing agencies or our regulators, but we will only do so under proper authority.</p>
        <p className="text mb25 disk">nearestate.in also reserves the right to make use of the personal information in any investigation or judicial process relating to fraud on account of such transactions during the period nearestate.in retains such information.</p>
        <p className="text mb25 disk">We may also disclose personal information to enforce our policies, respond to claims that a posting or other content violates other’s rights, or protects anyone’s rights, property or safety.</p>
        <p className="text mb25 disk">We may also share personal information with:</p>
        <p className="text mb25">- Corporate affiliates who help detect or prevent potentially illegal acts and provide joint services (Our corporate affiliates will market only to users who ask them to).</p>
        <p className="text mb25">- Service providers who help with our business operations.</p>
        <p className="text mb25 disk">Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to the website.</p>
        <p className="text mb25 disk">Google's use of the DoubleClick cookie enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</p>
        <p className="text mb25 disk">Users may opt out of the use of the DoubleClick cookie for interest-based advertising by visiting Ads Settings.</p>
        <h2>Using Information from nearestate.in:</h2> 
        <p className="text mb25">You may use personal information gathered from nearestate.in only to follow up with another user about a specific posting, not to send spam/phising or collect personal information from someone who hasn't agreed to that.</p>
        <h2>Access, Modification, and Deletion:</h2> 
        <p className="text mb25">You can see, modify or erase your personal information by reviewing your posting or account status page. Contact customer support at info@nearestate.in to review any personal information we store that is not available on nearestate.in. There may be a charge associated with such requests but these will not exceed the amounts permitted by law. We delete personal information when we no longer need it for the purposes we described earlier. We retain personal information as permitted by law to resolve disputes, enforce our policies; and prevent bad guys from coming back.</p>
        <h2>Data Security:</h2> 
        <p className="text mb25">We use a number of mechanisms (encryption, passwords, and physical security) to protect the security and integrity of your personal information against unauthorized access and disclosure. Unfortunately, no data transmission over the internet can be guaranteed to be completely secure. So while we strive to protect such information, we cannot ensure or warrant the security of any information you transmit to us and you do so at your own risk. Once any personal information comes into our possession, we will take reasonable steps to protect that information from misuse and loss and from unauthorized access, modification or disclosure.</p>
        <h2>Confidentiality of Information:</h2> 
        <p className="text mb25">Users who use any of the features on nearestate.in agree and accept that they have been fully informed by nearestate.in that the use of features may lead to publication, to all users of nearestate.in, of any personal information posted by them while using any specific feature on nearestate.in. Users further agree that the authenticity of, and consequences from the posting by users of any personal information of themselves or any other person, are the sole responsibility of the user. Users further agree and accept that the terms of the Privacy Policy will be applicable to the use of all features, existing and new. However, the Users agree and accept that confidentiality of information posted on such features has been waived by the Users of such features themselves.</p>
        <h2>General:</h2> 
        <p className="text mb25">We may update, upgrade, modify (partially &/or fully) this policy at any time, with updates taking effect when you next post or after 30 days, whichever is sooner. If we or our corporate affiliates are involved in a merger or acquisition, we may share personal information with another company, but this policy will continue to apply. Send questions about this policy to info@nearestate.in</p>
        </div>
      </section>  
      {/* End Agent Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Agents;
