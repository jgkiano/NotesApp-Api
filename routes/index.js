const express       = require('express');
const routes        = express();
const User          = require('../models/user');
const Notes          = require('../models/notes');

//user routes

routes.get('/users/:id', (req, res) => {
    Notes.find({ user: req.params.id, isDeleted: false }).then((notes) => {
        if(notes) {
            res.status(200).json({
                success: true,
                notes
            });
            return;
        }
        res.status(500).json({
            message: 'No notes found'
        });
    }).catch((error) => {
        console.log(error);
    });
});

routes.post('/users', (req, res) => {
    const username = req.body.username;
    if (username) {
        const user = new User({ username });
        user.save().then((user) => {
            res.status(200).json({
                success: true,
                user
            });
        }).catch((error) => {
            console.log(error);
        });
    }
});

//notes routes

routes.get('/:id', (req, res) => {
    Notes.findById(req.params.id).then((note) => {
        if(note) {
            res.status(200).json({
                success: true,
                note
            });
            return;
        }
        res.status(500).json({
            message: 'No note found'
        });
    })
});

routes.post('/', (req, res) => {
    const { user, title, content } = req.body;
    const note = new Notes({ user, title, content });
    note.save().then((note) => {
        res.status(200).json({
            success: true,
            note
        })
    }).catch((error) => {
        console.log(error);
    });
});

routes.put('/:id', (req, res) => {
    const { title, content } = req.body;
    Notes.findByIdAndUpdate(req.params.id, { title, content }, { new:true }).then((note) => {
        if(note) {
            res.status(200).json({
                success: true,
                note
            });
            return;
        }
        res.status(500).json({
            message: 'No note found'
        });
    }).catch((error) => {
        console.log(error);
    });
});

routes.delete('/:id', (req, res) => {
    Notes.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new:true }).then((note) => {
        if(note) {
            res.status(200).json({
                success: true,
                note
            });
            return;
        }
        res.status(500).json({
            message: 'No note found'
        });
    }).catch((error) => {
        console.log(error);
    });
});





module.exports = routes;
