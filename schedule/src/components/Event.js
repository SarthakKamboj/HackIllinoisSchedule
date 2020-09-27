import React, { useState, useEffect } from 'react';
import '../static/css/event.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Event = React.memo(({ faMapping, capitalizeAllWords, event, eventOnCurrentDate, updateEventToShow }) => {
	const [ startTime, setStartTime ] = useState('');
	const [ endTime, setEndTime ] = useState('');

	const [ date, setDate ] = useState(0);

	const [ eventType, setEventType ] = useState('');
	const [ eventName, setEventName ] = useState('');

	const eventClicked = () => {
		updateEventToShow(event);
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		// gets event type
		setEventType(event.eventType.toLowerCase());

		// get date and breaks it into hour and minute
		const startDate = new Date(event.startTime * 1000);
		const endDate = new Date(event.endTime * 1000);

		const startMin = startDate.getMinutes();
		const endMin = endDate.getMinutes();

		const startHour = startDate.getHours() % 12;
		const endHour = endDate.getHours() % 12;

		const date = startDate.getDate();

		setStartTime(startHour + ':' + startMin + (startMin === 0 ? '0' : ''));
		setEndTime(endHour + ':' + endMin + (endMin === 0 ? '0' : ''));

		setDate(date);
		setEventName(capitalizeAllWords(event.name));
	}, []);

	return (
		<React.Fragment>
			<div
				onClick={() => eventClicked()}
				className={`card ${eventType} ${!eventOnCurrentDate(date) ? 'invisible' : ''}`}
			>
				<div className={'info'}>
					<FontAwesomeIcon icon={faMapping[eventType]} className={'eventType'} />

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
