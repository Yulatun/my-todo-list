import 'antd/dist/antd.css';
import './App.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List, Divider, PageHeader } from 'antd';

const KEY_TODO_ITEMS = 'SAVED_TODO_ITEMS';

function saveTodoInLocalStorage(array) {
  localStorage.setItem(KEY_TODO_ITEMS, JSON.stringify(array));
}

function getTodo() {
  let savedTodoItemsFromLocalStorage = localStorage.getItem(KEY_TODO_ITEMS);

  let restoredSavedArray = savedTodoItemsFromLocalStorage ? JSON.parse(savedTodoItemsFromLocalStorage) : [
    { id: "1", text: "eat", checked: true, priority: false },
    { id: "2", text: "sleep", checked: false, priority: false },
    { id: "3", text: "eat", checked: false, priority: false },
    // do I need theese ids? 
  ];
  return restoredSavedArray;
}

function App() {
  let [currentTodoItems, setCurrentTodoItems] = useState(getTodo());

  function saveCurrentTodoItems(array) {
    array = [...array];
    setCurrentTodoItems(array);
    saveTodoInLocalStorage(array);
  }

  function onAdd(newTask) {
    let isNotDuplicate = true;
    for (let i = 0; i < currentTodoItems.length; i++) {
      if (currentTodoItems[i].text === newTask) {
        isNotDuplicate = false;
        break;
      }
    }

    if (isNotDuplicate) {
      currentTodoItems.push({ id: newTask, text: newTask, checked: false });
      saveCurrentTodoItems(currentTodoItems);
    }
    return isNotDuplicate;
  }


  function onDelete(id) {
    let filtered = currentTodoItems.filter((task) => {
      return task.id !== id;
    });
    saveCurrentTodoItems(filtered);
  }

  function onChecked(id, checked) {
    for (let i = 0; i < currentTodoItems.length; i++) {
      if (id === currentTodoItems[i].id) {
        currentTodoItems[i].checked = checked;
      }
    }
    saveCurrentTodoItems(currentTodoItems);
  }

  function onRenewTask(id, value) {
    for (let i = 0; i < currentTodoItems.length; i++) {
      if (id === currentTodoItems[i].id) {
        currentTodoItems[i].text = value;
      }
    }
    saveCurrentTodoItems(currentTodoItems);
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

    let draggedTodoItem = currentTodoItems[source.index]
    currentTodoItems.splice(source.index, 1)
    let removedTodoItems = currentTodoItems.splice(destination.index, currentTodoItems.length)

    saveCurrentTodoItems([...currentTodoItems, draggedTodoItem, ...removedTodoItems])
  };


  function onPrioritize(id, priority) {
    for (let i = 0; i < currentTodoItems.length; i++) {
      if (id === currentTodoItems[i].id) {
        currentTodoItems[i].priority = priority;
      }
    }
    currentTodoItems.sort((a, b) => {
      return Number(b.priority || false) - Number(a.priority || false);
    })
    saveCurrentTodoItems(currentTodoItems);
// What is a and b here?
  }


  let listItems = currentTodoItems.map((task, index) => {
    return (<TodoItem key={task.id} id={task.id} index={index} text={task.text} checked={task.checked}  priority={task.priority} 
      onDelete={onDelete} onChecked={onChecked} edit={onRenewTask} onPriority={onPrioritize} />)

      
  });

  let todoForm = (<TodoForm onAdd={onAdd} />);


  return (
    <div className="App">
      <PageHeader style={{ fontSize: '200%' }} className="header"> Todolist </PageHeader>
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
