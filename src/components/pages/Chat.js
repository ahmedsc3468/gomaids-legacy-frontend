import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerinner";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/MyChat/Messenger/index"
// import Content from "../sections/chat/Content";

class Chat extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Go Maidz | Chat</title>
                    <meta name="description" content="#" />
                </MetaTags>
                <Header />
                <Breadcrumb breadcrumb={{pagename:'Chat'}} />
                <Content />
                <Footer />
            </Fragment>
        );
    }
}

export default Chat;