import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "../Search/Search";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Header.scss";
import SideMenu from "../SideMenu/SideMenu";

function Header({ searching, setSearching, showSearch, setShowSearch }) {
  const products = useSelector((state) => state.cart.products);
  const [showMobilMeni, setShowMobilMeni] = useState(false);
  // const [showSearch, setShowSearch] = useState(false);

  const toggle = () => {
    setShowMobilMeni(!showMobilMeni);
    setShowSearch(false);
  };
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowMobilMeni(false);
  };

  //basic-meni scrolling
  var prevScrollpos = window.pageYOffset || window.scrollY;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset || window.scrollY;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("basic-meni").style.top = "67px";
    } else {
      document.getElementById("basic-meni").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <div className="">
      <header>
        <div id="logo-container" className="">
          <Link to={"/"}>
            <img src="../kanibal_doo_logo.png" />
          </Link>
        </div>

        <div className="pretraga ">
          <Search searching={searching} setSearching={setSearching} />
        </div>
        <div className="head-menu" id="basic-meni">
          <ul className="meni">
            <li className="meni-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="meni-item">
              <Link to="/createaccount" className="meni-link">
                Napravi nalog
              </Link>
            </li>
            {/* <li className="meni-item">
              <Link to="/queryes" className="meni-link">
                Queryes
              </Link>
            </li> */}
            <li className="meni-item">
              <Link to="/dashboard" className="meni-link">
                Dashboard
              </Link>
            </li>
            <li className="meni-item">
              <Link to="/o-nama" className="meni-link">
                O nama
              </Link>
            </li>
            <li className="meni-item">
              <Link to="/123/456" className="meni-link">
                Kontakt i lokacija
              </Link>
            </li>
          </ul>
        </div>
        <div className="meni-group">
          <div className="mobil-meni-search">
            <i onClick={toggleSearch} className="bi bi-search"></i>
          </div>
          <div className="meni-mobil ">
            <i onClick={toggle} className="bi bi-list" />
          </div>
          <div className="profil ">
            <Link to={"/profil"}>
              <i className="bi bi-person-fill"></i>
            </Link>
          </div>

          <div className="cart-link ">
            <Link to={"/kasa"}>
              <div id="cart-icon-container">
                <i className="bi bi-basket-fill"></i>
                <div id="qty-container">
                  <a>{products.length}</a>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>
      {showSearch && (
        <div className="mobil-search">
          <Search searching={searching} setSearching={setSearching} />
        </div>
      )}

      {showMobilMeni && (
        <div className="mobil-meni">
          <SideMenu setShowMobilMeni={setShowMobilMeni} />
        </div>
      )}
    </div>
  );
}

export default Header;
