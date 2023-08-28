import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/userprofile/Content";

class Userprofile extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz| User Profile</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Content />
                <Footer />        
            </Fragment>
        );
    }
}

export default Userprofile;