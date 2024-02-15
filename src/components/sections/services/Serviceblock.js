import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import axios from "axios";
import bannerbg from "../../../assets/img/banner/banner-2.jpg";
import authService from "../../../services/auth.service";
import $ from "jquery";
import "magnific-popup";
import Rating from "@mui/material/Rating";
import swal from "sweetalert";
import Joi from "joi-browser";
import GoogleMapReact from "google-map-react";
import AuthService from "../../../services/auth.service";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Select from "react-select";

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
      style={{ width: "20px" }}
    />
  </div>
);

class Serviceblock extends Component {
  _isMounted = false;
  constructor(props) {
    let user = authService.getCurrentUser();
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);

    this.state = {
      cities: [],
      services_type: [],
      services_providers: [],
      filter_service_provider: [],
      service_type_id: 1,
      city_name: "",
      services_provider: "",
      providername: "",
      price: "",
      radius: "",
      searchvalue: localStorage.getItem("searchservice"),
      currentUser: authService.getCurrentUser(),
      links: [],
      searchlinks: [],
      searchlinklength: [],
      linklength: "",
      center: {
        lat: parseFloat(user?.lat) || 49.34288,
        lng: parseFloat(user?.lng) || -123.11484,
      },
      inputRad: 10000,
      markers: [
        {
          lat: user?.lat || 49.34288,
          lng: user?.lng || -123.11484,
          img_src: "../../../assets/img/lcoation.png",
        },
      ],
      lat: 49.34288,
      lng: -123.11484,
      loader: false,
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
        name: this.state.providername,
        price: this.state.price,
        radius: this.state.radius,
        city: this.state.city_name,
        service_type: this.state.searchvalue,
        lng: this.state.lng,
        lat: this.state.lat,
      };

      // console.log("Before Api Call", apidata)

