import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config.json";
import OwlCarousel from "react-owl-carousel2";
import authHeader from "../../../services/auth-header";
import icon9 from "../../../assets/img/service/star-rating.png";
import { tag } from "react-feather";
import Rating from "@mui/material/Rating";
import authService from "../../../services/auth.service";
import GoogleMapReact from "google-map-react";
import AuthService from "../../../services/auth.service";
import img_src from "../../../assets/img/lcoation.png";
import swal from "sweetalert";
import { withRouter } from 'react-router-dom';
<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM&callback=initMap"
></script>;

let circle;

const AnyReactComponent = ({ img_src }) => (
  <div id="locationicons">
    <img
      src={config.SERVER_URL + "/images/das.jpg"}
      className="YOUR-CLASS-NAME"
      style={{ width: "10px" }}
    />
  </div>
);

class Service extends Component {
  constructor(props) {
    let user = AuthService.getCurrentUser();
    super(props);
    if (user != null && (user.lat != null || user.lng != null)) {
      this.state = {
        serviceblock: this.props.serviceblock,
        serviceProviders: [],
        nearserviceProviders: [],
        center: { lat: parseFloat(user.lat), lng: parseFloat(user.lng) },
        inputRad: 20000,
        currentUser: authService.getCurrentUser(),
        markers: [
          {
            lat: user?.lat,
            lng: user?.lng,
            img_src: "../../../assets/img/lcoation.png",
          },
        ],
      };
    } else {
      this.state = {
        serviceblock: this.props.serviceblock,
        serviceProviders: [],
        nearserviceProviders: [],
        center: { lat: 49.34288, lng: -123.11484 },
        inputRad: 20000,
        currentUser: authService.getCurrentUser(),
        markers: [],
      };
    }
  }

