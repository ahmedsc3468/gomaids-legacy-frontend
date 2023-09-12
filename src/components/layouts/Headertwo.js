import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Menu from './Menu';

import logo from '../../assets/img/logo/logo3.png';

class Headertwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navmethod: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
    }
    // Navigation
    toggleNav() {
        this.setState({
            navmethod: !this.state.navmethod
        });
    }
    // Sticky Header
    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.setState({
                isTop: window.scrollY > 100
            });
        }, false);
    }
    render() {
        const stickyheader = this.state.isTop ? 'fixed-nav' : '';
        return (
            <header className={`head-type-2 bg-blue ${stickyheader}`}>
                <div className="container">
                    <div className="row align-items-center no-gutters">
                        <div className="col-lg-3">
                            <div className="d-flex align-self-stretch">
                                <div className="logo">
                                    <Link to="/">
                                        <img src={logo} alt="" />
                                    </Link>
                                </div>
                                <div className={classNames("mobile-trigger", { "active": this.state.navmethod })} onClick={this.toggleNav}>
                                    <span />
                                    <span />
                                    <span />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="header-1">
                                <nav className={classNames("main-menu-1 menu-2", { "active": this.state.navmethod })}>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <Menu />
                                        <Link to="/" className="head-1-book-call ml-15"><i className="fas fa-phone fs-15 mr-10" />+1 (236) 808-6010</Link>
                                        {/* <Link to="/services-v1" className="head-1-book-2 ml-15 shine-btn">Order Now</Link> */}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Headertwo;