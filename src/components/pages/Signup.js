import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/signup/Content";

class Signup extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>GoMaids | Sign Up</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{ pagename: "Sign Up" }} />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Signup;
