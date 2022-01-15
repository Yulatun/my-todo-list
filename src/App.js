import logo from './logo.svg';
import './App.css';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import React, { useState } from 'react';

//функция, которая делает наше приложение

function saveTodo(array) {
  localStorage.setItem('SAVED_TODO_ITEMS', JSON.stringify(array));
}

function getTodo() {
  var saveTodoItemsFromLocalStorage = localStorage.getItem('SAVED_TODO_ITEMS')
  
  var restoredSavedArray = saveTodoItemsFromLocalStorage ? JSON.parse(saveTodoItemsFromLocalStorage) : [
    { id: "1", text: "eat", checked: true },
    { id: "2", text: "sleep", checked: false },
    { id: "3", text: "eat", checked: false }
  ];
  return restoredSavedArray 
}

function App() {
// array - измененный массив currenTodoItems
 
  //объявляю переменную currenTodoItems она является массивом данных состоящим из объектов. Объекты имеют id и проперти: text, checked
  // setCurrenTodoItems -  функция меняющая состояние currenTodoItems, useState сохраняет состояние currenTodoItems
  var [currenTodoItems, setCurrenTodoItems] = useState(getTodo());

  // for (var=i;)
  // console.log(currenTodoItems[].text)

  // функция с параметром а вызывает .push метод, который добавляет новый элемент {объект с id и проперти text, checked } в конец массива 
  //currenTodoItems !! А ЭТО ПАРАМЕТР ОТКУДА ОН БЕРЕТСЯ И КАК ПЕРЕДАЕТСЯ (потому что a это пропс через который React 
  // собирал все JSX-атрибуты и дочерние элементы в один объект а и передал их в параметр) КАК ОН ПОНЯЛ ЧТО НУЖНО ИММЕННО ЭТИ ДАННЫЕ ПЕРЕДАТЬ

  // Если добавилось успешно - возвращается true, если нет - false
  function savedCurrenTodoItems (array) {
    setCurrenTodoItems(array)
    saveTodo(array)
  }

  function onAdd(a) {
    // сравнить текущий текст с тем, что уже написан
    //если текст новый - то добавить его, 
    //если у текста есть дубликат выдать ошибку
    var preventDublicate = true
  
    for (var i = 0; i < currenTodoItems.length; i++) {
      if (currenTodoItems[i].text === a) {
        preventDublicate = false
        break
      } 
    }

    if (preventDublicate) {
      currenTodoItems.push({ id: a, text: a, checked: false })
      var currentArray = [...currenTodoItems]
      savedCurrenTodoItems(currentArray)
      
    }
    return preventDublicate
  }


  // setCurrenTodoItems рендерит (отрисовывает) измененный массив currenTodoItems с новым элементом
  //   setCurrenTodoItems([...currenTodoItems])
  //Когда мы добавляем новый элемент в массив { id: a, text: a, checked: false }, setCurrenTodoItems отрисовывает новый массив 
  // без элемента с одинаковыми text: a,
  // функция с параметром id вызывает переменную filtered которая является методом .filter. Он создает новый массив со всеми данными 
  // прошедшими критерий фильтра. 
  function onDelete(id) {
    var filtered = currenTodoItems.filter(function (lapochka) {
      //Фильтр: это фунция с параметром лапочка вызывает сравнение  id параметра функции lapochka и id функции onDelete
      return lapochka.id !== id;
    })
    // вызывается функция setCurrenTodoItems с параметром filtered
    savedCurrenTodoItems(filtered)
    
  }

  // function onChecked (id,checked) {
  //   // взять айди и по нему найти объект и поменять у объекта значение чект, сохранить todoitem
  //   var checkeditem = checked;
  //   var checkedidItems = currenTodoItems.filter(function(search){
  //     return (search.checked == checkeditem)
  //   })

  // }

  // переменная массив listItems вызывает метод .map который создает новый массив данных на основе currenTodoItems
  // функция  с параметром t (будет автоматически присваиваться каждому элементу массива)

  var listItems = currenTodoItems.map(function (t) {
    // вызывает компонент TodoItem key={t.id} - по умолчанию 
    return (<TodoItem key={t.id} id={t.id} text={t.text} checked={t.checked} onDelete={onDelete}/>)

  });



  // рендерим компонент <TodoForm> с пропсом onAdd со значением функция onAdd

  return (
    <div className="App">
      <h1>Todolist</h1>
      <ul>
        {listItems}

      </ul>

      <TodoForm onAdd={onAdd} />

    </div>
  );
}

export default App;




// var restoredTodoList = JSON.parse(localStorage.getItem('saveTodoList'));

// console.log(restoredTodoList)