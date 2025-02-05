const express = require('express');
const { v1: uuidv1 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// In-memory array to store users
const users = [];

app.get('/', (req, res) => {
    res.send('Server is running!');
});
//  POST /api/users
app.post('/api/users', (req, res) => {

    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: uuidv1(),
        name,
        email
    };
    users.push(newUser);

    res.status(201).json({ message: 'User created successfully', user: newUser });
});


// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
});

// PUT(Update) /api/users/:id
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Not Found' });
    }

    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    user.name = name;
    user.email = email;

    res.status(200).json({ message: 'User updated successfully', user });
});

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser[0] });
});
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing