const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: "flaticon-security",
      title: "Increases Sales:",
      description:
        "<font class='realview2'>RealView360°</font> will give potential buyers a true sense of the space, leading to more interest and a successful sale.",
        img:'images/about-us_Seller_1.png',
    },
    {
      icon: "flaticon-keywording",
      title: "Increases Credibility",
      description:
        "Shows potential buyers that you are a serious seller who is willing to invest time and resources to present your property in the best possible way.",
        img:'images/about-us_Seller_2.png',
    },
    {
      icon: "flaticon-investment",
      title: "Global Market",
      description:
        "<font class='realview2'>RealView360°</font> enable properties to be showcased to a global audience, allowing sellers to attract interest from buyers outside of their local area or even from other countries.",
      img:'images/about-us_Seller_3.png',
    },
  ];
  function createMarkup(text) { return {__html: text}; };
  function hovercol(id){
    let img="images/about-us_Seller_"+(id+1)+"_Wht.png";
    document.getElementById("icon_"+id).setAttribute("src",img);
  }
  function hoverout(id){
    let img="images/about-us_Seller_"+(id+1)+".png";
    document.getElementById("icon_"+id).setAttribute("src",img);
  }
  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span onMouseOver={()=>hovercol(index)} onMouseOut={()=>hoverout(index)} className={`list-icon flex-shrink-0`}><img src={feature.img} id={"icon_"+index} style={{marginBottom:'16px'}} /></span>
          <div onMouseOver={()=>hovercol(index)} onMouseOut={()=>hoverout(index)} className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15" dangerouslySetInnerHTML={createMarkup(feature.description)}></p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
