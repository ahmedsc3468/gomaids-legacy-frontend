import { Container } from "react-bootstrap";
import config from "../../../config.json";
import CalendlyHour from "./CalendlyHour";
import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";


class Calendly extends Component {
    state = {};



    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={8} className="calendly-col-1 mb-2">
                        <h6 className="headings">Set Your Weekly Hours</h6>
                        <CalendlyHour />
                    </Col>
                    {/* <Col sm={4} className="calendly-col-2">
                        <h6 className="headings">Add date overrides</h6>
                        <div className="border-setHours"></div>
                        <p className="msg-style">
                            Add dates when your availability changes from weekly
                            hours
                        </p>
                        <button className="add-overrideDate-btn">
                            Add a date override
                        </button>
                    </Col> */}
                </Row>
            </Container>
        );
    }
}

export default Calendly;
