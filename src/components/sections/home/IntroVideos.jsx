import React, { Component } from "react";

export default class IntroVideos extends Component {
  constructor(props) {
    super(props);

    // Replace with your actual YouTube video IDs
    this.videoIds = [
      "jajsoXMg3hc?si=7XlLZWJtKYJMlg5W",
      "pmEvicdERg4?si=SnoRkyOvQoBEttay",
      "MBaWhV-_zeg?si=2TKCO4aosnpoK7Ys",
      "G2RpHt8NX0o?si=V49G-GemXopWVY30",
    ];
  }
  render() {
    return (
      <div>
        <h2 style={{ margin: "0 20%", maxWidth: "600px", padding: "20px" }}>
          Explanation Videos
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {this.videoIds.map((videoId) => (
            <div key={videoId} style={{ margin: "10px" }}>
              <iframe
                width="280"
                height="157"
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
