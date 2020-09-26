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

	const toggleDisplay = () => {
		setDisplay((prev) => !prev);
	};

	const updateEventToShow = (evt) => {
		setEventToShow(evt);
	};
	const capitalize = (str) => {
		return str[0].toUpperCase() + str.substring(1);
	};

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

	const checkIfEventOnCurrentDay = useCallback(
		(d) => {
			if (currentDate === -1) return true;
			return d === currentDate;
		},
		[ currentDate ]
	);
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
				<img
					src={'https://www.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png'}
					alt="Days"
					className="menuIcon"
					onClick={() => toggleDisplay()}
				/>
				<div className={'days'}>
					<Days
						display={display}
						toggleDisplay={toggleDisplay}
						currentDate={currentDate}
						changeDate={setCurrentDate}
					/>
				</div>
				<div className={'content'}>
					{eventComps.length !== 0 ? (
						eventComps.map((evt) => evt)
					) : (
						<React.Fragment>
							<img
								src="https://hubbravissimo.com/wp-content/uploads/2019/07/fff16-862c4e_80c174747b704e778f110260a995cc97mv2.gif"
								alt="Loading"
								className="loadingImg"
							/>
							{/* <h1>Loading</h1> */}
						</React.Fragment>
					)}
				</div>
				<div className={'info-section'}>
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