  async componentDidMount() {
    this.setState({
      markers: [
        {
          lat: 49.34288,
          lng: -123.11484,
          img_src: "../../../assets/img/lcoation.png",
        },
      ],
    });

    const getlocation = () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.setState({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    };
    let user = AuthService.getCurrentUser();
    let that = this;
  
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          that.setState({
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markers: [
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                img_src: "../../../assets/img/lcoation.png",
              },
            ],
          });
          that.componentDidMount();

        },
        function errorCallback(error) {
          navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              if (result.state === "granted") {
              } else if (result.state === "prompt") {
              } else if (result.state === "denied") {
              }
              result.onchange = function () {
              };
            });
        },
        {
          timeout: 5000,
        }
      );
    } else {
    }

    const apiCalldata = {
      lat: that.state.center.lat,
      lng: that.state.center.lng,
      radius: this.state.inputRad / 1000,
    };
    try {
      const serviceProviders = await axios.get(
        config.SERVER_URL + `/api/serviceprovider`,
        {
          headers: authHeader(),
        }
      );
      this.setState({ serviceProviders: serviceProviders.data.data.data });
    } catch (err) {
      console.log(err);
    }
    try {
      const near_services_provider = await axios.post(
        config.SERVER_URL + `/api/nearserviceproviders`,
        apiCalldata,
        {
          headers: authHeader(),
        }
      );

      this.setState({
        nearserviceProviders: near_services_provider.data.data.data,
      });
     
    } catch (err) {
      console.log(err);
    }
  }

  onChangeradius = (e) => {
    let that = this;
    that.setState({
      inputRad: e.target.value * 1000,
    });
  };
  changeRadius = async() => {
    let that = this;
    circle.setRadius(Number(this.state.inputRad));
    this.props.history.push('/find-a-services',{ radius: this.state.inputRad / 1000 });
    const apiCaldata = {
      lat: that.state.center.lat,
      lng: that.state.center.lng,
      radius: this.state.inputRad / 1000,
    };

    try {
      const near_services_provider = await axios
        .post(config.SERVER_URL + `/api/nearserviceproviders`, apiCaldata, {
          headers: authHeader(),
        });
        
        console.log("near_services_provider",near_services_provider.data.data.data);
          if (near_services_provider.data.data.data.length > 0) {
   
            this.setState({
              nearserviceProviders: near_services_provider.data.data.data,
            });
            window.scrollTo(0, 800);
            swal("Result Found!", "Your Result has been found!", "success");
            localStorage.removeItem("searchservice");
          } else {
            that.setState({
              nearserviceProviders: [],
            });
            window.scrollTo(0, 0);
            swal(
              "No Result Found!",
              "No provider found in this radius!",
              "failed"
            );
          }
          //"dlfjldskjf"
          // swal("Result Not Found!", "Result not found!", "warning");
     
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    var pDoc = document.getElementById("locationicons");
    var pagrent = pDoc?.parentNode;
    let owlLength1000 = 3;
    let owlLength700 = 2;
    let loop1000 = false;
    let loop700 = false;
    let loop0 = false;

    const apiIsLoaded = (map, maps) => {
      circle = new maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        map,
        center: this.state.center,
        radius: this.state.inputRad,
      });
    };

    if (this.props?.serviceblock?.length > 0) {
      loop1000 = this.props?.serviceblock?.length > 3;
      loop700 = this.props?.serviceblock?.length > 2;
      loop0 = this.props?.serviceblock?.length > 1;
      // owlLength1000 = this.props?.serviceblock?.length < 4 ? this.props?.serviceblock?.length : 3
      // owlLength700 = this.props?.serviceblock?.length < 3 ? this.props?.serviceblock?.length : 2
    } else if (this.state?.serviceProviders?.length > 0) {
      loop1000 = this.state?.serviceProviders?.length > 3;
      loop700 = this.state?.serviceProviders?.length > 2;
      loop0 = this.state?.serviceProviders?.length > 1;
      // owlLength1000 = this.state?.serviceProviders?.length < 4 ? this.state?.serviceProviders?.length : 3
      // owlLength700 = this.state?.serviceProviders?.length < 3 ? this.state?.serviceProviders?.length : 2
    }
    const options = {
      items: owlLength1000,
      margin: 30,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: owlLength700,
        },
        1000: {
          items: owlLength1000,
        },
      },
    };
    return (
      <React.Fragment>
        {(this.state.currentUser === null ||
          (this.state.currentUser &&
            this.state.currentUser.role.name === "service_taker")) &&
          this.state.serviceProviders.length > 0 && (
            <section className="service pt-30 pb-10 bg-light-white">
              <div className="container" style={{ height: "1000px" }}>
                <div className="row mb-40 align-items-end justify-content-center">
                  <div className="col-lg-9 col-md-12 text-center text-lg-center">
                    <h1>Service Providers Near You</h1>
                  </div>

                  {/* <div className="col-lg-3 col-md-12 text-center text-lg-right">
                                            <div className="blog-nav mb-10 mt-md-25">
                                            <Link to="#" className="service-nav-icon left" onClick={() => this.refs.serviceslider.prev()}>
                                            <i className="fas fa-chevron-left" />
                                            </Link>
                                            <Link to="#" className="service-nav-icon ml-10 right" onClick={() => this.refs.serviceslider.next()}>
                                            <i className="fas fa-chevron-right" />
                                            </Link>
                                            </div>
                                        </div> */}
                </div>
                <div class=" row justify-content-center">
                  <h5>
                    Enter the Searchable Area Radius in the Box and Press Change
                    Distance
                  </h5>
                </div>
                <div
                  className="row justify-content-center"
                  style={{ margin: "10px" }}
                >
                  <div className="col-sm-2 mb-3">
                    <input
                      placeholder="Enter radius"
                      type="number"
                      min="1"
                      value={this.state.inputRad / 1000}
                      name="inputRad"
                      className="form-control"
                      onChange={this.onChangeradius}
                    />
                    <span className="transform-v-center homeradius">Km</span>
                  </div>
                  <div className="col-sm-2">
                    <input
                      value="Change Distance"
                      type="submit"
                      className="btn btn-primary btn-block custom_login_btn"
                      onClick={this.changeRadius}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12" style={{ height: "500px" }}>
                    {/* <GoogleMap
                                        defaultCenter={this.state.center}
                                        defaultZoom={10}
                                        >
                                        {props.children}
                                        <Marker position={this.state.center} />
                                    </GoogleMap> */}
                    {/* <WrappedMap
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM`}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `400px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                />                */}
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM",
                        libraries: ["places"],
                      }}
                      defaultZoom={10}
                      center={this.state.center}
                      defaultCenter={this.state.center}
                      yesIWantToUseGoogleMapApiInternals
                      onGoogleApiLoaded={({ map, maps }) =>
                        apiIsLoaded(map, maps)
                      }
                    >
                      {this.state.markers.map((marker, i) => {
                        return (
                          <AnyReactComponent
                            lat={marker.lat}
                            lng={marker.lng}
                            img_src={marker.img_src}
                          />
                        );
                      })}
                    </GoogleMapReact>
                  </div>
                </div>
                
                <div className="row mb-40 mt-40 align-items-end">
                  <div className="col-lg-9 col-md-12 text-center text-lg-left">
                    <h3>Available Service Providers in Selected Radius:</h3>
                  </div>
          
                </div>
                <div>
                  <OwlCarousel
                    ref="serviceslider"
                    options={options}
                    className="owl-carousel service-slider"
                    style={{ marginTop: "20px" }}
                  >
                    {this?.state?.nearserviceProviders?.length > 0 ? (
                      this?.state?.nearserviceProviders?.map((item, i) => (
                        <div className="service-2-each shadow-2 mb-50" key={i}>
                          <div className="service-each shadow-2 mb-30 transition-4 text-center">
                            <Link
                              to={`/service-details/${item.service_provider_id}`}
                              className="black"
                            >
                              <div className="service-icn bg-light-white flex-center">
                                <img
                                  style={{
                                    borderRadius: "50px",
                                    height: "6.5rem",
                                    width: "15rem",
                                  }}
                                  src={`${config.SERVER_URL}/${item.image}`}
                                  alt=""
                                />
                              </div>

                              <div className="service-text">
                                <h3 className="fs-20 f-700 mb-10">
                                  {item.fname !== undefined && item.username}
                                </h3>

                                <ul className="service_providers_list">
                                  {/* <li>
                                        <span className="mb-0 mt-5">
                                          {item.service_types_name}
                                          <i
                                            className="fa fa-solid fa-tags"
                                            style={{
                                              marginLeft: "5px",
                                              marginRight: "5px",
                                              color: "#102043",
                                            }}
                                          ></i>
                                        </span>
                                      </li> */}
                                  <li>
                                    {item.city},{item.state}
                                  </li>
                                  <li>
                                    <span className="f-700">
                                      {item.country}
                                    </span>
                                  </li>
                                </ul>
                                <div>
                                  <h3 className="main-price mt-15 mb-15">
                                    <span className="sup">$</span>
                                    {item.price_per_hour}
                                    <span className="sub">/ per hour</span>
                                  </h3>
                                </div>
                                <div className="mt-2">
                                  <Rating
                                    value={parseInt(item.rating)}
                                    size="large"
                                    precision={0.5}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))
                    ):this.props.serviceblock.length > 0 ? (
                      this.props.serviceblock.map((item, i) => (
                        <div className="service-2-each shadow-2 mb-50" key={i}>
                          <div className="service-each shadow-2 mb-30 transition-4 text-center">
                            <Link
                              to={`/service-details/${item.id}`}
                              className="black"
                            >
                              <div className="service-icn bg-light-white flex-center">
                                <img
                                  style={{
                                    borderRadius: "50px",
                                    height: "6.5rem",
                                    width: "15rem",
                                  }}
                                  src={`${item.icon}`}
                                  alt=""
                                />
                              </div>

                              <div className="service-text">
                                <h3 className="fs-20 f-700 mb-10">
                                  {item.title}
                                </h3>

                                <span className="mb-0 mt-5">
                                  {item.text}
                                  <i
                                    className="fa fa-solid fa-tags"
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                      color: "#102043",
                                    }}
                                  ></i>
                                </span>
                                <div>
                                  <h3 className="main-price mt-15 mb-15">
                                    <span className="sup">$</span>
                                    {parseInt(item.prize)}
                                    <span className="sub">/ per hour</span>
                                  </h3>
                                </div>
                                <div className="mt-2">
                                  <Rating
                                    value={parseInt(item.rating)}
                                    size="large"
                                    precision={0.5}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))
                    )  : (
                      <div></div>
                    )}
                    
                  </OwlCarousel>
                </div>
              </div>
              <div className="container" style={{ marginTop: "250px" }}>
                <div className="row mb-40 align-items-end">
                  <div className="col-lg-9 col-md-12 text-center text-lg-left">
                    <h3>Top Rated Service Providers</h3>
                  </div>
          
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <OwlCarousel
                      ref="serviceslider"
                      options={options}
                      className="owl-carousel service-slider"
                    >
                      {this.props.serviceblock.length > 0
                        ? this.props.serviceblock.map((item, i) => (
                            <div
                              key={i}
                              className="service-2-each shadow-2 mb-50"
                            >
                              <div className="service-each shadow-2 mb-30 transition-4 text-center">
                                <Link
                                  to={`/service-details/${item.id}`}
                                  className="black"
                                >
                                  <div className="service-icn bg-light-white flex-center">
                                    <img
                                      style={{
                                        borderRadius: "50px",
                                        height: "6.5rem",
                                        width: "15rem",
                                      }}
                                      src={`${item.icon}`}
                                      alt=""
                                    />
                                  </div>

                                  <div className="service-text">
                                    <h3 className="fs-20 f-700 mb-10">
                                      {item.title}
                                    </h3>

                                    <span className="mb-0 mt-5">
                                      {item.text}
                                      <i
                                        className="fa fa-solid fa-tags"
                                        style={{
                                          marginLeft: "5px",
                                          marginRight: "5px",
                                          color: "#102043",
                                        }}
                                      ></i>
                                    </span>
                                    <div>
                                      <h3 className="main-price mt-15 mb-15">
                                        <span className="sup">$</span>
                                        {parseInt(item.prize)}
                                        <span className="sub">/ per hour</span>
                                      </h3>
                                    </div>
                                    <div className="mt-2">
                                      <Rating
                                        value={parseInt(item.rating)}
                                        size="large"
                                        precision={0.5}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))
                        : this.state.serviceProviders.map((item, i) => (
                            <div
                              key={i}
                              className="service-2-each shadow-2 mb-50"
                            >
                              <div className="service-each shadow-2 mb-30 transition-4 text-center">
                                <Link
                                  to={`/service-details/${item.service_provider_id}`}
                                  className="black"
                                >
                                  <div className="service-icn bg-light-white flex-center">
                                    <img
                                      style={{
                                        borderRadius: "50px",
                                        height: "6.5rem",
                                        width: "15rem",
                                      }}
                                      src={`${config.SERVER_URL}/${item.image}`}
                                      alt=""
                                    />
                                  </div>

                                  <div className="service-text">
                                    <h3 className="fs-20 f-700 mb-10">
                                      {item.fname !== undefined &&
                                        item.username}
                                    </h3>

                                    <ul className="service_providers_list">
                                      <li>
                                        {item.city},{item.state}
                                      </li>
                                      <li>
                                        <span className="f-700">
                                          {item.country}
                                        </span>
                                      </li>
                                    </ul>
                                    <div>
                                      <h3 className="main-price mt-15 mb-15">
                                        <span className="sup">$</span>
                                        {item.price_per_hour}
                                        <span className="sub">/ per hour</span>
                                      </h3>
                                    </div>
                                    <div className="mt-2">
                                      <Rating
                                        value={parseInt(item.rating)}
                                        size="large"
                                        precision={0.5}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))}
                    </OwlCarousel>
                  </div>
                </div>
              </div>
            </section>
          )}
      </React.Fragment>
    );
  }
}

export default  withRouter(Service);
