import React from 'react';
import '../static/css/days.css';

const Days = React.memo(({ toggleDisplay, display, currentDate, changeDate }) => {
	const days = [ 7, 8, 9, 10, 11, 12, 13, 14, 15 ];
	const updateDay = (d) => {
		changeDate(d);
	};
	return (
		<React.Fragment>
			<div className={`backdrop ${!display ? 'showBackdrop' : ''}`} onClick={() => toggleDisplay()} />
			<ul className={`daysUl ${display ? 'display' : ''}`}>
				{days.map((d) => (
					<li
						className="day date"
						onClick={() => {
							updateDay(d);
						}}
					>
						<p>August {d}, 2020</p>
					</li>
				))}
				<li className="day clear" onClick={() => updateDay(-1)}>
					<p>Clear</p>
				</li>
			</ul>
		</React.Fragment>
	);
});

export default Days;
