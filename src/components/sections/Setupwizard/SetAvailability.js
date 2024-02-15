import React, { Component } from "react";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import Switch from "@mui/material/Switch";
import axios from "axios";
import Joi from "joi-browser";
import swal from "sweetalert";

class SetAvailability extends Component {
  schema = {
    timeForm: Joi.string().required().label("Starting Time"),
    timeTo: Joi.string().required().label("Ending Time"),
  };
  constructor(props) {
    // console.log(props);
    super(props);
    let user = AuthService.getCurrentUser();
    this.state = {
      user_id: user ? user.id : "",
      time: [
        "12:00AM",
        "1:00AM",
        "2:00AM",
        "3:00AM",
        "4:00AM",
        "5:00AM",
        "6:00AM",
        "7:00AM",
        "8:00AM",
        "9:00AM",
        "10:00AM",
        "11:00AM",
        "12:00PM",
        "1:00PM",
        "2:00PM",
        "3:00PM",
        "4:00PM",
        "5:00PM",
        "6:00PM",
        "7:00PM",
        "8:00PM",
        "9:00PM",
        "10:00PM",
        "11:00PM",
      ],
      dayAvailabilities: [],
      choosenDays: [],
      ManageDaysAvailable: [
        {
          status: 1,
          name: "Monday",
        },
        {
          status: 1,
          name: "Tuesday",
        },
        {
          status: 1,
          name: "Wednesday",
        },
        {
          status: 1,
          name: "Thursday",
        },
        {
          status: 1,
          name: "Friday",
        },
        {
          status: 0,
          name: "Saturday",
        },
        {
          status: 0,
          name: "Sunday",
        },
      ],
      timeForm: "",
      timeTo: "",
      errors: [],
      noChoosenDay: "",
      makeTimeDropDownRedClass: "",
      hasSelectedDay: true,
    };
  }

