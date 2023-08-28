import React, {  Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/form/Content';


class FormDetail extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Service Made | FormDetail</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Form Detail'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default FormDetail;