import React from 'react';
// import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faChalkboardTeacher,
	faEllipsisH,
	faHamburger,
	faLaptopCode,
	faUsers,
	faStream
} from '@fortawesome/free-solid-svg-icons';
import Schedule from './components/Schedule.js';

library.add(faHamburger, faChalkboardTeacher, faLaptopCode, faEllipsisH, faUsers, faStream);

function App() {
	return (
		<div className="App">
			<Schedule />
		</div>
	);
}

export default App;
