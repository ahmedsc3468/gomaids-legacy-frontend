import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/dispute/Content";

class Dispute extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz| Dispute </title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Content />
                <Footer />        
            </Fragment>
        );
    }
}
export default Dispute;