import React, { Component } from "react";

import hw1 from "../../assets/img/icons/online.png";
import hw2 from "../../assets/img/icons/maid_working.png";
import hw3 from "../../assets/img/icons/maid_on_sofa.png";

const howitswork = [
  {
    id: 1,
    icon: hw1,
    title: "Search",
    text: "Open the app and find nearby maids ready to help — all vetted, rated, and ready to go.",
    extclass: "",
  },
  {
    id: 2,
    icon: hw2,
    title: "Book",
    text: "Choose your service, set your schedule, and confirm your request. It’s that simple.",
    extclass: "",
  },
  {
    id: 3,
    icon: hw3,
    title: "Relax",
    text: "Your maid arrives on time, does the job right, and leaves your space sparkling. You rate the experience.",
    extclass: "no-line",
  },
];

class Howitwork extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="sub-head blue f-700 mb-2">
              <span>............</span>How GoMaids Works.
              <span>............</span>
            </p>
            <h1 className="mb-45">How ‘GoMaids’ Works</h1>
          </div>
        </div>
        <div className="row">
          {howitswork.map((item, i) => (
            <div className="col-md-4 text-center" key={i}>
              <div className="each-hw-works">
                <div className="hw-icon">
                  <img src={item.icon} alt="" />
                </div>
                <span
                  className={
                    "hw-steps shadow-blue mt-30 mb-25 " + item.extclass + ""
                  }
                >
                  {item.id}
                </span>
                <div className="hw-text">
                  <h3 className="f-700 mb-15 mt-sm-20">{item.title}</h3>
                  <p>{item.text} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Howitwork;
