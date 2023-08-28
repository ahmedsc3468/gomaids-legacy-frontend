import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/clients/Content';

class Clients extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Pro Cleankers | Clients</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Clients'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Clients;