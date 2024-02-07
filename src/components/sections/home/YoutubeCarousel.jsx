import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../assets/MyCSS/YoutubeCarousel.css";

class YouTubeCarousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [
        "pmEvicdERg4?si=SnoRkyOvQoBEttay",
        "MBaWhV-_zeg?si=2TKCO4aosnpoK7Ys",
        "RGKi6LSPDLU?si=ooQ9Ex5lwJ8z3Llj",
        // Add more YouTube video IDs as needed
      ],
    };
  }

  render() {
    const { videos } = this.state;

    const settings = {
      dots: true,
      // infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows: true,
      centerPadding: "20px",
    };

    return (
      <div className="youtube-carousel-container">
        <h1 className="my-3">Explainer carousel</h1>
        <Slider {...settings}>
          {videos.map((videoId, index) => (
            <div key={index} className="youtube-video-container">
              <iframe
                title={`YouTube Video ${index + 1}`}
                width="450px"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </Slider>
        {/* <div className="custom-prev">&#9664;</div>
        <div className="custom-next">&#9654;</div> */}
        <div className="custom-prev">
          <i className="fas fa-phone" />
        </div>
        <div className="custom-next">
          <i className="fas fa-phone" />
        </div>
      </div>
    );
  }
}

export default YouTubeCarousel;
