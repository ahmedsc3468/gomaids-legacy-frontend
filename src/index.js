import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
//import Payment from "../../maid_frontend/src/components/sections/StripePayment/StripeContainer";

// Css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-owl-carousel2/lib/styles.css";
import "../node_modules/react-owl-carousel2/src/owl.carousel.css";
import "../node_modules/react-owl-carousel2/src/owl.theme.default.css";
import "../node_modules/magnific-popup/dist/magnific-popup.css";
import "../node_modules/react-circular-progressbar/dist/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/animate.css/animate.css";
import "font-awesome/css/font-awesome.min.css";
import "./assets/css/userAccountProfile.css";
import { Provider } from "react-redux";
import "./assets/css/notification.css";
import "./assets/css/responsive.css";
import "./assets/css/all.min.css";
import "./assets/css/default.css";
import "./assets/css/calendly.css";
import "./assets/css/style.css";
import "./assets/css/custom-style.css";
import "./assets/css/color.css";




import store from "./store";
import "animate.css";

ReactDOM.render(
    <BrowserRouter basename={"/"}>
        <Provider store={store}>
            
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById("procleankers")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
