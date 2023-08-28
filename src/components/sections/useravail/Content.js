import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Header, Segment, Form, Button } from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";

class UserAvail extends Component {
    schema = {
        timeForm: Joi.string().required().label("Starting Time"),
        timeTo: Joi.string().required().label("Ending Time"),
    };
    constructor (props)
    {
        super(props);

        let user = AuthService.getCurrentUser();
        console.log(user)

        this.state = {

            user_id:user.id,
            timeForm:"",
            timeTo:"",
            // day_id:user.day_id,
            // slot_id:user.slot_id,
            // slot_start_time: values.slot_start_time,
            // slot_end_time: values.slot_end_time,
            // name:values.name

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

    updateDay_Id(e){
        this.setState({
            day_id : e.target.value
        });
    }

    updateSlot_Id(e){
        this.setState({
            slot_id : e.target.value
        });
    }

    updateSlot_Start_Time(e){
        this.setState({
            slot_start_time : e.target.value
        });
    }

    updateSlot_End_Time(e){
        this.setState({
            slot_end_time : e.target.value
        });
    }

    updateName(e){
        this.setState({
            name : e.target.value
        });
    }

        // componentDidMount()
        // {
        //     axios
        //     .get(config.SERVER_URL + `api/user/profile`, {
        //         headers: authHeader()
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //     });
        // }

    render() {
        return(
            <Grid.Column
            style={{
                maxWidth: 450,
                paddingTop: 10,
                marginLeft: 150,
                paddingBottom: 30,
            }}
            >
            <Form>
                {/* <Segment> */}

                <Form.Field>
                    <label>Hourly Slot</label>
                    <div class="row">
                        <div class="form-group col-md-6">
                        <select
                            name="slot_start_time"
                            type="select"
                            placeholder="Start Time"
                            value={this.state.slot_start_time}
                            onChange={this.updateSlot_Start_Time}
                            // defaultValue={values.slot_start_time}
                        >
                        <option> Select Start Time</option>
                        </select>
                        {this.state.errors &&
                                            this.state.errors.timeForm && (
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

                    <div class="form-group col-md-6">
                    <select
                        name="slot_end_time"
                        type="select"
                        placeholder="End Time"
                        value={this.state.slot_end_time}
                        onChange={this.updateSlot_End_Time}
                        // defaultValue={values.slot_end_time}
                    >
                    <option> Select End Time</option>
                    </select>
                    {this.state.errors &&
                                            this.state.errors.timeForm && (
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
                    </div>
                </Form.Field>

                <Form.Field>
                    <label>Available Days</label>
                    <input
                        name="name"
                        type="checkbox"
                        placeholder="Available Days"
                        value={this.state.name}
                        onChange={this.updateName}
                        // defaultValue={values.name}
                    />
                </Form.Field>
                {/* </Segment> */}
                <button
                        type="submit"
                        className="btn btn-black btn-block mt-20"
                        onClick={(e)=>this.submit(e)}> Update Availability
                </button>

            </Form>
            </Grid.Column>
        );
    }
}
export default UserAvail;
