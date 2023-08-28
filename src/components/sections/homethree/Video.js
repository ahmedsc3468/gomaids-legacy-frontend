import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import videobg from '../../../assets/img/bg/cleanitems.jpg';

class Video extends Component {
    componentDidMount() {
        function popup() {
            $('.popup-video').magnificPopup({
                type: 'iframe',
            });
        }
        popup();
    }
    render() {
        return (
            <section className="cta-video pt-100 pb-100" data-overlay={9} style={{ backgroundImage: "url(" + videobg + ")" }}>
                <div className="container">
                    <div className="row z-5 align-items-center">
                        <div className="col-lg-7  wow fadeInLeft">
                            <div className="cta-line-after text-center text-lg-left">
                                <h1 className="white mb-10">We Have Our Own Style</h1>
                                <p className="white mb-20 pr-50 pr-md-00">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua nim ad minim.</p>
                                <Link to="/login" className="btn btn-blue shine-btn">Order Now</Link>
                            </div>
                        </div>
                        <div className="col-lg-5  text-center text-lg-right wow fadeInRight">
                            <div className="play-btn-big mr-45 mr-md-00 mt-md-90">
                                <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video z-10"> <i className="fas fa-play" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Video;