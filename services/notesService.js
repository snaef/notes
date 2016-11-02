/*
 * Notes backend services.
 */
"use strict";
var Datastore = require('nedb');
var db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(title, finishDate, creationDate, importance, finished, description) {
    this.title = title;
    this.finishDate = finishDate;
    this.creationDate = creationDate;
    this.importance = importance;
    this.finished = finished;
    this.description = description;
}

function publicGetAllNotes(callback) {
    db.find({}, function (err, notes) {
        if (notes !== null) {
            console.log("GetAllNotes: " + JSON.stringify(notes));
        }
        callback( err, notes);
    });
}

function publicGetNote(id, callback) {
    db.findOne({ _id: id }, function (err, note) {
        if (note !== null) {
            console.log("GetNote: " + JSON.stringify(note));
        }
        callback( err, note);
    });;
}

function publicCreateNote(note, callback) {
    db.insert(note, function (err, note) {
        if (note !== null) {
            console.log("CreateNote: " + JSON.stringify(note));
        }
        callback(err, note);
    })
}

function publicUpdateNote(id, note, callback) {
    db.update({_id: id}, note, function (err, note) {
        if (note !== null) {
            console.log("UpdateNote: " + JSON.stringify(note));
        }
        callback(err, note);
    });
}

module.exports = {
    getAll : publicGetAllNotes,
    get : publicGetNote,
    create : publicCreateNote,
    update : publicUpdateNote
};