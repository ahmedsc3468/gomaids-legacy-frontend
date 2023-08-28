import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel2';
import { Tab, Nav } from 'react-bootstrap';

// Reviews
import reviewimg2 from '../../../assets/img/user/user-2.png';
import reviewimg3 from '../../../assets/img/user/user-3.png';
import reviewimg4 from '../../../assets/img/user/user-4.png';
import bigimg1 from '../../../assets/img/shop/prdt-bg1.jpg';
import bigimg2 from '../../../assets/img/shop/prdt-bg2.jpg';
import bigimg3 from '../../../assets/img/shop/prdt-bg3.jpg';
import smallimg1 from '../../../assets/img/shop/prdt-sm1.jpg';
import smallimg2 from '../../../assets/img/shop/prdt-sm2.jpg';
import smallimg3 from '../../../assets/img/shop/prdt-sm3.jpg';
// Shop main
const shopmain = [
    { img: bigimg1 },
    { img: bigimg2 },
    { img: bigimg3 },
    { img: bigimg1 },
    { img: bigimg2 },
];

// Info table
const infotable = [
    { title: 'Name', text: 'Lorem Ipsum' },
    { title: 'Weight', text: '2.5 Kg' },
    { title: 'Width', text: '12 Mtr' },
    { title: 'Height', text: '12 Mtr' },
    { title: 'Consectetur', text: 'adipiscing elit' },
];

