import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerinner';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/login/Content';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>GoMaids | Login</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Login'}} />
                <Content/>
                <Footer/>
            </Fragment>
        );
    }
}

export default Login;