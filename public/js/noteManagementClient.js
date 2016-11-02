/*
 * Rest client consisting of a server call to create and update notes.
 */
;(function($) {
    "use strict";
    function Note(title, creationDate, finishDate, importance, finished, description) {
        this.title = title;
        this.creationDate = creationDate;
        this.finishDate = finishDate;
        this.importance = importance;
        this.finished = finished;
        this.description = description;
    }

    function createNote(title, creationDate, finishDate, importance, finished, description) {
        var note = JSON.stringify(new Note(title, creationDate, finishDate, importance, finished, description));
        $.ajax({method: "POST", dataType: "json", contentType: "application/json", url: "/notes/", data: note})
            .done(function (msg) {
                console.log('success: ' + JSON.stringify(msg));
            }).fail(function (msg) {
                console.log('displayNotes failed: ' + msg);
            });
    }

    function updateNote(note) {
        var strNote = JSON.stringify(note);
        $.ajax({method: "PUT", dataType: "json", contentType: "application/json", url: "/notes/" + note.id, data: strNote})
            .done(function (msg) {
                console.log('success: ' + JSON.stringify(msg));
            }).fail(function (msg) {
                console.log('displayNotes failed: ' + msg);
            });
    }
    window.notesClientManageNotes = { createNote: createNote, updateNote: updateNote };
}(jQuery));