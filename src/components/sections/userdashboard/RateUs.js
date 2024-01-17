import { Button, Modal, Form } from "react-bootstrap";
//import StarRating from 'react-bootstrap-star-rating';
import { useState } from "react";
import * as React from "react";
// import RateUs from "./Rate";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
// import Typography from '@mui/material/Typography';
import swal from "sweetalert";
import axios from "axios";
import { useParams } from "react-router";
import config from "../../../config.json";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import "../../../assets/css/style.css";
// import { components } from "react-select";

function Rate() {
  const { order_id } = useParams();
  const [show, setShow] = useState(false);
  const [value, setValue] = React.useState();
  const [tip, settip] = useState(0);

  // const [rate, setRate] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [feedbackMessage, setFeedbackMessage] = useState({
    fbm: "",
  });
  var orderstate = localStorage.getItem("orderstate");
  if (orderstate === "complete") {
    handleShow();
  }
  localStorage.removeItem("orderstate");
  // const getRateValue = async () => {
  //   try {
  //     const order = await axios.get(config.SERVER_URL + `/api/order/${order_id}`,
  //       {
  //         headers: authHeader(),
  //       });
  //     setRate({ rate: order.data.data.rating })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  // refreshPage = () => window.location.reload();

  const addRating = async (event, errors, values) => {
    event.preventDefault();
    const user = AuthService.getCurrentUser();
    // console.log("USERRRRRRRRRR::::::", user.role.name)

    // const temp = {
    //   rating: parseInt(value),
    //   service_provider_feedback: feedbackMessage.fbm
    // }
    // if (feedbackMessage.fbm.trim() !== ''){
    if (user.role.name === "service_provider") {
      const temp = {
        sp_rating: parseInt(value),
        service_provider_feedback: feedbackMessage.fbm,
      };
      try {
        // console.log("RateUs 45", temp)
        // }
        const response = await axios.put(
          config.SERVER_URL + `/api/order/${order_id}`,
          temp,
          { headers: authHeader() }
        );
        swal("SuccessFully!", "Your Rating Has Been Save!", "success");
        console.log("after all 59", response);
        window.location.reload();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      if (user.role.name === "service_taker") {
        const temp = {
          rating: parseInt(value),
          service_taker_feedback: feedbackMessage.fbm,
        };
        const tippay = {
          tip: tip,
          user_id: user.id,
          order_id: order_id,
        };
        try {
          if (tip > 0) {
            const tippayment = await axios.post(
              config.SERVER_URL + `/api/tip`,
              tippay,
              { headers: authHeader() }
            );
            if (tippayment.data.success) {
              await axios.put(
                config.SERVER_URL + `/api/order/${order_id}`,
                temp,
                { headers: authHeader() }
              );
              swal(
                "SuccessFully!",
                "Your Rating and tip payment Has Been Succesfull!",
                "success"
              );
              // console.log("after all 74", response)
              window.location.reload();
              handleClose();
            } else {
              swal("Payment Failed", "tip payment Failed!", "danger");
            }
          } else {
            await axios.put(
              config.SERVER_URL + `/api/order/${order_id}`,
              temp,
              { headers: authHeader() }
            );
            swal("SuccessFully!", "Your Rating Has Been Save!", "success");
            // console.log("after all 74", response)
            window.location.reload();
            handleClose();
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    // }
    //   else{
    //     console.log("EMPTY FEEDBACK")
    //   }
  };
  function handleFeedbackMessage(e) {
    const newdata = { ...feedbackMessage };
    // console.log(newdata)
    newdata[e.target.id] = e.target.value;
    setFeedbackMessage(newdata);
    // console.log(newdata)
  }
  function handletip(e) {
    var newdata = { tip };
    // console.log(newdata)
    newdata = e.target.value;
    if (newdata < 0 || newdata > 100) {
      settip(0);
    } else {
      settip(newdata);
    }
    // console.log(newdata)
  }
  // useEffect(() => {
  //   getRateValue()
  // }, [])
  var userr = AuthService.getCurrentUser().role.name;
  console.log(userr);
  return (
    <>
      <Button
        className="ui button rate_button"
        onClick={handleShow}
        style={{ borderRadius: "2px" }}
      >
        Rate
      </Button>

      <Modal className="modal-center" show={show}>
        {/* {rate.length > null ? <> */}
        <Modal.Header>
          <Modal.Title>Are you satisfied</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <RateUs /> */}
          <Box
            sx={{
              "& > simple-controlled": { mt: 2 },
            }}
          >
            {/* <Typography component="legend"> */}
            <p> Give us a quick rating so we know if you like it ?</p>
            {/* </Typography> */}
            <Rating
              // className="stars-rate"
              required
              name="simple-controlled"
              value={value}
              size="large"
              onChange={(e, newValue) => {
                setValue(newValue);
                // console.log("::: 21 ::::", newValue)
              }}
            />
          </Box>

          <Form>
            <Form.Group
              hidden={userr === "service_provider"}
              className="mb-3"
              // controlId="exampleForm.ControlTextarea2"
            >
              <Form.Label>Write Your FeedBack</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="fbm"
                id="fbm"
                value={feedbackMessage.fbm}
                onChange={(e) => handleFeedbackMessage(e)}
                required
              />

              <Form.Label>Enter the tip amount</Form.Label>
              <Form.Control
                name="tip"
                min="0"
                type="number"
                value={tip}
                onChange={(e) => handletip(e)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="ui button add_feedback" onClick={addRating}>
            Submit
          </Button>
        </Modal.Footer>
        {/* </> : <> */}
        {/* <Modal.Header className='justify-content-center'>
            <Modal.Title> Already give FeedBack</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-right py-2'> */}
        {/* {this.state.feedbackStatus && <Alert className='d-inline py-75 px-2 mr-1' color={this.state.feedbackStatus.color} >{this.state.feedbackStatus.body}</Alert>} */}
        {/* <Button className="btn-secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Body> */}
        {/* </>} */}
      </Modal>
    </>
  );
}

export default Rate;
