import React, { useState,  } from 'react';
import './TodoForm.css';
import { Button, Input } from 'antd'


function TodoForm(props) {
    let [newTask, setNewTask] = useState('');
    const [disable, setDisable] = useState(true);
    let [error, setError] = useState('')
    

    function onClick() {
        if (!props.onAdd(newTask)) {
            setError('the task exist')
            setDisable(true)
        }
        setNewTask('')
    }

    
    
    function onChange(event) {
        setNewTask(event.target.value)
       if(event.target.value.length < 3){
        setError('too short')
        setDisable(true)
       }else{
        setError('')
        setDisable(false)
       }
    }


    return (
        <div>
            <div className= "error">{error}</div>
            <form className="form">
                <Input className="textareaForm" placeholder="your new task" onChange={onChange} value={newTask}></Input>
                <Button className="button" onClick={onClick} type="primary" disabled={disable}> Add</Button>
            </form>
        
        </div>
    );
};

export default TodoForm; 
