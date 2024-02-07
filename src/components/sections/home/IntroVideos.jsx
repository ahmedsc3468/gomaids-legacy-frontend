import React, { Component } from "react";

export default class IntroVideos extends Component {
  constructor(props) {
    super(props);

    // Replace with your actual YouTube video IDs
    this.videoIds = [
      "pmEvicdERg4?si=SnoRkyOvQoBEttay",
      "MBaWhV-_zeg?si=2TKCO4aosnpoK7Ys",
      "RGKi6LSPDLU?si=ooQ9Ex5lwJ8z3Llj",
      "G2RpHt8NX0o?si=V49G-GemXopWVY30",
    ];
  }
  render() {
    return (
      <div className="container">
        <h1 className="my-3">Explainer Videos</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {this.videoIds.map((videoId) => (
            <div key={videoId} style={{ margin: "10px" }}>
              <iframe
                width="395"
                height="225"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube Video ${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
