import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../../layouts/Headerinner";

import Breadcrumb from "../../layouts/Breadcrumb";

import Footer from "../../layouts/Footer";

// import Content from "../../sections/services/Content";
import ServicesCard from "./ServicesCards";

class Serviceone extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title> GoMaids | Services</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{ pagename: "Services" }} />
                {/* <Content /> */}
                <ServicesCard />
                <Footer />
            </Fragment>
        );
    }
}

export default Serviceone;
