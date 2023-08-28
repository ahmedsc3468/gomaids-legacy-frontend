import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Testimonial from '../homethree/Testimonial';
import Portfolioblock from './Portfolioblock';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Portfolioblock/>
                <Testimonial/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;