import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Faqtext from './Faqtext';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Faqtext />
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;