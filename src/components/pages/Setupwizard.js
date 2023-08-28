import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/Setupwizard/content";

class Setupwizard extends Component {
    render() {
        return (
            <Fragment className='setupwizard'>
                <MetaTags>
                    <title>Go Maidz| Setupwizard</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Setupwizard;
