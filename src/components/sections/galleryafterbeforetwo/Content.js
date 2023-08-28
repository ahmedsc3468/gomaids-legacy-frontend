import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Gallery from './Gallery';

class Content extends Component {
    render() {
        return (
            <Fragment> 
                <Gallery/>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;