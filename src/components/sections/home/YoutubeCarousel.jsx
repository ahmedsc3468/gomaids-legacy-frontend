import React, { Component } from "react";
import ReactDOM from 'react-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/MyCSS/YoutubeCarousel.css";
import ModalVideo from 'react-modal-video';
import "react-modal-video/css/modal-video.min.css"; 
import YouTubeIcon from '@material-ui/icons/YouTube';
import { withRouter } from 'react-router-dom';

class YouTubeCarousel extends Component {
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

  render() {
    const { videos } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="youtube-carousel-container">
        <div className="Youtube-carousel-heading">
          <h1 className="my-3">Explainer Videos</h1>
        <h5 onClick={()=>{  this.props.history.push("/videos")}}>see all</h5>
        </div>

        <Slider {...settings}>
          {videos.map((videoId, index) => (
            <div key={index} className="youtube-video-container">
              {/* <iframe
                title={`YouTube Video ${index + 1}`}
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe> */}
              {/* <button className="btn-primary" onClick={() => this.openVideos(videoId)}>VIEW DEMO</button> */}
              <div className="slider_images_videos"   onClick={() => this.openVideos(videoId)}          style={{
          backgroundImage: `url(https://img.youtube.com/vi/${videoId}/0.jpg)`,

        }}>

                <YouTubeIcon style={{ fontSize: 65,color: '#FF0000'}} />
              </div>
            </div>
          ))}
        </Slider>
        {/* <div className="custom-prev">&#9664;</div>
        <div className="custom-next">&#9654;</div>
        <div className="custom-prev"></div>
        <div className="custom-next"></div> */}
              <ModalVideo channel='youtube'  isOpen={this.state.isOpen} videoId={this.state.currentVideoId} onClose={() => this.setState({isOpen:false})} />
      </div>
      
    );
  }
}

export default withRouter(YouTubeCarousel);
