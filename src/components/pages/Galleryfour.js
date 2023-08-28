import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/galleryfour/Content';

class Galleryfour extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Pro Cleankers | Gallery</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Gallery'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Galleryfour;