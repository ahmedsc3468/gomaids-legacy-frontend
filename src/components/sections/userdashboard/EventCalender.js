import AuthService from "../../../services/auth.service";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
import config from "../../../config.json";
import React from "react";
import axios from "axios";
import authHeader from "../../../services/auth-header";

export default class EventCalender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserSlots: [],
    };

    this.source = axios.CancelToken.source();
  }
  populateData = async () => {
    try {
      let user = AuthService.getCurrentUser();

      const { data: slots } = await axios.get(
        config.SERVER_URL + `/api/allslots/${user.id}`,
        {
          headers: authHeader(),
          cancelToken: this.source.token,
        }
      );

      this.setState({ currentUserSlots: slots.data });
    } catch (e) {
      console.log(e.messagr);
    }
  };

  async componentDidMount() {
    await this.populateData();
  }

  componentWillUnmount() {
    if (this.source) this.source.cancel("EventCalender got unmounted");
  }

  render() {
    return (
      <React.Fragment>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={
            this.state.currentUserSlots.length > 0 &&
            this.state.currentUserSlots.map((slot) => ({
              daysOfWeek: [`${slot.day_id}`],
              title:
                slot.hourly_slots.slot_start_time +
                "-" +
                slot.hourly_slots.slot_end_time,
            }))
          }
        />
        {/* )) */}
      </React.Fragment>
    );
  }
}
