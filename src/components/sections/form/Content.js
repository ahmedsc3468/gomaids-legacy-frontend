import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Smallcallback from '../../layouts/Smallcallback';
import { withRouter } from 'react-router-dom';
import sectionbg from '../../../assets/img/bg/about-vector.png';
//import config from '../../config.json'

class Content extends Component {

    constructor(props){
        super(props);
        this.state ={
            items:[],
        }
    }

    state = {
        user_id: '',
        dob : '',
        detail : '',
        mobile_no : ''
        // image:''
        // email : '',
        // password : '',
        // user_type : '',
    }
    routingFunction = param => {
        this.props.history.push({
            pathname: `/`,
            state: param
        });
    }
    submit = e => {

    let that = this;
        
         e.preventDefault()
         console.log(this.state)
         axios.post(`https://projects.tecrux.net/gomaidz/backend/api/user`, this.state)
         .then(function(response){
         console.log(response)
            
    that.routingFunction('/');
         })
      }

    render() {
        return (
            <Fragment>
                <section className="login pt-100 pb-100">
                    <div className="container">
                        <div className="row no-gutters">
                            <div className="col-xl-7 col-lg-6 d-none d-lg-block">
                                <div className="login-image bg-cover h-100" style={{ backgroundImage: "url(" + sectionbg + ")" }}>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6 ">
                                <div className="form-area bg-blue">
                                    <h2 className="f-700 mb-5 white">Form Detail</h2>
                                    <p className="white">Fill The Following Details.</p>
                                    <form action="#" onSubmit={ e => this.submit(e)}>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="date" className="form-control input-lg input-white shadow-5" id="dob" placeholder="Date Of Birth" onChange={e => { this.setState({'dob': e.target.value}) }}/>
                                            <i className="far fa-date transform-v-center" />
                                        </div>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="text" className="form-control input-lg input-white shadow-5" id="detail" placeholder="Detail" onChange={e => { this.setState({'detail': e.target.value}) }} />
                                            <i className="far fa-user transform-v-center" />
                                        </div>
                                        <div className="form-group relative mb-25 mb-sm-20">
                                            <input type="number" className="form-control input-lg input-white shadow-5" id="mobile_no" placeholder="Mobile Number" onChange={e => { this.setState({'mobile_no': e.target.value}) }} />
                                            <i className="far fa-user transform-v-center" />
                                        </div>
                                        {/* <div className="form-group relative mb-25 mb-sm-20">
                                         <img src="#"/>
                                            <input type="file" className="form-control input-lg input-white shadow-5" id="image" placeholder="Upload Picture" onChange={e => { this.setState({'image': e.target.value}) }} />
                                            <i className="far fa-user transform-v-center" />
                                        </div>*/}
                                        <button type="submit" className="btn btn-black btn-block mt-20">Submit</button>
                                        {/* <div className="signup-login text-center">
                                            <p className="mt-15 fs-13 white">
                                                Already a member? <Link to="/login" className="ml-5 mb-0 d-inline-block white f-500">Login</Link>
                                            </p>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Smallcallback />
            </Fragment>
        );
    }
}

export default withRouter(Content);