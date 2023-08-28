import React, { Component, Fragment } from 'react';
import Video from '../homethree/Video';
import Testimonial from '../home/Testimonials';
import Smallcallback from '../../layouts/Smallcallback';
import Teamblock from './Teamblock';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Teamblock/>
                <Video/>
                <Testimonial/>
                <Smallcallback/>
            </Fragment>
        );
    }
}

export default Content;