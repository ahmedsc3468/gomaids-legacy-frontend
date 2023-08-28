import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const navigationmenu = [
    {
        id: 1,
        linkText: 'User Profile',
        link: '/userprofile',
        
        
    },
    {
        id: 2,
        linkText: 'User Service',
        link: '/userservice',
        
        
    },
    {
        id: 3,
        linkText: 'User Availability',
        link: '/useravail',
        
        
    },
]

class SideBar extends Component {
    getNextSibling = function (elem, selector) {
        // Get the next sibling element
        var sibling = elem.nextElementSibling;
        // If there's no selector, return the first sibling
        if (!selector) return sibling;
        // If the sibling matches our selector, use it
        // If not, jump to the next sibling and continue the loop
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    }
    triggerChild = (e) => {
        let subMenu = '';
        subMenu = (this.getNextSibling(e.target, '.submenu') !== undefined) ? this.getNextSibling(e.target, '.submenu') : null;
        if (subMenu !== null && subMenu !== undefined && subMenu !== '') {
            subMenu.classList = subMenu.classList.contains('d-block') ? 'submenu' : 'submenu d-block';
        }
    }
    render() {
        return (
            <div className="col-2">
            <div>
            <ul>
                {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
                    <li key={i} className={`${item.child ? 'has-menu' : ''} `} onClick={this.triggerChild}>
                        {item.child ? <Link onClick={e => e.preventDefault()} to="/"> {item.linkText} </Link> : <Link to={item.link}> {item.linkText} </Link>}
                        {item.child ?
                            <ul className="submenu" role="menu">
                                {item.submenu.map((sub_item, i) => (
                                    <li key={i} className={`${sub_item.child ? 'has-menu' : ''} `}>
                                        {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                        {sub_item.submenu ?
                                            <ul className="submenu">
                                                {sub_item.submenu.map((third_item, i) => (
                                                    <li key={i}><Link
                                                        to={third_item.link}>{third_item.linkText}</Link>
                                                    </li>
                                                ))}
                                            </ul> : null}
                                    </li>
                                ))}
                            </ul>
                            : null
                        }
                    </li>
                )) : null}
            </ul>
            </div>
</div>
            // <div className="right-box bg-light-white mb-30">
            //         <div className="right-box-head">
            //             <h4 className="fs-22">User Panel</h4>
            //         </div>
            //         <div className="right-box-content">
            //             <div className="categories mb-5">
                            
            //             </div>
            //         </div>
            //     </div>

            // <ul>
            //     {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
            //         <li key={i} className={`${item.child ? 'has-menu' : ''} `} onClick={this.triggerChild}>
            //             {item.child ? <Link onClick={e => e.preventDefault()} to="/"> {item.linkText} </Link> : <Link to={item.link}> {item.linkText} </Link>}
            //             {item.child ?
            //                 <ul className="submenu" role="menu">
            //                     {item.submenu.map((sub_item, i) => (
            //                         <li key={i} className={`${sub_item.child ? 'has-menu' : ''} `}>
            //                             {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
            //                             {sub_item.submenu ?
            //                                 <ul className="submenu">
            //                                     {sub_item.submenu.map((third_item, i) => (
            //                                         <li key={i}><Link
            //                                             to={third_item.link}>{third_item.linkText}</Link>
            //                                         </li>
            //                                     ))}
            //                                 </ul> : null}
            //                         </li>
            //                     ))}
            //                 </ul>
            //                 : null
            //             }
            //         </li>
            //     )) : null}
            // </ul>
        );
    }
}

export default SideBar;