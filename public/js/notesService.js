/**
 * Created by sonja on 08/10/16.
 */
var notesService  = (function() {
    // Keeps track of the notes in the current sorting order and filter state
    var notes = [];
    var client = window.restClient;
    function publicSaveNote(id, title, creationDateStr, finishDateStr, importance, finished, description) {
        var creationDateUTC = moment.utc(creationDateStr, "DD.MM.YYYY").format();
        var finishDateUTC = moment.utc(finishDateStr﻿, "DD.MM.YYYY").format();
        var note = new Note(id, title, creationDateUTC, finishDateUTC, importance, finished, description);
        notesStorage.saveNote(note);
    }

    function Note(id, title, creationDate, finishDate, importance, finished, description) {
        if (id === undefined) {
            this.id = notesStorage.loadNotes().length + 1;
        }
        else {
            this.id = parseInt(id);
        }
        this.title = title;
        this.creationDate = creationDate;
        this.finishDate = finishDate;
        this.importance = importance;
        this.finished = finished;
        this.description = description;
    }

    function publicCreateNote(id, title, creationDate, finishDate, importance, finished, description) {
        return new Note(id, title, creationDate, finishDate, importance, finished, description);
    }



    function publicApplyFinishedFilter() {
        console.log("notesService.publicApplyFinishedFilter");
        for (var i = notes.length -1 ; i >= 0; i--) {
            if (notes[i].finished === false) {
                console.log("removed note " + notes[i].id);
                notes.splice(i, 1);
            }
        }
        return convertToPublicNotes(notes);
    }

    function publicClearFinishedFilter() {
        console.log("notesService.publicClearFinishedFilter");
        notes = notesStorage.loadNotes();
        return convertToPublicNotes(notes);
    }

    /*
     * Converts the note as it should be displayed to the user (e.g. UTC date is converted to local date).
     */
    function convertToPublicNotes(notes) {
        var publicNotes = [];
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        notes.forEach(function(note) {
            var publicNote = new Note(
                note.id,
                note.title,
                moment(note.creationDate).local().format("DD.MM.YYYY"),
                moment(note.finishDate).local().format("DD.MM.YYYY"),
                //note.creationDate.toLocaleDateString("de-CH", options),
                //note.finishDate.toLocaleDateString("de-CH", options),
                note.importance,
                note.finished,
                note.description
            );
            publicNotes.push(publicNote);
        });
        return publicNotes;
    }

    function publicGetNotes() {
        console.log("notesService.publicGetNotes");
        notes = client.getAllNotes();
        /*if (typeof notes[0] === 'undefined' || notes.length === 0) {
            notes = notesStorage.loadNotes();
        }*/
        return convertToPublicNotes(notes);
    }

    function publicSetSelectedNote(id) {
        notesStorage.setSelectedNote(id);
    }

    function publicGetSelectedNote() {
        var note = notesStorage.getSelectedNote();
        if (note !== null) {
            var notes = [];
            notes.push(note);
            return convertToPublicNotes(notes)[0];
        }
        return null;
    }

    function publicClearSelectedNote() {
        notesStorage.clearSelectedNote();
    }

    return {
        createNote : publicCreateNote,
        saveNote : publicSaveNote,
       // sortNotes : publicSortNotes,
        applyFilter : publicApplyFinishedFilter,
        clearFilter : publicClearFinishedFilter,
        getNotes : publicGetNotes,
        setSelectedNote : publicSetSelectedNote,
        getSelectedNote : publicGetSelectedNote,
        clearSelectedNote : publicClearSelectedNote
    };

}(jQuery));