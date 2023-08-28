import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/userdashboard/Content";

class Userdashboard extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz| User Dashboard</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{pagename:'User Dashboard'}} />
                <Content />
                <Footer />  
            </Fragment>
        );
    }
}

export default Userdashboard;
