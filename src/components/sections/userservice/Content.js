import axios from "axios";
import React, { Component } from "react";
import AuthService from "../../../services/auth.service";
import { Grid, Header, Segment, Form, Loader, Dimmer, Button } from "semantic-ui-react";
import Select from "react-select";
import config from "../../../config.json";
import authHeader from "../../../services/auth-header";
import Joi from "joi-browser";
import { Row, Col } from 'reactstrap'
import Switch from '@mui/material/Switch';
import { Dropdown } from 'react-bootstrap';
import swal from "sweetalert";
import CircularProgress from '@mui/material/CircularProgress';
import "../../../assets/MyCSS/userdashboard.css";
import { Modal } from "react-bootstrap";


class UserService extends Component {
    schema = {
        // service_type_id: Joi.array().items(Joi).required().label("Must Select atleast 1 Service"),
        description: Joi.string().required().label("Service Description"),
        experience: Joi.string().required().label("Service experience"),
        education: Joi.string().required().label("Service Education"),
        price: Joi.string().required().label("Service price per hour"),
        // currency: Joi.string().required().label("Service currency"),
    };
    constructor(props) {
        super(props);
        let user = AuthService.getCurrentUser();

        this.state = {

            user_id: user && user.id,
            servicesArr: [],
            generalServices: [],
            providerServices: [],
            // providerServices.length=3,
            allLanguage: [],
            allCurrency: [],
            allServiceType: [],
            serviceprovider_services: "",
            service_type_id: "",
            description: "",
            experience: "",
            education: "",
            auto_accept: "",
            selectedService: "",
            price: "",
            currency: "",
            modelPrice: "",
            modelExperience: "",
            modelEducation: "",
            modelDescription: "",
            filteredSelectedService: "",
            selectedLang: null,
            selectedServiceType: null,
            selectedCurrency: null,
            isPending: true,
            isOpen: false,
            auto_accept: true,
            modalServiceType:[],
            isClose: false,
            verifyCode:"",

        };

        this.source = axios.CancelToken.source()

    }

    openModal = () => {
         
        this.setState({ isOpen: true});      
        
        let {allServiceType, servicesArr, allCurrency } = this.state;
        
        // console.log(allServiceType)
        // console.log(servicesArr.length)
        // console.log("::: 87 :::: ", allCurrency)

        // debugger;
        // let intersection = allServiceType.filter(item => servicesArr.includes(item));
        
        let newlist = servicesArr.map(item=>item.label)
        let result = allServiceType.filter(item=> !newlist.includes(item.label))

        // this.setState({ modalServiceType: result })

        let oldarray = servicesArr.length;
        if (oldarray === 1){
            result=result.slice(0,2)
        }
        if (oldarray === 2){
            result=result.slice(0,1)
        }
        if (oldarray === 3){
            result=result.slice(0)
        }

        this.setState({ modalServiceType: result })
        let oldCurr = allCurrency;
        let currr =[];
        currr=oldCurr.slice(0,1)
        this.setState({ allCurrency: currr })

        this.setState({
            modelPrice: "",
            modelExperience: "",
            modelEducation: "",
            modelDescription: "",
        })
        


    }


    closeModal = () => this.setState({ isOpen: false });

    resetForm = async () => {

        // let user = AuthService.getCurrentUser();
        // const { data } = await axios.get(config.SERVER_URL + `/api/user/${user.id}/serviceprovider`
        //     , {
        //         headers: authHeader(),
        //         cancelToken: this.source.token
        //     }
        // )

        // console.log(data)


        // this.setState({ providerServices: data })
        // const { data: temp } = await axios
        //     .get(config.SERVER_URL + `/api/servicetype`, {
        //         headers: authHeader(),
        //         cancelToken: this.source.token
        //     }
        //     );

        this.setState({
            selectedService: "",
            description: "",
            experience: "",
            education: "",
            price: ""
        })
    }

