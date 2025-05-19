import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/productdetails/Content';

class Productdetails extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title> GoMaids | Service Provider Profile</title>
          <meta name='description' content='#' />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: 'Service Provider Profile' }} />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Productdetails;
