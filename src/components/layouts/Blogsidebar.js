import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import advbanner from '../../assets/img/bg/ad-bnr.jpg';
import blogsml1 from '../../assets/img/blog/blog-sml1.jpg';
import blogsml2 from '../../assets/img/blog/blog-sml2.jpg';
import blogsml3 from '../../assets/img/blog/blog-sml3.jpg';
// Popular Posts
const popularpost = [
    { img: blogsml1, title: 'Lorem ipsum dolor sit amet, consecte..', date: 'June 25, 2022' },
    { img: blogsml2, title: 'Maecenas commodo nisl vel leo dapib..', date: 'May 16, 2022' },
    { img: blogsml3, title: 'Donec bibendum, neque et auctorm..', date: 'April 11, 2022' },
];
// Categories
const categories = [
    { title: 'Laundry Cleaning', count: 15 },
    { title: 'Office Cleaning', count: 11 },
    { title: 'After Party Cleaning', count: 6 },
    { title: 'Laundry Service', count: 9 },
    { title: 'Move In / Out Clean', count: 8 },
    { title: 'Window Cleaning', count: 1 },
];
// Tags
const posttags = [
    { tag: 'Cleaning' },
    { tag: 'Office' },
    { tag: 'Window' },
    { tag: 'Carpet Cleaning' },
    { tag: 'Home' },
    { tag: 'Kitchen' },
    { tag: 'Carpet' },
    { tag: 'Car Washing' },
    { tag: 'Room Cleaning' },
];
// Follow Us
const socialmedia = [
    { icon: 'facebook-f', url: '/' },
    { icon: 'twitter', url: '/' },
    { icon: 'google-plus-g', url: '/' },
    { icon: 'pinterest-p', url: '/' },
];

class Blogsidebar extends Component {
    render() {
        return (
            <Fragment>
                <div className="right-box bg-light-white mb-30">
                    <div className="right-box-head">
                        <h4 className="fs-22">Search</h4>
                    </div>
                    <div className="right-box-content">
                        <form action="#" className="relative mt-10 mb-10">
                            <input type="text" className="form-control input-white search-white" id="search2" placeholder="Search here.." />
                            <i className="fas fa-search transform-v-center blue" />
                        </form>
                    </div>
                </div>
                <div className="right-box bg-light-white mb-30">
                    <div className="right-box-head">
                        <h4 className="fs-22">Popular Posts</h4>
                    </div>
                    <div className="right-box-content ">
                        {popularpost.map((item, i) => (
                            <Link to="/blog-details" className="popular-post d-flex align-items-center" key={i}>
                                <div className="popular-post-img mr-20">
                                    <img src={item.img} alt="" />
                                    <div className="full-cover bg-blue-op-8 transition-4">
                                        <i className="fas fa-external-link-alt transform-center" />
                                    </div>
                                </div>
                                <div className="popular-post-text">
                                    <p className="mb-1 black">{item.title}</p>
                                    <span>{item.date}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="right-box bg-light-white mb-30">
                    <div className="right-box-head">
                        <h4 className="fs-22">Categories</h4>
                    </div>
                    <div className="right-box-content">
                        <div className="categories mb-5">
                            <ul>
                                {categories.map((item, i) => (
                                    <li key={i}>
                                        <Link to="/blog-details">{item.title}
                                            <span className="count-number">{item.count}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="right-box bg-light-white mb-30">
                    <div className="right-box-head">
                        <h4 className="fs-22">Tags</h4>
                    </div>
                    <div className="right-box-content">
                        <div className="tags-widget">
                            <ul className="tags list-inline mt-10">
                                {posttags.map((item, i) => (
                                    <li className="list-inline-item" key={i}>
                                        <Link to="/blog-details" className="tag-link">{item.tag}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="right-box bg-light-white mb-30">
                    <div className="right-box-head">
                        <h4 className="fs-22">Follow Us</h4>
                    </div>
                    <div className="right-box-content">
                        <div className="social-profile mt-10 mb-10">
                            {socialmedia.map((item, i) => (
                                <Link to={item.url} className="social-profile-box" key={i}>
                                    <i className={"fab fa-" + item.icon + ""} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="right-box ad-banner bg-light-white mb-30 mb-sm-00">
                    <Link to="/" className="d-block ">
                        <img src={advbanner} className="w-100" alt="" />
                    </Link>
                </div>
            </Fragment >
        );
    }
}

export default Blogsidebar;