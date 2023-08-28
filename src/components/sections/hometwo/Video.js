import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import videobg from '../../../assets/img/bg/bricks.jpg';
import videoicon1 from '../../../assets/img/bg/ve1.png';
import videoicon2 from '../../../assets/img/bg/ve2.png';

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
            <section className="video-2 pt-100 pb-100 relative" style={{ backgroundImage: "url(" + videobg + ")" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 z-10 text-center">
                            <div className="blob play-btn ">
                                <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video">
                                    <i className="fas fa-play" />
                                </Link>
                            </div>
                            <h1 className="mb-20">We Have Our Own Style</h1>
                            <p className="video-p">Lorem ipsum dolor sit amet consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua nim ad minim.</p>
                            <Link to="/login" className="btn btn-blue shine-btn">Order Now</Link>
                        </div>
                    </div>
                </div>
                <img src={videoicon2} alt="" className="video-im1 wow fadeInLeft" />
                <img src={videoicon1} alt="" className="video-im2 wow fadeInRight" />
            </section>
        );
    }
}

export default Video;