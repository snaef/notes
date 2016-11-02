"use strict";
var store = require("../services/notesService.js");

module.exports.getAllNotes = function(req, res) {
    store.getAll(function (err, notes) {
        res.type('application/json');
        res.end(JSON.stringify(notes));
    });
}

module.exports.getNote = function (req, res) {
    store.get(req.params.id, function (err, note) {
        res.type('application/json');
        res.end(JSON.stringify(note));
    });
}

module.exports.createNote = function (req, res) {
    var note = req.body;
    store.create(note, function (err, note) {
        res.type('application/json');
        res.end(JSON.stringify(note));
    });
}

module.exports.updateNote = function (req, res) {
    var note = req.body;
    store.update(note._id, note, function (err, note) {
        res.type('application/json');
        res.end(JSON.stringify(note));
    });
}

