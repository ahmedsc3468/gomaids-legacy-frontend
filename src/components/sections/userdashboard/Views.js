import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { faList } from "@fortawesome/free-solid-svg-icons";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import EventCalender from "./EventCalender";
import { Container } from "react-bootstrap";
import { styled } from "@mui/system";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Calendly from "./Calendly";
import * as React from "react";

const blue = {
    50: "#F0F7FF",
    100: "#C2E0FF",
    200: "#80BFFF",
    300: "#66B2FF",
    400: "#3399FF",
    500: "#10316B",
    600: "#0072E5",
    700: "#0059B2",
    800: "#004C99",
    900: "#003A75",
};

const Tab = styled(TabUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: transparent;
    width: 100%;
    padding: 12px 16px;
    margin: 6px 6px;
    border: none;
    border-radius: 5px;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${blue[400]};
    }

    &:focus {
        color: #fff;
        border-radius: 3px;
        outline: 2px solid ${blue[200]};
        outline-offset: 2px;
    }

    &.${tabUnstyledClasses.selected} {
        background-color: ${blue[50]};
        color: ${blue[600]};
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
    min-width: 100px;
    background-color: ${blue[500]};
    border-radius: 8px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
`;

export default function Views() {
    return (
        <>
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className="toggler-container mb-2">
                            <TabsUnstyled defaultValue={0} className="toggler">
                                <TabsList>
                                    <Tab className="tab">
                                        <FontAwesomeIcon
                                            icon={faList}
                                            className="listIcon-styling"
                                        />
                                        List View
                                    </Tab>
                                    <Tab>
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            className="listIcon-styling"
                                        />
                                        Calender View
                                    </Tab>
                                </TabsList>
                                <TabPanel value={0}>
                                    <Calendly />
                                </TabPanel>
                                <TabPanel value={1}>
                                    <EventCalender />
                                </TabPanel>
                            </TabsUnstyled>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
