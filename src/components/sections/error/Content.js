import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import error from '../../../assets/img/bg/error.png';
import bubble from '../../../assets/img/other/bubble.png';

class Content extends Component {
    render() {
        return (
            <section className="error o-hidden relative pt-90 pb-90">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 text-center">
                            <img src={error} alt="" />
                        </div>
                        <div className="col-lg-5 text-center">
                            <div className="error-texts relative">
                                <h1 className="blue mt-md-40 mb-xs-10">404</h1>
                                <h3 className="fs-25 f-700 ">Ooops! That page doesn't exist!</h3>
                                <p className="mt-5 fs-16">This file May Have Been Moved or Deleted. Be Sure to Check Your Spelling.</p>
                                <Link to="/" className="btn btn-black mt-10">Back to Home</Link>
                                <img src={bubble} className="error-bg-icon" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Content;