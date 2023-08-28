import React, { Component } from 'react';

class Preloader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchSuccess: false
        }
    }
    componentDidMount() {
        window.addEventListener('load', () => {
            this.setState({
                fetchSuccess: true
            });
        });
    }
    render() {
        const preloaderclass = this.state.fetchSuccess ? 'd-none' : '';
        return (
            <div className={`loader-out flex-center ${preloaderclass}`}>
                <div className="loader" />
            </div>
        );
    }
}

export default Preloader;