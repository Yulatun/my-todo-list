import { React, useState } from "react";



function TodoItem(props) {
    var [edit, setEdit] = useState(false)
    var [editTask, setEditTask] = useState(props.text)

    function onClick() {
        props.onDelete(props.id)
    }

    function onChange(event) {
        props.onChecked(props.id, event.target.checked)
        // проперти onChecked объекта props
    }


    
    function onEditSave(event) {
        setEdit(!edit)
       
       //setEditTask('')
       props.edit(props.id, editTask)
        // setEdit(!edit) =
        // if(edit){
        //     setEdit(false)
        // }else{
        //     setEdit(true)
        // }
    }

    function onEdit () {
        setEdit(!edit)
       
        
        
    }
     
    function onChangecurrentItem(event) {
        setEditTask(event.target.value)
    }

    function renderText() {
            
        if (edit) { 
         return( 
            <div className="todotext">
            <input type="text" onChange={onChangecurrentItem} value={editTask}></input>
           
        </div>)
            
        } else{
            return (
            <div className="todotext">
            {props.text}
            </div>)
        }
    }

    function renderIcons() {

        if (edit) {
            return (
                <div>
                    <i onClick={onEditSave} className="material-icons checkmarkIcon" >done</i>
                </div>)
        } else {
            return (
                <i onClick={onEdit} className="material-icons editIcon" >edit</i>)

        }
    }

    return (
        <li>
            <label className="container">
                <input type="checkbox" onChange={onChange}
                    defaultChecked={props.checked} />
                <span className="checkmark"></span>
            </label>
                {renderText()}
            <div className="edit" >
                {renderIcons()}

                <i onClick={onClick} className="material-icons " >delete</i>
            </div>
        </li>
    )
}

export default TodoItem;


//1. Нажатие на карандашик: Вместо текста появляется окошко input type=text c текстом текущей todoItem с возможностью редактировать
//2. Нажатие на галочку: сохраняет текст в todoItem (перерисовывает todoItem с новым значением {props.text})

// UseState - сохраняет текущее значение измененного props.text и перересовывет todoItem
// onEdit функция выдает текстовое поле и возможность этот текст редактировать
// onEditSave функция сохраняет отредактированный текст вместо {props.text}
// Куда мне нужно вписать отредактированный текст из input  setEditTask(" ")
// 