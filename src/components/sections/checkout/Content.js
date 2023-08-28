import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Checkoutdetail from './Checkoutdetail';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Checkoutdetail/>
                <Smallcallback />
            </Fragment> 
        );
    }
}

export default Content;