import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { faClone } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
// import { DropdownButton } from "react-bootstrap";
// import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import { Dropdown } from "react-bootstrap";
import React, { Component } from "react";
import config from "../../../config.json";
import { Form } from "react-bootstrap";
// import { Alert } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

class CalendlyHour extends Component {
  user = AuthService.getCurrentUser();
  source = axios.CancelToken.source();
  state = {
    days: [
      {
        _id: "1",
        slotID: "1",
        name: "MON",
        name_: "Monday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
      {
        _id: "2",
        slotID: "2",
        name: "TUE",
        name_: "Tuesday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
      {
        _id: "3",
        slotID: "3",
        name: "WED",
        name_: "Wednesday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
      {
        _id: "4",
        slotID: "4",
        name: "THU",
        name_: "Friday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
      {
        _id: "5",
        slotID: "5",
        name: "FRI",
        name_: "Friday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
      {
        _id: "6",
        slotID: "6",
        name: "SAT",
        name_: "Saturday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
      {
        _id: "7",
        slotID: "7",
        name: "SUN",
        name_: "Sunday",
        schedule: "",
        unavailable: true,
        checked: false,
        status: 0,
        from: "",
        to: "",
      },
    ],
    animation: "",
    hours: [
      { value: "12:00 AM", label: "12:00 AM" },
      { value: "1:00 AM", label: "1:00 AM" },
      { value: "2:00 AM", label: "2:00 AM" },
      { value: "3:00 AM", label: "3:00 AM" },
      { value: "4:00 AM", label: "4:00 AM" },
      { value: "5:00 AM", label: "5:00 AM" },
      { value: "6:00 AM", label: "6:00 AM" },
      { value: "7:00 AM", label: "7:00 AM" },
      { value: "8:00 AM", label: "8:00 AM" },
      { value: "9:00 AM", label: "9:00 AM" },
      { value: "10:00 AM", label: "10:00 AM" },
      { value: "11:00 AM", label: "11:00 AM" },
      { value: "12:00 PM", label: "12:00 PM" },
      { value: "1:00 PM", label: "1:00 PM" },
      { value: "2:00 PM", label: "2:00 PM" },
      { value: "3:00 PM", label: "3:00 PM" },
      { value: "5:00 PM", label: "5:00 PM" },
      { value: "6:00 PM", label: "6:00 PM" },
      { value: "7:00 PM", label: "7:00 PM" },
      { value: "8:00 PM", label: "8:00 PM" },
      { value: "9:00 PM", label: "9:00 PM" },
      { value: "10:00 PM", label: "10:00 PM" },
      { value: "11:00 PM", label: "11:00 PM" },
    ],
    hoursPerDay: {
      monday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
      tuesday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
      wednesday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
      thursday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
      friday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
      saturday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
      sunday: [
        { value: "12:00 AM", label: "12:00 AM" },
        { value: "1:00 AM", label: "1:00 AM" },
        { value: "2:00 AM", label: "2:00 AM" },
        { value: "3:00 AM", label: "3:00 AM" },
        { value: "4:00 AM", label: "4:00 AM" },
        { value: "5:00 AM", label: "5:00 AM" },
        { value: "6:00 AM", label: "6:00 AM" },
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "5:00 PM", label: "5:00 PM" },
        { value: "6:00 PM", label: "6:00 PM" },
        { value: "7:00 PM", label: "7:00 PM" },
        { value: "8:00 PM", label: "8:00 PM" },
        { value: "9:00 PM", label: "9:00 PM" },
        { value: "10:00 PM", label: "10:00 PM" },
        { value: "11:00 PM", label: "11:00 PM" },
      ],
    },
    currentUserSlots: [],
    dayCount: 0,
    successMessage: "",
    errors: {},
    user: AuthService.getCurrentUser(),
    isPending: true,
  };

  unMountMessage = () => {
    setTimeout(() => {
      this.setState({ successMessage: "" });
    }, 1000);
  };

  refreshPage = async () => {
    const { data: slots } = await axios.get(
      config.SERVER_URL + `/api/user/${this.user.id}/workingslot`
    );

    let currentUserSlots = [];
    slots.data.Monday.length > 0 && (slots.data.Monday[0].day = "MON");

    slots.data.Tuesday.length > 0 && (slots.data.Tuesday[0].day = "TUE");

    slots.data.Wednesday.length > 0 && (slots.data.Wednesday[0].day = "WED");

    slots.data.Thursday.length > 0 && (slots.data.Thursday[0].day = "THU");

    slots.data.Friday.length > 0 && (slots.data.Friday[0].day = "FRI");

    slots.data.Saturday.length > 0 && (slots.data.Saturday[0].day = "SAT");

    slots.data.Sunday.length > 0 && (slots.data.Sunday[0].day = "SUN");

    currentUserSlots.push(
      slots.data.Monday.length > 0
        ? slots.data.Monday
        : [{ day: "MON", unavailable: true }]
    );
    currentUserSlots.push(
      slots.data.Tuesday.length > 0
        ? slots.data.Tuesday
        : [
            {
              day: "TUE",
              unavailable: true,
            },
          ]
    );
    currentUserSlots.push(
      slots.data.Wednesday.length > 0
        ? slots.data.Wednesday
        : [
            {
              day: "WED",
              unavailable: true,
            },
          ]
    );
    currentUserSlots.push(
      slots.data.Thursday.length > 0
        ? slots.data.Thursday
        : [
            {
              day: "THU",
              unavailable: true,
            },
          ]
    );
    currentUserSlots.push(
      slots.data.Friday.length > 0
        ? slots.data.Friday
        : [
            {
              day: "FRI",
              unavailable: true,
            },
          ]
    );
    currentUserSlots.push(
      slots.data.Saturday.length > 0
        ? slots.data.Saturday
        : [
            {
              day: "SAT",
              unavailable: true,
            },
          ]
    );
    currentUserSlots.push(
      slots.data.Sunday.length > 0
        ? slots.data.Sunday
        : [
            {
              day: "SUN",
              unavailable: true,
            },
          ]
    );

    this.setState({ currentUserSlots });
  };

  populateData = async () => {
    try {
      let user = AuthService.getCurrentUser();
      const { data: slots } = await axios.get(
        config.SERVER_URL + `/api/user/${user.id}/workingslot`,
        {
          headers: authHeader(),
          cancelToken: this.source.token,
        }
      );
      let currentUserSlots = [...this.state.currentUserSlots];

      slots.data.Monday.length > 0 && (slots.data.Monday[0].day = "MON");
      slots.data.Tuesday.length > 0 && (slots.data.Tuesday[0].day = "TUE");
      slots.data.Wednesday.length > 0 && (slots.data.Wednesday[0].day = "WED");
      slots.data.Thursday.length > 0 && (slots.data.Thursday[0].day = "THU");
      slots.data.Friday.length > 0 && (slots.data.Friday[0].day = "FRI");
      slots.data.Saturday.length > 0 && (slots.data.Saturday[0].day = "SAT");
      slots.data.Sunday.length > 0 && (slots.data.Sunday[0].day = "SUN");
      currentUserSlots.push(
        slots.data.Monday.length > 0
          ? slots.data.Monday
          : [{ day: "MON", unavailable: true }]
      );
      currentUserSlots.push(
        slots.data.Tuesday.length > 0
          ? slots.data.Tuesday
          : [
              {
                day: "TUE",
                unavailable: true,
              },
            ]
      );
      currentUserSlots.push(
        slots.data.Wednesday.length > 0
          ? slots.data.Wednesday
          : [
              {
                day: "WED",
                unavailable: true,
              },
            ]
      );
      currentUserSlots.push(
        slots.data.Thursday.length > 0
          ? slots.data.Thursday
          : [
              {
                day: "THU",
                unavailable: true,
              },
            ]
      );
      currentUserSlots.push(
        slots.data.Friday.length > 0
          ? slots.data.Friday
          : [
              {
                day: "FRI",
                unavailable: true,
              },
            ]
      );
      currentUserSlots.push(
        slots.data.Saturday.length > 0
          ? slots.data.Saturday
          : [
              {
                day: "SAT",
                unavailable: true,
              },
            ]
      );
      currentUserSlots.push(
        slots.data.Sunday.length > 0
          ? slots.data.Sunday
          : [
              {
                day: "SUN",
                unavailable: true,
              },
            ]
      );

      // console.log("currentUserSlots::",currentUserSlots)
      this.setState({ currentUserSlots, isPending: false });
    } catch (e) {
      console.log(e.message);
    }
  };

  async componentDidMount() {
    await this.populateData();
  }

  componentWillUnmount() {
    if (this.source) this.source.cancel("CalendlyHour component got unmounted");
  }

  getTimeIn12h = (timeSlot) => {
    if (timeSlot) {
      const timeSplit = timeSlot.split(":");
      const d = new Date(22, 3, 2, timeSplit[0], 0, 0, 0);
      const t = d.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return t;
    }
  };

  addTime = async (day, ID, unavailable, daySlotArr) => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    // const currentUserSlots = [...this.state.currentUserSlots];
    let tempWorkingSlots = [];
    let name = day;
    if (unavailable) {
      tempWorkingSlots.push({
        id: Date.now(),
        slot_id: uint32,
        name: name,
        slot_start_time: "8:00 AM",
        slot_end_time: "9:00 AM",
      });
    } else {
      let temp = daySlotArr;
      //   let startTime = temp[temp.length - 1].slot_start_time;
      let endTime = temp[temp.length - 1].slot_end_time;

      let dt = new Date(`Fri Mar 11 2022 ${endTime}`);
      dt.setHours(dt.getHours() + 1);

      let slotEndTime_ =
        dt.getHours() + ":" + dt.getSeconds() + ":" + dt.getMinutes();

      tempWorkingSlots.push({
        id: Date.now(),
        slot_id: uint32,
        name: name,
        slot_start_time: endTime,
        slot_end_time: slotEndTime_,
      });
    }

    const obj = {
      user_id: this.user.id,
      workingSlots: tempWorkingSlots,
    };

    // console.log("objj::",obj);

    try {
      const { data } = await axios.put(
        config.SERVER_URL + `/api/user/${this.user.id}/workingslot`,
        obj,
        {
          headers: authHeader(),
        }
      );

      // this.setState({ successMessage: "Data Saved" });
      // this.unMountMessage();

      await this.refreshPage();
    } catch (ex) {}
  };

  getIndex = (ID) => {
    const days = [...this.state.days];
    const day = days.filter((d) => d._id === ID);
    const index = days.indexOf(day[0]);
    return index;
  };

  generateSlotErrors = (slots) => {
    // console.log("slots::", slots);
  };

  changeTimeFrom = async (e, indexNo, ID, index, dayIndex, slotObjFrom) => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];

    const slot = this.state.currentUserSlots[index].filter(
      (slot) => slot.id === ID
    );

    let name = "";
    if (indexNo === 0) {
      name = "MON";
    } else if (indexNo === 1) {
      name = "TUE";
    } else if (indexNo === 2) {
      name = "WED";
    } else if (indexNo === 3) {
      name = "THU";
    } else if (indexNo === 4) {
      name = "FRI";
    } else if (indexNo === 5) {
      name = "SAT";
    } else if (indexNo === 6) {
      name = "SUN";
    }

    let tempWorkingSlots = [];
    tempWorkingSlots.push({
      id: slotObjFrom.id,
      slot_id: slotObjFrom.slot_id,
      name: name,
      slot_start_time: e.value,
      slot_end_time: slot[0].slot_end_time,
    });

    const obj = {
      user_id: this.user.id,
      workingSlots: tempWorkingSlots,
    };

    // console.log("objj::",obj);

    try {
      const { data } = await axios.put(
        config.SERVER_URL + `/api/user/${this.user.id}/workingslot`,
        obj,
        {
          headers: authHeader(),
        }
      );

      this.refreshPage();
    } catch (ex) {
      let errors = { ...this.state.errors };

      let indexOfDay = "";
      if (name === "MON") indexOfDay = 0;
      else if ((name = "TUE")) indexOfDay = 1;
      else if (name === "WED") indexOfDay = 2;
      else if (name === "THU") indexOfDay = 3;
      else if (name === "FRI") indexOfDay = 4;
      else if (name === "SAT") indexOfDay = 5;
      else if (name === "SUN") indexOfDay = 6;

      errors["indexOfDay"] = indexOfDay;

      this.setState({ errors });

      setTimeout(() => {
        const errors = {};
        this.setState({ errors });
      }, 2000);
    }
  };

  changeTimeTo = async (e, indexNo, day, ID, index, slotObjTo) => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];

    const slot = this.state.currentUserSlots[index].filter(
      (slot) => slot.id === ID
    );

    let name = "";
    if (indexNo === 0) {
      name = "MON";
    } else if (indexNo === 1) {
      name = "TUE";
    } else if (indexNo === 2) {
      name = "WED";
    } else if (indexNo === 3) {
      name = "THU";
    } else if (indexNo === 4) {
      name = "FRI";
    } else if (indexNo === 5) {
      name = "SAT";
    } else if (indexNo === 6) {
      name = "SUN";
    }
    let tempWorkingSlots = [];
    tempWorkingSlots.push({
      id: slotObjTo.id,
      slot_id: slotObjTo.slot_id,
      name: name,
      slot_start_time: slot[0].slot_start_time,
      slot_end_time: e.value,
    });

    const obj = {
      user_id: this.user.id,
      workingSlots: tempWorkingSlots,
    };

    try {
      const { data } = await axios.put(
        config.SERVER_URL + `/api/user/${this.user.id}/workingslot`,
        obj,
        {
          headers: authHeader(),
        }
      );

      this.refreshPage();
    } catch (ex) {
      let errors = { ...this.state.errors };

      let indexOfDay = "";
      if (name === "MON") indexOfDay = 0;
      else if ((name = "TUE")) indexOfDay = 1;
      else if (name === "WED") indexOfDay = 2;
      else if (name === "THU") indexOfDay = 3;
      else if (name === "FRI") indexOfDay = 4;
      else if (name === "SAT") indexOfDay = 5;
      else if (name === "SUN") indexOfDay = 6;

      errors["indexOfDay"] = indexOfDay;

      this.setState({ errors });

      setTimeout(() => {
        const errors = {};
        this.setState({ errors });
      }, 2000);
    }
  };

