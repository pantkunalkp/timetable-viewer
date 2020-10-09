import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import MyDrawer from '../../contexts/MyDrawer';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	}
});

const SideBar = () => {
	const { drawerState, setDrawerState } = useContext(MyDrawer);
	const classes = useStyles();

	return (
		<div>
			<Drawer anchor="left" open={drawerState} variant="persistent">
				<div className={classes.list} role="presentation">
					<List>
						<ListItem>
							<ListItemText primary="Timetable Viewer" />
							<ListItemText secondary="V1.0" />
							<CloseIcon color="primary" onClick={() => setDrawerState(false)} />
						</ListItem>
					</List>
					<Divider />
					<List>
						{[ 'Faculty', 'Courses', 'Classrooms', 'Batches', 'Assign Courses' ].map((text, index) => (
							<NavLink to={text} className="nav-link" style={{ color: 'black' }}>
								<ListItem button key={index}>
									<ListItemText primary={text} />
								</ListItem>
							</NavLink>
						))}
					</List>
					<Divider />
					<List>
						{[ 'Timetable', 'Edit Timetable' ].map((text, index) => (
							<ListItem button key={text}>
								<NavLink to={text} className="nav-link" style={{ color: 'black' }}>
									<ListItemText primary={text} />
								</NavLink>
							</ListItem>
						))}
					</List>
				</div>
			</Drawer>
		</div>
	);
};

export default SideBar;
