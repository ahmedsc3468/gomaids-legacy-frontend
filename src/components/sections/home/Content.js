import React, { Component, Fragment } from "react";
import About from "./About";
import Banner from "./Banner";
// import Service from "./Service";
// import Cta from "../../layouts/Cta";
import Howitwork from "../../layouts/Howitwork";
import Gomaidzwork from "../../layouts/GomaidzWorkPartner";
import Smallcallback from "../../layouts/Smallcallback";
// import Whyus from "./Whyus";
import Testimonials from "./Testimonials";
// import Ctaft from "./Cta";
import Servicesfilter from "./Servicesfilter";
import { withRouter } from "react-router-dom";
import { Steps } from "intro.js-react";
import authService from "../../../services/auth.service";
import AuthService from "../../../services/auth.service";
import axios from "axios";
import "intro.js/introjs.css";
import swal from "sweetalert";
import config from "../../../config.json";
import icon9 from "../../../assets/img/service/star-rating.png";
import YouTubeCarousel from "./YoutubeCarousel";
// import { UncontrolledAlert, Button } from 'reactstrap';
// import Callback from '../../layouts/Callback';
// import Joi from "joi-browser";
//import authHeader from "../../../services/auth-header";
//import OwlCarousel from 'react-owl-carousel2';
<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM&callback=initMap"
></script>;
let circle;
const defaultLng = -79.34;
const defaultLat =  43.65;
class Content extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    let user = AuthService.getCurrentUser();
    this.state = {
      serviceblock: [],
      showSteps: 0,
      stepsEnabled: null,
      initialStep: null,
      steps: [],
      orderCreated: false,
      status: false,
      webTour: false,
      currentUser: authService.getCurrentUser(),
      center: {lat: parseFloat(user?.lat) || defaultLat, lng: parseFloat(user?.lng) || defaultLng  },
      markers: [
        {
          lat: user?.lat || defaultLat,
          lng: user?.lng  || defaultLng,
          img_src: "../../../assets/img/lcoation.png",
        },
      ],
      lat: defaultLat,
      lng: defaultLng,
    };
    this.updateMarkers = this.updateMarkers.bind(this);
    this.updateCenter = this.updateCenter.bind(this);
    this.apiIsLoaded = this.apiIsLoaded.bind(this);
  
  }
  checkwebTour = () => {
    // get webtour varible value from native storage and set into setstate

    let webTourValue = localStorage.getItem("webTour") || false;

    // console.log("local storage: ", webTourValue)
    if (webTourValue) {
      this.setState({ webTour: webTourValue });
    } else {
      return;
    }
  };
  setWebTour = () => {
    localStorage.setItem("webTour", this.state.webTour);
    console.log("valued set local storage");
    // set webtour as a true in native storage and also set this value this set state
    this.setState({ webTour: true });
  };

  componentDidMount() {
    this._isMounted = true;

    window.scrollTo(0, 0);
    const that = this;
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
    // if (this._isMounted) {

    //     this.checkwebTour();
    //     if (this.props.location.state !== undefined && this.props.location.state.orderCreated) {
    //         this.setState({ orderCreated: true })
    //     }
    //     this.setState({
    //         serviceblock: [],
    //         showSteps: 1,
    //         stepsEnabled: true,
    //         initialStep: 0,
    //         steps: [
    //             {
    //                 element: ".step-one",
    //                 intro: "Select The City Where You Want The Services"
    //             },
    //             {
    //                 element: ".step-two",
    //                 intro: "Select Your Desired Service"
    //             },
    //             {
    //                 element: ".step-three",
    //                 intro: "Enter Keyword On The Basis Of Name Or Email Of Service Providers"
    //             },

    //             {
    //                 element: ".step-four",
    //                 intro: "Click On 'Go' To View The Service Providers List"
    //             }

    //         ]
    //     });
    // }
  }

  myTimeOut = setTimeout(() => {
    if (this.state.orderCreated) {
      this.setState({ orderCreated: false });
    }
  }, 7000);
  componentWillUnmount() {
    this._isMounted = false;
  }

  findServiceProviders = async (event, city, service_type_id) => {
    event.preventDefault();
    if (city !== "" && service_type_id !== "") {
      try {
        const go = await axios.get(
          config.SERVER_URL + `/api/users/${city}/${service_type_id}`
        );
        console.log("120", go.data.data.data);
        let serviceProviderData = go.data.data?.data?.map((user) => {
          const userImage =
            user.image === null
              ? `${config.SERVER_URL}/images/users/user_placeholder.png`
              : `${config.SERVER_URL}/${user.image}`;
          // const currency = (user.service_price.currency.name.toLowerCase() === 'pkr') ? 'Rs.' : '$'
          const currency = "CAD";
          return {
            id: user?.service_provider_id,
            icon: userImage,
            iconrating: icon9,
            title: `${user.username}`,
            text: user?.service_types_name,
            prize: `${user.price_per_hour}{/hr}`,
            desc: user?.description,
            rating: user?.rating,
            anitchion: "",
          };
        });

        console.log("go api", go.data.data);
        console.log("Service provider data: ", serviceProviderData);
        if (go.data.data.data.length > 0) {
          this.setState({ serviceblock: serviceProviderData, showSteps: 0 });
          window.scrollTo(0, 1500);
          //   swal("Result Found!", "Your Result has been found!", "success");
        } else
          swal(
            "No Service Provider Found ",
            "We are rapidly expanding to new cities, please try and search for a provider in a neighboring city until then. Our service providers don’t mind driving  You May also Search Service Providers Near You, from the Map Search Option Below!",
            "warning"
          );
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please select city first");
    }
  };
 // Callback function to update marker state
 updateMarkers = (newMarkers) => {
  this.setState({ markers: newMarkers });
}

// Callback function to update center state
updateCenter = (newCenter) => {
  this.setState({ center: newCenter,lat:newCenter.lat,lng:newCenter.lng });
  
}
 apiIsLoaded = (map, maps) => {
  circle = new maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.3,
    map,
    center: this.props.center,
    radius: this.state.inputRad,
  });
};
  render() {
    const { stepsEnabled, steps, initialStep, webTour } = this.state;
    window.scrollTo(0, 0);
    return (
      <Fragment>
        {/* {!webTour&&(
                    this.state.showSteps === 1 &&
                        ((this.state.currentUser === null) ||
                            (this.state.currentUser &&
                                this.state.currentUser.role.name === "service_taker"))
                        ?
                        <Steps enabled={stepsEnabled} steps={steps} initialStep={initialStep} onExit={() => { this.setWebTour() }} options={{ exitOnOverlayClick: false, tooltipClass: 'webtour', showBullets: false }} /> : "")} */}

        <Banner findServiceProviders={this.findServiceProviders} lat={this.state.lat} lng={this.state.lng} center={this.state.center} markers={this.state.markers} updateCenter={this.updateCenter} updateMarkers={this.updateMarkers}  />
        <Servicesfilter serviceblock={this.state.serviceblock} lat={this.state.lat} lng={this.state.lng} center={this.state.center} markers={this.state.markers} updateCenter={this.updateCenter} updateMarkers={this.updateMarkers} apiIsLoaded={this.apiIsLoaded}/>
        {/* <IntroVideos /> */}
        <section class="service pt-30 pb-10 bg-light-white">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <YouTubeCarousel />
              </div>
            </div>
          </div>
        </section>
        <About />
        {/* <Service /> */}
        {/* <Cta /> */}
        <section className="hw-it-wrks bg-dot-full pt-95 pb-75 pb-sm-35">
          {(this.state.currentUser.role.name == "service_taker") ?(<Howitwork />):(<Gomaidzwork />)}
          
        </section>
        {/* <Whyus /> */}
        <Smallcallback />
        <Testimonials />
        {/* <Callback /> */}
        {/* <Ctaft /> */}
      </Fragment>
    );
  }
}

export default withRouter(Content);
