import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import faStyles from 'font-awesome/css/font-awesome.css';
import '../static/css/info-section.css';

const InfoSection = React.memo(({ faMapping, capitalize, capitalizeAllWords, eventToShow: event }) => {
	const [ date, setDate ] = useState(null);
	const [ month, getMonth ] = useState(null);
	const [ day, getDay ] = useState(null);
	const [ year, getYear ] = useState(null);
	const [ eventType, setEventType ] = useState('');
	const [ eventTypeForMapping, setEventTypeForMapping ] = useState('');
	const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
	const days = [ 'Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat' ];
	const [ eventName, setEventName ] = useState('');

	// const faMapping = {
	// 	meal: 'hamburger',
	// 	minievent: 'users',
	// 	other: 'ellipsis-h',
	// 	speaker: 'chalkboard-teacher',
	// 	workshop: 'laptop-code'
	// };

	useEffect(
		() => {
			if (event) {
				const date = new Date(event.startTime * 1000);
				const month = date.getMonth();
				const day = date.getDay();
				const year = date.getFullYear();
				const dateNum = date.getDate();
				setDate(`${months[month]} ${dateNum}, ${year}`);
				setEventType(capitalize(event.eventType.toLowerCase()));
				setEventTypeForMapping(event.eventType.toLowerCase());

				setEventName(capitalizeAllWords(event.name));
			}
		},
		[ event ]
	);

	return (
		<React.Fragment>
			{event ? (
				<div className={`event-div`}>
					<div className={`${eventTypeForMapping} eventTypeLogo`}>
						<FontAwesomeIcon className="eventType" icon={faMapping[eventTypeForMapping]} />
					</div>
					<p className={'info-id'}>Event</p>
					<p className={'info-content'}>{eventName}</p>

					<p className={'info-id'}>Date</p>
					<p className={'info-content'}>{date}</p>

					<p className={'info-id'}>Description</p>
					<p className={'info-content description'}>{event.description}</p>

					<p className={'info-id'}>Event Type</p>
					<p className={'info-content'}>{eventType}</p>

					<p className={'info-id'}> Location </p>
					<p className={'info-content'}>Online</p>
				</div>
			) : (
				<div className={'event-div'}>
					<div className="eventTypeLogo">
						<FontAwesomeIcon className="eventType" icon={'stream'} />
					</div>
					<p className={'info-content'}>
						No event has been selected. If you want to learn more about a certain event, just click on it!
					</p>
				</div>
			)}
		</React.Fragment>
	);
});

export default InfoSection;
