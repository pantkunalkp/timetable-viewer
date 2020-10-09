import React from 'react';

const SelectLabel = (props) => {
    return <select onChange={props.handle}>
    <option value={null}>Select</option>
    {
        props.facultyName.map( (name, index) => <option key={index} value = {name}>{name}</option>)
    }
</select>
}
export default SelectLabel;