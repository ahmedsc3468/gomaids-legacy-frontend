import React, { Component, Fragment } from 'react';
import Teamblock from './Teamblock';
import Video from '../hometwo/Video';
import Testimonial from '../homethree/Testimonial';
import Smallcallback from '../../layouts/Smallcallback';

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