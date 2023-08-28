import React, { Component, Fragment } from 'react';
import Smallcallback from '../../layouts/Smallcallback';
import Reviewpost from '../../layouts/Reviewpost';
import Cta from '../../layouts/Cta';
import Hwitwrks from '../homethree/Hwitwrks';
import Pricing from '../hometwo/Pricing';
import Serviceblock from './Serviceblock';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Serviceblock />
                <Hwitwrks />
                <Cta />
                <Pricing />
                <section className="reviews pt-95 pb-95 pb-sm-50 pb-xs-65">
                    <div className="container">
                        <Reviewpost />
                    </div>
                </section>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default Content;