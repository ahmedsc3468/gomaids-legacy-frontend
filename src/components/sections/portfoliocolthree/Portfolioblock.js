import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../../../assets/img/portfolio/1.jpg';
import img2 from '../../../assets/img/portfolio/1a.jpg';
import img3 from '../../../assets/img/portfolio/1b.jpg';
import img4 from '../../../assets/img/portfolio/1c.jpg';
import img5 from '../../../assets/img/portfolio/1d.jpg';
import img6 from '../../../assets/img/portfolio/1e.jpg';
import img7 from '../../../assets/img/portfolio/1f.jpg';

const filtersbtn = [
    { name: "View All", value: "View All", isActive: true },
    { name: "House", value: "House", isActive: false },
    { name: "Office", value: "Office", isActive: false },
    { name: "Bedroom", value: "Bedroom", isActive: false },
    { name: "Kitchen", value: "Kitchen", isActive: false },
    { name: "Window", value: "Window", isActive: false },
];
class Portfolioblock extends Component {
    constructor() {
        super();
        this.state = {
            projects: [
                {
                    img: img1,
                    origin: ["House"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img2,
                    origin: ["Office"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img3,
                    origin: ["Bedroom"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img4,
                    origin: ["Kitchen"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img5,
                    origin: ["Window"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img6,
                    origin: ["House"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img7,
                    origin: ["Office"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img1,
                    origin: ["Bedroom"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img2,
                    origin: ["Kitchen"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img3,
                    origin: ["Window"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img4,
                    origin: ["House"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img5,
                    origin: ["Office"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img6,
                    origin: ["Bedroom"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img7,
                    origin: ["Kitchen"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
                {
                    img: img1,
                    origin: ["Window"],
                    title: 'Web Design',
                    tag: 'Office',
                    date: '05 Jun 2022',
                },
            ],
            filterProject: []
        };
    }

    componentDidMount() {
        this.setState({
            filterProject: this.state.projects
        });
    }
    handleClick = name => {
        let filterProject = [];
        if (name === "View All") {
            filterProject = this.state.projects;

        } else {
            filterProject = this.state.projects.filter(
                (project, i) => project.origin.includes(name)
            );
        }
        var index = filtersbtn.map(function (e) { return e.name; }).indexOf(name);
        if (index) {
            filtersbtn.forEach(item => {
                item.isActive = false;
            });
            filtersbtn[index].isActive = true;
        }
        this.setState({ filterProject });
    };
    render() {
        const renderAll = this.state.filterProject.map((project, i) => (
            <div className="grid-item" key={i}>
                <div className="portfolio-item">
                    <div className="portfolio-item-img">
                        <img src={project.img} alt="" />
                        <div className="portfolio-overlay transition-4">
                            <span className="date z-10 uppercase fs-13 f-500">{project.date}</span>
                            <div className="portfolio-item-detail z-10">
                                <h5 className="white f-700 fs-19 mb-1">
                                    <Link to="/portfolio-details">{project.title}</Link>
                                </h5>
                                <span className="filtered-name uppercase fs-13 f-500">
                                    {project.tag}
                                </span>
                                <Link to="/portfolio-details" className="plus-line-link transform-v-center">
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));
        return (
            <section className="portfolio pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {/* gallery filter buttons */}
                            <div className="filter-gallery style-sort pb-25">
                                {filtersbtn.map(({ name, value, isActive }) => (
                                    <button key={name} value={value} className={isActive === true ? 'active' : ''} onClick={this.handleClick.bind(this, name)}>{name}</button>
                                ))}
                            </div>
                            {/* gallery filter buttons */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="portfolio-filter">
                                {renderAll}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Portfolioblock;