import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/bloglistgridone/Content';

class Bloglistgridone extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Pro Cleankers | Blog List Grid</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Blog List Grid'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Bloglistgridone;