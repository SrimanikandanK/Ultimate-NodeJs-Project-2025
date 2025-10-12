const express = require("express");
const app = express();
app.use(express.json());
const todosRoutes = require('./routes/todos')

app.use('/api/todos',todosRoutes) // to use the todos routes with the prefix /api

// Start the server and listen on port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
