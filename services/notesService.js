/**
 * Created by sonja on 30/10/16.
 */
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
    db.find({}, function (err, docs) {
        callback( err, docs);
    });
}

function publicGetNote(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback( err, doc);
    });;
}

function publicCreateNote(note, callback) {
    db.insert(note, function (err, newNote) {
        callback(err, newNote);
    })
}

function publicUpdateNote(id, note, callback) {
    db.update({_id: id}, note, function (err, dbNote) {
        callback(err, dbNote);
    });
}

module.exports = {
    getAll : publicGetAllNotes,
    get : publicGetNote,
    create : publicCreateNote,
    update : publicUpdateNote
};