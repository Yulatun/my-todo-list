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
      });

}



export function saveTodoItems(itemsFromServer){
    return fetch('/rest/todoitems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
        },
         body:  JSON.stringify(itemsFromServer),
    })
      .then((response) => {
        return response.json();
      })


}


//   fetch('/rest/todoitems/624d427ca8cb377c00035f04', {
//     method: 'PUT',
//     headers: {
//         'Content-Type': 'application/json',
//         'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
//     },
//     body:  JSON.stringify(),
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });


//   fetch('/rest/todoitems/624d427ca8cb377c00035f04', {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//         'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
//     },
//     // body:  JSON.stringify(),
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });


//  let id = '624d7a46a8cb377c0003633a'
  
//   fetch(`/rest/todoitems/${id}`, {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json',
//         'x-apikey': '7b940dc03883e5d0d7b7e852ddb68b0c11134'
//     },
//     // body:  JSON.stringify(),
// })
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   }); 

 
// export default { fetch }; // { fetch } === {fetch:fetch}


//   fetch('https://example.com/profile', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => response.json())
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

