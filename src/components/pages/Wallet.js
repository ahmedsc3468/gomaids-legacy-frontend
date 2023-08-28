import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/wallet/Content";

class Wallet extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz | Wallet</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{pagename:'wallet'}} />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Wallet;