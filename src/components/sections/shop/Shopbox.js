import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    { img: prdt1, discount: 10, price: 15.00, productname: 'Broom and Dustpan' },
    { img: prdt2, discount: 10, price: 25.00, productname: 'Eko Clean Combo' },
    { img: prdt3, discount: 10, price: 15.0, productname: 'Clean Orange' },
];

class Shopbox extends Component {
    render() {
        return (
            <section className="shop pt-90 pb-90 bg-light-white">
                <div className="container">
                    <div className="row align-items-center mb-25">
                        <div className="col-md-6 text-center text-md-left">
                            <h4>Showing 1–9 of 60 results</h4>
                        </div>
                        <div className="col-md-6  text-center text-md-right">
                            <div className="form-group relative mt-sm-25">
                                <select className="form-control input-white sort-nice mb-xs-15" id="sel1">
                                    <option>Popularity</option>
                                    <option>Average rating</option>
                                    <option>Latest</option>
                                    <option>Price low to high</option>
                                    <option>Price high to low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {shopbox.map((item, i) => (
                            <div className="col-lg-4 col-md-6" key={i}>
                                <div className="shop-prdt mb-30">
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
                            </div>
                        ))}
                        <div className="col-lg-12 text-center mt-15">
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
            </section>
        );
    }
}

export default Shopbox;