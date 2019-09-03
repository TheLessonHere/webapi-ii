const express = require('express');
const db = require('../data/db')
const router = express.Router();

// .post routes
router.post('/', (req, res) => {
    const keys = Object.keys(req.body);
    function reqKeys() {
        return [].includes.call(arguments, 'title') && 
        [].includes.call(arguments, 'contents');
    };
    const success = reqKeys(...keys);

    if(success){
    db.insert(req.body)
    .then(response => {
        console.log(response);
        res.status(201).json(response)
    })
    .catch(err => {
        res.status(500).json({ error: "Could not save post to the database"})
    });
} else {
    res.status(400).json({ errorMessage: "Please provide a title and contents for the post" })
}
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const keys = Object.keys(req.body);
    function reqKeys() {
        return [].includes.call(arguments, 'text')};
    const success = reqKeys(...keys);
    const newComment = {
        text: req.body.text,
        post_id: id
    }

    db.findById(id)
    .then(response => {
        if(success){
            db.insertComment(newComment)
            .then(response => {
                res.status(201).json(response)
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
        } else {
            res.status(400).json({ errorMessage: "Please provide text for the comment." })
        }
    })
    .catch((err) => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    });
})

// .get routes

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if(Object.keys(post).length !== 0){
            res.status(200).json(post);
        }
        else {
            console.log("this post was not found");
            res.status(404).json({ message: `The post with the specified id: ${id} does not exist.` })
        }
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while retrieving this post on the database"})
    })
})

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        db.findPostComments(post[0].id)
            .then(comments => {
                res.status(200).json(comments)
            })
            .catch(err => {
                res.status(500).json({ error: "The comments information could not be retrieved" })
            })
    })
    .catch(err => {
        res.status(404).json({ message: `The post with the specified id: ${id} does not exist.` })
    })
})

// .put routes

router.put('/:id', (req, res) => {
    res.status(200).json({ url: '/api/posts/:id', operation: 'PUT' });
})

// .delete routes

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    res.status(200).json({
        url: `/${id}`,
        operation: `DELETE for post with id ${id}`
    });
})

module.exports = router;