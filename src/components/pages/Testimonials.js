import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/testimonial/Content';

class Testimonials extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>GoMaids | Testimonials</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Testimonials'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Testimonials;