import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Pricingbox from './Pricingbox';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Pricingbox/>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;