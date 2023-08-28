import { Container } from "react-bootstrap";
import CalendlyHour from "./CalendlyHour";
import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Views from "./Views";

class Calendly extends Component {
    state = {};
    render() {
        return (
            <div>
                calendy
                {/* <Views />
                <Container>
                    <Row>
                        <Col sm={8} className="calendly-col-1">
                            <h6 className="headings">Set Your Weekly Hours</h6>
                            <CalendlyHour label="MON" />
                            <CalendlyHour label="TUE" />
                            <CalendlyHour label="WED" />
                            <CalendlyHour label="THU" />
                            <CalendlyHour label="FRI" />
                            <CalendlyHour label="SAT" />
                            <CalendlyHour label="SUN" />
                        </Col>
                        <Col sm={4} className="calendly-col-2">
                            <h6 className="headings">Add date overrides</h6>
                            <div className="border-setHours"></div>
                            <p className="msg-style">
                                Add dates when your availability changes from
                                weekly hours
                            </p>
                            <button className="add-overrideDate-btn">
                                Add a date override
                            </button>
                        </Col>
                    </Row>
                </Container> */}
            </div>
        );
    }
}

export default Calendly;