    validate = () => {
        const { error } = Joi.validate(
            { service_type_id: this.state.service_type_id, description: this.state.description, experience: this.state.experience, education: this.state.education },
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

    onChange = (e) => {

        let Name = e.target.name;
        this.setState({ [Name]: e.target.value })
    }
    onChangeModal = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        this.setState({
            [name]: value,
        });
    }

    updateServiceSubmit = async (event) => {
        event.preventDefault()
        let that=this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: [
              'No, cancel it!',
              'Yes, I am sure!'
            ],
            dangerMode: true,
          }).then(async function(isConfirm) {
            localStorage.setItem('cs',1)
        // });
       var confirmation= localStorage.getItem('cs');
        if(confirmation == 1){
            const updateData = {
                service_type_id: that.state.service_type_id !== "" ?  that.state.service_type_id : that.state.servicesArr[0].value,
                user_id: that.state.user_id,
                experience: that.state.experience,
                description: that.state.description,
                education: that.state.education,
                price_per_hour:that.state.price,
                auto_accept: that.state.auto_accept
            };
            console.log("UPDATE DATA :::::", updateData);
            console.log('get type', typeof that.state.service_type_id);
            try {
                const updateService = await axios.put(config.SERVER_URL + `/api/serviceprovider/service/${updateData.service_type_id}`, updateData, {
                    headers: authHeader(),
            })
            

            await that.componentDidMount();

            that.resetForm();
            that.filterService(updateData.service_type_id);
            swal("Updated!", "Your Service Has Been Update!", "success")
            localStorage.removeItem('cs')
            }
            catch (error) {
                console.log(error)
            }

        }
    });

        // const proceed = window.confirm("Are you sure you want to Update")

        // if (proceed) {

        //     const updateData = {
        //         service_type_id: this.state.service_type_id,
        //         user_id: this.state.user_id,
        //         experience: this.state.experience,
        //         description: this.state.description,
        //         education: this.state.education,
        //         price_per_hour:this.state.price,
        //         auto_accept: this.state.auto_accept
        //     };

        //     try {
        //         const updateService = await axios.put(config.SERVER_URL + `/api/serviceprovider/service/${this.state.service_type_id}`, updateData, {
        //             headers: authHeader(),
        //     })
        //     // console.log(":::: Line 170 :::::::", updateData)
        //     // this.setState({selectedService: updateService})
        //     // console.log("::::: :::::", generalServices)


        //         // console.log(this.state.service_type_id);

        //     await this.componentDidMount();

        //     this.resetForm();
        //     this.filterService(this.state.service_type_id);
        //     swal("Updated!", "Your Service Has Been Update!", "success")
           



        //     // let user = AuthService.getCurrentUser();
        //     // const { data } = await axios.get(config.SERVER_URL + `/api/user/${user.id}/serviceprovider`
        //     //     , {
        //     //         headers: authHeader(),
        //     //         cancelToken: this.source.token
        //     //     }
        //     // )
        //     // console.log(":::: Line 181 :::::::", data)

