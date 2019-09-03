const express = require('express');

const port = 5000;
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const server = express();
server.use(express.json());

// .post routes
server.post('/api/posts', (req, res) => {
    res.status(201).json({ url: '/api/posts', operation: 'POST' });
})

server.post('/api/posts/:id/comments', (req, res) => {
    res.status(201).json({ url: '/api/posts/:id/comments', operation: 'POST' });
})

// .get routes

server.get('/api/posts', (req, res) => {
    res.send('Hello World')
})

server.get('/api/posts/:id', (req, res) => {
    res.send('Hello World')
})

server.get('/api/posts/:id/comments', (req, res) => {
    res.send('Hello World')
})

// .put routes

server.put('/api/posts/:id', (req, res) => {
    res.status(200).json({ url: '/api/posts/:id', operation: 'PUT' });
})

// .delete routes

server.delete('/api/posts/:id', (req, res) => {
    res.status(204);
})