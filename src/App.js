import axios from "axios";
import Echo from "laravel-echo";

import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import AuthService from "./services/auth.service";
// import Details from "./components/sections/portfoliodetails/Details";
import ThankYou from "./components/sections/Hire/ThankYouOrder";
import authHeader from "./services/auth-header";
import EmailVerification from "./components/pages/EmailVerification";
import config from "./config.json";
import AuthRoute from "./components/auth/AuthRoute";
window.Pusher = require("pusher-js");

// Preloader

const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Pages
const Home = React.lazy(() => import("./components/pages/Home"));
const Hometwo = React.lazy(() => import("./components/pages/Hometwo"));
const Homethree = React.lazy(() => import("./components/pages/Homethree"));
const Homefour = React.lazy(() => import("./components/pages/Homefour"));
const HireDetails = React.lazy(() =>
  import("./components/sections/Hire/HireDetails")
);
const About = React.lazy(() => import("./components/pages/About"));
const PrivacyPolicy = React.lazy(() =>
  import("./components/pages/PrivacyPolicy")
);
// const Map = React.lazy(() => import("./components/sections/Maps/Map"));
const ZMap = React.lazy(() => import("./components/sections/Maps/ZeeshanMap"));
const SignUpLogin = React.lazy(() =>
  import("./components/sections/RegisterBeforeHire/Content")
);

