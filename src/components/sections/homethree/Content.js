import React, { Component, Fragment } from 'react';
import About from './About';
import Banner from './Banner';
import Estimate from './Estimate';
import Hwitwrks from './Hwitwrks';
import Service from './Service';
import Cta from '../../layouts/Cta';
import Whychoose from './Whychoose';
import Team from './Team';
import Video from './Video';
import Testimonial from './Testimonial';
import Portfolio from './Portfolio';
import Blogpost from './Blogpost';
import Smallcallback from '../../layouts/Smallcallback';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner/>
                <Estimate/>
                <About/>
                <Service/>
                <Hwitwrks/>
                <Cta/>
                <Whychoose/>
                <Team/>
                <Video/>
                <Testimonial/>
                <Portfolio/>
                <Blogpost/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;