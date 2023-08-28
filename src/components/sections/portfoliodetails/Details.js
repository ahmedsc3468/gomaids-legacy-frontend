import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import portfoliobanner from '../../../assets/img/portfolio/bnr.jpg';
import gallery1 from '../../../assets/img/gallery/1.jpg';
import gallery2 from '../../../assets/img/gallery/2.jpg';
import gallery3 from '../../../assets/img/gallery/3.jpg';
import gallery4 from '../../../assets/img/gallery/4.jpg';
import gallery5 from '../../../assets/img/gallery/5.jpg';
import gallery6 from '../../../assets/img/gallery/6.jpg';
// Gallery
const portfoliogallery = [
    { img: gallery1 },
    { img: gallery2 },
    { img: gallery3 },
    { img: gallery4 },
    { img: gallery5 },
    { img: gallery6 },
];

class Details extends Component {
    componentDidMount() {
        function popup() {
            // Image popup
            $('.gallery-links').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
            // Video popup
            $('.popup-video').magnificPopup({
                type: 'iframe',
            });
        }
        popup();
    }
    render() {
        return (
            <section className="case-details pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 mb-md-35">
                            <div className="case-info">
                                <h5 className="line-right green f-700 fs-19 mb-1">Happy Client</h5>
                                <p className="fs-15 f-500">Namut Condimentum</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-md-35">
                            <div className="case-info">
                                <h5 className="line-right green f-700 fs-19 mb-1">Service</h5>
                                <p className="fs-15 f-500">Office Cleaning</p>
                                <p className="fs-15 f-500">Carpet Cleaning</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-sm-35">
                            <div className="case-info">
                                <h5 className="line-right green f-700 fs-19 mb-1">Date</h5>
                                <p className="fs-15 f-500">30 January 2022</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="case-info">
                                <h5 className="line-right green f-700 fs-19 mb-1">Team</h5>
                                <p className="fs-15 f-500">Jessica - <span className="fs-13 f-400">Carpet Cleaning</span></p>
                                <p className="fs-15 f-500">Jhone Doe - <span className="fs-13 f-400">Office Cleaning</span></p>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="hr-2 bg-light-white mt-40 mb-35 mt-sm-30" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <h5 className="fs-19 lh-19 case-quote pr-40 mb-md-30 pr-sm-00">Nulla a sapien ut tortor finibus pretium. Cras sed urna et metus vulputate mattis quis in leo. Nam at sapien in risus posuere <Link to="/portfolio-details">dignissim</Link>. Vestibulum tristique risus urna, et iaculis est vehicula vitae. Aenean ut lacus vel libero scelerisque efficitur. Nunc in vulputate erat, nec lacinia turpis.</h5>
                        </div>
                        <div className="col-lg-6 offset-lg-1">
                            <p className="mb-30">Quisque enim ipsum, commodo et venenatis rutrum, luctus in enim. Quisque dapibus lacus non pulvinar lobortis. Cras odio dolor, pulvinar id ligula non, congue aliquam velit. Pellentesque tempor ornare mal esuada. Mauris vel metus vel urna interdum condimentum. Pelle ntesque habitant morbi tristique senectus et netus.</p>
                            <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac semper tortor. Nullam porttitor nibh ac pulvinar tincidunt. Nulla facilisi. Duis tempus lectus eget velit consectetur volutpat. Praesent quis sapien diam. In volutpat lorem nec tortor elementum ultrices.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="video-area-case relative shadow-2 mt-45 mb-50 mb-md-35">
                                <img src={portfoliobanner} alt="" />
                                <div className="blob play-btn  transform-center">
                                    <Link to="https://www.youtube.com/watch?v=qtQgbdmIO30" className="popup-video"> <i className="fas fa-play" /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="mb-30">Quisque enim ipsum, commodo et venenatis rutrum, luctus in enim. Quisque dapibus lacus non pulvinar lobortis. Cras odio dolor, pulvinar id ligula non, congue aliquam velit. Pellentesque tempor ornare mal esuada. Mauris vel metus vel urna interdum condimentum. Pelle ntesque habitant morbi tristique senectus et netus.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac semper tortor. Nullam porttitor nibh ac pulvinar tincidunt. Nulla facilisi. Duis tempus lectus eget velit consectetur. Pellentesque tempor esuada.</p>
                        </div>
                        <div className="col-lg-5 offset-lg-1 mt-md-15">
                            <div className="row">
                                {portfoliogallery.map((item, i) => (
                                    <div className="col-sm-4 col-6" key={i}>
                                        <div className="each-gallery case-gallery-links">
                                            <Link className="gallery-links" to={item.img} title="Gallery description here">
                                                <img src={item.img} alt="" />
                                                <div className="full-cover bg-green-op-8 transition-4">
                                                    <i className="fas fa-expand-arrows-alt transform-center" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="hr-2 bg-light-white mt-30 mb-45" />
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-left">
                            <div className="d-flex share-case justify-content-center justify-content-md-start">
                                <p className="fs-16 mr-20 mb-0">Share:</p>
                                <ul className="social-icons black mb-sm-30">
                                    <li>
                                        <Link to="/"><i className="fab fa-facebook-f" /></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><i className="fab fa-twitter" /></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><i className="fab fa-linkedin-in" /></Link>
                                    </li>
                                    <li>
                                        <Link to="/"><i className="fab fa-google-plus-g" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 text-center text-md-right">
                            <div className="next-prev-caser">
                                <Link className="f-600 pr-25" to="/portfolio-details"><i className="fas fa-long-arrow-alt-left mr-10" />PREV</Link>
                                <Link className="f-600 pl-25" to="/portfolio-details">NEXT<i className="fas fa-long-arrow-alt-right ml-10" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

export default Details;