const express = require('express');
const app = express();
const port = 3000;


let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Doe' }
];


app.use(express.json());

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Add a new user
app.post('/users', (req, res) => {
  const newUser = {
     id: 4,
     name: 'Noman' 

  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updateUser = req.body;
  users = users.map(user => (user.id === id ? updateUser : user));
  res.json(updateUser);
});

app.patch('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const partialUpdateUser = req.body;
  users = users.map(user => (user.id === id ? { ...user, ...partialUpdateUser } : user));
  res.json(users.find(user => user.id === id));
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(user => user.id !== id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// Static data (for demonstration purposes)
// Middleware to parse JSON
// Get all users
// Get a single user by ID
// Update a user by ID
// Update a user partially by ID
// Delete a user by ID
// Start the server


