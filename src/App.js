import React, { useState } from 'react';
import Timetable from './components/timetable/Timetable';
import GetFaculties from './components/GetFaculties';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/sidebar/SideBar';
import Header from './components/header/Header';
import Faculty from './components/faculty/Faculty';
import { Container, Row, Col } from 'react-bootstrap';
import MyDrawer from './contexts/MyDrawer';

const App = () => {
	const [ drawerState, setDrawerState ] = useState(false);
	return (
		<MyDrawer.Provider value = {{ drawerState, setDrawerState }}>
			<Router>
				<div className="App">
					<Container fluid>
						<Row>
							<Header />
						</Row>
						<Row>
							<SideBar />
							<Col>
								<div className="timetable">
									<Switch>
										<Route exact path="/" component={GetFaculties} />
										<Route exact path="/Faculty" component={Faculty} />
										<Route exact path="/Courses" component={Timetable} />
										<Route exact path="/Classrooms" component={Timetable} />
										<Route exact path="/Batches" component={Timetable} />
										<Route exact path="/Assign Courses" component={Timetable} />
										<Route exact path="/Timetable" component={Timetable} />
										<Route exact path="/Edit Timetable" component={Timetable} />
									</Switch>
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			</Router>
		</MyDrawer.Provider>
	);
};

export default App;
