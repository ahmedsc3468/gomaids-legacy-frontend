import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../layouts/Blogsidebar';
import OwlCarousel from 'react-owl-carousel2';

import img1 from '../../../assets/img/blog/blog-b1.jpg';
import img2 from '../../../assets/img/blog/blog-b2.jpg';
import img3 from '../../../assets/img/blog/blog-b3.jpg';

import gal1 from '../../../assets/img/blog/de1.jpg';
import gal2 from '../../../assets/img/blog/de2.jpg';
import authorimg from '../../../assets/img/user/user.png';
import datebg from '../../../assets/img/icons/bg-date.png';
// Reated
import rel1 from '../../../assets/img/blog/1a.jpg';
import rel2 from '../../../assets/img/blog/2a.jpg';
// Comments
import commentimg2 from '../../../assets/img/user/user-2.png';
import commentimg3 from '../../../assets/img/user/user-3.png';
import commentimg4 from '../../../assets/img/user/user-4.png';

const blogslider = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
];

const bloggallery = [
    { img: gal1 },
    { img: gal2 },
];
// Tags
const tags = [
    { tag: 'Cleaning' },
    { tag: 'Office' },
    { tag: 'Window' },
];
// Follow Us
const socialmedia = [
    { icon: 'facebook-f', url: '/' },
    { icon: 'twitter', url: '/' },
    { icon: 'google-plus-g', url: '/' },
    { icon: 'pinterest-p', url: '/' },
];
// Related Blogs
const relatedblog = [
    { img: rel1, date: 25, month: 'Mar', title: '12 no-fuss tips and tricks to clean your home in half the time..', text: 'Lorem ipsum dolor sit amet consectetur...', authorname: 'Jhone Deo', comments: 30 },
    { img: rel2, date: 5, month: 'Jun', title: 'Reasons to hire a professional office cleaning service..', text: 'Lorem ipsum dolor sit amet consectetur...', authorname: 'Jhone Deo', comments: 30 },
];

