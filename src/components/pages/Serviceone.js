import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/services/Content';

class Serviceone extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title> GoMaidz | Services</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Hire the best Service Provider that suit you'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Serviceone;