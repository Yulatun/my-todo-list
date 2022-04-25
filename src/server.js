


export function getTodoItems() {
  return fetch('/rest/todoitems', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((currentTodoItems) => {
      return onSort(currentTodoItems)
    })
}


export function onSort(array) {
  return array.sort((a, b) => {
    if (a.index === b.index) {
      return Number(a.priority || false) - Number(b.priority || false) // with Number() bolean turn into number 
    }
    if (a.index > b.index) {
      if (a.priority) {
        return -1;
      } else {
        return 1;
      }
    }
    if (a.index < b.index) {
      if (b.priority) {
        return 1;
      } else {
        return -1;
      }
    }
  })
}

export function createTodoItems(itemsFromServer) {

  return fetch('/rest/todoitems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
    },
    body: JSON.stringify(itemsFromServer),
  })
    .then((response) => {
      return response.json();
    })
}



export function editTodoItems(replacement) {
 
  return fetch(`/rest/todoitems/${replacement._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
    },
    body: JSON.stringify(replacement),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
}



export function deleteToDoItems(id) {
  fetch(`/rest/todoitems/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
    },

  })
    .then((response) => {
      return response.json();
    })
 
}



