import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/nearbyproviders/Content';

class NearByContent extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title> GoMaidz | Near-By-Providers</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Near By Providers'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default NearByContent;