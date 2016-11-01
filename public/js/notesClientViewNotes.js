/**
 * Created by sonja on 30/10/16.
 */
;(function($) {
    var notes = [];

    $.ajax({method: "GET", dataType: "json", contentType: "application/json", url: "/notes"
        }).done(function (msg) {
           console.log('success: ' + JSON.stringify(msg));
           notes = JSON.parse(JSON.stringify(msg));
           render.renderNotes(notes);
        }).fail(function (msg) {
           console.log('getAllNotes failed: ' + msg);
        });

    function getAllNotes() {
        if (notes.length !== 0) {
            render.renderNotes(notes);
        }
    }


    function getNote(id) {
        for (var i = 0; i <  notes.length; i++) {
            if (notes[i]._id === id) {
                    return notes[i];
            }
        }
        return null;
    }

    window.notesClientViewNotes = { getAllNotes: getAllNotes, getNote: getNote};
}(jQuery));