import 'antd/dist/antd.css';
import './App.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { List, PageHeader } from 'antd';
import { getTodoItems, createTodoItems, deleteToDoItems, editTodoItems, dragTodoItems, onSort } from './server'


function App() {
  let [currentTodoItems, setCurrentTodoItems] = useState(undefined);
  let [loaded, setLoaded] = useState(false)

  if (currentTodoItems === undefined) {
    getTodoItems()
      .then((itemsFromServer) => {
        saveCurrentTodoItems(itemsFromServer)

      });
    currentTodoItems = [];
  }

  function saveCurrentTodoItems(array) {
    array = [...array];
    setCurrentTodoItems(array);
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
      let setIndex
      if (currentTodoItems.lenght === 0) {
        setIndex = 0;
      }
      let indexCurret = currentTodoItems.map(e => {
        return e.index;
      })
      setIndex = Math.max(...indexCurret);
      createTodoItems({ text: newTask, checked: false, priority: false, index: setIndex + 1 })
        .then((itemFromServer) => {
          currentTodoItems.push(itemFromServer)
          saveCurrentTodoItems(currentTodoItems)
        });

    }
    return isNotDuplicate;
  }

  function onDelete(id) {
    deleteToDoItems(id)
    getTodoItems()
      .then((itemsFromServer) => {
        saveCurrentTodoItems(itemsFromServer)
      });
  }


  function onChecked(_id, checked) {
    setLoaded(true)
    editTodoItems({ _id, checked }) // same as { _id: _id, checked: checked }
      .then((item) => {
        for (let i = 0; i < currentTodoItems.length; i++) {
          if (item._id === currentTodoItems[i]._id) {
            currentTodoItems[i].checked = item.checked;

          }
        }
        setLoaded(false)
        saveCurrentTodoItems(currentTodoItems)
      })
  }

  function onRenewTask(_id, value) {
    setLoaded(true)
    editTodoItems({ _id: _id, text: value }) // same as { _id: _id, value: value }
      .then((item) => {
        console.log(item)
        for (let i = 0; i < currentTodoItems.length; i++) {
          if (item._id === currentTodoItems[i]._id) {
            currentTodoItems[i].text = item.text;
          }
        }
        
        saveCurrentTodoItems(currentTodoItems)
        setLoaded(false)
      })
     
  }


  let onDragEnd = result => {
    setLoaded(true)
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index) {
      return;
    }

    let newindex 
    if(destination.index === 0){
      newindex = currentTodoItems[destination.index].index  / 1.5;
      console.log(newindex)
    }
    
    else {
      newindex = (currentTodoItems[destination.index].index + currentTodoItems[destination.index - 1].index) / 2;
    }
     
    let itemToChange = currentTodoItems[source.index];
    itemToChange.index = newindex;
    onSort(currentTodoItems);
    saveCurrentTodoItems(currentTodoItems);
    
    
    
    editTodoItems({ _id: itemToChange._id, index: newindex })
      .then((itemfromServer) => {
        currentTodoItems[currentTodoItems.findIndex(i => i._id === itemfromServer._id)] = itemfromServer;
        saveCurrentTodoItems(currentTodoItems);
        setLoaded(false)
      });
      
  };


  function onPrioritize(_id, priority) {
    setLoaded(true)
    editTodoItems({ _id, priority }) // same as { _id: _id, priority: priority }
    
    .then((item) => {
        for (let i = 0; i < currentTodoItems.length; i++) {
          if (item._id === currentTodoItems[i]._id) {
            currentTodoItems[i].priority = item.priority;

          }
        }
        currentTodoItems.sort((a, b) => {
          return Number(b.priority || false) - Number(a.priority || false)
        });
        
        saveCurrentTodoItems(currentTodoItems)
        setLoaded(false)
      })
  }
  
  let listItems = currentTodoItems.map((task, index) => {

    return (<TodoItem key={task._id} id={task._id} index={index} order={task.index} text={task.text} checked={task.checked} priority={task.priority}
      onDelete={onDelete} onChecked={onChecked} edit={onRenewTask} onPriority={onPrioritize} />)

  });

  let todoForm = (<TodoForm onAdd={onAdd} />);

  function onSetLoder(){
    setLoaded(true)
  }

  return (
   
      <div className="App">
       {loaded ? (<div id="cover-spin">
        </div>
        
      ) : ( 
        <>
        <PageHeader style={{ fontSize: '200%' }} className="header"> Todolist  </PageHeader>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (

              <div className="list-items-container" {...provided.droppableProps}
                ref={provided.innerRef}>
                <List>
                  {listItems}
                  {provided.placeholder}
                </List>

              </div>
            )}

          </Droppable>
        </DragDropContext>

        {todoForm}
        </>
        )}
       
      </div>
      
  );
}

export default App;


