import React from "react";

function TodoItem(props) {

    function onClick() {
        props.onDelete(props.id)
    }

    function onChange(event){
        props.onChecked(props.id, event.target.checked)
    // проперти onChecked объекта props
    }
   
    return (
        <li>
            <label className="container">
                <input type="checkbox" onChange={onChange}
                    defaultChecked={props.checked}/>
                <span className="checkmark"></span>
            </label>
            {props.text}
            <i onClick={onClick} className="material-icons" >delete</i> 
            <i className="cil-list-high-priority"></i>
        </li>
    )
}




export default TodoItem;


