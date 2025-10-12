const express = require("express");
const router = express.Router();


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


// Define a route for /todos that sends the todoArr as a response
router.get("/", (req, res) => {
  res.send(todoArr);
});

// to acess single todo item from the array
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id); // to get the id from the url also convert it to integer cause its by default string
  const todo = todoArr.find((item) => item.id === id); // to find the todo item with the given id
  if (!todo) {
    return res.status(404).send("Todo not found"); // if todo item not found, send 404 status
  }
  res.send(todo); // if found, send the todo item as response
});

//post request to create a new todo item

// router.post('/todos',(req,res)=>{
//     const todo = req.body; // to get the todo item from the request body
//     console.log(todo)
//      todoArr.push(todo); // to add the new todo item to the array
//     res.send(todo)

//     // res.status(201).send("Todo item created successfully"); // send 201 status for created

// })

router.post("/", (req, res) => {
  const todo = req.body;
  const newId = todoArr.length > 0 ? todoArr[todoArr.length - 1].id + 1 : 1; // to generate a new id
  const newTodo = { id: newId, ...todo }; // to create a new todo item with the new id
  todoArr.push(newTodo);
  res.status(201).send(newTodo); // send the newly created todo item as response
});

//put request to update a todo item
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todoArr.findIndex((item) => item.id === id); // to find the index of the todo item with the given id
  if (index === -1) {
    return res.status(404).send("Todo not found");
  }
  todoArr.splice(index, 1); // to delete the todo item from the array
  res.send("Todo item deleted successfully"); // send a success message as response
});


module.exports = router;