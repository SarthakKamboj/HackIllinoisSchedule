import React, { useState, useEffect, useCallback } from 'react';
import Event from './Event';
import InfoSection from './InfoSection';
import Days from './Days';
import '../static/css/schedule.css';

const Schedule = () => {
	const [ eventsObj, setEventsObj ] = useState([]);
	const [ eventComps, setEventComps ] = useState([]);
	const [ eventToShow, setEventToShow ] = useState(null);
	const [ currentDate, setCurrentDate ] = useState(-1);
	const [ display, setDisplay ] = useState(false);

	// toggles mobile menu display
	const toggleDisplay = () => {
		setDisplay((prev) => !prev);
	};

	// updates which event will be shown on the right hand side
	const updateEventToShow = (evt) => {
		setEventToShow(evt);
	};

	// capitalizes string
	const capitalize = (str) => {
		return str[0].toUpperCase() + str.substring(1);
	};

	// capitalizes a sequence of words
	const capitalizeAllWords = (str) => {
		const strWords = str.split(' ');
		const upStrWords = [];
		let word;
		for (word in strWords) {
			const capWord = capitalize(strWords[word]);
			upStrWords.push(capWord);
		}
		return upStrWords.join(' ');
	};

	// function for checking whether the date of an event is the same as the date the user chose
	const checkIfEventOnCurrentDay = useCallback(
		(d) => {
			if (currentDate === -1) return true;
			return d === currentDate;
		},
		[ currentDate ]
	);

	// fetched list of events from HackIllinois API
	useEffect(() => {
		async function getScheduleInfo() {
			const res = await fetch('https://api.hackillinois.org/event/');
			const json = await res.json();
			const eventsEl = json.events.sort((a, b) => {
				if (a.startTime >= b.startTime) return 1;
				return -1;
			});
			setEventsObj(eventsEl);
		}
		getScheduleInfo();
	}, []);

	useEffect(
		// update list of event components every time a date has been selected or a new list of events have been fetched
		() => {
			const eComps = eventsObj.map((event) => (
				<Event
					updateEventToShow={updateEventToShow}
					event={event}
					key={event.id}
					eventOnCurrentDate={checkIfEventOnCurrentDay}
					capitalizeAllWords={capitalizeAllWords}
					faMapping={faMapping}
				/>
			));
			setEventComps(eComps);
		},
		[ checkIfEventOnCurrentDay, eventsObj ]
	);

	// maps HackIllinois event types of FontAwesome tags
	const faMapping = {
		meal: 'hamburger',
		minievent: 'users',
		other: 'ellipsis-h',
		speaker: 'chalkboard-teacher',
		workshop: 'laptop-code'
	};

	return (
		<React.Fragment>
			<div className="nav">
				<img
					className="logo"
					src={
						'https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/challenge_photos/000/606/802/datas/original.png'
					}
					alt="HackIllinois"
				/>
			</div>
			<div className="container">
				{/* burger mobile menu icon */}
				<img
					src={'https://www.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png'}
					alt="Days"
					className="menuIcon"
					onClick={() => toggleDisplay()}
				/>
				<div className={'days'}>
					{/* shows the list of dates for the events */}
					<Days
						display={display}
						toggleDisplay={toggleDisplay}
						currentDate={currentDate}
						changeDate={setCurrentDate}
					/>
				</div>
				<div className={'content'}>
					{/* check if events have been fetched, else show the loading image */}
					{eventComps.length !== 0 ? (
						eventComps.map((evt) => evt)
					) : (
						<React.Fragment>
							<img
								src="https://hubbravissimo.com/wp-content/uploads/2019/07/fff16-862c4e_80c174747b704e778f110260a995cc97mv2.gif"
								alt="Loading"
								className="loadingImg"
							/>
						</React.Fragment>
					)}
				</div>
				<div className={'info-section'}>
					{/* section on the right side that gives extra information about the event */}
					<InfoSection
						capitalizeAllWords={capitalizeAllWords}
						capitalize={capitalize}
						eventToShow={eventToShow}
						faMapping={faMapping}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Schedule;
