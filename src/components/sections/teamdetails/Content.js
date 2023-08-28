import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Teamdetailtext from './Teamdetailtext';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Teamdetailtext/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;