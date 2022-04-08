import { React, useState, } from "react";
import { Draggable } from 'react-beautiful-dnd';
import './TodoItem.css';
import { Checkbox, Input, List, Typography} from 'antd';
import { DeleteFilled, EditFilled, CloseSquareOutlined, CheckOutlined, FireOutlined,FireFilled } from '@ant-design/icons'


function TodoItem(props) {
    let [edit, setEdit] = useState(false)
    let [editTask, setEditTask] = useState(props.text)
    let [error, setError] = useState(false)

    function onClick() {
        props.onDelete(props.id)
    }


    function onChange(event) {
        props.onChecked(props.id, event.target.checked)
    }


    function onEditSave() {
        if (!editTask) {
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
        if (editTask) {
            setError(false)
        }
    }

    function cancelEdit() {
        setEdit(!edit)
        setEditTask(props.text)
    }

    function Prioritize (newPriority) {
        props.onPriority(props.id, newPriority)
    }


    function renderText() {

        if (edit) {
            return (
                <div className="todotext">
                    <Input type="text" className={`noterror ${error ? 'error' : ''}`} onChange={onChangecurrentItem} defaultValue={props.text}></Input>
                </div>)
        } else {
            return (
                <div className={`todotext${props.checked ? " crossed-line" : ""}`} >
                    <Typography.Text >
                    {props.text} {props.checked}
                    </Typography.Text>
                </div>)
        }
    }

    function renderPriority () {
        if(props.priority) {
            return (
            <>
            <FireFilled onClick={() => Prioritize(false)} style={{ fontSize: '150%', color: "#9BB7D4"}}/>
            </>)
        } else {
            return(
            <>
            <FireOutlined onClick={() => Prioritize(true)} style={{ fontSize: '150%', color: "#9BB7D4"}}/>
            </>)
        }
    }


    function renderIcons() {

        if (edit) {
            return (
                <>
                    <CheckOutlined onClick={onEditSave} style={{ fontSize: '150%', color: "#E0B589"}}  > </CheckOutlined>
                    <CloseSquareOutlined onClick={cancelEdit} style={{ fontSize: '150%', color: "#E0B589"}} ></CloseSquareOutlined>
                </>)
        } else {
            return (
                <>
                    
                    <EditFilled onClick={onEdit} style={{ fontSize: '150%', color: "#9BB7D4"}} ></EditFilled>
                    <DeleteFilled onClick={onClick} style={{ fontSize: '150%', color: "#9BB7D4"}} > </DeleteFilled >
                </>)
        }

        
    }

    return (
        <Draggable draggableId={props.id} index={props.index}>

            {(provided) => (
                <div className={`ant-list-item${props.priority ? " list-item-priority" : ""}`} {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <List.Item prefixCls="no-style-list">
                        <Checkbox onChange={onChange} defaultChecked={props.checked} >
                        </Checkbox>
                        
                            {renderText()}
                            <div className="edit" >
                                {renderPriority()}
                                {renderIcons()}
                                
                            </div>
                       
                    </List.Item>
                </div>
                
            )}

        </Draggable>
    )
}

export default TodoItem;
