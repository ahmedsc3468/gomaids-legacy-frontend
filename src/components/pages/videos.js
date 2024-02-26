import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/videos/Content';

class Videos extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title> GoMaids | Videos</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Explainer Videos'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Videos;