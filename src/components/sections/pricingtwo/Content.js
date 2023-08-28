import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Pricingbox from './Pricingbox';
import Whyus from './Whyus';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Pricingbox/>
                <Whyus/>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;