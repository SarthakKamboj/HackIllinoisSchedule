import React, { useState, useEffect, useCallback } from 'react';
import '../static/css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Event = React.memo(({ faMapping, capitalizeAllWords, event, eventOnCurrentDate, updateEventToShow }) => {
	// const [ startTime, setStartTime ] = useState();
	// const [ endTime, setEndTime ] = useState();
	// const times = [];
	const [ displayEvent, setDisplayEvent ] = useState(true);

	const [ startTime, setStartTime ] = useState('');
	const [ endTime, setEndTime ] = useState('');

	const [ startHour, setStartHour ] = useState(0);
	const [ endHour, setEndHour ] = useState(0);
	const [ startMin, setStartMin ] = useState(0);
	const [ endMin, setEndMin ] = useState(0);
	const [ date, setDate ] = useState(0);

	const [ eventType, setEventType ] = useState('');
	const [ eventName, setEventName ] = useState('');

	const eventClicked = () => {
		updateEventToShow(event);
		window.scrollTo(0, 0);
	};
	// const capitalize = (str) => {
	// 	return str[0].toUpperCase() + str.substring(1);
	// };

	// const capitalizeAllWords = (str) => {
	// 	const strWords = str.split(' ');
	// 	const upStrWords = [];
	// 	let word;
	// 	for (word in strWords) {
	// 		const capWord = capitalize(strWords[word]);
	// 		upStrWords.push(capWord);
	// 	}
	// 	return upStrWords.join(' ');
	// };

	useEffect(() => {
		setEventType(event.eventType.toLowerCase());
		const startDate = new Date(event.startTime * 1000);
		const endDate = new Date(event.endTime * 1000);

		const startMin = startDate.getMinutes();
		const endMin = endDate.getMinutes();

		const startHour = startDate.getHours() % 12;
		const endHour = endDate.getHours() % 12;

		const date = startDate.getDate();

		setStartTime(startHour + ':' + startMin + (startMin === 0 ? '0' : ''));
		setEndTime(endHour + ':' + endMin + (endMin === 0 ? '0' : ''));

		setStartHour(startHour);
		setEndHour(endHour);

		setStartMin(startMin);
		setEndMin(endMin);

		setDate(date);
		setEventName(capitalizeAllWords(event.name));
	}, []);

	return (
		<React.Fragment>
			<div
				onClick={() => eventClicked()}
				className={`card ${eventType} ${!eventOnCurrentDate(date) ? 'invisible' : ''}`}
				// onClick={() => scrollToTop()}
			>
				<div className={'info'}>
					<FontAwesomeIcon icon={faMapping[eventType]} className={'eventType'} />
					{/* <img
						className={`eventType `}
						src={
							eventType ? (
								require(`../static/images/${eventType}.png`)
							) : (
								require('../static/images/loading.gif')
							)
						}
						alt={event.eventType}
					/> */}
					<div className={'details'}>
						<p>{eventName}</p>
						<p>
							{startTime}-{endTime}
						</p>
						<p>Aug {date}</p>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
});

export default Event;