        //     }
        //     catch (error) {
        //         console.log(error)
        //     }
        // }

    }
    deleteSelectedService = async (event, errors, values) => {
        event.preventDefault()
        const proceed = window.confirm("Are you sure you want to Delete")

        if (proceed) {

            try {
                const data = {
                    service_type_id: parseInt(this.state.service_type_id),
                };

                const deleteService = await axios.delete(config.SERVER_URL + `/api/serviceprovider/service/${this.state.service_type_id}`, {
                    headers: authHeader(),
                    data
                });

                swal("Delete!", "Your Service Has Been Delete !", "success")
                this.resetForm();
                await this.componentDidMount();
                // debugger;
                // this.filterService(this.state.service_type_id);
                
    
            }
            catch (error) {
                console.log(error)
            }
        }

    }

    addNewService = async (event, error, values) => {

        // let errors = this.validate();
      
        // if (errors) {
        //      console.log(errors)
        //     this.setState({ errors });
        //     return;
        // }
        event.preventDefault()
        const languageIds = this.state.selectedLang?.map(lang => ( lang?.value ))
        const service_types = {
            user_id: this.state.user_id,
            service_type_id: this.state.selectedServiceType,
            price_per_hour: this.state.modelPrice,
            experience: this.state.modelExperience,
            description: this.state.modelDescription,
            education: this.state.modelEducation,
            currency_id: this.state.selectedCurrency,
            language_ids: languageIds
        }

        try {
            // console.log("Add Another Service")
            // this.resetForm()
            const addService = await axios.post(config.SERVER_URL + `/api/serviceprovider/service`, service_types, {
                headers: authHeader(),
            });
            this.closeModal();
            
            this.resetForm();
            await this.componentDidMount();
            // debugger;
            // this.filterService(this.state.service_type_id);
            swal("SuccessFull!", "New Service Added Successfully!", "success")
        }
        catch (error) {
            console.log(error)
        }
    }



    // async componentDidUpdate(a) {
    //     console.log(a);
    //     // // Typical usage (don't forget to compare props):
    //     // if (this.props.userID !== prevProps.userID) {
    //     //   this.fetchData(this.props.userID);
    //     // }
    //   }
    async componentDidMount() {
        try {
            const lang = await axios.get(config.SERVER_URL + `/api/language?column=1&length=100`, {
                headers: authHeader(),
            });

            const currency = await axios.get(config.SERVER_URL + `/api/currency`, {
                headers: authHeader(),
            });

            let user = AuthService.getCurrentUser();
            const { data } = await axios.get(config.SERVER_URL + `/api/user/${user.id}/serviceprovider`
                , {
                    headers: authHeader(),
                    cancelToken: this.source.token
                }
            )

            // console.log(data)


            this.setState({ providerServices: data })
            const { data: temp } = await axios
                .get(config.SERVER_URL + `/api/servicetype`, {
                    headers: authHeader(),
                    cancelToken: this.source.token
                }
                );

            let sl = [...this.state.allLanguage];
            for (let i = 0; i < lang.data.data.data.length; i++) {
                sl.push({
                    label: lang.data.data.data[i].name,
                    value: "" + lang.data.data.data[i].id,

                })
            }
            this.setState({ allLanguage: sl })

            let ac = [...this.state.allCurrency];
            for (let i = 0; i < currency.data.data.data.length; i++) {
                ac.push({
                    label: currency.data.data.data[0].name,
                    value: "" + currency.data.data.data[0].id,

                })
            }
            this.setState({ allCurrency: ac })

            let st = [...this.state.allServiceType];
            for (let i = 0; i < temp.data.data.length; i++) {
                st.push({
                    label: temp.data.data[i].name,
                    value: "" + temp.data.data[i].id,

                })
            }
            this.setState({ allServiceType: st })

            let generalServices = [...this.state.generalServices];
            for (let i = 0; i < temp.data.data.length; i++) {
                generalServices.push({
                    label: temp.data.data[i].name,
                    value: "" + temp.data.data[i].id,

                })
            }
            this.setState({ generalServices })

            let servicesArr = [];
            // servicesArr.length=3;
            for (let i = 0; i < data.data.length; i++) {
                for (let item of data.data[i].serviceprovider_services) {
                    servicesArr.push({
                        label: item.service_type.name,
                        value: item.service_type.id,
                    })
                }
            }

            this.setState({ servicesArr: servicesArr })


            let description = this.state.description;
            description += data.data[0].serviceprovider_services[0].description;

            this.setState({ description })

            let experience = this.state.experience;
            experience += data.data[0].serviceprovider_services[0].experience;
            this.setState({ experience })

            let education = this.state.education;
            education += data.data[0].serviceprovider_services[0].education;
            this.setState({ education })

            let price = this.state.price;
            price += data.data[0].serviceprovider_services[0].service_type.service_price.price_per_hour;
            // console.log(":::: 404 ::",data.data)
            this.setState({ price })

            // let price = this.state.price;
            // price += data.data[0].user.service_price.price_per_hour;
            // this.setState({ price })

            // let currency = this.state.currency;
            // currency += data.data[0].user.service_price.currency.name;
            // this.setState({ currency })


            this.setState({ selectedService: this.state.servicesArr[0].label })
            this.setState({ auto_accept: parseInt(data?.data[0]?.auto_accept) })
            this.setState({ isPending: false })

        } catch (e) {
            console.log(e.message)
        }
    }

    componentWillUnmount() {
        if (this.source) {
            this.source.cancel('User Service Component got unmounted')
        }
    }

    servicesSelected = (e) => {
        const service_type_id = e;
        this.setState({ service_type_id });
    };
    switch = async (e) => {
        console.log(e.target.checked)

    //     swal({
    //         title: "Are you sure?",
    //         text: "You will not be able to recover this imaginary file!",
    //         icon: "warning",
    //         buttons: [
    //           'No, cancel it!',
    //           'Yes, I am sure!'
    //         ],
    //         dangerMode: true,
    //       }).then( function(isConfirm) {
    //         localStorage.setItem('uss',2)
    //     });
    //    var confirmation= localStorage.getItem('uss');
    //     if(confirmation==2){
    //         try {
    //             // this.setState({ auto_accept: e.target.checked })
    //             const toggleAutoAccept = this.state.auto_accept === 1 ? 0 : 1
    //             const res = await axios
    //                 .put(config.SERVER_URL + `/api/autoaccept/${this.state.user_id}`, {
    //                     auto_accept: toggleAutoAccept
    //                 }, {
    //                     headers: authHeader(),
    //                 })

    //             this.setState({ auto_accept: toggleAutoAccept })
    //             localStorage.removeItem('uss')
    //             swal("SuccessFull!", "AutoAccept Change Successfully!", "success")
    //         }
    //         catch (error) {
    //             console.log(error)
    //         }

    //     }

        // const proceed = window.confirm("Are you sure you want to Update")

        // if (proceed) {
            try {
                // this.setState({ auto_accept: e.target.checked })
                const toggleAutoAccept = this.state.auto_accept === 1 ? 0 : 1
                const res = await axios
                    .put(config.SERVER_URL + `/api/autoaccept/${this.state.user_id}`, {
                        auto_accept: toggleAutoAccept
                    }, {
                        headers: authHeader(),
                    })

                this.setState({ auto_accept: toggleAutoAccept })
            }
            catch (error) {
                console.log(error)
            // }
        }
    }

    

    filterService = (value) => {
        // console.log(value);
        const servicesArr = [...this.state.servicesArr];

        const filteredService = servicesArr.filter(s => s.value === value);
        console.log(":::: 556 ::::", filteredService)
        const temp = this.state.providerServices.data[0].serviceprovider_services.filter((s => s.service_type.name === filteredService[0].label))
console.log(":::: 558 ::::", temp)
        this.setState({ description: temp[0].description })
        this.setState({ education: temp[0].education })
        this.setState({ experience: temp[0].experience })
        this.setState({ selectedService: temp[0].service_type.name })
        this.setState({ price: temp[0].service_type.service_price.price_per_hour })
        this.setState({ service_type_id: temp[0].service_type.id })
        // this.setState({ currency: temp[0].service_type.currency })

    }
    render() {
        const label = { inputProps: { 'aria-label': 'Switch demo' } }
        return (
            <>{this.state.isPending ? <div className="text-center"> <CircularProgress color="success" /></div> :
                <Grid.Column
                    style={{
                        maxWidth: 450,
                        paddingTop: 10,
                        marginLeft: 150,
                        paddingBottom: 30,
                    }}
                    className="cust-user-service"
                >
                    <Form>

                        <Dropdown className="mb-3"
                        >
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                My Services
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                {this.state.servicesArr.map((service) => (
                                    <Dropdown.Item eventKey={service.value}
                                        onClick={(e) => { this.filterService(service.value) }}
                                    >{service.label}</Dropdown.Item>
                                ))}

                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Field>
                            <label>Service Type</label>
                            <input
                                name="service"
                                type="text"
                                placeholder="service"
                                value={this.state.selectedService ? this.state.selectedService : ""}
                                readOnly
                            />
                        </Form.Field>
                        
                        <Form.Field>
                            <label>Service Description</label>
                            <input
                                name="description"
                                type="text"
                                placeholder="Service Description"
                                value={this.state.description}
                                onChange={this.onChange}
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
                        

                        {/* {console.log(this.state.user_id)} */}
                        <Form.Field>
                            <label>Service Experience</label>
                            <input
                                name="experience"
                                type="text"
                                placeholder="Service Experience"
                                value={this.state.experience}
                                onChange={this.onChange}
                            />
                            {this.state.errors &&
                                this.state.errors.experience && (
                                    <div
                                        style={{
                                            color: "#DA1212",
                                            fontWeight: "500",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {this.state.errors.experience}
                                    </div>
                                )}
                        </Form.Field>
                        

                        <Form.Field>
                            <label>Service Education</label>
                            <input
                                name="education"
                                type="text"
                                placeholder="Service Education"
                                value={this.state.education}
                                onChange={this.onChange}
                            />
                            {this.state.errors &&
                                this.state.errors.education && (
                                    <div
                                        style={{
                                            color: "#DA1212",
                                            fontWeight: "500",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {this.state.errors.education}
                                    </div>
                                )}
                        </Form.Field>
                        

                        <Form.Field>
                            <label>Price Per hour</label>
                            <input
                                name="price"
                                type="text"
                                placeholder="Service Price Per Hour"
                                value={this.state.price}
                                onChange={this.onChange}
                            />
                            {this.state.errors &&
                                this.state.errors.price && (
                                    <div
                                        style={{
                                            color: "#DA1212",
                                            fontWeight: "500",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {this.state.errors.price}
                                    </div>
                                )}
                        </Form.Field>

                        {/*<Form.Field>
                            <label>Currency</label>
                            <input
                                name="currency"
                                type="text"
                                placeholder="Service Cost"
                                value={this.state.currency}
                                onChange={this.onChange}
                            />
                            {this.state.errors &&
                                this.state.errors.currency && (
                                    <div
                                        style={{
                                            color: "#DA1212",
                                            fontWeight: "500",
                                            fontSize: "0.95rem",
                                        }}
                                    >
                                        {this.state.errors.currency}
                                    </div>
                                )}

                        </Form.Field> */}

                        <Row>
                            <Col md={8} className="mt-0 mb-0">
                                <label>Auto Accept My Requests</label>
                                <Switch {...label}
                                    checked={parseInt(this.state.auto_accept) === 1 ? true : false}
                                    value={this.state.auto_accept}
                                    onChange={this.switch}
                                />
                            </Col>
                        </Row>
                        {this.state.selectedService !== '' && <button
                            type="submit"
                            className="ui inverted green button another_service_btn"
                            onClick={(e) => this.updateServiceSubmit(e)}> Update Service
                        </button>}
                        {(this.state.providerServices?.data[0]?.serviceprovider_services?.length < this.state.allServiceType?.length && <button
                            type="submit"
                            className="ui inverted green button another_service_btn"
                            onClick={this.openModal}
                        >
                            Add New Service
                        </button>)}
                        {this.state.selectedService !== '' && <button
                            type="submit"
                            className="ui inverted red button delete_service_btn"
                            onClick={this.deleteSelectedService}
                        >
                            Delete Service
                        </button>
                        }

                    </Form>
                </Grid.Column>}
                <Modal className=".modal-center-serviceprovider"
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                >
                    <Modal.Header>
                        <Modal.Title>Fill Details Related To Service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>

                            <Form.Field>

                                <label>Service Type</label>
                                <Select
                                    id='model_service_type'
                                    name='model_service_type'
                                    className='react-select'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    options={this.state.modalServiceType}
                                    onChange={(e) => {
                                        this.setState({ selectedServiceType: e.value })
                                    }}>
                                </Select>

                            </Form.Field>
                            <Form.Field>
                                <label>Experience (In Years)</label>
                                <input
                                    name="modelExperience"
                                    type="number"
                                    min='0'
                                    placeholder="Experience (In Years)"
                                    value={this.state.modelExperience}
                                    onChange={this.onChangeModal} />
                            </Form.Field>

                            <Form.Field>
                                <label>Education</label>
                                <input
                                    name="modelEducation"
                                    type="text"
                                    min='0'
                                    placeholder="Education"
                                    value={this.state.modelEducation}
                                    onChange={this.onChangeModal} />
                            </Form.Field>

                            <Form.Field>
                                <label>Price Per hour</label>
                                <input
                                    name="modelPrice"
                                    type="number"
                                    min='0'
                                    placeholder="price per hour"
                                    value={this.state.modelPrice}
                                    onChange={this.onChangeModal} />
                            </Form.Field>

                            <Form.Field>
                                <label>Language</label>
                                <Select
                                    id='model_lang_id'
                                    name='model_lang_id'
                                    className='react-select'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    isMulti
                                    options={this.state.allLanguage}
                                    onChange={(e) => {
                                        this.setState({ selectedLang: e })
                                    }}>
                                </Select>
                            </Form.Field>

                            <Form.Field>
                                <label>Currency</label>
                                <Select
                                    id='model_currency_id'
                                    name='model_currency_id'
                                    className='react-select'
                                    classNamePrefix='select'
                                    isClearable={false}
                                    options={this.state.allCurrency}
                                    onChange={(e) => {
                                        // console.log(this.state.allCurrency)
                                        this.setState({ selectedCurrency: e.value })
                                    }}>
                                </Select>
                            </Form.Field>

                            <Form.Field>
                                <label>Description</label>
                                <textarea
                                    name="modelDescription"
                                    rows="3" cols="50"
                                    placeholder="description"
                                    value={this.state.modelDescription}
                                    onChange={this.onChangeModal}
                                />
                            </Form.Field>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={this.closeModal}
                        >
                            Cancel
                        </Button>
                        <Button className="ui inverted green button another_service_btn"
                            onClick={this.addNewService}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>

                </Modal>
            </>
        );
    }
}
export default UserService;