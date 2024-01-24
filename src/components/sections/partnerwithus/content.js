import Gomaidzwork from "../../layouts/GomaidzWorkPartner";
import Contactdetail from "./Contactdetail";
import React, { Component, Fragment } from "react";

class Content extends Component {
  render() {
    return (
      <Fragment>
        <Contactdetail />
        <div className="mb-20">
          <Gomaidzwork />
        </div>
      </Fragment>
    );
  }
}

export default Content;
