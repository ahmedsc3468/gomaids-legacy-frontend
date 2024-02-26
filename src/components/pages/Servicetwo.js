import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/servicetwo/Content';

class Servicetwo extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title> GoMaids | Services</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Hire the best Service Provider'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Servicetwo;