  removeTime = async (ID, Name, tempName) => {
    const currentUserSlots = [...this.state.currentUserSlots];

    if (Name === "MON" || tempName === "MON") {
      if (currentUserSlots[0].length === 1) {
        const slotObj = currentUserSlots[0].filter((s) => s.id === ID);
        const index = currentUserSlots[0].indexOf(slotObj[0]);
        let temp = currentUserSlots[0];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[0].filter((s) => s.id === ID);
        const index = currentUserSlots[0].indexOf(slotObj[0]);

        if (index === 0) {
          const newSlots = currentUserSlots[0].filter((s) => s.id !== ID);

          newSlots[0].day = "MON";
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[0] = temp;

          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[0].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[0] = temp;

          this.setState({ currentUserSlots });
        }
      }
    } else if (Name === "TUE" || tempName === "TUE") {
      if (currentUserSlots[1].length === 1) {
        const slotObj = currentUserSlots[1].filter((s) => s.id === ID);
        const index = currentUserSlots[1].indexOf(slotObj[0]);
        let temp = currentUserSlots[1];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[1].filter((s) => s.id === ID);
        const index = currentUserSlots[1].indexOf(slotObj[0]);
        if (index === 0) {
          const newSlots = currentUserSlots[1].filter((s) => s.id !== ID);
          newSlots[0].day = "TUE";

          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[1] = temp;
          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[1].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[1] = temp;

          this.setState({ currentUserSlots });
        }
      }
    } else if (Name === "WED" || tempName === "WED") {
      if (currentUserSlots[2].length === 1) {
        const slotObj = currentUserSlots[2].filter((s) => s.id === ID);
        const index = currentUserSlots[2].indexOf(slotObj[0]);
        let temp = currentUserSlots[2];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[2].filter((s) => s.id === ID);
        const index = currentUserSlots[2].indexOf(slotObj[0]);
        if (index === 0) {
          const newSlots = currentUserSlots[2].filter((s) => s.id !== ID);
          newSlots[0].day = "WED";

          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[2] = temp;
          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[2].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[2] = temp;

          this.setState({ currentUserSlots });
        }
      }
    } else if (Name === "THU" || tempName === "THU") {
      if (currentUserSlots[3].length === 1) {
        const slotObj = currentUserSlots[3].filter((s) => s.id === ID);
        const index = currentUserSlots[3].indexOf(slotObj[0]);
        let temp = currentUserSlots[3];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[3].filter((s) => s.id === ID);
        const index = currentUserSlots[3].indexOf(slotObj[0]);
        if (index === 0) {
          const newSlots = currentUserSlots[3].filter((s) => s.id !== ID);
          newSlots[0].day = "THU";

          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[3] = temp;
          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[3].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[3] = temp;

          this.setState({ currentUserSlots });
        }
      }
    } else if (Name === "FRI" || tempName === "FRI") {
      if (currentUserSlots[4].length === 1) {
        const slotObj = currentUserSlots[4].filter((s) => s.id === ID);
        const index = currentUserSlots[4].indexOf(slotObj[0]);
        let temp = currentUserSlots[4];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[4].filter((s) => s.id === ID);
        const index = currentUserSlots[4].indexOf(slotObj[0]);
        if (index === 0) {
          const newSlots = currentUserSlots[4].filter((s) => s.id !== ID);
          newSlots[0].day = "FRI";

          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[4] = temp;
          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[4].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[4] = temp;

          this.setState({ currentUserSlots });
        }
      }
    } else if (Name === "SAT" || tempName === "SAT") {
      if (currentUserSlots[5].length === 1) {
        const slotObj = currentUserSlots[5].filter((s) => s.id === ID);
        const index = currentUserSlots[5].indexOf(slotObj[0]);
        let temp = currentUserSlots[5];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[5].filter((s) => s.id === ID);
        const index = currentUserSlots[5].indexOf(slotObj[0]);
        if (index === 0) {
          const newSlots = currentUserSlots[5].filter((s) => s.id !== ID);
          newSlots[0].day = "SAT";

          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[5] = temp;
          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[5].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[5] = temp;

          this.setState({ currentUserSlots });
        }
      }
    } else if (Name === "SUN" || tempName === "SUN") {
      if (currentUserSlots[6].length === 1) {
        const slotObj = currentUserSlots[6].filter((s) => s.id === ID);
        const index = currentUserSlots[6].indexOf(slotObj[0]);
        let temp = currentUserSlots[6];
        temp[index].unavailable = true;
        this.setState({ currentUserSlots });
      } else {
        const slotObj = currentUserSlots[6].filter((s) => s.id === ID);
        const index = currentUserSlots[6].indexOf(slotObj[0]);
        if (index === 0) {
          const newSlots = currentUserSlots[6].filter((s) => s.id !== ID);
          newSlots[0].day = "SUN";

          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }

          currentUserSlots[6] = temp;
          this.setState({ currentUserSlots });
        } else {
          const newSlots = currentUserSlots[6].filter((s) => s.id !== ID);
          let temp = [];
          for (let i = 0; i < newSlots.length; i++) {
            temp.push(newSlots[i]);
          }
          currentUserSlots[6] = temp;

          this.setState({ currentUserSlots });
        }
      }
    }

