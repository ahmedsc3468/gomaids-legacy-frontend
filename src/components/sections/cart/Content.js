import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Cartlist from './Cartlist';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Cartlist/>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;