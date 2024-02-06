import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/BreadcrumbPartner";
import Footer from "../layouts/Footer";
import NumberVerify from "../sections/verifications/NumberVerification";

class NumberVerification extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title> GoMaidz | Verify-Number</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />

        <NumberVerify />
        <Footer />
      </Fragment>
    );
  }
}

export default NumberVerification;
