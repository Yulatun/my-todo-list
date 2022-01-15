import TodoItem from "./TodoItem";

var currentTodoItems = [
    { id: 1, text: "eat", checked: true },
    { id: 2, text: "sleep", checked: false },
    { id: 3, text: "eat", checked: false }
];

currentTodoItems.map = function(transformationFunction) {
    var result = [];
    for (var i = 0; i < currentTodoItems.length; i++) {
        var currentArrayElement = currentTodoItems[i];
        var transformationResult = transformationFunction(currentArrayElement);
        result.push(transformationResult);
    }
    return result;
}

// var array = [
//     1,
//     2,
//     3,
// ];

// var myText = currentTodoItems[2].text;

// var result = [];
// for (var i = 0; i < currentTodoItems.length; i++) {
//     var t = currentTodoItems[i];
//     result.push((<TodoItem id={t.id} text={t.text} checked={t.checked} onDelete={onDelete} />))
// }

// currentTodoItems.map(function(abc) {
//     return (<TodoItem id={abc.id} text={abc.text} checked={abc.checked} onDelete={onDelete} />)
// })



// function hello1 () {
//     return hello
// }

// hello1()


// function hello2(name) {

// }