import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
//import FilteringAgency from "@/components/property/FilteringAgency";

import React from "react";

import MetaData from "@/components/common/MetaData";
import { Link } from "react-router-dom";
const metaInformation = {
  title: "Agency || nearestate.in",
};

const Agency = () => {
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
                <h2 className="title">Terms of use</h2>
                <div className="breadcumb-list">
                  <Link to={'/'}>Home</Link>
                  <a style={{cursor:'pointer'}}>Terms of use</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Agent Section Area */}
      {/* <FilteringAgency/> */}
      <section className="our-agents pt-0">
        <div className="container" style={{background:'#fff'}}>
        <h2>YOUR ACCEPTANCE OF THIS AGREEMENT:</h2> 
        <p className="text mb25">This agreement between you ("you" or "your") and "nearestate.in", a company registered under Indian Partnership Act 1932. with its registered office at T Hub phase 2, Sy No 83/1, Hyderabad Knowledge city, Raidurg, Hyderabad, TG-500059 ("nearestate.in" "we," or "our"), governs your use of the search services offered by nearestate.in through its telephone search, SMS, or any other medium using which nearestate.in may provide the search services. When you access or use any of the services, you agree to be bound by these Terms and Conditions ("Terms").</p>
        <h2>CHANGES</h2>
        <p className="text mb25">We may periodically change the Terms without notice, and you are responsible for checking these Terms periodically for revisions. All amended Terms become effective upon our posting to our website http://www.nearestate.in, and any use of nearestate.in's search services after such revisions have been posted on our website are governed by such revised Terms.</p>
        <p className="text mb25">You may view, use, copy, and distribute the information found in the telephone search for internal, non-commercial, informational purposes only. You are prohibited from data mining, scraping, crawling, or using any process or processes that send automated queries to nearestate.in. You may not use the telephone search to compile a collection of listings, including a competing listing product or service. You may not use the telephone search for any unsolicited commercial calls.</p>
        <h2>HOW WE MAY USE INFORMATION YOU PROVIDE TO US</h2>
        <p className="text mb25">Do not send us any confidential or proprietary information. Except for any personally identifiable information that we agree to keep confidential as provided in our Privacy Policy, any material, including, but not limited to any feedback, data, answers, questions, comments, suggestions, ideas or the like, which you send to us will be treated as being non-confidential and nonproprietary. We assume no obligation to protect confidential or proprietary information (other than personally identifiable information) from disclosure and will be free to reproduce, use, and distribute the information to others without restriction.</p>
        <h2>Disclaimer:</h2>
        <p className="text mb25">nearestate.in communicates information provided by real estate developers, home owners, land owners, resellers and buyers. While every attempt has been made to ascertain the authenticity of the information available with nearestate.in, it has no control over any information, the accuracy of such information, integrity or quality of such information on our database. nearestate.in makes no guarantee, nor can be held responsible for any such information, including its authenticity, currency, content, quality, or legality, or any resulting loss or damage. Further, nearestate.in is not liable for any kind of damages, losses or action arising directly or indirectly due to any information, including any errors or omissions in any information, access and/or use of the information resulting in loss of revenue, profits, property etc. All information including but not limited to the prices and the availability of land/building/plot/apartment or anything thereof, is subject to change without notice by the party providing the information. You should use discretion while using the information available with nearestate.in.</p>
        <p className="text mb25">nearestate.in reserves the right, in its sole discretion and without any obligation, to correct any errors or omissions with respect to the information. Where appropriate, nearestate.in will endeavor to update information listed in its database on a timely basis, but nearestate.in shall not be liable for any inaccuracies.</p>
        <p className="text mb25">Users are permitted to access the information available with nearestate.in and use it for their personal use only. Unauthorized access, reproduction, redistribution, transmission and/or dealing with any information contained in nearestate.in's database in any other manner, either in whole or in part, are strictly prohibited, failing which strict legal action will be initiated against such users. nearestate.in also reserves the right to impose/change the regulations related to the access of the information/database, whether in terms of access fee, timings, access restrictions or otherwise. It is the responsibility of users to refer to the terms and conditions each time they use the information/database.</p>
        <p className="text mb25">While every attempt has been made to ascertain the authenticity of the information/content in the database, nearestate.in is not liable for any kind of damages, losses or action arising directly or indirectly, due to access and/or use of the information/content in the database including but not limited to any decisions based on information/content in the database resulting in loss of data, revenue, profits, property etc.</p>
        <h2>WARRANTY DISCLAIMER</h2>
        <p className="text mb25">Please remember that any provider of goods or services is entitled to register with nearestate.in. nearestate.in does not examine whether the advertisers are good, reputable or quality builders/real estate companies. You must satisfy yourself about all relevant aspects prior to availing of the terms of service. nearestate.in has also not negotiated or discussed any terms of engagement with any of the advertisers. The same should be done by you. Purchasing of land/plot/apartment or availing of services from advertisers shall be at your own risk.</p>
        <p className="text mb25">We do not investigate, represent or endorse the accuracy, legality, legitimacy, validity or reliability of any information, services, or other promotions, contained in the database. Any use of the nearestate.in's services, reliance upon any information from its database shall be at your sole risk. nearestate.in disclaims any and all responsibility or liability for the accuracy, content, completeness, legality, reliability, or operability or availability of information with nearestate.in.</p>
        <h2>nearestate.in DISCLAIMS ANY AND ALL WARRANTIES TO THE FULLEST EXTENT OF THE LAW, INCLUDING ANY WARRANTIES FOR ANY INFORMATION, OR SERVICES, OBTAINED THROUGH, ADVERTISED OR RECEIVED THROUGH ITS DATABASE.
        INDEMNIFICATION</h2>
        <p className="text mb25">You agree to indemnify us and hold us harmless from and with respect to any claims, actions, liabilities, losses, expenses, damages and costs (including, without limitation, actual attorneys' fees) that may at any time be incurred by us or them arising out of or in connection with these Terms or services you request, including, without limitation, any claims, suits or proceedings for defamation or libel, violation of right of privacy or publicity, criminal investigations, infringement of intellectual property, false or deceptive advertising or sales practices.</p>
        <h2>MISCELLANEOUS</h2>
        <p className="text mb25">These Terms will be governed by and construed in accordance with the Indian laws, without giving effect to its conflict of laws provisions or your actual state or country of residence, and you agree to submit to the jurisdiction of Courts in Hyderabad, India. You are responsible for compliance with applicable laws. If for any reason a court of competent jurisdiction finds any provision or portion of the Terms to be unenforceable, the remainder of the Terms will continue in full force and effect. These Terms constitute the entire agreement between us and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral, regarding the subject matter of these Terms. Any waiver of any provision of the Terms will be effective only if in writing and signed by you and nearestate.in. nearestate.in reserves the right to investigate complaints or reported violations of these Terms and to take any action we deem necessary and appropriate. Such action may include reporting any suspected unlawful activity to law enforcement officials, regulators, or other third parties. In addition, we may take action to disclose any information necessary or appropriate to such persons or entities relating to user profiles, e-mail addresses, usage history, posted materials, and traffic information. nearestate.in reserves the right to seek all remedies available at law and in equity for violations of these Terms.</p>
        <p className="text mb25">Notices: All of our notices, demands and other communications must be in writing and will be deemed to have been given (a) if mailed by certified mail, postage prepaid, (b) if delivered by overnight courier, (c) if sent by facsimile transmission and such transmission is confirmed as received, or (d) if sent by electronic mail, and such message is confirmed as received, in each case to the address, fax number or e-mail address specified on the Order for the recipient of such notice. All of your notices, demands and other communications must be in writing and will be deemed to have been given (a) if mailed by certified mail, postage prepaid or if delivered by overnight courier, to our address: nearestate.in, Banjarahills, Hyderabad, Telangana 500034.</p>
        <p className="text mb25">Force Majeure: In no event shall we have liability or be deemed to be in breach hereof for any failure or delay of performance resulting from any governmental action, fire, flood, insurrection, earthquake, power failure, network failure, riot, explosion, embargo, strikes (whether legal or illegal), terrorist act, labor or material shortage, transportation interruption of any kind or work slowdown or any other condition not reasonably within our control. Your payment obligations shall continue during any event of force majeure.</p>
        <p className="text mb25">Telephone Conversations: All telephone conversations between you and us about your advertising may be recorded and you hereby consent to such monitoring and recordation.</p>
        <p className="text mb25">Arbitration: Any disputes and differences whatsoever arising in connection with these Terms shall be settled by Arbitration in accordance with the Arbitration and Conciliation Act, 1996. a) All proceedings shall be conducted in English language. b) Unless the Parties agree on a sole arbitrator there shall be three Arbitrators, one to be selected by each of the parties, and the third to be selected by the two Arbitrators appointed by the parties. c) The venue of Arbitration shall be in Hyderabad, India.</p>
        <p className="text mb25">Entire Agreement: These Terms constitutes the entire agreement between you and us with respect to the subject matter of these Terms and supersedes all prior written and all prior or contemporaneous oral communications regarding such subject matter. Accordingly, you should not rely on any representations or warranties that are not expressly set forth in these Terms. If any provision or provisions of these Terms shall be held to be invalid, illegal, unenforceable or in conflict with the law of any jurisdiction, the validity, legality and enforceability of the remaining provisions shall not in any way be affected or impaired. Except as provided in Section 1, these Terms may not be modified except by writing signed by you and us; provided, however, we may change these Terms from time to time, and such revised terms and conditions shall be effective with respect to any Advertising Products ordered after written notice of such revised terms to you or, if earlier, posting of such revised terms and conditions on our Website</p>
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

export default Agency;
