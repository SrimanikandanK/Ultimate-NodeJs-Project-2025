const express = require("express"); // Import the Express library
const app = express(); // Create an instance of an Express application
const morgan = require('morgan');

// Define a route for the root URL that sends a response "Hey Buddy"
// below is the callback function which has two parameter req and res
// req -> request from client
// res -> response from server
const todoArr = [
  {
    id: 1,
    task: "Create all API's for PRoject 01",
    tags: ["Nodejs", "Express"],
    status: "todo",
  },
  {
    id: 2,
    task: "Create all API's for PRoject 02",
    tags: ["Nodejs", "Express"],
    status: "in-progress",
  },
  {
    id: 3,
    task: "Create all API's for PRoject 03",
    tags: ["Nodejs", "Express"],
    status: "done",
  },
];
app.use(express.json()); // to parse the json data from the request body

// simple request logger middleware - place before routes so requests are logged
// use morgan for request logging
app.use(morgan('tiny'));

app.get("/", (req, res) => {
  res.send("Hey Buddy");
});

// Define a route for /todos that sends the todoArr as a response
app.get("/todos", (req, res) => {
  res.send(todoArr);
});

// to acess single todo item from the array
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id); // to get the id from the url also convert it to integer cause its by default string
  const todo = todoArr.find((item) => item.id === id); // to find the todo item with the given id
  if (!todo) {
    return res.status(404).send("Todo not found"); // if todo item not found, send 404 status
  }
  res.send(todo); // if found, send the todo item as response
});

//post request to create a new todo item

// app.post('/todos',(req,res)=>{
//     const todo = req.body; // to get the todo item from the request body
//     console.log(todo)
//      todoArr.push(todo); // to add the new todo item to the array
//     res.send(todo)

//     // res.status(201).send("Todo item created successfully"); // send 201 status for created

// })

app.post("/todos", (req, res) => {
  const todo = req.body;
  const newId = todoArr.length > 0 ? todoArr[todoArr.length - 1].id + 1 : 1; // to generate a new id
  const newTodo = { id: newId, ...todo }; // to create a new todo item with the new id
  todoArr.push(newTodo);
  res.status(201).send(newTodo); // send the newly created todo item as response
});

//put request to update a todo item
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todoArr.findIndex((item) => item.id === id); // to find the index of the todo item with the given id
  if (index === -1) {
    return res.status(404).send("Todo not found");
  }
  const updatedTodo = { id: id, ...req.body }; // to create an updated todo item with the same id
  todoArr[index] = updatedTodo; // to update the todo item in the array
  res.send(updatedTodo); // send the updated todo item as response
});

//delete request to delete a todo item
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todoArr.findIndex((item) => item.id === id); // to find the index of the todo item with the given id
  if (index === -1) {
    return res.status(404).send("Todo not found");
  }
  todoArr.splice(index, 1); // to delete the todo item from the array
  res.send("Todo item deleted successfully"); // send a success message as response
});

// eg for splice code

const arr = [10, 20, 30, 40];
const removed = arr.splice(1, 1); // removed = [20]; arr => [10, 30, 40]
console.log(removed);

// middleware to handle 404 errors for undefined routes
// This must come after all route handlers so it only runs when no route matches.

// Express processes middleware and routes in the order 
// they're registered. Earlier you had a 404 handler registered before the routes, 
// so every request hit that middleware and returned 404 immediately. By placing the 404 handler last, real routes like /todos are checked first.

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// generic error handler (Express recognizes this by 4 args)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});



// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
