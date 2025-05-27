import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/BreadcrumbPartner";
import Footer from "../layouts/Footer";
import Content from "../sections/partnerwithus/content";

class PartnerWithUs extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title> GoMaids | Partner-With-Us</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb
          breadcrumb={{ pagename: "Looking for More Work? Partner With GoMaids!" }}
        />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default PartnerWithUs;
