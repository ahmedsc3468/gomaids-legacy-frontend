import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import "../../assets/MyCSS/home-pages.css";
import { useHistory } from "react-router-dom";
import Notification from "../sections/Notification/Content";
import NotificationCount from "../sections/Notification/NotificationCount";

const navigationmenu = [
  {
    id: 1,
    linkText: "Home",
    link: "/",
    child: false,
    // submenu: [
    //     {
    //         id: 11,
    //         link: '/',
    //         linkText: 'Home Page 1'
    //     },
    //     {
    //         id: 12,
    //         link: '/home-v2',
    //         linkText: 'Home Page 2'
    //     },
    //     {
    //         id: 13,
    //         link: '/home-v3',
    //         linkText: 'Home Page 3'
    //     },
    //     {
    //         id: 14,
    //         link: '/home-v4',
    //         linkText: 'Home Page 4'
    //     },
    // ]
  },
  {
    id: 2,
    linkText: "About Us",
    link: "/about",
    child: false,
    // submenu: [
    //     {
    //         id: 21,
    //         link: '/about',
    //         linkText: 'About Us'
    //     },
    //     {
    //         id: 22,
    //         link: '/team-v1',
    //         linkText: 'Our Team'
    //     },
    //     {
    //         id: 23,
    //         link: '/team-v2',
    //         linkText: 'Our Team 2'
    //     },
    //     {
    //         id: 24,
    //         link: '/team-details',
    //         linkText: 'Team Details'
    //     },
    //     {
    //         id: 25,
    //         link: '/clients',
    //         linkText: 'Partners'
    //     },
    //     {
    //         id: 26,
    //         link: '/faq',
    //         linkText: 'Faq'
    //     },
    //     {
    //         id: 27,
    //         link: '/testimonials',
    //         linkText: 'Testimonials'
    //     },
    //     {
    //         id: 28,
    //         link: '/pricing-v1',
    //         linkText: 'Pricing 1'
    //     },
    //     {
    //         id: 29,
    //         link: '/pricing-v2',
    //         linkText: 'Pricing 2'
    //     },
    // ]
  },
  {
    id: 3,
    linkText: "Find a Service",
    link: "/find-a-services",
    child: false,
    // submenu: [
    //     {
    //         id: 31,
    //         link: '/services-v1',
    //         linkText: 'Services 1'
    //     },
    //     {
    //         id: 32,
    //         link: '/services-v2',
    //         linkText: 'Services 2'
    //     },
    //     {
    //         id: 33,
    //         link: '/service-details',
    //         linkText: 'Service Details'
    //     },
    // ]
  },

  // {
  //     id: 4,
  //     linkText: 'Blog',
  //     child: true,
  //     submenu: [
  //         {
  //             id: 41,
  //             link: '/blog-list-standared',
  //             linkText: 'Blog List Classic'
  //         },
  //         {
  //             id: 42,
  //             link: '/blog-list-standared-left-sidebar',
  //             linkText: 'Blog List Sidebar'
  //         },
  //         {
  //             id: 43,
  //             link: '/blog-list-standared-no-sidebar',
  //             linkText: 'Blog List No Sidebar'
  //         },
  //         {
  //             id: 44,
  //             link: '/blog-list-grid-v1',
  //             linkText: 'Blog Grid 1'
  //         },
  //         {
  //             id: 45,
  //             link: '/blog-list-grid-v2',
  //             linkText: 'Blog Grid 2'
  //         },
  //         {
  //             id: 46,
  //             link: '/blog-list-grid-sidebar',
  //             linkText: 'Blog Grid Sidebar'
  //         },
  //         {
  //             id: 47,
  //             link: '/blog-details',
  //             linkText: 'Blog Detail Image'
  //         },
  //         {
  //             id: 48,
  //             link: '/blog-details-slider',
  //             linkText: 'Blog Detail Slider'
  //         },
  //         {
  //             id: 49,
  //             link: '/blog-details-video',
  //             linkText: 'Blog Detail Video'
  //         },
  //         {
  //             id: 410,
  //             link: '/blog-details-nosidebar',
  //             linkText: 'Blog Detail No Sidebar'
  //         },
  //     ]
  // },
  // {
  //     id: 5,
  //     linkText: 'Shop',
  //     child: false,
  //     submenu: [
  //         {
  //             id: 51,
  //             link: '/shop',
  //             linkText: 'Shop List 3 Column'
  //         },
  //         {
  //             id: 52,
  //             link: '/shop-col-4',
  //             linkText: 'Shop List 4 Column'
  //         },
  //         {
  //             id: 53,
  //             link: '/product-details',
  //             linkText: 'Shop Details'
  //         },
  //         {
  //             id: 54,
  //             link: '/cart',
  //             linkText: 'Cart'
  //         },
  //         {
  //             id: 55,
  //             link: '/checkout',
  //             linkText: 'Checkout'
  //         },
  //         {
  //             id: 56,
  //             link: '/login',
  //             linkText: 'Login'
  //         },
  //         {
  //             id: 57,
  //             link: '/signup',
  //             linkText: 'Signup'
  //         },
  //     ]
  // },
  {
    id: 6,
    linkText: "Contact Us",
    link: "/contact",
    child: false,
    // submenu: [
    //     {
    //         id: 61,
    //         link: '/contact',
    //         linkText: 'Contact'
    //     },
    //     {
    //         id: 62,
    //         link: '/cost-calculator',
    //         linkText: 'Cost Calculator'
    //     },
    //     {
    //         id: 63,
    //         link: '/gallery-after-before',
    //         linkText: 'Gallery After Before'
    //     },
    //     {
    //         id: 64,
    //         link: '/gallery-after-before-2col',
    //         linkText: 'Gallery After Before 2'
    //     },
    //     {
    //         id: 65,
    //         link: '/gallery-v2',
    //         linkText: 'Simple Gallery 2 Column'
    //     },
    //     {
    //         id: 66,
    //         link: '/gallery-v3',
    //         linkText: 'Simple Gallery 3 Column'
    //     },
    //     {
    //         id: 67,
    //         link: '/gallery-v4',
    //         linkText: 'Simple Gallery 4 Column'
    //     },
    //     {
    //         id: 68,
    //         link: '/portfolio-col-3',
    //         linkText: 'Portfolio 3 Column'
    //     },
    //     {
    //         id: 69,
    //         link: '/portfolio-col-4',
    //         linkText: 'Portfolio 4 Column'
    //     },
    //     {
    //         id: 610,
    //         link: '/portfolio-masonry',
    //         linkText: 'Portfolio Masonry'
    //     },
    //     {
    //         id: 611,
    //         link: '/portfolio-details',
    //         linkText: 'Portfolio Details'
    //     },
    //     {
    //         id: 612,
    //         link: '/coming-soon',
    //         linkText: 'Coming Soon'
    //     },
    //     {
    //         id: 613,
    //         link: '/error',
    //         linkText: 'Error'
    //     },
    // ]
  },
  {
    id: 4,
    linkText: "Partner With Us",
    link: "/partner-with-us",
    child: false,
    special: true,
    // submenu: [
    //     {
    //         id: 31,
    //         link: '/services-v1',
    //         linkText: 'Services 1'
    //     },
    //     {
    //         id: 32,
    //         link: '/services-v2',
    //         linkText: 'Services 2'
    //     },
    //     {
    //         id: 33,
    //         link: '/service-details',
    //         linkText: 'Service Details'
    //     },
    // ]
  },
];

