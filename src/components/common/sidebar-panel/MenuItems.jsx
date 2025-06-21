import { Link } from "react-router-dom";
const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Home",link:"/" },
    { id: 2, title: "About us" ,link:"/about"},
    { id: 3, title: "Compare" ,link:"/about"},
    { id: 4, title: "Blog" ,link:"/Blog"},
    { id: 5, title: "Contact us" ,link:"/contact"}
  ];
  function removeFade(){
    document.querySelector(".offcanvas-backdrop").remove();
    document.body.style.overflow="auto";
    document.body.style.paddingRight="inherit";
    return false;
  }
  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link className="nav-link" onClick={()=>removeFade()} to={item.link} role="button">
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;