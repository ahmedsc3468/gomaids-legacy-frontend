import React, { Component } from "react";

import hw1 from "../../assets/img/icons/online.png";
import hw2 from "../../assets/img/icons/maid_working.png";
import hw3 from "../../assets/img/icons/maid_on_sofa.png";

const howitswork = [
  {
    id: 1,
    icon: hw1,
    title: "",
    text: "Looking for More Work? Create Your Profile and Watch the Orders Pour In!",
    extclass: "",
  },
  {
    id: 2,
    icon: hw2,
    title: "",
    text: "Work on Your Own Terms! Set Your Own Schedule and Pay Rate",
    extclass: "",
  },
  {
    id: 3,
    icon: hw3,
    title: "",
    text: "Make it Worth Your While! Earn More Money For Your Time",
    extclass: "no-line",
  },
];

class Gomaidzwork extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <p className="sub-head blue f-700 mb-2">
              <span>............</span>How GoMaidz Works.
              <span>............</span>
            </p>
            <h1 className="mb-45">How ‘GoMaidz’ Works</h1>
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

export default Gomaidzwork;
