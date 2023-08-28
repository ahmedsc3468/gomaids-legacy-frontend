import React, { Component, Fragment } from 'react';
import Abouttext from './Abouttext';
import Features from './Features';
import Howitwork from '../../layouts/Howitwork';
import Smallcallback from '../../layouts/Smallcallback';
import Testimonial from '../home/Testimonials';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Abouttext />
                <Features />
                <section className="hw-it-wrks bg-dot-full pt-95 pb-75 pb-sm-35">
                    <Howitwork />
                </section>
                <Testimonial />
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;