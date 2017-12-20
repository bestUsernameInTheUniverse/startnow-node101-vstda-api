//import { read } from 'fs';

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//----------ToDoItem CLASS----------
class ToDoItem {
    constructor(todoItemId, name, priority, completed) {
        this.todoItemId = todoItemId;
        this.name = name;
        this.priority = priority;
        this.completed = completed;
    }

    get todoItemId() { return this._todoItemId }
    set todoItemId(value) {
        if (typeof(value) == 'number') { this._todoItemId = value }
        else { console.log("todoItemId not of type 'number'"); }
    }

    get name() { return this._name }
    set name(value) {
        if (typeof(value) == 'string') { this._name = value }
        else { console.log("name not of type 'string'"); }
    }

    get priority() { return this._priority }
    set priority(value) {
        if (typeof(value) == 'number') { this._priority = value }
        else { console.log("priority not of type 'number'"); }
    }

    get completed() { return this._completed }
    set completed(value) {
        if (typeof(value) == 'boolean') { this._completed = value }
        else { console.log("completed not of type 'boolean'"); }
    }

    get item(){
        var item = {
            todoItemId: this.todoItemId,
            name: this.name,
            priority: this.priority,
            completed: this.completed
        }
        return item;
    }
}


//----------CODE THAT DOES STUFF----------
var toDoItems = [];
initializeData();


//----------HELPER FUNCTIONS----------
function initializeData() {
    var todoItem;
    
    todoItem = new ToDoItem (0, 'an item', 3, false);
    toDoItems.push(todoItem);

    todoItem = new ToDoItem (1, 'another item', 2, false)
    toDoItems.push(todoItem);

    todoItem = new ToDoItem (2, 'a done item', 1, true)
    toDoItems.push(todoItem);
}


//----------MIDDLEWARE----------
app.use((req, res, next) => {
    next();
});


//----------ROUTING----------
app.get('/', (req, res) => {
    var body = { status: "ok" };
    res.status(200).send(body);
});


app.get('/api/TodoItems', (req, res) => {
    var body = [];

    for (i = 0; i < toDoItems.length; i++) {
        body.push(toDoItems[i].item);
    }

    res.status(200).send(body);
});


app.get('/api/TodoItems/:number', (req, res) => {
    var index = req.params["number"];
    var body = toDoItems[index].item;

    res.status(200).send(body);
});


app.post('/api/TodoItems/', (req, res) => {
    var body = req.body;
    toDoItems.push(new ToDoItem(parseInt(body.todoItemId), body.name, parseInt(body.priority), body.completed == 'true'));

    res.status(201).send(body);
});


app.delete('/api/TodoItems/:number', (req, res) => {
    var index = req.params["number"];
    var body = toDoItems[index].item;
    if (index >= 0 && index <= toDoItems.length - 1) { toDoItems.slice(index, 1) }
    res.status(200).send(body);
});


module.exports = app;
