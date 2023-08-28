import React, { Component, Fragment } from 'react';
import About from './About';
import Banner from './Banner';
import Service from './Service';
import Callback from '../../layouts/Callback';
import Howitwork from '../../layouts/Howitwork';
import Cta from '../../layouts/Cta';
import Whyus from './Whyus';
import Afterbefore from './Afterbefore';
import Team from './Team';
import Video from './Video';
import Pricing from './Pricing';
import Testimonial from './Testimonial';
import Blogpost from './Blogpost';
import Clients from './Clients';
import Counter from './Counter';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <About />
                <Service />
                <Callback />
                <Whyus />
                <section className="hw-it-wrks2 bg-light-white pt-95 pb-75 pb-sm-45">
                    <Howitwork />
                </section>
                <Afterbefore/>
                <Cta/>
                <Team/>
                <Video/>
                <Pricing/>
                <Testimonial/>
                <Blogpost/>
                <Clients/>
                <Counter/>
            </Fragment>
        );
    }
}

export default Content;