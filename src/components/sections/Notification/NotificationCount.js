
import React,{Component} from "react";

class Content extends Component {

    componentDidMount(){
        // console.log("this.props.count:",this.props.count)
    }

    render() {
        return (
            <React.Fragment>
               <span className="badge badge-light notification-counter">{this.props.count>0 && this.props.count }</span>
            </React.Fragment>
        );
    }
}

export default Content;