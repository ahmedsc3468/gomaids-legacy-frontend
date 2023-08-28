import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/servicetakerorderdetails/AllOrder";

class AllOrder extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz| Service Taker Order</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default AllOrder;