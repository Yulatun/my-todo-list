import 'antd/dist/antd.css';
import './App.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List, Divider, PageHeader } from 'antd';


function saveTodo(array) {
  localStorage.setItem('SAVED_TODO_ITEMS', JSON.stringify(array));
}

function getTodo() {
  let saveTodoItemsFromLocalStorage = localStorage.getItem('SAVED_TODO_ITEMS')

  let restoredSavedArray = saveTodoItemsFromLocalStorage ? JSON.parse(saveTodoItemsFromLocalStorage) : [
    { id: "1", text: "eat", checked: true, priority: false },
    { id: "2", text: "sleep", checked: false, priority: false },
    { id: "3", text: "eat", checked: false, priority: false }
    // do I need theese ids? 
  ];
  return restoredSavedArray
}

function App() {
  let [currenTodoItems, setCurrenTodoItems] = useState(getTodo());

  function savedCurrenTodoItems(array) {
    setCurrenTodoItems(array)
    saveTodo(array)
  }


  function onAdd(newtask) {
    let preventDublicate = true
    for (let i = 0; i < currenTodoItems.length; i++) {
      if (currenTodoItems[i].text === newtask) {
        preventDublicate = false
        break
      }
    }

    if (preventDublicate) {
      currenTodoItems.push({ id: newtask, text: newtask, checked: false })
      savedCurrenTodoItems([...currenTodoItems])
    }
    return preventDublicate
  }


  function onDelete(id) {
    let filtered = currenTodoItems.filter((deletetask) => {
      return deletetask.id !== id;
    })
    savedCurrenTodoItems(filtered)
  }

  function onChecked(id, checked) {
    for (let i = 0; i < currenTodoItems.length; i++) {
      if (id === currenTodoItems[i].id) {
        currenTodoItems[i].checked = checked;
      }
    }
    savedCurrenTodoItems([...currenTodoItems])
  }

  function onRenewTask(id, value) {
    for (let i = 0; i < currenTodoItems.length; i++) {
      if (id === currenTodoItems[i].id) {
        currenTodoItems[i].text = value;
      }
    }
    savedCurrenTodoItems([...currenTodoItems])
  }


  let onDragEnd = result => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    let draggedTodoItem = currenTodoItems[source.index]
    currenTodoItems.splice(source.index, 1)
    let removedTodoItems = currenTodoItems.splice(destination.index, currenTodoItems.length)

    savedCurrenTodoItems([...currenTodoItems, draggedTodoItem, ...removedTodoItems])
  };


  function onPrioritize(id, priority) {
    for (let i = 0; i < currenTodoItems.length; i++) {
      if (id === currenTodoItems[i].id) {
        currenTodoItems[i].priority = priority;
      }
    }
    currenTodoItems.sort((a, b) => {
      return Number(b.priority || false) - Number(a.priority || false);
    })
    savedCurrenTodoItems([...currenTodoItems])
// What is a and b here?
  }


  let listItems = currenTodoItems.map((task, index) => {
    return (<TodoItem key={task.id} id={task.id} index={index} text={task.text} checked={task.checked} priority={task.priority} 
      onDelete={onDelete} onChecked={onChecked} edit={onRenewTask} onPriority={onPrioritize} />)
  });

  let todoForm = (<TodoForm onAdd={onAdd} />);


  return (
    <div className="App">
      <PageHeader style={{ fontSize: '200%', color: "#FDAC53" }} className="header"> Todolist </PageHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (

            <div {...provided.droppableProps}
              ref={provided.innerRef}>
              <Divider orientation="left"></Divider>
              <List>
                {listItems}
                {provided.placeholder}
              </List>
            </div>
          )}

        </Droppable>
      </DragDropContext>
      {todoForm}
    </div>
  );
}

export default App;