    try {
      await axios.delete(
        config.SERVER_URL + `/api/workingslot/${ID}/user/${this.user.id}`
      );

      this.setState({ successMessage: "Data Saved" });
      this.unMountMessage();
      await this.refreshPage();
    } catch (ex) {
      console.log(ex);
    }
  };

  HaveMoreSchedule = () => {};

  label = (name) => {
    if (name) return this.props.label;
    else return "";
  };

  handleSubmit = (e) => {};

  changeDay = async (e, ID) => {
    const currentUserSlots = [...this.state.currentUserSlots];
    let indexOfADay = "";
    currentUserSlots.map((slotArr, index) =>
      slotArr.map((slotObj) => {
        if (ID === slotObj.id) {
          indexOfADay = index;
        }
      })
    );

    let slots = currentUserSlots[indexOfADay];
    for (let i = 0; i < slots.length; i++) {
      try {
        await axios.delete(
          config.SERVER_URL +
            `/api/workingslot/${slots[i].id}/user/${this.user.id}`
        );
      } catch (ex) {
        console.log(ex);
      }
    }

    const fil = currentUserSlots[indexOfADay].filter((obj) => obj.id === ID);
    fil[0].unavailable = true;

    currentUserSlots[indexOfADay] = fil;

    this.setState({ currentUserSlots });
  };

  generateUniqueKey = () => {
    const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
    return uint32.toString(16);
  };

  checkDay = (index) => {
    if (index === 0) return "MON";
    else if (index === 1) return "TUE";
    else if (index === 2) return "WED";
    else if (index === 3) return "THU";
    else if (index === 4) return "FRI";
    else if (index === 5) return "SAT";
    else if (index === 6) return "SUN";
  };

  getSlots = (index) => {
    if (index === 0) return this.state.hoursPerDay.monday;
    else if (index === 1) return this.state.hoursPerDay.tuesday;
    else if (index === 2) return this.state.hoursPerDay.wednesday;
    else if (index === 3) return this.state.hoursPerDay.thursday;
    else if (index === 4) return this.state.hoursPerDay.friday;
    else if (index === 5) return this.state.hoursPerDay.saturday;
    else if (index === 6) return this.state.hoursPerDay.sunday;
  };
  render() {
    return (
      <>
        {this.state.isPending ? (
          <div className="text-center">
            {" "}
            <CircularProgress color="success" />
          </div>
        ) : (
          <Form>
            {/* {this.state.successMessage && (
                    <div className="dataSave-container">
                        <Alert variant="success" className="DataSaved-Message">
                            {this.state.successMessage}
                        </Alert>
                    </div>
                )} */}
            {this.state.currentUserSlots.map((data, index1) =>
              data.map((schedule, index) => (
                <span
                  key={this.generateUniqueKey()}
                  className={`add-Animation`}
                >
                  <Container className="container-listView">
                    <Row
                      className={`justify-content-md-center ${this.state.animation}`}
                    >
                      <Col sm={1} className="inCellAlignment">
                        {!schedule.unavailable && schedule.day ? (
                          <Form.Check
                            inline
                            checked={true}
                            label={schedule.day}
                            onChange={(e) => this.changeDay(e, schedule.id)}
                            name={schedule.name}
                            type="checkbox"
                            id={schedule.name}
                          />
                        ) : (
                          <p>{schedule.day}</p>
                        )}

                        {/* {schedule.unavailable && <p>Unavailable</p>} */}
                      </Col>

                      <Col sm={3}>
                        {!schedule.unavailable ? (
                          <InputGroup
                            size="lg"
                            className="mb-3 inCellAlignment"
                          >
                            <Select
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              options={this.getSlots(index)}
                              defaultValue={{
                                label: this.getTimeIn12h(
                                  schedule.slot_start_time
                                ),
                                value: this.getTimeIn12h(
                                  schedule.slot_start_time
                                ),
                              }}
                              onChange={(e) =>
                                this.changeTimeFrom(
                                  e,
                                  index1,
                                  schedule.id,
                                  index1,
                                  index,
                                  schedule
                                )
                              }
                            />
                          </InputGroup>
                        ) : (
                          <p className="unavailable-style">Unavailable</p>
                        )}
                      </Col>

                      <Col sm={1} className="inCellAlignment">
                        {!schedule.unavailable && <p>-</p>}
                      </Col>
                      <Col sm={3}>
                        {!schedule.unavailable && (
                          <InputGroup
                            size="lg"
                            className="mb-3 inCellAlignment"
                          >
                            <Select
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              w
                              options={this.state.hours}
                              defaultValue={{
                                label: this.getTimeIn12h(
                                  schedule.slot_end_time
                                ),
                                value: this.getTimeIn12h(
                                  schedule.slot_end_time
                                ),
                              }}
                              onChange={(e) =>
                                this.changeTimeTo(
                                  e,
                                  index1,
                                  schedule.day,
                                  schedule.id,
                                  index1,
                                  schedule
                                )
                              }
                            />
                          </InputGroup>
                        )}
                      </Col>
                      <Col sm={1} className="inCellAlignment">
                        {!schedule.unavailable && (
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="icon-style"
                            onClick={() =>
                              this.removeTime(
                                schedule.id,
                                schedule.day,
                                schedule.tempName
                              )
                            }
                          />
                        )}
                      </Col>

                      <Col sm={1} className="inCellAlignment add-btn">
                        {schedule.day && (
                          <FontAwesomeIcon
                            className="icon-style"
                            icon={faPlus}
                            onClick={() =>
                              this.addTime(
                                schedule.day,
                                schedule.id,
                                schedule.unavailable,
                                data
                              )
                            }
                          />
                        )}
                      </Col>

                      {/* <Col sm={1} className="inCellAlignment add-btn">
                                    {!schedule.unavailable && (
                                        <FontAwesomeIcon
                                            className="icon-style"
                                            icon={faClone}
                                            onClick={this.copyTime}
                                        />
                                    )}
                                </Col> */}
                    </Row>
                  </Container>

                  {data.length - 1 === index &&
                    this.state.errors.indexOfDay === index1 && (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          color: "red",
                        }}
                      >
                        <p>Slots have been overlaped</p>
                      </div>
                    )}
                  {data.length - 1 === index && (
                    <div className="border-setHours"></div>
                  )}
                </span>
              ))
            )}

            {/* <div className="submit-btn-wrapper">
                    <button className="Submit-btn">Submit</button>
                </div> */}
          </Form>
        )}
      </>
    );
  }
}

export default CalendlyHour;
