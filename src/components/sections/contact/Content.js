import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Contactdetail from './Contactdetail';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Contactdetail/>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;