import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Shopbox from './Shopbox';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Shopbox/>
                <Smallcallback />
            </Fragment> 
        );
    }
}

export default Content;