import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/error/Content';

class Error404 extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz | Error 404</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Error 404'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Error404;