class Blogarea extends Component {
    render() {
        const options = {
            loop: true,
            margin: 0,
            autoplay: true,
            nav: true,
            dots: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    margin: 0
                },
                1200: {
                    items: 1
                }
            }
        }
        return (
            <section className="blog-standared pt-90 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">
                            <div className="each-blog-standared mb-25">
                                <div className="blog-standared-img slider-blog">
                                    <OwlCarousel options={options} className="owl-carousel slider-type-blog">
                                        {blogslider.map((item, i) => (
                                            <img key={i} src={item.img} alt="" />
                                        ))}
                                    </OwlCarousel>
                                    <div className="blog-standared-date shadow-blue text-center">
                                        <h2 className="fs-30 f-700 white">11</h2>
                                        <p className="month mb-0 fs-13 white">JUN</p>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-detail-text">
                                <ul className="list-inline fs-14 mb-10">
                                    <li className="list-inline-item pr-15">
                                        <i className="far fa-user mr-10 fs-14 blue" /> Jhone Doe
            </li>
                                    <li className="list-inline-item pr-15">
                                        <i className="far fa-comments mr-10 fs-14 blue" /> 33 Comments
            </li>
                                </ul>
                            </div>
                            <h1 className="fs-45 mb-10">10 Carpet Cleaning Hacks That Can Save Your Carpet.</h1>
                            <p className="fs-21 f-300 lh-16 mb-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                            <p className="mb-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum, sem at condimentum sceleri sque, odio eros vestibulum tortor, non posuere sapien elit at velit. Vestibulum ac porttitor dolor, ac feugiat nunc. Nulla eleifend massa tortor, nec laoreet lectus varius ac. Fusce scelerisque consequat eros, non venenatis turpis ultricies id. Etiam nec sagittis diam, a tempor risus. Nunc nisl felis, congue non euismod dignissim id eros. Maecenas eu molestie purus, in digni ssim nequeo nsectetur adipiscing elit.</p>
                            <div className="block-quote-2 bg-blue mb-30">
                                <i className="fas fa-quote-right white" />
                                <div className="block-quote-text z-5">
                                    <p className="white fs-17 f-400 lh-19 mb-0">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt pariatur. </p>
                                    <span className="block-quote-by white mt-10 mb-10">John Doe</span>
                                </div>
                            </div>
                            <div className="row">
                                {bloggallery.map((item, i) => (
                                    <div className="col-md-6" key={i}>
                                        <img src={item.img} className="w-100 mb-sm-25" alt="" />
                                    </div>
                                ))}
                            </div>
                            <h3 className="fs-25 mt-25 f-700 mb-1">Lorem ipsum dolor sit amet</h3>
                            <p className="mb-20">Sinteger bibendum. Curabitur a magna mi. Cras facilisis lacus a magna luctus, nec pharetra ex varius. Sed placerat suscipit massa, sed lobo rtis ex sollicitudin non. Lorem ipsum dolor sit amet, consectetur adipis cing elit. Duis sed laoreet neque. Mauris placerat blandit accumsan. Aliquam efficitur dictum eros.Maec enas eu molestie purus, in dignissim neque.</p>
                            <div className="blog-de-footer pt-20 pb-20 mb-25">
                                <div className="row align-items-center">
                                    <div className="col-xl-7 col-lg-12">
                                        <div className="d-flex align-items-center">
                                            <span className="fs-13 f-700 mr-10">Tags:</span>
                                            <div className="tags-small">
                                                {tags.map((item, i) => (
                                                    <Link to="/blog-details" key={i}>{item.tag}</Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-lg-12 text-right">
                                        <div className="d-flex align-items-center justify-content-xl-end  mt-lg-20">
                                            <span className="fs-13 f-700 mr-10">Share:</span>
                                            <ul className="social-icons blog-social">
                                                {socialmedia.map((item, i) => (
                                                    <li key={i}>
                                                        <Link to={item.url}><i className={"fab fa-" + item.icon + ""} /></Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-author mt-10 mb-10">
                                <div className="d-flex align-items-center flex-sm-row flex-column">
                                    <div className="ayther-img">
                                        <img src={authorimg} alt="" />
                                    </div>
                                    <div className="auther-texts">
                                        <h5 className="fs-19 f-700 mb-1">Lisa mary</h5>
                                        <p className="mb-10">SInteger bibendum. Curabitur a magna mi. Cras facilisis lacus a magna luctus, nec pharetra ex varius. Sed placerat suscipit massa, sed lobo rtis ex sollicitudin non. Lorem ipsum dolor sit amet, consectetur adipis cing elit. </p>
                                        <ul className="social-icons blog-auther-social">
                                            <li> <Link to="/"><i className="fab fa-facebook-f" /></Link>
                                            </li>
                                            <li> <Link to="/"><i className="fab fa-twitter" /></Link>
                                            </li>
                                            <li> <Link to="/"><i className="fab fa-linkedin-in" /></Link>
                                            </li>
                                            <li> <Link to="/"><i className="fab fa-google-plus-g" /></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="blog-next-prev pt-15 pb-15 mt-25">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <Link to="/blog-details" className="fs-15 f-700"><i className="fas fa-long-arrow-alt-left mr-15" />Prev</Link>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/blog-details" className="fs-15 f-700">Next<i className="fas fa-long-arrow-alt-right  ml-15" /></Link>
                                    </div>
                                </div>
                            </div>
                            {/* comments */}
                            <div className="comments">
                                <h4 className="fs-25 f-700 mt-25 mb-25">Comments (<span>3</span>)</h4>
                                <ul className="connent-lists">
                                    <li>
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="comment-image mt-10">
                                                <img src={commentimg2} alt="" />
                                            </div>
                                            <div className="comment-text">
                                                <div className="top-head">
                                                    <h6 className="f-700 italic">Very Nice</h6> <span className="comment-date">20 Sep 2022</span>
                                                </div>
                                                <p className="mt-5 mb-10">Nunc quis lorem quis sapien tristique blandit. Etiam ac interdum sem. Pellentesque volutpat id neque et viverra. Nulla lacinia.</p>
                                                <div className="name-replay">
                                                    <ul className="list-inline fs-12">
                                                        <li className="list-inline-item pr-15">
                                                            <i className="far fa-user mr-10 fs-14 blue" />Jhone Doe</li>
                                                    </ul>
                                                    <Link to="/" className="reply fs-15 f-700">
                                                        Reply<i className="fas fa-long-arrow-alt-right ml-15" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="replay-comment">
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="comment-image mt-10">
                                                <img src={commentimg3} alt="" />
                                            </div>
                                            <div className="comment-text">
                                                <div className="top-head">
                                                    <h6 className="f-700 italic">Good News</h6> <span className="comment-date">20 Sep 2022</span>
                                                </div>
                                                <p className="mt-5 mb-10">Donec lobortis justo nec imperdiet rutrum. Sed at diam sed tellus su scipit consectetur. Mauris a fermentum magna </p>
                                                <div className="name-replay">
                                                    <ul className="list-inline fs-12">
                                                        <li className="list-inline-item pr-15">
                                                            <i className="far fa-user mr-10 fs-14 blue" />Lissa David </li>
                                                    </ul>
                                                    <Link to="/" className="reply fs-15 f-700">
                                                        Reply<i className="fas fa-long-arrow-alt-right ml-15" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex flex-column flex-sm-row">
                                            <div className="comment-image mt-10">
                                                <img src={commentimg4} alt="" />
                                            </div>
                                            <div className="comment-text">
                                                <div className="top-head">
                                                    <h6 className="f-700 italic">Very Nice Blog</h6> <span className="comment-date">20 Sep 2022</span>
                                                </div>
                                                <p className="mt-5 mb-10">Nunc quis lorem quis sapien tristique blandit. Etiam ac interdum sem. Pellentesque volutpat id neque et viverra. Nulla lacinia. </p>
                                                <div className="name-replay">
                                                    <ul className="list-inline fs-12">
                                                        <li className="list-inline-item pr-15">
                                                            <i className="far fa-user mr-10 fs-14 blue" />Jessica S </li>
                                                    </ul>
                                                    <Link to="/" className="reply fs-15 f-700">
                                                        Reply<i className="fas fa-long-arrow-alt-right ml-15" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="post-comment ">
                                <h4 className="fs-25 f-700 mt-40 mb-20">Leave Your Comment </h4>
                                <form action="#">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group relative mb-25">
                                                <input type="text" className="form-control input-white light-border" id="name" placeholder="Enter your name" />
                                                <i className="far fa-user transform-v-center" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group relative mb-25">
                                                <input type="email" className="form-control input-white light-border" id="email" placeholder="Enter your email" />
                                                <i className="far fa-envelope transform-v-center" />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea className="form-control input-white light-border mb-25" name="message" id="message" cols={30} rows={7} placeholder="Your message" defaultValue={""} />
                                        </div>
                                        <div className="col-lg-12">
                                            <button type="submit" className="btn shine-btn btn-lg btn-blue mb-10">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="hr-1 bg-black opacity-1 mt-25 mb-25" />
                            <div className="related-blogs">
                                <h4 className="fs-25 f-700 mb-20">Related Blogs</h4>
                                <div className="row mb-md-30">
                                    {relatedblog.map((item, i) => (
                                        <div className="col-md-6 mb-sm-25" key={i}>
                                            <div className="each-blog-2">
                                                <div className="blog-image-2">
                                                    <img src={item.img} alt="" />
                                                    <div className="blog-date-bg">
                                                        <img src={datebg} alt="" />
                                                        <div className="date text-center transform-center">
                                                            <h3>{item.date}</h3>
                                                            <p>{item.month}</p>
                                                        </div>
                                                    </div>
                                                    <Link to="/blog-details" className="reabmore-blog-2 transform-center f-700">Read More<i className="fas fa-long-arrow-alt-right ml-20" /></Link>
                                                </div>
                                                <div className="blog-text-2 bg-light-white">
                                                    <h3 className="mb-1"><Link to="/blog-details" className="fs-17 f-700">{item.title}</Link></h3>
                                                    <p className="mb-0">{item.text}</p>
                                                </div>
                                                <div className="blog-info-list">
                                                    <ul className="list-inline fs-13 text-left">
                                                        <li className="list-inline-item"> <i className="fas fa-user mr-10 fs-13 blue" /> {item.authorname}</li>
                                                        <li className="list-inline-item"> <i className="fas fa-comment mr-10 fs-13 blue" /> {item.comments} Comments</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Blogarea;