class Productdetail extends Component {
    render() {
        const options = {
            items: 1,
            loop: true,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: true,
            smartSpeed: 450,
            margin: 0,
            nav: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            dots: false
        }
                return (
            <section className="prdt-detail pt-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="prdt-slider">
                                <OwlCarousel options={options} id="image-gallery" className="owl-carousel gallery list-unstyled cS-hidden">
                                    {shopmain.map((item, i) => (
                                        <img key={i} src={item.img} alt="" />
                                    ))}
                                </OwlCarousel>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="prdt-info-right pl-20 pl-md-00 mt-md-25">
                                <div className="prdt-detail-head">
                                    <div className="prdt-reviews">
                                        <div className="rating d-flex align-items-center">
                                            <ul className="stars-rate" data-starsactive={4}>
                                                <li className="text-left lh-10"> <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                    <i className="fas fa-star" />
                                                </li>
                                            </ul>
                                            <p className="rates-info mb-0">
                                                <Link to="/" className="ml-10">15 reviews</Link> |
                  <Link to="/">Write a review</Link>
                                            </p>
                                        </div>
                                    </div>
                                    <h1 className="mt-10 mb-15 fs-35 lh-13">Robert</h1>
                                    <div className="rate-detail">
                                        <p>$20/hr</p>
                                    </div>
                                </div>
                                <div className="hr-1 bg-black opacity-1 mb-20 mt-20" />
                                <div className="profuct-descr">
                                    <p className="mb-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ad, iure
                                    incidunt. Ab consequatur temporibus non eveniet inventore doloremque necessitatibus sed,
                                    ducimus quisquam, ad asperiores
            </p>
                                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat consectetur adipisicing elit
            </p>
                                </div>
                                <div className="hr-1 bg-black opacity-1 mt-20 mb-20" />
                  
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="prdt-tabs row pt-40 pt-md-25">
                                <div className="col-md-12">
                                    <div className="prdt-tab mt-5">
                                        <Tab.Container defaultActiveKey="description">
                                            <Nav variant="tabs" className="nav nav-pills justify-content-center justify-content-sm-start">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="description">Description</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="addinfo">Detail</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="reviews">Reviews(4)</Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                            <Tab.Content className="pt-20">
                                                <Tab.Pane eventKey="description">
                                                    <h4 className="mb-10 lh-13">Eco Best Clean Combo for Home and Office</h4>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit enim
                                                    nec
                                                    semper consectetur. Mauris ullamcorper nibh ac nisi consectetur, at
                                                    fringilla
                                                    nisl commodo. Duis lacinia augue vitae lectus luctus, vel aliquet tellus
                                                    bibendum. Maecenas a diam leo. In at erat sem. Vestibulum ante ipsum primis
                                                    in
                                                    faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur venenatis
                                                    malesuada lacus, vitae rutrum purus tincidunt a. Proin sodales dictum
                                                    libero.
                    </p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit enim
                                                    nec
                                                    semper consectetur. Mauris ullamcorper nibh ac nisi consectetur, at
                                                    fringilla
                                                    nisl commodo. Duis lacinia augue vitae lectus luctus, vel aliquet tellus
                                                    bibendum. Maecenas a diam leo. In at erat sem. Vestibulum ante ipsum primis
                                                    in
                                                    faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur venenatis
                                                    malesuada lacus, vitae rutrum purus tincidunt a. Proin sodales dictum
                                                    libero.
                    </p>
                                                    <ul className="blue-dot-list">
                                                        <li>Aenean vehicula molestie aliquet. Maecenas sed pretium</li>
                                                        <li>Nulla malesuada id ipsum quis vestibulum. In in sapien</li>
                                                        <li>Fringilla, gravida nisl sit amet, consequat turpis.</li>
                                                        <li>Praesent at gravida dolor. Duis tristique sit amet lacus</li>
                                                    </ul>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="addinfo">
                                                    <div className="row align-items-center">
                                                        <div className="col-12">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                                            suscipit
                                                            enim nec semper consectetur. Mauris ullamcorper nibh ac nisi
                                                            consectetur, at fringilla nisl commodo. Duis lacinia augue vitae
                                                            lectus
                                                            luctus, vel aliquet tellus bibendum. Maecenas a diam leo. In at erat
                                                            sem. Vestibulum ante ipsum primis in faucibus orci luctus et
                                                            ultrices
                                                            posuere cubilia Curae; Curabitur venenatis malesuada lacus, vitae
                                                            rutrum purus tincidunt a. Proin sodales dictum libero. </p>
                                                            <table className="table table-bordered mb-0">
                                                                <tbody>
                                                                    {infotable.map((item, i) => (
                                                                        <tr key={i}>
                                                                            <th scope="row">{item.title}</th>
                                                                            <td>{item.text}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="reviews">
                                                    <div className="review-wrp">
                                                        <div className="review-prdt">
                                                            <img src={reviewimg2} className="user-img" alt="" />
                                                            <h4>Jhone Doe <span className="date">12 Jan 2022</span></h4>
                                                            <ul className="stars-rate" data-starsactive={4}>
                                                                <li className="text-left">
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                </li>
                                                            </ul>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                                            suscipit
                                                            enim nec semper consectetur. Mauris ullamcorper nibh ac nisi
                                                            consectetur, at fringilla nisl commodo. Duis lacinia augue vitae
                                                            lectus
                          luctus, vel aliquet tellus bibendum.</p>
                                                        </div>
                                                        <div className="review-prdt">
                                                            <img src={reviewimg3} className="user-img" alt="" />
                                                            <h4>Mary Jhoseph <span className="date">12 Jan 2022</span></h4>
                                                            <ul className="stars-rate" data-starsactive={4}>
                                                                <li className="text-left">
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                </li>
                                                            </ul>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                                            suscipit
                                                            enim nec semper consectetur. Mauris ullamcorper nibh ac nisi
                                                            consectetur, at fringilla nisl commodo. Duis lacinia augue vitae
                                                            lectus
                          luctus, vel aliquet tellus bibendum.</p>
                                                        </div>
                                                        <div className="review-prdt">
                                                            <img src={reviewimg4} className="user-img" alt="" />
                                                            <h4>Jack.MH <span className="date">12 Jan 2022</span></h4>
                                                            <ul className="stars-rate" data-starsactive={4}>
                                                                <li className="text-left">
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                </li>
                                                            </ul>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                                            suscipit
                                                            enim nec semper consectetur. Mauris ullamcorper nibh ac nisi
                                                            consectetur, at fringilla nisl commodo. Duis lacinia augue vitae
                                                            lectus
                          luctus, vel aliquet tellus bibendum.</p>
                                                        </div>
                                                        <div className="review-prdt">
                                                            <img src={reviewimg2} className="user-img" alt="" />
                                                            <h4>Thomas.K <span className="date">12 Jan 2022</span></h4>
                                                            <ul className="stars-rate" data-starsactive={4}>
                                                                <li className="text-left">
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                </li>
                                                            </ul>
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                                                            suscipit
                                                            enim nec semper consectetur. Mauris ullamcorper nibh ac nisi
                                                            consectetur, at fringilla nisl commodo. Duis lacinia augue vitae
                                                            lectus
                          luctus, vel aliquet tellus bibendum.</p>
                                                        </div>
                                                        <Link to="/" className="btn btn-blue btn-md" data-toggle="modal" data-target="#addReview">WRITE A REVIEW</Link>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </Tab.Container>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        );
    }
}

export default Productdetail;