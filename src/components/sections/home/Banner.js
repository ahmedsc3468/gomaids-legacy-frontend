import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';
import AuthService from "../../../services/auth.service";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import axios from "axios";
import bannerbg from '../../../assets/img/banner/banner-2.jpg';
import authService from '../../../services/auth.service';

class Banner extends Component {
    _isMounted = false
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            services_type: [],
            services_provider:[],
            service_type_id: "",
            city_id: "",
            services_provider:"",
            currentUser: authService.getCurrentUser()
        };
    }

    async componentDidMount() {

        this._isMounted = true
        if (this._isMounted) {
            function popup() {
                $('.popup-video').magnificPopup({
                    type: 'iframe',
                });
            }
            popup();

            //cities api
            const cities = await axios.get(config.SERVER_URL + `/api/cities`,
                {
                    headers: authHeader(),
                }
            );
            this.setState({ cities: cities.data.data })

            //service_type api
            const services_type = await axios.get(config.SERVER_URL + `/api/servicetypes`,
                {
                    headers: authHeader(),
                }
            );
            this.setState({ services_type: services_type.data.data })
        }
    }
    componentWillUnmount() {

        this._isMounted = false;
    }
    findServiceProviders() {
        window.scrollTo(0, 800);
        //service providers api
        console.log("Find Service")
        const services_provider =  axios.get(config.SERVER_URL + `/api/serviceproviders`,
        {
            headers: authHeader(),
        }
        );
        this.setState({ services_provider: services_provider.data.data })
    }

    render() {
        return (
            <section className="banner-type-4 flex-center" style={{ backgroundImage: "url(" + bannerbg + ")" }} data-overlay={8}>
                <div className="container">
                    <div className="row z-5">
                        <div className="col-lg-10 offset-lg-1 text-center">
                            <div className="banner-content-4 white">
                                <h1 className="f-900 mb-25">Let us help you in your work.</h1>
                                <h4 className="fs-21 f-400 mb-5">We provide wide range of Services</h4>

                                {/* {(this.state.currentUser === null) ||
                                    (this.state.currentUser &&
                                        this.state.currentUser.role.name === "service_taker") &&
                                    <div className="d-flex justify-content-start ">
                                        <Link to="/" className="arrow arrow-bottom  mb-25 ml-60 " disabled >Service Providor</Link>
                                    </div>} */}


                                {((this.state.currentUser === null) ||
                                    (this.state.currentUser &&
                                        this.state.currentUser.role.name === "service_taker")) &&

                                    <div className="banner-form-4">
                                        <form action="#">
                                            <div className=" d-flex flex-column flex-md-row">

                                                <select className="form-control input-white select-nice mr-15 mb-xs-15 step-one" id="sel1" onChange={(e) => { this.setState({ city_id: e.target.value }) }}>
                                                    <option value='' style={{"width":"100%"}}>Select city</option>
                                                    {this.state.cities.map(({ city }, index) => {
                                                        // console.log(city)
                                                        return (
                                                            <option style={{"width":"100%"}} value={city} key={index}>
                                                                {city}
                                                            </option>
                                                        )
                                                    }
                                                    )}
                                                </select>

                                                <select className="form-control input-white select-nice mb-xs-15 step-two" id="sel1" onChange={(e) => { this.setState({ service_type_id: e.target.value }) }}>
                                                    <option value=''>Select Service</option>
                                                    {this.state.services_type.map((value) => {
                                                        return (
                                                            <option value={value.id} key={value.id}>
                                                                {value.name}
                                                            </option>
                                                        )
                                                    }
                                                    )}
                                                </select>
                                                
                                                <input type="text" className="form-control input-white shadow-2 ml-15 ml-xs-00 step-three" placeholder="Enter Keyword" />
                                                <button type="submit" onClick={(event) => this.props.findServiceProviders(event, this.state.city_id, this.state.service_type_id)} className="btn btn-black ml-15 ml-xs-00 mt-xs-15 step-four">Go</button>
                                            </div>
                                        </form>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Banner;
