import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/faq/Content';

class Faqs extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Pro Cleankers | FAQ's</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:"FAQ's"}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Faqs;