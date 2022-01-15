import React, { useState, useEffect } from 'react';


//вызывает компонент TodoForm с параметрами props
// {onAdd: }
function TodoForm(props) {
    // используем хук useState newTask - текущее состояние массива, setNewTask функция которая изменяет массив, useState - 
    // хранит состояние newTask
    var [newTask, setNewTask] = useState('');
    const [disable, setDisable] = useState(true);
    var [error, setError] = useState('')

    

    // функция работает при нажатии и присваивает пропсу функцию onAdd с параметром (newTask) ! ОТКУДА Я ВЗЯЛА props И ДЛЯ ЧЕГО 
    // (может быть это как портал между компонентами) 
    function onClick(event) {
        //debugger;
        
        if (!props.onAdd(newTask)) {
            setError('такая задача уже есть')
            setDisable(true)
        }
        setNewTask('')
        
    }

    
    function onChange(event) {
        setNewTask(event.target.value)
    // if(event.target.value != предыдущие вписанные такски){
    // setError('такая задача уже существует')
    //    
     // }
      //setDisable(event.target.value === '');
       if(event.target.value.length < 3){
        setError('караул мало букв')
        setDisable(true)
       }else{
        setError('все супер')
        setDisable(false)
       }
    }


    return (
        <form>
            <div style={{color:'red'}}>{(error)}</div>
            <textarea placeholder="your new task" onChange={onChange} value={newTask}  ></textarea>
            <button onClick={onClick} type="button" disabled={disable}> Add</button>
        </form>
    );
};

export default TodoForm; 