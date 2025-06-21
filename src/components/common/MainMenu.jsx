import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import { Link} from "react-router-dom";
import {useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const { pathname } = useLocation()

  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");


  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("about");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[2] == pathname.split("/")[1]) {
        setTopMenu("compare");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[3] == pathname.split("/")[1]) {
        setTopMenu("contact");
      }
    });
    // propertyItems.forEach((item) =>
    //   item.subMenuItems.forEach((elm) => {
    //     if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //       setTopMenu("compare");
    //       setSubmenu(item.label);
    //     }
    //   })
    // );
    // listingItems.forEach((item) =>
    //   item.submenu.forEach((elm) => {
    //     if (elm.href.split("/")[1] == pathname.split("/")[1]) {
    //       setTopMenu("listing");
    //       setSubmenu(item.title);
    //     }
    //   })
    // );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem2">
        <Link className="list-item" to="/">
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Home
          </span>
        </Link>
        {/* Level Two*/}
        {/* <ul className="sub-menu">
          {homeItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </li>
      {/* End homeItems */}

      <li className="megamenu_style dropitem">
        <Link className="list-item" to="/about">
          <span className={pathname.split("/")[1] == "about" ? "title menuActive" : "title"}>
            About us
          </span>
          {/* <span className="arrow"></span> */}
        </Link>
        {/* <ul className="row dropdown-megamenu sub-menu">
          {listingItems.map((item, index) => (
            <li className="col mega_menu_list" key={index}>
              <h4 className="title">{item.title}</h4>
              <ul className="sub-menu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(submenuItem.href)}`}
                      to={submenuItem.href}
                    >
                      {submenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </li>
      {/* End listings */}

      <li className="visible_list dropitem">
        <Link className="list-item" to="/compare">
          <span
            className={pathname.split("/")[1] == "compare" ? "title menuActive" : "title"}
          >
            Compare
          </span>
          {/* <span className="arrow"></span> */}
        </Link>
        {/* <ul className="sub-menu">
          {propertyItems.map((item, index) => (
            <li key={index} className="dropitem">
              <a href="#">
                <span
                  className={
                    submenu == item.label ? "title menuActive" : "title"
                  }
                >
                  {item.label}
                </span>
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                {item.subMenuItems.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(subMenuItem.href)}`}
                      to={subMenuItem.href}
                    >
                      {subMenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul> */}
      </li>
      {/* End property Items */}

      <li className="visible_list dropitem">
        <Link className="list-item" to="/blog">
          <span className={topMenu == "blog" ? "title menuActive" : "title"}>
            Blog
          </span>
          {/* <span className="arrow"></span> */}
        </Link>
        {/* <ul className="sub-menu">
          {blogItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </li>
      {/* End blog Items */}

      <li className="visible_list dropitem">
        <Link className="list-item" to="/contact">
          <span className={pathname.split("/")[1] == "contact" ? "title menuActive" : "title"}>
            Contact us
          </span>
          {/* <span className="arrow"></span> */}
        </Link>
        {/* <ul className="sub-menu">
          {pageItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </li>
      {/* End pages Items */}
    </ul>
  );
};

export default MainMenu;
