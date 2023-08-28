import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Header, Segment, Form, Button, Dimmer, Loader, Label } from "semantic-ui-react";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";
import swal from 'sweetalert';
import Select from "react-select";
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom";


class Dispute extends Component {
    schema = {
        username: Joi.string().required().label("User Name"),
        title: Joi.string().required().label(" Dispute Title"),
        description: Joi.string().required().label("Dispute Description"),
    };

    constructor(props) {
        super(props);
        let user = AuthService.getCurrentUser();

        this.state = {
            role: user.role[0],
            user_id: user.id,
            username: user.username,
            order_key: [],
            order_key: "",
            title: "",
            description: "",
            status: 0,
            isPending: true,
            orderkeyerrors:""
        };

        this.source = axios.CancelToken.source()
    }
    validate = () => {
        const { error } = Joi.validate(
            {
                username: this.state.username,
                title: this.state.title,
                description: this.state.description,
            },
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

    resetForm = async () => {

        this.setState({
            title: "",
            description: "",
            status: ""
        })
    }
    async componentDidMount() {
        try {


            const userSession = JSON.parse(localStorage.getItem("user"));
            let user = AuthService.getCurrentUser();

            this.setState({ user: user })
            const { data } = await axios.get(config.SERVER_URL + `/api/user/${user.id}`,
                {
                    headers: authHeader(),
                    cancelToken: this.source.token
                }
            );
            console.log(":::::::: Dispute Page USER data :::::::", data)
            // console.log(":::::::: Dispute Service-Provider :::::::", data.data.service_providers)
            const allOrders  = await axios.post(config.SERVER_URL + `/api/orders_user/${this.state.user_id}`,
                {
                    headers: authHeader(),
                }
            );
            console.log(":::::::: All Orders According To User Line 93 :::::::", allOrders.data.data.data)
            let today = new Date().toISOString().slice(0, 10)

            console.log("today",today)
            let ok = [...this.state.order_key];
            for (let i = 0; i < allOrders.data?.data?.data?.length; i++) {
                const date = new Date( allOrders.data?.data?.data[i].updated_at).toISOString().slice(0, 10);
                console.log("created",date);
                {date===today?
                    ok.push({
                        label: allOrders.data?.data?.data[i].order_key,
                        value: "" + allOrders.data?.data?.data[i].id,
                    }):<></>
                }
            }
            // console.log(":::::::: All Orders According To User After Map :::::::", ok)

            this.setState({ order_key: ok })


            this.setState({ username: this.state.username })
        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillUnmount() {
        this.source.cancel('Dispute Component is unmounted')
    }

    handleInputChange = (event) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        this.setState({
            [name]: value,
        });
    }
    onChangeSelectedFields = (e) => {

        const value = e.value;
        const label = e.label;
        this.setState({
            selectedOrderId: e,
        });

    }
    async submit()
     {
        let errors = this.validate();
      
        if (errors) {
             console.log(errors)
            this.setState({ errors });
            return;
        }

//         if (!parseInt(this.state.selectedOrderId?.value))
//         {
// this.setState({orderkeyerrors:"select a key"})
// console.log(this.state.orderkeyerrors)
//         }
       
        const tempData = {
            user_id: this.state.user_id,
            order_id: parseInt(this.state.selectedOrderId.value),
            title: this.state.title,
            description: this.state.description,
            status:this.state.status
        }
        
console.log('::::: TempData ::::', tempData)
        try {
            const update = await axios.post(config.SERVER_URL + `/api/dispute`, tempData,
                {
                    headers: authHeader(),
                })
                this.resetForm();
            swal("SuccessFull!", "Your Dispute Has Been Sent SuccessFully!", "success")
        }
        catch (errors) {
            console.log(errors)
        }

    }
    render() {
        return (
            <> <Grid.Column
                style={{

                }}
                className='cust-userdashboard-dispute'
            >
                <Form>
                    <span className="text-danger">{this.state.error}</span>
                    <div className="form-row">
                        <div className="form-group col-md-6 cusMb">
                            <Form.Field>
                                <label>Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="User Name"
                                    value={this.state.username}
                                    readOnly
                                />
                                {this.state.errors &&
                                    this.state.errors.username && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.username}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                        <div className="form-group col-md-6">
                            <Form.Field>
                                <label>Order Key</label>
                                <Select
                                    id='order_key'
                                    name='order_key'
                                    className='react-select'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    options={this.state.order_key}
                                onChange={(e) => {
                                    console.log("selected order_id",e)
                                    this.onChangeSelectedFields(e)
                                }}
                                >
                                </Select>
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <Form.Field>
                                <label>Dispute Title</label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                />
                                {this.state.errors &&
                                    this.state.errors.title && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.title}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col">
                            <Form.Field>
                                <label> Dispute Description</label>

                                <input
                                    name="description"
                                    type="text"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}

                                />
                                {this.state.errors &&
                                    this.state.errors.description && (
                                        <div
                                            style={{
                                                color: "#DA1212",
                                                fontWeight: "500",
                                                fontSize: "0.95rem",
                                            }}
                                        >
                                            {this.state.errors.description}
                                        </div>
                                    )}
                            </Form.Field>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-black btn-block mt-20"
                        onClick={(event) => this.submit(event)}
                    >
                        Submit
                    </button>
                    {/* <Button variant="primary"> 
                    <Link to={`#`}> View Dispute </Link>
                    </Button> */}
                </Form>

            </Grid.Column>
            </>
        );
    }
}
export default Dispute;