class Menu extends Component {
  getNextSibling = function (elem, selector) {
    // Get the next sibling element
    var sibling = elem.nextElementSibling;
    // If there's no selector, return the first sibling
    if (!selector) return sibling;
    // If the sibling matches our selector, use it
    // If not, jump to the next sibling and continue the loop
    while (sibling) {
      if (sibling.matches(selector)) return sibling;
      sibling = sibling.nextElementSibling;
    }
  };
  triggerChild = (e) => {
    let subMenu = "";
    subMenu =
      this.getNextSibling(e.target, ".submenu") !== undefined
        ? this.getNextSibling(e.target, ".submenu")
        : null;
    if (subMenu !== null && subMenu !== undefined && subMenu !== "") {
      subMenu.classList = subMenu.classList.contains("d-block")
        ? "submenu"
        : "submenu d-block";
    }
  };
  render() {
    const userObj = AuthService.getCurrentUser();
    return (
      <ul>
        {navigationmenu.length > 0
          ? navigationmenu.map((item, i) => (
              <li
                key={i}
                className={`${item.child ? "has-menu" : ""} ${
                  item?.special ? "special_link" : ""
                }`}
                onClick={this.triggerChild}
              >
                {item.child ? (
                  <Link onClick={(e) => e.preventDefault()} to="/">
                    {" "}
                    {item.linkText}{" "}
                  </Link>
                ) : (
                  <Link to={item.link}> {item.linkText} </Link>
                )}
                {item.child ? (
                  <ul className="submenu" role="menu">
                    {item.submenu.map((sub_item, i) => (
                      <li
                        key={i}
                        className={`${sub_item.child ? "has-menu" : ""} `}
                      >
                        {sub_item.child ? (
                          <Link onClick={(e) => e.preventDefault()} to="/">
                            {" "}
                            {sub_item.linkText}{" "}
                          </Link>
                        ) : (
                          <Link to={sub_item.link}> {sub_item.linkText} </Link>
                        )}
                        {sub_item.submenu ? (
                          <ul className="submenu">
                            {sub_item.submenu.map((third_item, i) => (
                              <li key={i}>
                                <Link to={third_item.link}>
                                  {third_item.linkText}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))
          : null}

        <li>
          <span className="mobileonly  custom-login" hidden={userObj != null}>
            <Link to="/login" className="text-light">
              Login
            </Link>
          </span>
        </li>
        <li>
          <span
            className="mobileonly  custom-register"
            hidden={userObj != null}
          >
            <Link to="/signup" className="text-light">
              Register
            </Link>
          </span>
        </li>
      </ul>
    );
  }
}

export default Menu;
