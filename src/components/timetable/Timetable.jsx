import React from 'react';
import Data from '../../data/timetable4.json';
import Faculties from "../../data/Faculties.json";
import SelectLebel from '../SelectLebel';
import './Timetable.css'
import SelectLabel from '../SelectLebel';
import { Table } from 'react-bootstrap';
class Timetable extends React.Component {
    state = {
        time : ["8:30-9:30","9:30-10:30","10:30-11:30","11:30-12:30","12:30-1:30","1:30-2:30","2:30-3:30","3:30-4:30","4:30-5:30"],
        day : ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"],
        section : null,
        section2 : null,
        Class : null,
        Teacher: null
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let ob = this.state
        ob.section = event.target.value
        this.setState({ob})
    }
    handleSubmitBatch2 = (event) => {
        event.preventDefault()
        let ob = this.state
        ob.section2 = event.target.value
        this.setState({ob})
    }
    handleClassSubmit = (event) => {
        event.preventDefault()
        let ob = this.state
        ob.Class = event.target.value + " "
        this.setState({ob})
    }
    handleTeacherSubmit = (event) => {
        event.preventDefault()
        let ob = this.state
        ob.Teacher = event.target.value
        this.setState({ob})
    }
    showClasses = (slot, style) => {
        return <p key={slot} className={style}>                                     
            {
                Data.Class[String(slot)].Classroom
            }
            <br />
            <strong className="class-name">
            {
                Data.Class[String(slot)].Subject
            }
            </strong>
            <br />
            {
                Data.Class[String(slot)].Teacher 
            }<br />
            {
                Data.Class[String(slot)].Groups 
            }
        </p>
    }
    render() {
        return(
            <div>
                <form>
                    <label>Select a Batch</label>
                    <select onChange={this.handleSubmitBatch1}>
                        <option value="null">Select One Batch</option>
                        {
                            Object.keys(Data.Batches).map(item =>
                                <option key={item} value={item}>{Data.Batches[item]}</option>
                            )
                        }
                    </select>
                    <label>| Select a Batch2</label>
                    <select onChange={this.handleSubmitBatch2}>
                        <option value="null">Select One Batch</option>
                        {
                            Object.keys(Data.Batches).map(item =>
                                <option key={item} value={item}>{Data.Batches[item]}</option>
                            )
                        }
                    </select>
                    <label> | OR    Select a Class : </label>
                    <SelectLabel facultyName={[...Data.Classrooms.Theory, ...Data.Classrooms.CBlockLab, ...Data.Classrooms.ProgrammingLab, ...Data.Classrooms.SLBT]} handle={this.handleClassSubmit} />
                    <label> | OR    Select a Teacher : </label>
                    <SelectLebel facultyName={Faculties.Faculties} handle={this.handleTeacherSubmit} />
                </form>
                <Table>
                <thead>
                    <tr className="row-head">
                        <th>Day\Time</th>
                        {
                            this.state.time.map((item, index) => <th key={index}>{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Data.Timetable.map((item, index) => {
                            return (<tr key={index} className="r">
                                {
                                    <th key={index}  className="box">{this.state.day[index]}</th>
                                }
                                {
                                    item.map( (hour, index) => {
                                        return <td key={index} className="box">
                                        {
                                            hour.map(slot => {
                                                if(slot !== null && Data.Class[String(slot)].Groups.includes(this.state.section)) {
                                                    return this.showClasses(slot, "batch");
                                                } 
                                                else if(slot !== null && Data.Class[String(slot)].Groups.includes(this.state.section2)) {
                                                    return this.showClasses(slot, "batch");
                                                } 
                                                else if(slot !== null && Data.Class[String(slot)].Classroom === this.state.Class) {
                                                        return this.showClasses(slot,"classes");
                                                    } 
                                                else if(slot !== null && Data.Class[String(slot)].Teacher.includes(this.state.Teacher)) {
                                                        return this.showClasses(slot, "teacher");
                                                }
                                                return;
                                            })
                                        }</td>
                                        })
                                }
                            </tr>)
                            
                        }   
                        )
                    }
                </tbody>
                
                    
                </Table>
                
            </div>
        )
    }
}
export default Timetable;