const Bloglistgridone = React.lazy(() =>
  import("./components/pages/Bloglistgridone")
);
const Bloglistgridtwo = React.lazy(() =>
  import("./components/pages/Bloglistgridtwo")
);
const Bloglistgridsidebar = React.lazy(() =>
  import("./components/pages/Bloglistgridsidebar")
);
const Blogliststandard = React.lazy(() =>
  import("./components/pages/Blogliststandard")
);
const Blogliststandardleft = React.lazy(() =>
  import("./components/pages/Blogliststandardleft")
);
const Blogliststandardnosidebar = React.lazy(() =>
  import("./components/pages/Blogliststandardnosidebar")
);
const Blogdetails = React.lazy(() => import("./components/pages/Blogdetails"));
const Blogdetailsvideo = React.lazy(() =>
  import("./components/pages/Blogdetailsvideo")
);
const Blogdetailsslider = React.lazy(() =>
  import("./components/pages/Blogdetailsslider")
);
const Blogdetailsnosidebar = React.lazy(() =>
  import("./components/pages/Blogdetailsnosidebar")
);
const Portfoliocolthree = React.lazy(() =>
  import("./components/pages/Portfoliocolthree")
);
const Portfoliocolfour = React.lazy(() =>
  import("./components/pages/Portfoliocolfour")
);
const Portfoliomasonary = React.lazy(() =>
  import("./components/pages/Portfoliomasonary")
);
const Portfoliodetails = React.lazy(() =>
  import("./components/pages/Portfoliodetails")
);
const Pricingone = React.lazy(() => import("./components/pages/Pricingone"));
const Pricingtwo = React.lazy(() => import("./components/pages/Pricingtwo"));
const Shop = React.lazy(() => import("./components/pages/Shop"));
const Shopcolfour = React.lazy(() => import("./components/pages/Shopcolfour"));
const Productdetails = React.lazy(() =>
  import("./components/pages/Productdetails")
);
const Login = React.lazy(() => import("./components/pages/Login"));
const Signup = React.lazy(() => import("./components/pages/Signup"));
const Cart = React.lazy(() => import("./components/pages/Cart"));
const Checkout = React.lazy(() => import("./components/pages/Checkout"));
const Serviceone = React.lazy(() => import("./components/pages/Serviceone"));
const ServicesPage = React.lazy(() =>
  import("./components/sections/services/ServicesPage")
);
const Servicetwo = React.lazy(() => import("./components/pages/Servicetwo"));
const Servicedetails = React.lazy(() =>
  import("./components/pages/Servicedetails")
);
const Teamone = React.lazy(() => import("./components/pages/Teamone"));
const Teamtwo = React.lazy(() => import("./components/pages/Teamtwo"));
const Teamdetails = React.lazy(() => import("./components/pages/Teamdetails"));
const Testimonials = React.lazy(() =>
  import("./components/pages/Testimonials")
);
const Clients = React.lazy(() => import("./components/pages/Clients"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Costcalculator = React.lazy(() =>
  import("./components/pages/Costcalculator")
);
const Error404 = React.lazy(() => import("./components/pages/Error404"));
const Faqs = React.lazy(() => import("./components/pages/Faqs"));
const Gallerytwo = React.lazy(() => import("./components/pages/Gallerytwo"));
const Gallerythree = React.lazy(() =>
  import("./components/pages/Gallerythree")
);
const Galleryfour = React.lazy(() => import("./components/pages/Galleryfour"));
const Galleryafterbefore = React.lazy(() =>
  import("./components/pages/Galleryafterbefore")
);
const Galleryafterbeforetwo = React.lazy(() =>
  import("./components/pages/Galleryafterbeforetwo")
);
const Contact = React.lazy(() => import("./components/pages/Contact"));
const NearByContent = React.lazy(() =>
  import("./components/pages/NearByContent")
);
const PartnerWithUs = React.lazy(() =>
  import("./components/pages/PartnerWithUs")
);

const NumberVerification = React.lazy(() =>
  import("./components/pages/NumberVerification")
);
const Setupwizard = React.lazy(() => import("./components/pages/Setupwizard"));
const FormDetail = React.lazy(() => import("./components/pages/FormDetail"));
const Userdashboard = React.lazy(() =>
  import("./components/pages/Userdashboard")
);
const Userprofile = React.lazy(() => import("./components/pages/Userprofile"));
const Useravail = React.lazy(() => import("./components/pages/UserAvail"));
const Userservice = React.lazy(() => import("./components/pages/UserService"));
const ServiceTakerOrderDetails = React.lazy(() =>
  import("./components/pages/ServiceTakerOrderDetails")
);
const AllOrder = React.lazy(() => import("./components/pages/AllOrder"));
const Wallet = React.lazy(() => import("./components/pages/Wallet"));
const Forgot = React.lazy(() => import("./components/pages/Forgot"));
// const Chat = React.lazy(() => import("./components/pages/Chat"));
const Views = React.lazy(() =>
  import("./components/sections/userdashboard/Views")
);
// const MyChat = React.lazy(() =>
//     import("./components/pages/Chat")
// );
const Payment = React.lazy(() =>
  import("./components/sections/Payment/Payment")
);
const Dispute = React.lazy(() => import("./components/pages/Dispute"));

function App() {
  window.Echo = new Echo({
    broadcaster: "pusher",
    cluster: "ap2",
    encrypted: true,
    key: "53d29f0e4b04ffcfc346",
    authorizer: (channel, options) => {
      return {
        authorize: (socketId, callback) => {
          //                    console.log(authHeader())
          axios
            .post(
              config.SERVER_URL + "/api/broadcasting/auth",
              {
                socket_id: socketId,
                channel_name: channel.name,
              },
              {
                headers: authHeader(),
              }
            )
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
  });

  return (
    <Router basename={"/"}>
      <Suspense fallback={<div></div>}>
        <Preloader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home-v2" component={Hometwo} />
          <Route exact path="/home-v3" component={Homethree} />
          <Route exact path="/home-v4" component={Homefour} />
          <Route exact path="/about" component={About} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/blog-list-grid-v1" component={Bloglistgridone} />
          <Route exact path="/blog-list-grid-v2" component={Bloglistgridtwo} />
          <Route
            exact
            path="/blog-list-grid-sidebar"
            component={Bloglistgridsidebar}
          />
          <Route
            exact
            path="/blog-list-standared"
            component={Blogliststandard}
          />
          <Route
            exact
            path="/blog-list-standared-left-sidebar"
            component={Blogliststandardleft}
          />
          <Route
            exact
            path="/blog-list-standared-no-sidebar"
            component={Blogliststandardnosidebar}
          />
          <Route exact path="/blog-details" component={Blogdetails} />
          <Route
            exact
            path="/blog-details-video"
            component={Blogdetailsvideo}
          />
          <Route
            exact
            path="/blog-details-slider"
            component={Blogdetailsslider}
          />
          <Route
            exact
            path="/blog-details-nosidebar"
            component={Blogdetailsnosidebar}
          />
          <Route exact path="/portfolio-col-3" component={Portfoliocolthree} />
          <Route exact path="/portfolio-col-4" component={Portfoliocolfour} />
          <Route
            exact
            path="/portfolio-masonry"
            component={Portfoliomasonary}
          />
          <Route exact path="/portfolio-details" component={Portfoliodetails} />
          <Route exact path="/pricing-v1" component={Pricingone} />
          <Route exact path="/pricing-v2" component={Pricingtwo} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/shop-col-4" component={Shopcolfour} />
          <Route exact path="/product-details" component={Productdetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/find-a-services/:id?" component={Serviceone} />
          <Route exact path="/near-by-providers" component={NearByContent} />
          <Route exact path="/partner-with-us" component={PartnerWithUs} />
          <Route
            exact
            path="/email-verification"
            component={EmailVerification}
          />
          <Route
            exact
            path="/number-verification"
            component={NumberVerification}
          />

          <Route exact path="/services--" component={ServicesPage} />
          <Route exact path="/services-v2" component={Servicetwo} />
          <Route
            exact
            path="/service-details/:serviceProviderID"
            component={Servicedetails}
          />
          <Route exact path="/team-v1" component={Teamone} />
          <Route exact path="/team-v2" component={Teamtwo} />
          <Route exact path="/team-details" component={Teamdetails} />
          <Route exact path="/clients" component={Clients} />
          <Route exact path="/testimonials" component={Testimonials} />
          <Route exact path="/faq" component={Faqs} />
          <Route exact path="/coming-soon" component={Comingsoon} />
          <Route exact path="/cost-calculator" component={Costcalculator} />
          <Route exact path="/gallery-v2" component={Gallerytwo} />
          <Route exact path="/gallery-v3" component={Gallerythree} />
          <Route exact path="/gallery-v4" component={Galleryfour} />
          <Route
            exact
            path="/gallery-after-before"
            component={Galleryafterbefore}
          />
          <Route
            exact
            path="/gallery-after-before-2col"
            component={Galleryafterbeforetwo}
          />
          <Route exact path="/contact" component={Contact} />
          <AuthRoute exact path="/Setupwizard" component={Setupwizard} />

          <AuthRoute exact path="/userdashboard" component={Userdashboard} />
          <AuthRoute exact path="/Userprofile" component={Userprofile} />
          <AuthRoute exact path="/Useravail" component={Useravail} />
          <AuthRoute exact path="/Userservice" component={Userservice} />
          <AuthRoute
            exact
            path="/order_details_:order_id?"
            component={ServiceTakerOrderDetails}
          />
          <AuthRoute exact path="/AllOrder" component={AllOrder} />

          <AuthRoute exact path="/wallet" component={Wallet} />
          {/* <AuthRoute exact path="/chat" component={Chat} /> */}
          <AuthRoute exact path="/formdetail" component={FormDetail} />
          <AuthRoute exact path="/error" component={Error404} />
          <AuthRoute exact path="/calendly" component={Views} />
          <AuthRoute exact path="/hire/details" component={HireDetails} />
          <AuthRoute exact path="/maps/location" component={ZMap} />
          <AuthRoute exact path="/signup/login/hire" component={SignUpLogin} />
          <AuthRoute exact path="/forgot_password" component={Forgot} />
          <AuthRoute exact path="/order/thankyou" component={ThankYou} />
          {/* <AuthRoute exact path="/myChat" component={MyChat} /> */}
          <AuthRoute exact path="/payment" component={Payment} />
          <AuthRoute exact path="/dispute" component={Dispute} />
          <AuthRoute exact component={Error404} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
