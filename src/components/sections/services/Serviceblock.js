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
import AsyncSelect from 'react-select/async';
import { withRouter } from 'react-router-dom';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
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
const defaultLng = -79.34;
const defaultLat =  43.65;
class Serviceblock extends Component {
  _isMounted = false;
  constructor(props) {

    let user = authService.getCurrentUser();
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    const { city , radius,plat,plng } = this.props.location.state || {};
    
    this.state = {
      cities: [],
      
      services_type: [],
      services_providers: [],
      isFilterActive:false,
      filter_service_provider: [],
      service_type_id: 1,
      city_name: city,
      services_provider: "",
      providername: "",
      price: "",
      radius: radius || 20,
      searchvalue: localStorage.getItem("searchservice"),
      currentUser: authService.getCurrentUser(),
      links: [],
      searchlinks: [],
      searchlinklength: [],
      linklength: "",
      center: {
        lat: plat || parseFloat(user?.lat) || defaultLat,
        lng: plng || parseFloat(user?.lng) || defaultLng,
      },
      inputRad: 20000,
      markers: [
        {
          lat: plat || user?.lat || defaultLat,
          lng: plng || user?.lng || defaultLng,
          img_src: "../../../assets/img/lcoation.png",
        },
      ],
      lat: plat || defaultLat,
      lng: plng || defaultLng,
      loader: false,
      address:''
    };
  }

  async componentDidMount() {

    window.scrollTo(0, 500);
    const { city , radius } = this.props.location.state || {};
    let that = this;
    if(!city){
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
            const newCenter =  {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            if(circle){
            circle.setCenter(newCenter); // Update circle center
            }
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
      } 
    }
   
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
      let finalRadius = "20";
      if(radius){
        finalRadius = radius;
      }
      let finalCity = "";
      if(city){
        finalCity = city;
      }
      const apiCalldata = {
        name: this.state.providername,
        price: this.state.price,
        radius: this.state.radius ?? finalRadius,
        city: this.state.city_name ?? finalCity,
        service_type: this.state.searchvalue ?? 1,
        lng: this.state.lng,
        lat: this.state.lat,
      };


      if (this.state.searchvalue > 0 || apiCalldata.city?.length > 0 ||apiCalldata.radius?.length > 0  ) {
        try {
          const services_provider = await axios
            .post(config.SERVER_URL + `/api/searchforprovider`, apiCalldata, {
              headers: authHeader(),
            })
            .then(function (services_provider) {
              // console.log("::: TEST 64::", services_provider)
              if (services_provider.data.data.data.length > 0) {
                that.setState({
                  filter_service_provider: services_provider.data.data.data,
                  searchlinks: services_provider.data.data.links,
                  //   links:services_provider.data.data.links,
                  links: [],
                  linklength: "",
                  isFilterActive: true,
                });

                localStorage.removeItem("searchservice");
                // console.log("searchlinks",this.state.searchlinks);
              } else {
                that.setState({
                  filter_service_provider: [],
                  searchlinks: [],
                  //   links:services_provider.data.data.links,
                  links: [],
                  linklength: "",
                   isFilterActive: true,
                });
              }
              //"dlfjldskjf"
              
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
      tempcit.push({ value:currentValue.city, label: currentValue.city });
    });
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
       await axios
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
               isFilterActive: true,
            });
          } else {
            that.setState({
              filter_service_provider: [],
              searchlinks: [],
              links: [],
              linklength: "",
               isFilterActive: true,
            });
          };
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
    this.setState({ city_name: selectedOption.label });
  };
 
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };
  handleCityInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  };

  handleCityChange = (selectedOption) => {
    this.setState({ city_name: selectedOption?.value });
    this.handleGeocode( selectedOption?.value);
  };
  handleGeocode = (city) => {

    // Construct the URL for the Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)},Canada&key=AIzaSyCBl-mGeYwZqQcE3oZbnbDKBe0bqIaf9lM`;
    
    // Make the API request using fetch
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          console.log("lat",lat);
          console.log("lng",lng);
          this.setState({
            markers:[{ lat, lng, img_src: "../../../assets/img/lcoation.png"}],
           
            lat: lat,
            lng: lng,
          });
          const newCenter =  {
            lat: lat,
            lng: lng
          };
          if(circle){
            circle.setCenter(newCenter); // Update circle center
          }
        
          this.setState({
            center: {
              lat: lat,
              lng: lng,
            },
            lat: lat,
            lng: lng,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  loadOptions = async (inputValue, callback) => {
    try {
      const cities = await axios.get(config.SERVER_URL + `/api/cities?search=${inputValue}`, {
        headers: authHeader(),
      });
  
      let options = cities.data.data.map(option => {
        return {
        value: option.city,
        label: option.city
      }});
      
      this.setState({ cities: options });
      callback(options);
    } catch (error) {
      console.error('Error loading options:', error);
      callback([]);
    }
  };
    // Check if the entered value is valid for creation
    isValidNewOption = (inputValue, selectValue, selectOptions) => {
      if (inputValue.trim() === '') {
        return false;
      }
      return !selectOptions.find(option => option.label === inputValue);
    };
  
    // Create a new option based on the entered value
    createOption = (inputValue) => ({
      label: inputValue,
      value: inputValue.toLowerCase().replace(/\W/g, ''),
    });
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
              {/* <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="proivdername">
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
                  <label htmlFor="price">
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
              </div> */}
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="city">
                    <h5>Search by City</h5>
                  </label>
                  <div className="find_service_cities">
                  <AsyncSelect
          cacheOptions
          defaultOptions={this.state.cities} 
          id="city"
          className="find_service_cities"
          classNamePrefix="find_service_cities"
          loadOptions={this.loadOptions}
          onInputChange={this.handleCityInputChange}
          onChange={this.handleCityChange}
          defaultInputValue={this.state.city_name}
          placeholder="Select City...."
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
                  {/* <Select
                    id="city"
                    options={this.state.cities}
                    className="find_service_cities"
                    classNamePrefix="find_service_cities"
                    placeholder={"Select City...."}
                    onChange={this.handleChange}
                    defaultValue={this.state.city_name}
                    defaultInputValue={this.state.city_name}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "#036905",
                        primary: "transparent",
                      },
                    })}
                  /> */}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="form-group">
                  <label htmlFor="service_type_id">
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
                  <label htmlFor="price">
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
                    placeholder="20 km"
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
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
            >
              {this.state.markers.map((marker, i) => {
                return (
                  <AnyReactComponent
                  key={i}
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
           
            {this.state.filter_service_provider?.length > 0 && this.state.filter_service_provider?.map((item, i) => (
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
             {(this.state.filter_service_provider?.length < 1 && this.state.isFilterActive) && <div className="no-record">
              <h2 className="p-2 ">No Result Found</h2>
              </div>}
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
                        key={index}
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

          {(this.state.filter_service_provider?.length < 1 && !this.state.isFilterActive) &&
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
                      key={index}
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

export default withRouter(Serviceblock);
