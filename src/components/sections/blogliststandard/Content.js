import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Blogblock from './Blogblock';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Blogblock/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;