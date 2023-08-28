
import React from 'react';
import zxcvbn from 'zxcvbn';
import "../../../assets/MyCSS/progressbar.css"

const Progress = ({profile_completion}) => {
    const testResult = zxcvbn(profile_completion);
	const [style, setStyle] = React.useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${profile_completion}%`
		}
		
		setStyle(newStyle);
	}, 200);
	
	return (
		<div className="progress">
			<div className="progress-done" style={style}>
				{profile_completion}%
			</div>
		</div>
	)
}
export default Progress