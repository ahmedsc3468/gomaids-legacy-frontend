import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

import img1 from '../../../assets/img/gallery/1.jpg';
import img2 from '../../../assets/img/gallery/2.jpg';
import img3 from '../../../assets/img/gallery/3.jpg';
import img4 from '../../../assets/img/gallery/4.jpg';
import img5 from '../../../assets/img/gallery/5.jpg';
import img6 from '../../../assets/img/gallery/6.jpg';

const galleryblock = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
];
class Galleryblock extends Component {
    componentDidMount() {
        function popup() {
            $('.gallery-links').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        }
        popup();
    }
    render() {
        return (
            <section className="gallery pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        {galleryblock.map((item, i) => (
                            <div className="col-lg-3" key={i}>
                                <div className="each-work center-plus mb-30">
                                    <div className="work-image">
                                        <img src={item.img} alt="" />
                                    </div>
                                    <Link to={item.img} className="plus-btn transition-2 gallery-links" title="Gallery description here">
                                        <span className="h-line" />
                                        <span className="v-line" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                        <div className="col-lg-12 text-center mt-10">
                            <div className="pagination-type1 left-align">
                                <ul>
                                    <li>
                                        <Link to="/"><i className="fas fa-angle-double-left" /></Link>
                                    </li>
                                    <li className="active"><Link to="/">1</Link></li>
                                    <li><Link to="/">2</Link></li>
                                    <li><Link to="/">3</Link></li>
                                    <li>
                                        <Link to="/"><i className="fas fa-angle-double-right" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

export default Galleryblock;