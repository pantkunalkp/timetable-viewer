import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Paper, FormControl, MenuItem, TextField, Input, InputLabel, InputAdornment } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Container, Row, Col } from 'react-bootstrap';
import { CircularProgress } from '@material-ui/core';
import { DEPARTMENTS } from '../../queries/Queries';
import { NEWFACULTY } from '../../queries/Mutations';
let departments = [];
function FetchDepartments() {
	const { loading, error, data } = useQuery(DEPARTMENTS);
	if (departments.length === 0) {
		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error :(</p>;
		data.departments.map((obj) => {
			departments.push(obj.name);
		});
	}
}

const Faculty = (props) => {
	const [ department, setDepartment ] = React.useState('');
	const handleDepartment = (event) => {
		setDepartment(event.target.value);
	};
	const [ name, setName ] = React.useState('');
	const handleName = (event) => {
		setName(event.target.value);
	};
	const [ addFaculty, { loading: loading } ] = useMutation(NEWFACULTY);
	FetchDepartments();
	return (
		<Paper elevation={1}>
			<Typography>Add New Faculty</Typography>
			<Container>
				<hr />
				<Row>
					<Col>
						<FormControl margin="normal">
							<InputLabel htmlFor="input-with-icon-adornment">Faculty Name</InputLabel>
							<Input
								id="input-name"
								startAdornment={
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								}
								onChange={handleName}
							/>
						</FormControl>
						<br />
						<FormControl margin="normal">
							<TextField
								id="select-department"
								select
								label="Department"
								value={department}
								onChange={handleDepartment}
								helperText="Please select the department"
							>
								{departments.map((option, index) => (
									<MenuItem key={index} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
						</FormControl>
						<br />
						{loading && <CircularProgress />}
						<FormControl margin="normal">
							<Fab
								color="primary"
								aria-label="add"
								onClick={(e) => {
									e.preventDefault();
									addFaculty({ variables: { name, department } });
								}}
							>
								<AddIcon />
							</Fab>
						</FormControl>
					</Col>
				</Row>
			</Container>
		</Paper>
	);
};
export default Faculty;
