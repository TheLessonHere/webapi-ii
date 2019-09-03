const express = require('express');

const port = 5000;

const server = express();
server.use(express.json());

const postRoutes = require('./posts/postRoutes');
server.use('/api/posts', postRoutes)

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});