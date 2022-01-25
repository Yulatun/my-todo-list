import { React, useState,  } from "react";
import {Draggable} from 'react-beautiful-dnd'


function TodoItem(props) {
    var [edit, setEdit] = useState(false)
    var [editTask, setEditTask] = useState(props.text)
    var [error, setError] = useState(false)
    function onClick() {
        props.onDelete(props.id)
    }

    function onChange(event) {
        props.onChecked(props.id, event.target.checked)
        // проперти onChecked объекта props
    }



    function onEditSave(event) {
        //setEditTask('')
        // setEdit(!edit) =
        // if(edit){
        //     setEdit(false)
        // }else{
        //     setEdit(true)
        // }
//debugger
        if(!editTask){
            setError(true)
        } else {
            props.edit(props.id, editTask)
            setEdit(!edit)
        }
    }

    function onEdit() {
        setEdit(!edit)
    }

    function onChangecurrentItem(event) {
        setEditTask(event.target.value)
        if(editTask){
            setError(false)
        }
    }


    function cancelEdit() {
       // renderText(!edit)
       setEdit(!edit)
       setEditTask(props.text)
    }
   
    function renderText() {

        if (edit) {
            return (
                <div className="todotext">
                    <input type="text" className={`noterror ${error ? 'error' : ''}`}  onChange={onChangecurrentItem} value={editTask}></input>

                </div>)

        } else {
            return (
                <div className="todotext">
                    {props.text}
                </div>)
        }
    }

    function renderIcons() {

        if (edit) {
            return (
                <>
                    <i onClick={onEditSave}  className="material-icons checkmarkIcon" >done</i>
                    <i onClick={cancelEdit} className="material-icons">cancel</i>
                </>)
        } else {
            return (
                <>
                    <i onClick={onEdit} className="material-icons editIcon" >edit</i>
                    <i onClick={onClick} className="material-icons " >delete</i>
                </>)
        }
    }

    return (
        <Draggable draggableId={props.id} index={props.index}>
        
           {(provided) => (
            <li {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <label className="container">
                    <input type="checkbox" onChange={onChange}
                        defaultChecked={props.checked} />
                    <span className="checkmark"></span>
                </label>
                {renderText()}
                <div className="edit" >
                    {renderIcons()}
                    
                </div>
        </li>

           )}
            
        </Draggable>
    )
}

export default TodoItem;


//1. Нажатие на карандашик: Вместо текста появляется окошко input type=text c текстом текущей todoItem с возможностью редактировать
//2. Нажатие на галочку: сохраняет текст в todoItem (перерисовывает todoItem с новым значением {props.text})

// UseState - сохраняет текущее значение измененного props.text и перересовывет todoItem
// onEdit функция выдает текстовое поле и возможность этот текст редактировать
// onEditSave функция сохраняет отредактированный текст вместо {props.text}
// Куда мне нужно вписать отредактированный текст из input  setEditTask(" ")
// Вместо возвращение тега с иконкой делит мне надо  вписать в функцию renderIcons в зависимости от состояния edit возвращает нужную иконку
// на иконке крестика должен быть хендлер onClick при нажатии функция cancelEdit возвращала бы значение props.text
// как вернуть возвращение props.text
// при нажатии на крестик вызывать функцию setEdit(!edit) текущее значение без редактирования
// useState c булевым значением [error] 
//