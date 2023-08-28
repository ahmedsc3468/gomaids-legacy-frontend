import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Testimonials from './Testimonials';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Testimonials/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;