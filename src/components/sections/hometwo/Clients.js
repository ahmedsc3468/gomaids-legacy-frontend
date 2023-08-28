import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel2';

import cleanicon from '../../../assets/img/other/clean.png';
import img1 from '../../../assets/img/clients/1.png';
import img2 from '../../../assets/img/clients/2.png';
import img3 from '../../../assets/img/clients/3.png';
import img4 from '../../../assets/img/clients/4.png';

const clientspost = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
];

class Clients extends Component {
    render() {
        const options = {
            loop: true,
            margin: 110,
            autoplay: true,
            nav: false,
            dots: false,
            slideTransition: 'linear',
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 2,
                    margin: 50
                },
                768: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        }
        return (
            <section className="clients relative o-hidden pt-100 pb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <OwlCarousel options={options} className="owl-carousel clients-slider">
                                {clientspost.map((item, i) => (
                                    <div key={i} className="each-client-img">
                                        <img src={item.img} alt="" />
                                    </div>
                                ))}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
                <img src={cleanicon} className="client-bg-icon2" alt="" />
            </section>
        );
    }
}

export default Clients;