/**
 * Created by sonja on 30/10/16.
 */
;(function($) {
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
                console.log('getAllNotes failed: ' + msg);
            });
    }

    function updateNote(note) {
        var strNote = JSON.stringify(note);
        $.ajax({method: "PUT", dataType: "json", contentType: "application/json", url: "/notes/" + note.id, data: strNote})
            .done(function (msg) {
                console.log('success: ' + JSON.stringify(msg));
            }).fail(function (msg) {
                console.log('getAllNotes failed: ' + msg);
            });
    }




    window.notesClientManageNotes = { createNote: createNote, updateNote: updateNote };
}(jQuery));