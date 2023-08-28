import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/pricing/Content';

class Pricingone extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Pro Cleankers | Pricing</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Pricing'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Pricingone;