  validate = () => {
    const { error } = Joi.validate(
      { timeForm: this.state.timeForm, timeTo: this.state.timeTo },
      this.schema,
      {
        abortEarly: false,
      }
    );
    if (!error) return null;
    let errors = {};
    if (error) {
      for (let item of error.details) {
        errors[item.path] = item.message;
      }
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleChangeForCheckBox = (e) => {
    const days = [...this.state.ManageDaysAvailable];

    const index = days.findIndex((day) => day.name === e.currentTarget.name);
    days[index].status = days[index].status === 1 ? 0 : 1;

    let hasSelectedDay = this.state.ManageDaysAvailable.some(
      (day) => day.status === 1
    );
    if (hasSelectedDay)
      this.setState({ ManageDaysAvailable: days, hasSelectedDay: true });
    else if (!hasSelectedDay)
      this.setState({
        ManageDaysAvailable: days,
        hasSelectedDay: false,
      });
    else this.setState({ ManageDaysAvailable: days });
  };

  validateProperty = ({ value, name }) => {
    let dataProperty = { [name]: value };
    let subSchema = { [name]: this.schema[name] };

    const { error } = Joi.validate(dataProperty, subSchema);

    return error ? error.details[0].message : null;
  };

  onFromTimeChange = (e) => {
    const errorMessage = this.validateProperty(e.currentTarget);

    const errors = { ...this.state.errors };
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else {
      delete errors[e.currentTarget.name];
      this.setState({ errors, TimeFromclass: "" });
    }
    this.setState({ timeForm: e.target.value });
  };

  onToTimeChange = (e) => {
    const errorMessage = this.validateProperty(e.currentTarget);
    const errors = { ...this.state.errors };
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else {
      delete errors[e.currentTarget.name];
      this.setState({ errors, TimeToclass: "" });
    }
    delete errors[e.currentTarget.name];
    this.setState({ timeTo: e.target.value });
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    //config.SERVER_URL + `api/weekdays`
    const data = await axios.get(config.SERVER_URL + `/api/weekdays`, {
      headers: authHeader(),
    });

    const availabilities = data.data.data.data;
    availabilities.sort((a, b) => (a.id > b.id ? 1 : -1));

    this.setState({ dayAvailabilities: availabilities });
  }

  continue = async () => {
    let errors = this.validate();

    if (errors && errors.timeForm) this.setState({ TimeFromclass: "time" });

    if (errors && errors.timeTo) this.setState({ TimeToclass: "time" });

    // if (errors) this.setState({ errors });

    if (!this.state.hasSelectedDay)
      this.setState({ noChoosenDay: "Please Choose a day" });

    if (errors || !this.state.hasSelectedDay) return;
    const slot = {
      slot_start_time: this.state.timeForm,
      slot_end_time: this.state.timeTo,
    };
    // console.log("available days:", this.state.dayAvailabilities)
    // console.log("ManageDaysAvailable days:", this.state.ManageDaysAvailable)
    // debugger

    // const daysChosen = this.state.dayAvailabilities.filter((day) =>
    //     this.state.ManageDaysAvailable.some(
    //         (chosenDays) =>
    //             parseInt(day.status) === chosenDays.status &&
    //             parseInt(day.status) === 1 &&
    //             chosenDays.status === 1
    //     )
    // );

    let daysChosen = [];
    this.state.dayAvailabilities.forEach((day) => {
      if (
        this.state.ManageDaysAvailable.some(
          (obj) => obj.name == day.name && obj.status == 1
        ) == true
      ) {
        console.log({ id: day.id, status: day.status });
        daysChosen.push({ id: day.id, status: day.status });
      }
    });

    // console.log("daychose",daysChosen)
    //         let listarr  = []
    //         this.state.dayAvailabilities.forEach((day) =>
    //     {if (this.state.ManageDaysAvailable.some(obj=>obj.status == '1') == true)
    //       {
    //           listarr.push({'id':day.id})
    //           }
    // }

    //  );

    try {
      const { data } = await axios.post(
        config.SERVER_URL + `/api/hourlyslot`,
        slot,
        {
          headers: authHeader(),
        }
      );

      const chosenDay = {
        chosenDay: daysChosen,
        user_id: this.state.user_id,
        slot_id: data.data.id,
      };

      console.log("chosenDay !!!!!!", chosenDay);
      await axios.post(config.SERVER_URL + `/api/workingslot`, chosenDay, {
        headers: authHeader(),
      });
      swal("Successful!", "All Information Added Successfully!", "success");

      window.location = "/";
    } catch (ex) {
      console.log(ex);
    }
  };

  CheckedOrNot = (weekDay) => {
    const SingleDayObj = this.state.ManageDaysAvailable.filter(
      (day) => day.name === weekDay
    );

    if (SingleDayObj[0].status === 1) return true;
    else return false;
  };

  render() {
    return (
      <article style={{}}>
        <Grid.Column className="setupwizard-setavailability-details">
          <article
            style={{
              border: "2px solid #F0F0F0",
              padding: "1rem 2rem",
              borderRadius: "5px",
              paddingBottom: "3.8rem",
            }}
          >
            <Header
              textAlign="center"
              className="setupwizard-setavailability-details-header"
            >
              <h2>Set Your Availability</h2>
            </Header>
            <Form
              onSubmit={this.saveAndContinue}
              ref={(e) => {
                this.form = e;
              }}
            >
              <h5 style={{ display: "flex", marginLeft: "1rem" }}>
                Available Hours
              </h5>

              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-6 cust-setavailibility-time-input">
                    <select
                      type="select"
                      className={`form-control ${this.state.TimeFromclass}`}
                      name="timeForm"
                      onChange={this.onFromTimeChange}
                      // style={{
                      //     border: "1.5px solid #DA1212",
                      // }}
                      // value={this.state.service_type_id}
                      // onChange={this.onChangeServiceType}
                    >
                      <option>-- Select Start Time --</option>
                      {this.state.time.map((data) => (
                        <option value={data} key={data}>
                          {data}
                        </option>
                      ))}
                    </select>
                    {this.state.errors && this.state.errors.timeForm && (
                      <div
                        style={{
                          color: "#DA1212",
                          fontWeight: "500",
                          fontSize: "0.95rem",
                        }}
                      >
                        {this.state.errors.timeForm}
                      </div>
                    )}
                  </div>

                  <div className="col">
                    <select
                      type="select"
                      className={`form-control ${this.state.TimeToclass}`}
                      name="timeTo"
                      onChange={this.onToTimeChange}
                      // value={this.state.service_type_id}
                      // onChange={this.onChangeServiceType}
                    >
                      <option>-- Select End Time --</option>
                      {this.state.time.map((data) => (
                        <option value={data} key={data}>
                          {data}
                        </option>
                      ))}
                    </select>

                    {this.state.errors && this.state.errors.timeTo && (
                      <div
                        style={{
                          color: "#DA1212",
                          fontWeight: "500",
                          fontSize: "0.95rem",
                        }}
                      >
                        {this.state.errors.timeTo}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <article
                className="container setupwizard-setavailibility-availibletime"
                style={{
                  marginTop: "3rem",
                  padding: "1rem 1rem",
                  border: "2px solid #F0F0F0",
                  borderRadius: "5px",
                }}
              >
                <div className="container">
                  <div className="row">
                    {this.state.dayAvailabilities.map((day) => (
                      <div className="col-sm" key={day.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={day.name}
                          value={day.id}
                          checked={this.CheckedOrNot(day.name)}
                          id={day.id}
                          onChange={this.handleChangeForCheckBox}
                        />
                        <label className="form-check-label" htmlFor={day.id}>
                          {day.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  {/* {this.state.noChoosenDay && (
                                        <div className="alert alert-danger">
                                            {this.state.noChoosenDay}
                                        </div>
                                    )} */}
                </div>
              </article>
              {!this.state.hasSelectedDay && (
                <div
                  style={{
                    color: "#DA1212",
                    fontWeight: "500",
                    fontSize: "0.95rem",
                  }}
                >
                  {this.state.noChoosenDay}
                </div>
              )}

              {/* <Button onClick={this.back}>Back</Button>
                        <Button onClick={this.saveAndContinue}>
                            Save And Continue
                        </Button> */}
            </Form>
          </article>
        </Grid.Column>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            className="btn btn-primary setavailiblity-continue-btn"
            style={{
              borderRadius: "18px",
              width: "8rem",
            }}
            onClick={this.continue}
          >
            Continue
          </button>
        </div>
      </article>
    );
  }
}

export default SetAvailability;