      if (this.state.searchvalue > 0) {
        try {
          const services_provider = await axios
            .post(config.SERVER_URL + `/api/searchforprovider`, apiCalldata, {
              headers: authHeader(),
            })
            .then(function (services_provider) {
              // console.log("::: TEST 64::", services_provider)
              if (services_provider.data.data.length > 0) {
                that.setState({
                  filter_service_provider: services_provider.data.data,
                  searchlinks: services_provider.data.data.links,
                  //   links:services_provider.data.data.links,
                  links: [],
                  linklength: "",
                });

                // swal("Result Found!", "Your Result has been found!", "success")
                localStorage.removeItem("searchservice");
                // console.log("searchlinks",this.state.searchlinks);
              }
              //"dlfjldskjf"
              else swal("Result Not Found!", "Result not found!", "warning");
            });
        } catch (err) {
          console.log(err);
        }
      } else {
        const all_services_provider = await axios.get(
          config.SERVER_URL + `/api/serviceprovider?length=9999`
        );
        this.setState({
          services_providers: all_services_provider.data.data.data,
          links: all_services_provider.data.data.links,
        });
        this.setState({
          linklength: this.state.links.length,
        });
      }
      // }
      //Service Provider api
      // if(searchservice>0){
      //     const all_services_provider=await axios.get(config.SERVER_URL + `/api/serviceprovider?length=9999`);
      // }
      // console.log("After Api Call Service Provider", all_services_provider);
      // console.log("Get ALL Service Provider", all_services_provider.data.data.data)
    }

    //cities api
    const cities = await axios.get(config.SERVER_URL + `/api/cities`, {
      headers: authHeader(),
    });

    let tempcit = [];
    cities.data.data.map(function (currentValue, index) {
      tempcit.push({ value: index, label: currentValue.city });
    });
    console.log(tempcit);
    this.setState({ cities: tempcit });
    // this.setState({ cities: cities.data.data });
    // console.log("CITIES", cities.data.data)

    //service_type api
    const services_type = await axios.get(
      config.SERVER_URL + `/api/servicetypes`,
      {
        headers: authHeader(),
      }
    );
    this.setState({ services_type: services_type.data.data });
    // console.log("SERVICE TYPE", services_type.data.data)
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInputChange(event) {
    const target = event.target;
    var value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleRadiusChange = (event) => {
    const value = event.target.value;
    console.log("value", value);
    this.setState({
      radius: value,
      inputRad: value * 1000,
    });
    circle.setRadius(Number(value * 1000));
  };
  async findServiceProviders(event) {
    this.setState({ loader: true });
    window.scrollTo(0, 1400);
    let that = this;
    event.preventDefault();

    const apidata = {
      name: this.state.providername,
      price: this.state.price,
      radius: this.state.radius,
      city: this.state.city_name,
      service_type: this.state.service_type_id,
      lng: this.state.lng,
      lat: this.state.lat,
    };

    try {
      const services_provider = await axios
        .post(config.SERVER_URL + `/api/searchforprovider`, apidata, {
          headers: authHeader(),
        })
        .then(function (services_provider) {
          that.setState({ loader: false });
          if (services_provider.data.data.data.length > 0) {
            that.setState({
              filter_service_provider: services_provider.data.data.data,
              searchlinks: services_provider.data.data.links,
              //   links:services_provider.data.data.links,
              //   linklength:services_provider.data.data.links.length
              links: [],
              linklength: "",
            });
          } else swal("Result Not Found!", services_provider.data.message, "warning");
        });
    } catch (err) {
      console.log(err);
    }
  }
  async handlepage(url) {
    window.scrollTo(0, 900);
    // console.log("urlfrom",url)
    const serviceproviderpage = await axios.get(url);
    this.setState({
      services_providers: serviceproviderpage.data.data.data,
      // links:all_services_provider.data.data.links
    });
  }
  async searchhandlepage(url) {
    window.scrollTo(0, 800);
    // console.log("urlfrom",url)
    const searchdata = {
      name: this.state.providername,
      price: this.state.price,
      radius: this.state.radius,
      city: this.state.city_name,
      service_type: this.state.service_type_id,
    };
    // console.log("searchdata",searchdata);
    const searchserviceproviderpage = await axios.post(url, searchdata);
    this.setState({
      filter_service_provider: searchserviceproviderpage.data.data.data,
      // links:all_services_provider.data.data.links
    });
  }
  handleChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption.label);
    this.setState({ city_name: selectedOption.label });
  };

  render() {
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

    // console.log("links",this.state.links);
    return (
      <section className="service pt-95 pb-90 bg-light-white">
        <div className="container">
          <form action="#">
            <div className="row align-items-center mb-90">
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label for="proivdername">
                    <h5>Search by Name :</h5>
                  </label>
                  <input
                    type="text"
                    className="form-control input-white"
                    name="providername"
                    id="providername"
                    value={this.state.providername}
                    onChange={this.handleInputChange}
                    placeholder="James"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label for="price">
                    <h5>Search by Hourly Rate (in CAD):</h5>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="form-control input-white"
                    name="price"
                    id="price"
                    value={this.state.price}
                    onChange={this.handleInputChange}
                    placeholder="$45/hr"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label for="city">
                    <h5>Search by City</h5>
                  </label>
                  {/* <select
                    className="form-control input-white select-nice mr-15 mb-xs-15 step-one"
                    name="city"
                    id="city"
                    onChange={(e) => {
                      this.setState({ city_name: e.target.value });
                    }}
                  > */}
                  {/* <option value="">Select city</option> */}
                  {/* {this.state.cities
                      .filter(({ city }) => city !== null)
                      .map(({ city }, index) => {
                        return (
                          <option value={city} key={index}>
                            {city}
                          </option>
                        );
                      })} */}
                  {/* </select> */}
                  <Select
                    id="city"
                    options={this.state.cities}
                    className="find_service_cities"
                    classNamePrefix="find_service_cities"
                    placeholder={"Select City...."}
                    onChange={this.handleChange}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "#036905",
                        primary: "transparent",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label for="service_type_id">
                    <h5>Category</h5>
                  </label>
                  <select
                    className="form-control input-white select-nice mb-xs-15 step-two"
                    style={{ pointerEvents: "none" }}
                    name="service_type_id"
                    id="service_type_id"
                    onChange={(e) => {
                      this.setState({ service_type_id: e.target.value });
                    }}
                  >
                    {/* <option value="">Select Service</option> */}
                    {this.state.services_type.map((value) => {
                      return (
                        <option value={value.id} key={value.id}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label for="price">
                    <h5>Search by Radius Near You:</h5>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="form-control input-white"
                    name="radius"
                    id="radius"
                    value={this.state.radius}
                    onChange={(event) => this.handleRadiusChange(event)}
                    placeholder="10 km"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6"></div>
              <div id="cust-find-service-btn">
                <button
                  type="submit"
                  onClick={(event) => this.findServiceProviders(event)}
                  className="btn btn-black ml-20 ml-xs-00 mt-xs-15"
                >
                  {" "}
                  GO{" "}
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container">
          <div style={{ height: "500px", width: "100%", marginBottom: "20px" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM",
                libraries: ["places"],
              }}
              defaultZoom={10}
              center={this.state.center}
              defaultCenter={this.state.center}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
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
          {this.state.filter_service_provider.length > 0 && (
            <h3> Search Result </h3>
          )}
          {this.state.loader && (
            <div className="position-relative h-100">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{
                  position: "absolute",
                  top: 200,
                  bottom: 0,
                  zIndex: 1,
                  right: 0,
                  left: 0,
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <CircularProgress color="success" size={80} />
                <Typography
                  position="absolute"
                  variant="caption"
                  component="div"
                >
                  Please Wait
                </Typography>
              </Box>
            </div>
          )}
          <div className="row">
            {this.state.filter_service_provider.map((item, i) => (
              <div
                key={i}
                className="col-lg-4 col-xl-3 col-md-6 wow fadeInUp"
                data-wow-delay=".{item.animation}s"
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
                          objectFit: "cover",
                        }}
                        src={`${config.SERVER_URL}/${item.image}`}
                        alt="service_provider_image"
                      />
                    </div>
                    <div className="service-text">
                      <h3 className="fs-20 f-700 mb-10">{item.username}</h3>
                      {/* <p className="fs-20 f-700 mb-10">
                        {item.service_types_name}
                      </p>
                      <p className="mb-0">{item.description} </p>
                      <p className="mb-0 pt-30">
                        {`${item.price_per_hour}/hr`}
                      </p> */}
                      <ul className="service_providers_list">
                        <li>
                          {item.city},{item.state}
                        </li>
                        <li>
                          <span className="f-700">{item.country}</span>
                        </li>
                      </ul>
                      <div>
                        <h3 className="main-price mt-15 mb-15">
                          <span className="sup">$</span>
                          {item.price_per_hour}
                          <span className="sub">/ per hour</span>
                        </h3>
                      </div>
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
          </div>
          <div className="container">
            <div className="row">
              <ButtonToolbar
                style={{ margin: "auto" }}
                aria-label="Toolbar with button groups"
              >
                <ButtonGroup
                  size="lg"
                  className="me-2"
                  aria-label="First group"
                >
                  {this.state.searchlinks.map((value, index) => {
                    // console.log(value.url)
                    // console.log(this.state.linklength)

                    return (
                      <Button
                        className="buttongroudp"
                        hidden={
                          index < 1 ||
                          index == this.state.searchlinks.length - 1
                        }
                        onClick={() => this.searchhandlepage(value.url)}
                      >
                        {value.label}
                      </Button>
                      // <option value={value.id} key={value.id}>
                      //   {value.name}
                      // </option>
                    );
                  })}
                  {/* <Button>1</Button> <Button>2</Button> <Button>3</Button>{" "}
                  <Button>4</Button> */}
                </ButtonGroup>
              </ButtonToolbar>
            </div>
          </div>

          {this.state.filter_service_provider?.length < 1 &&
            this.state.services_providers?.length > 0 && (
              <>
                <h3> All Service Providers </h3>
                <div className="row">
                  {this.state.services_providers.map((item, i) => (
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
                                objectFit: "cover",
                              }}
                              src={`${config.SERVER_URL}/${item.image}`}
                              alt="service_provider_image"
                            />
                          </div>
                          <div className="service-text">
                            <h3 className="fs-20 f-700 mb-10">
                              {item.username}
                            </h3>
                            {/* <p className="fs-20 f-700 mb-10">
                              {item.service_types_name}
                            </p>
                            <p className="mb-0">{item.description} </p>
                            <p className="mb-0 pt-30">
                              {`${item.price_per_hour}/hr`}
                            </p> */}
                            <ul className="service_providers_list">
                              <li>
                                {item.city},{item.state}
                              </li>
                              <li>
                                <span className="f-700">{item.country}</span>
                              </li>
                            </ul>
                            <div>
                              <h3 className="main-price mt-15 mb-15">
                                <span className="sup">$</span>
                                {item.price_per_hour}
                                <span className="sub">/ per hour</span>
                              </h3>
                            </div>
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
              </>
            )}
        </div>
        <div className="container">
          <div className="row">
            <ButtonToolbar
              style={{ margin: "auto" }}
              aria-label="Toolbar with button groups"
            >
              <ButtonGroup size="lg" className="me-2" aria-label="First group">
                {this.state.links.map((value, index) => {
                  // console.log(value.url)
                  // console.log(this.state.linklength)

                  return (
                    <Button
                      className="buttongroudp"
                      hidden={index < 1 || index == this.state.linklength - 1}
                      onClick={() => this.handlepage(value.url)}
                    >
                      {value.label}
                    </Button>
                    // <option value={value.id} key={value.id}>
                    //   {value.name}
                    // </option>
                  );
                })}
                {/* <Button>1</Button> <Button>2</Button> <Button>3</Button>{" "}
                  <Button>4</Button> */}
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      </section>
    );
  }
}

export default Serviceblock;
