import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/shop/prdt1.jpg';
import img2 from '../../../assets/img/shop/prdt2.jpg';
import img3 from '../../../assets/img/shop/prdt3.jpg';
import img4 from '../../../assets/img/shop/prdt4.jpg';

const carttable = [
    { img: img1, title: 'Broom and Dustpan', price: 12, qty: 1 },
    { img: img2, title: 'Eko Clean Combo', price: 78, qty: 1 },
    { img: img3, title: 'Clean Orange', price: 20, qty: 1 },
    { img: img4, title: 'Broom and Dustpan', price: 15, qty: 1 },
];

class Cartlist extends Component {
    render() {
        return (
            <section className="cart pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart-page table-responsive">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th className="prdt_remove">Delete</th>
                                            <th className="prdt_thumb">Image</th>
                                            <th className="prdt_name">Product</th>
                                            <th className="prdt-price">Price</th>
                                            <th className="prdt_quantity">Quantity</th>
                                            <th className="prdt_total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carttable.map((item, i) => (
                                            <tr key={i}>
                                                <td className="prdt-remove">
                                                    <Link to="/product-details">
                                                        <i className="far fa-trash-alt" />
                                                    </Link>
                                                </td>
                                                <td className="prdt-thumb">
                                                    <Link to="/product-details">
                                                        <img src={item.img} alt="" />
                                                    </Link>
                                                </td>
                                                <td className="prdt-name">
                                                    <Link to="/">{item.title}</Link>
                                                </td>
                                                <td className="prdt-price">${item.price}.00</td>
                                                <td className="prdt-quantity">
                                                    <label>Quantity</label>
                                                    <input className="form-control" min={1} max={100} defaultValue={item.qty} type="number" />
                                                </td>
                                                <td className="prdt-total">${item.price * item.qty}.00</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan={6} className="text-right">
                                                <button type="button" className="btn btn-black btn-md update-cart">UPDATE CART</button>
                                                <button type="reset" className="clear-cart f-left">CLEAR CART</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-45 mt-md-30">
                        <div className="col-lg-6 mb-md-30">
                            <div className="crt-coxes">
                                <h3 className="cart-box-head bg-black white">Use Gift Coupon</h3>
                            </div>
                            <div className="inner-cart-box">
                                <p className="lh-10 mb-10">Enter your gift certificate code here</p>
                                <div className="input-group coupon-input">
                                    <input type="text" className="form-control" placeholder="Your coupon code" aria-label="Recipient's username" />
                                    <div className="input-group-append">
                                        <button className="btn btn-black btn-md" type="button">APPLY COUPON</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="crt-coxes">
                                <h3 className="cart-box-head  bg-black white">Cart Total</h3>
                            </div>
                            <div className="inner-cart-box">
                                <ul className="total-table">
                                    <li><span>Sub Total:</span>$1000.00</li>
                                    <li><span>Tax :</span>$15.00</li>
                                    <li className="total"><span>TOTAL:</span>$1015.00</li>
                                </ul>
                                <div className="text-center text-sm-right">
                                    <button type="submit" className="btn btn-blue mt-10">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Cartlist;