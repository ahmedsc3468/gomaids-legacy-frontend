import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import NearByContent from './NearByContent';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <NearByContent/>
                {/* <Smallcallback /> */}
            </Fragment>
        );
    }
}

export default Content;