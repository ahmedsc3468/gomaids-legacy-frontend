import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Blogarea from './Blogarea';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Blogarea/>
                <Smallcallback />
            </Fragment>
        );
    }
} 

export default Content;