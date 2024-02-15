import React, { Component } from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
class Loader extends Component {
    constructor(props) {
        super(props);
    
    }
    componentDidMount() {
     
    }
    render() {
        return (
            <div className="position-absolute form-loader">
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <CircularProgress color="success" size={80} />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
               
              </Box>
            </Box>
          </div>
        );
    }
}

export default Loader;