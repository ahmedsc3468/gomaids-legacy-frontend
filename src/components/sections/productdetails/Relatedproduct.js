import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';

import prdt1 from '../../../assets/img/shop/prdt1.jpg';
import prdt2 from '../../../assets/img/shop/prdt2.jpg';
import prdt3 from '../../../assets/img/shop/prdt3.jpg';
import prdt4 from '../../../assets/img/shop/prdt4.jpg';
import prdt5 from '../../../assets/img/shop/prdt5.jpg';
import prdt6 from '../../../assets/img/shop/prdt6.jpg';

const shopbox = [
    { img: prdt1, discount: 10, price: 15.00, productname: 'Broom and Dustpan' },
    { img: prdt2, discount: 10, price: 25.00, productname: 'Eko Clean Combo' },
    { img: prdt3, discount: 10, price: 15.0, productname: 'Clean Orange' },
    { img: prdt4, discount: 10, price: 47.00, productname: 'Sponge Cleaner' },
    { img: prdt5, discount: 10, price: 150.00, productname: 'Eko Clean Combo' },
    { img: prdt6, discount: 10, price: 15.00, productname: 'Eko Clean Combo' },
];

class Relatedproduct extends Component {
    render() {
        const options = {
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 4
                }
            }
        }
        return (
            <section className="blog-area pb-50 pt-40">
                <div className="container">
                    <div className="row align-items-center mb-30">
                        <div className="col-md-9 col-sm-12 text-center text-md-left">
                            <h1 className="f-700 mb-sm-20 fs-30">Related Products</h1>
                        </div>
                        <div className="col-md-3 col-sm-12 text-center text-md-right">
                            <div className="blog-nav">
                                <Link to="#" className="prdt-nav-left mr-10" onClick={() => this.refs.relatedslider.prev()}> <i className="fas fa-long-arrow-alt-left" />
                                </Link>
                                <Link to="#" className="prdt-nav-right" onClick={() => this.refs.relatedslider.next()}> <i className="fas fa-long-arrow-alt-right" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <OwlCarousel ref="relatedslider" options={options} className="owl-carousel relative-prdt-slider">
                                {shopbox.map((item, i) => (
                                    <div key={i} className="shop-prdt mb-30">
                                        <div className="shop-prdt-img">
                                            <img src={item.img} alt="" />
                                            <div className="shop-buttons transform-center transition-4">
                                                <Link to="/" className="btn btn-view blue">
                                                    <i className="fas fa-expand-arrows-alt" />
                                                </Link>
                                                <Link to="/product-details" className="btn btn-cart bg-blue">
                                                    ADD TO CART
                  </Link>
                                            </div>
                                            <span>-{item.discount}%</span>
                                        </div>
                                        <div className="shop-prdt-data text-center">
                                            <ul className="stars-rate mb-10" data-starsactive={5}>
                                                <li className="text-center lh-10"> <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </li>
                                            </ul>
                                            <h5 className="f-700 fs-19 mt-1 lh-13"> {item.title}</h5>
                                            <div className="prdt-price">
                                                <span className="real-price">${item.price * (100 - item.discount) / 100}</span>
                                                <span className="lined-price">${item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Relatedproduct;