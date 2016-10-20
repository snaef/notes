/**
 * Created by sonja on 08/10/16.
 */

/*
    This service manges the storage for the notes. It contains functions to retrieve the notes from the backend and
    local storage and to save new or edited notes.
    This service should only be called from the "notesService", not from any other services. The reason is that the
    notesService provides some data conversion functionalities (e.g. date to local date).
 */
var notesStorage  = (function() {
    function publicLoadNotes() {
        console.log("notesStorage.publicLoadNotes");
        var notes = localStorage.getItem("notes");
        if (notes) {
            notes = replaceStringDates(notes);
        }
        else {
            notes = privateLoadNotes();
        }

        return notes;
    }

    function privateLoadNotes() {
        console.log("load notes");

        var jsonNotes = [
            {
                "id": 1,
                "title": "CAS FE - Projekt im Github eintragen.",
                "finishDate": "2016-01-01T00:00:00Z",
                "creationDate": "2016-01-01T00:00:00Z",
                "importance": 1,
                "finished": true,
                "description": "HTML für die note App erstellen. CSS erstellen für die note app "
            },
            {
                "id": 2,
                "title": "CAS FE - HTML Gerüst erstellen für die WireFrames inkl. CSS.",
                "finishDate": "2016-09-23T00:00:00Z",
                "creationDate": "2016-09-09T00:00:00Z",
                "importance": 5,
                "finished": true,
                "description": ""
            },
            {
                "id": 3,
                "title": "CAS FE - HTML Seite ausprogrammieren.",
                "finishDate": "2016-09-30T00:00:00Z",
                "creationDate": "2016-09-12T00:00:00Z",
                "importance": 3,
                "finished": false,
                "description": "HTML Seite ausprogrammieren: Anzeigen der Einträge / Filtern / Sortieren Daten in einer Variable abspeichern & Beispiel Daten erfassen. Handlebars verwenden für das Rendern der Einträge. "
            }];

        var strNotes = JSON.stringify(jsonNotes);
        var notes = replaceStringDates(strNotes);
        localStorage.setItem("notes", JSON.stringify(jsonNotes));

        return notes;
    }

    /* Converts date strings to dates.*/
    function replaceStringDates(strNotes) {
        console.log(strNotes);
        var notes = JSON.parse(strNotes, function (key, value) {
            console.log(key + " " + value);
                if (typeof value === 'string') {
                    if (value.match(/(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/)) {
                        console.log(value);
                        return new Date(value);
                    }

                }
                return value;
            }
        );
        return notes;
    }

    // TODO: Add here a save function once the server side is available.
    function publicSaveNote(note) {
        console.log("notesStorage.publicSaveNote");

        // referesh sessionStorage
        var notes = localStorage.getItem("notes");
        notes = replaceStringDates(notes);

        for (var i = notes.length -1 ; i >= 0; i--) {
            if (notes[i].id === note.id) {
                // remove existing entry as it is not up-to-date anymore (got edited)
                notes.splice(i, 1);
            }
        }

        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function publicSetSelectedNote(id) {
        var notes = localStorage.getItem("notes");
        notes = replaceStringDates(notes);
        notes.forEach(function(note) {
            if (id === note.id) {
                var n = notesService.createNote(id, note.title, note.creationDate, note.finishDate, note.importance, note.finished, note.description );
                localStorage.setItem("selectedNote", JSON.stringify(n));
            }
        });
    }

    function publicGetSelectedNote() {
        var note = localStorage.getItem("selectedNote");
        if (note === null) {
            return null;
        }

        return replaceStringDates(note);
    }

    function publicClearSelectedNote() {
        localStorage.removeItem("selectedNote");
    }

    return {
        loadNotes : publicLoadNotes,
        saveNote : publicSaveNote,
        setSelectedNote : publicSetSelectedNote,
        getSelectedNote : publicGetSelectedNote,
        clearSelectedNote : publicClearSelectedNote
    };
})();