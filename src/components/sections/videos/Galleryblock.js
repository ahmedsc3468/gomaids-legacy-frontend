import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
// import 'magnific-popup';
import YouTubeIcon from '@material-ui/icons/YouTube';
import ModalVideo from 'react-modal-video';
import "react-modal-video/css/modal-video.min.css"; 

import img1 from '../../../assets/img/gallery/1.jpg';
import img2 from '../../../assets/img/gallery/2.jpg';
import img3 from '../../../assets/img/gallery/3.jpg';
import img4 from '../../../assets/img/gallery/4.jpg';
import img5 from '../../../assets/img/gallery/5.jpg';
import img6 from '../../../assets/img/gallery/6.jpg';

const galleryblock = [
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
    { img: img1 },
    { img: img2 },
    { img: img3 },
    { img: img4 },
    { img: img5 },
    { img: img6 },
];
class Galleryblock extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            videos: [
                "NGPeaE6mtuU",
                "VfcrvrUwB6w",
                "BQ36Jjq31U8",
                "sNhfS-IxZ7o",
                "3MTAK2tqOzA",
                "ZjPhb8Nbv2A",
                // Add more YouTube video IDs as needed
            ],
            isOpen: false,
            currentVideoId: "",
        };
    }
    
    openVideos(vid) {
        
        
        this.setState({ isOpen: true });
        this.setState({ currentVideoId: vid });
    }
    
    // componentDidMount() {
    //     function popup() {
    //         $('.gallery-links').magnificPopup({
    //             type: 'image',
    //             gallery: {
    //                 enabled: true
    //             }
    //         });
    //     }
    //     popup();
    // }
    render() {
        const { videos } = this.state;
        return (
            <section className="gallery pt-90 pb-90">
            <div className="container">
            <div className="row">
            
            {videos.map((videoId, index) => (
                <div className="col-lg-4" key={index}>


                <div className="slider_images_videos  mb-30"   onClick={() => this.openVideos(videoId)}          style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${videoId}/0.jpg)`,
                    
                }}>
                
                <YouTubeIcon style={{ fontSize: 65,color: '#FF0000'}} />
                </div>


                </div>
                ))}
                {/* <div className="col-lg-12 text-center mt-10">
                <div className="pagination-type1 left-align">
                <ul>
                <li>
                <Link to="/"><i className="fas fa-angle-double-left" /></Link>
                </li>
                <li className="active"><Link to="/">1</Link></li>
                <li><Link to="/">2</Link></li>
                <li><Link to="/">3</Link></li>
                <li>
                <Link to="/"><i className="fas fa-angle-double-right" /></Link>
                </li>
                </ul>
                </div>
            </div> */}
                        <ModalVideo channel='youtube'  isOpen={this.state.isOpen} videoId={this.state.currentVideoId} onClose={() => this.setState({isOpen:false})} />
            </div>
            </div>
            </section >
            );
        }
    }
    
    export default Galleryblock;