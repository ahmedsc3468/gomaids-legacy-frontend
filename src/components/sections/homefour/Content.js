import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Features from './Features';
import Service from '../homethree/Service';
import Video from '../homethree/Video';
import Testimonial from '../homethree/Testimonial';
import Blogpost from '../hometwo/Blogpost';
import Pricing from '../hometwo/Pricing';
import About from './About';
import Hwitwrks from './Hwitwrks';
import Callback from '../../layouts/Callback';
import Smallcallback from '../../layouts/Smallcallback';
import Team from './Team';
import Whyus from './Whyus';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner/>
                <Features/>
                <Service/>
                <About/>
                <Hwitwrks/>
                <Callback/>
                <Team/>
                <Pricing/>
                <Whyus/>
                <Video/>
                <Testimonial/>
                <Blogpost/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;