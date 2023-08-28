import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Details from './Details';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Details/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;