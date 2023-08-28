import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Clientpost from './Clientpost';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Clientpost/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;