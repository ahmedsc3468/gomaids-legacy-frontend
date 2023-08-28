import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Howitwork from '../../layouts/Howitwork';
import Testimonials from '../home/Testimonials';
import Serviceblock from './Serviceblock';
import Quote from './Quote';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Serviceblock />
                {/* <Smallcallback /> */}
            </Fragment>
        );
    }
}

export default Content;