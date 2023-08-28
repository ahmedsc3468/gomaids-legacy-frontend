import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Productdetail from './Productdetail';
import Relatedproduct from './Relatedproduct';

class Content extends Component {
    render() {
        return (
            <Fragment> 
                <Productdetail/>
                {/* <Relatedproduct/> */}
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;