import React from 'react';
import Data from '../data/timetable4.json';
import Faculties from "../data/Faculties.json";
import './timetable/Timetable.css';
import SelectLabel from './SelectLebel';
class GetFaculties extends React.Component {
    state = {
        time : ["8:30-9:30","9:30-10:30","10:30-11:30","11:30-12:30","12:30-1:30","1:30-2:30","2:30-3:30","3:30-4:30","4:30-5:30"],
        day : ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday"],
        startTime: null,
        endTime: null, 
        selectedDay: null,
        freeFaculties: []
    }
    updateStartTime = (event) => {
        this.setState({...this.state, "startTime": event.target.value})
    }
    updateEndTime = (event) => {
        this.setState({...this.state, "endTime": event.target.value})
    }
    handleDay = (event) => {
        this.setState({...this.state, "selectedDay": event.target.value})
    }
    handleTeacher = (event) => {
        this.setState({...this.state, "teacher": event.target.value})
    }
    getFaculties = (Faculties) => {
        let busyFaculties = new Set()
        let freeFaculties = []
        for( let i = this.state.startTime; i<= this.state.endTime; i++) {
            Data.Timetable[this.state.day.indexOf(this.state.selectedDay)][i].map(item => {
                busyFaculties.add(Data.Class[String(item)].Teacher)
            })
        }
        Faculties.map( item => {
            if(!busyFaculties.has(item)) {
                freeFaculties.push(item)
            }
        })
        let a = this.state
        a.freeFaculties = freeFaculties
        this.setState({...a})
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.getFaculties(Faculties.Faculties)
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Start Time</label>
                    <select onChange={this.updateStartTime}>
                        <option value="null">Select</option>
                        {
                            this.state.time.map((item, index) =>
                                <option key={index} value={index}>{item}</option>
                            )
                        }
                    </select>
                    <label>| End Time</label>
                    <select onChange={this.updateEndTime}>
                        <option value="null">Select One Batch</option>
                        {
                            this.state.time.map((item, index) => {
                                if (index > this.state.startTime)
                                    return <option key={index} value={index}>{item}</option>
                            })
                        }
                    </select>
                    <label> | Select a Day: </label>
                    <SelectLabel facultyName={this.state.day} handle={this.handleDay} />
                    <input type="submit"/>
                </form>
                <div>
                    {
                        this.state.freeFaculties.map(item => {
                                    return <p>{item}</p>
                        })
                    }
                </div>
            </div>
        )
    }
}
export default GetFaculties;