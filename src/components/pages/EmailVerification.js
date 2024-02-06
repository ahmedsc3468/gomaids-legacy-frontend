import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/BreadcrumbPartner";
import Footer from "../layouts/Footer";
import EmailVerify from "../sections/verifications/EmailVerification";

class EmailVerification extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title> GoMaidz | Verify-Email</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <EmailVerify />
        <Footer />
      </Fragment>
    );
  }
}

export default EmailVerification;
