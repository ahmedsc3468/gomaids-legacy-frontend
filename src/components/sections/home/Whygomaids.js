import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import check from "../../../assets/img/icons/check.png";
import Homewhygomaids from '../../../assets/img/about/homewhygomaids.jpg';
import abouticon from '../../../assets/img/other/clean.png';
const aboutlist = [
   {
    icon: check,
    title: "Instant Booking. Instant Relief",
    text: "Book a maid as fast as you order coffee. With real-time availability, GOMaids connects you to a nearby cleaning professional in just seconds.",
  },
  {
    icon: check,
    title: "Verified Maids. Real Results.",
    text: "We screen every maid. You review every job. What you get is reliability, transparency, and a spotless home — every single time.",
  },
  { icon: check,
    title: "Custom Cleaning, Your Way.", 
    text: "From studio apartments to 5-bedroom homes, quick touch-ups to deep cleans — you choose what you need, when you need it. We’ll handle the rest."
   },

  { icon: check,
    title: "Safety Comes Standard.",
    text: "Every cleaner is background-checked. Every job is insured. And your home? It stays your safe space — just cleaner."
   },
];
export default function Counter() {
  const [focus, setFocus] = React.useState(false);
  return (
    <section className='about pt-105 pt-xs-100 pb-100 bg-dot-right'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6'>
            <div className='about-image shadow-1 ml-10 mb-md-30 relative'>
              <img src={Homewhygomaids} className='w-100' alt='' />
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='about-div pl-20'>
              <p className='sub-head blue f-700 mb-1'>
                Why GOMaids?<span>............</span>
              </p>
              <h1 className='mb-15'>
               Why GOMaids?
              </h1>
              {/* <h4>Welcome to GOMaids</h4>
              <h5>Your Home. Cleaned on Your Terms.</h5> */}
              {/* <p>
                At <b>GOMaids</b>, we’re not just another cleaning company — we’re a tech-driven platform that 
              </p> */}
              <ul className='check-list3 half-list mb-15 mt-20'>
                {/* {aboutlist.map((item, i) => (
                  <li key={i}>
                    <span>
                      <i className="fas fa-check" />
                    </span>
                    {item.title}
                  </li>
                ))} */}
                  {aboutlist.map((item, i) => (
                    <li key={i}>
                      <img src={item.icon} alt="" />
                      <h5 className="fs-16 lh-14">{item.title}</h5>
                      <p>{item.text}</p>
                    </li>
                  ))}
                {/* <li>
                  <span>
                    <i className='fas fa-check' />
                  </span>
                  <CountUp
                    className='about_us_counter'
                    start={focus ? 0 : null}
                    end={1500}
                    duration={5}
                    redraw={true}
                  ></CountUp>
                  <span className='plus-icon about_us_counter'>+ </span>
                  Clients Served
                </li> */}
                {/* <li>
                  <span>
                    <i className='fas fa-check' />
                  </span>
                  <CountUp
                    className='about_us_counter'
                    start={focus ? 0 : null}
                    end={1000}
                    duration={5}
                    redraw={true}
                  ></CountUp>
                  <span className='plus-icon about_us_counter'>+ </span>
                  Network of Service Providers
                </li> */}
                {/* <li>
                  <span>
                    <i className='fas fa-check' />
                  </span>
                  <CountUp
                    className='about_us_counter'
                    start={focus ? 0 : null}
                    end={10}
                    duration={5}
                    redraw={true}
                  ></CountUp>
                  <span className='plus-icon about_us_counter'>+ </span>
                  Average Orders Per Day
                </li> */}
              </ul>
              <div className='row'>
                {/* <div className='col-sm-4'></div> */}
                <div
                  className='col-sm-4'
                  style={{ textAlign: 'center', padding: '0px' }}
                >
                  <Link
                    to='/find-a-services'
                    className='btn btn-blue shine-btn ordernowbth ml-4'
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
            <img src={abouticon} className='about-bg-icon' alt='' />
          </div>
        </div>
      </div>
    </section>
  );
}
