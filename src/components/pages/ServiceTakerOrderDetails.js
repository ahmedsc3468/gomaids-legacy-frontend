import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/servicetakerorderdetails/Content";

class ServiceTakerOrderDetails extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz | Order Details</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{pagename:'Order Details'}} />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default ServiceTakerOrderDetails;