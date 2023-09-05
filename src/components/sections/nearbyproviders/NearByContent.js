import React from 'react';
import Contacthelper from '../../../helper/Contacthelper';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, Form } from 'react-bootstrap';
import "../../../assets/MyCSS/contactdetail.css";
import authService from '../../../services/auth.service';
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import $ from 'jquery';
import swal from "sweetalert";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Joi from "joi-browser";
import {Component} from "react";
import GoogleMapReact from "google-map-react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
<script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM&callback=initMap">
</script>

let circle;
class NearByContent extends Component  {
  
  constructor(props) {
      let user = authService.getCurrentUser();
      let latLng = JSON.parse(localStorage.getItem('latLng'));
      if (latLng === null || latLng.length === 0) {
        latLng = {lat: 49.342880 ,lng: -123.114840};
      }
        super(props);
        if(user!=null){
          user.lat = (user.lat) ? user.lat : latLng.lat;
          user.lng = (user.lng) ? user.lng : latLng.lng;
          this.state = {
            filter_service_provider:[],
            center: { lat: parseFloat(user.lat), lng: parseFloat(user.lng)},
               inputRad: 10000
          }
        } else{
            this.state = {
              filter_service_provider:[],
              center: { lat: 49.342880, lng: -123.114840},
                 inputRad: 10000
            }
        };
      }
      async componentDidMount() {
        window.scrollTo(0, 500);
    
        let that = this;
        var searchservice = localStorage.getItem("searchservice");
        // console.log(":::::40::::::",searchservice)
        this._isMounted = true;
        if (this._isMounted) {
          function popup() {
            $(".popup-video").magnificPopup({
              type: "iframe",
            });
          }
          popup();
          const apiCalldata = {
            lat: that.state.center.lat,
             lng: that.state.center.lng,
            radius: this.state.inputRad/1000
          };
          
            try {
              const services_provider = await axios
                .post(config.SERVER_URL + `/api/nearserviceproviders`, apiCalldata, {
                  headers: authHeader(),
                })
                //   console.log("::: TEST 64::", services_provider)
                .then(function (services_provider) {
                  if (services_provider.data.data.data.length > 0) {
                    that.setState({
                      filter_service_provider: services_provider.data.data.data,
                    //   links:services_provider.data.data.links,
                    //   links:[],
                    //   linklength:"",
    
                    });
                    // swal("Result Found!", "Your Result has been found!", "success")
                    // console.log("second",services_provider.data.data.data);
                    localStorage.removeItem("searchservice");
                  }
                    //"dlfjldskjf"
                    // swal("Result Not Found!", "Result not found!", "warning");
                });
            } catch (err) {
              console.log(err);
            }
            // console.log("thind",this.state.filter_service_provider);
          
          // }
          //Service Provider api
          // if(searchservice>0){
          //     const all_services_provider=await axios.get(config.SERVER_URL + `/api/serviceprovider?length=9999`);
          // }
          // console.log("After Api Call Service Provider", all_services_provider);
          // console.log("Get ALL Service Provider", all_services_provider.data.data.data)
        }

        // console.log("SERVICE TYPE", services_type.data.data)
      }
      onChange = e => {
        this.setState({
          inputRad: e.target.value * 1000
        });
      };
      changeRadius = () => {
        let that = this;
        // console.log(Number(this.state.inputRad));
        circle.setRadius(Number(this.state.inputRad));
        const apiCaldata = {
            lat: that.state.center.lat,
             lng: that.state.center.lng,
            radius: this.state.inputRad/1000
          };
        try {
            const services_provider = axios
              .post(config.SERVER_URL + `/api/nearserviceproviders`, apiCaldata, {
                headers: authHeader(),
              })
              //   console.log("::: TEST 64::", services_provider)
              .then(function (services_provider) {
                if (services_provider.data.data.data.length > 0) {
                  that.setState({
                    filter_service_provider: services_provider.data.data.data,
                  //   links:services_provider.data.data.links,
                  //   links:[],
                  //   linklength:"",
  
                  });
                  window.scrollTo(0, 800);
                  swal("Result Found!", "Your Result has been found!", "success")
                  // console.log("thek",services_provider.data.data.data);
                  localStorage.removeItem("searchservice");
                }else{
                  that.setState({
                    filter_service_provider: []
                    });
                    window.scrollTo(0, 0);
                   swal("No Result Found!", "No provider found in this radius!", "failed")
                }
                  //"dlfjldskjf"
                  // swal("Result Not Found!", "Result not found!", "warning");
              });
          } catch (err) {
            console.log(err);
          }
      };
      render() {
        // console.log(this.state.inputRad)
        const apiIsLoaded = (map, maps) => {
          circle = new maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            map,
            center: this.state.center,
            radius: this.state.inputRad
          });
        };
       
        return (

          <div className='container'>
            <h1 className='mt-5 mb-5'>Find Service Providers</h1>
            <div style={{ height: "400px", width: "100%",marginBottom:"100px" }}>
                <div className='row' style={{margin:"10px"}}>
                <div className='col-sm-3'></div>
            <div className='col-sm-3'>
            <input
                placeholder="Enter radius"
                type="number"
                min="1"
                value={this.state.inputRad/1000}
                name="inputRad"
                className="form-control"
                onChange={this.onChange}
              />
               <span className="transform-v-center homeradius">Km</span>
            </div>
            <div className='col-sm-2'>
            <input
                value="Change Distance"
                type="submit"
                className="btn btn-primary btn-block custom_login_btn"
                onClick={this.changeRadius}
              />
            </div>
             
                </div>
          
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM",
                  libraries: ["places"]
                }}
                defaultZoom={10}
                center={this.state.center}
                defaultCenter={this.state.center}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>apiIsLoaded(map, maps)}
                
              />
        
            </div>
            <div>
            <h2>
                Available service providers in selected distance:
            </h2>
            </div>
            <div className="row">
                  {this.state.filter_service_provider.map((item, i) => (
                    <div
                      className="col-lg-4 col-xl-3 col-md-6 wow fadeInUp"
                      data-wow-delay=".{item.animation}s"
                      key={i}
                    >
                      <div className="service-each shadow-2 mb-30 transition-4 text-center">
                        <Link
                          to={`/service-details/${item.service_provider_id}`}
                          className="black"
                        >
                          {/* <div className="service-icn bg-light-white flex-center">
                                                
                                                <img src={`${config.SERVER_URL}/${item.image}`} alt="" />
                                            </div> */}
                          <div className="service-icn bg-light-white flex-center">
                            <img
                              style={{
                                borderRadius: "50px",
                                height: "6.5rem",
                                width: "15rem",
                                objectFit:"cover",
                              }}
                              src={`${config.SERVER_URL}/${item.image}`}
                              alt="service_provider_image"
                            />
                          </div>
                          <div className="service-text">
                            <h3 className="fs-20 f-700 mb-10">
                              {item.username}
                            </h3>
                            <p className="fs-20 f-700 mb-10">
                              {item.service_types_name}
                            </p>
                            <p className="mb-0">{item.description} </p>
                            <p className="mb-0 pt-30">
                              {" "}
                              {`${item.price_per_hour}/hr`}
                            </p>
                            <Rating
                              value={parseInt(item.rating)}
                              size="large"
                              precision={0.5}
                              readOnly
                            />
                            <p className="mb-0 pt-30"> {item.desc}</p>
                            <span className="line-servcie transition-4 bg-blue mt-5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                  {/* <div className="col-lg-12 text-center mt-15">
                                <div className="pagination-type1 left-align">
                                    <ul>
                                        <li>
                                            <Link to="#"><i className="fas fa-angle-double-left" /></Link>
                                        </li>
                                        <li className="active"><Link to="/">1</Link></li>
                                        <li><Link to="#">2</Link></li>
                                        <li><Link to="#">3</Link></li>
                                        <li>
                                            <Link to="#"><i className="fas fa-angle-double-right" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                </div>
          </div>
         
        );
      }
}

export default NearByContent;