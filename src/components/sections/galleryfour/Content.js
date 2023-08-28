import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Galleryblock from './Galleryblock';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Galleryblock/> 
                <Smallcallback />
            </Fragment>
        ); 
    }
}

export default Content;