/**
 * Created by sonja on 08/10/16.
 */

var notesService  = (function() {
    // Keeps track of the notes in the current sorting order and filter state
    var notes = [];


    function publicSaveNote(id, title, creationDateStr, finishDateStr, importance, finished, description) {
        var creationDateUTC = convertLocalDateStrToUTC(creationDateStr);
        var finishDateUTC = convertLocalDateStrToUTC(finishDateStr);
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

    // TODO: find an easier way
    function getFunctionName(sortBy) {
        var func;
        switch (sortBy) {
            case "Importance":
                func = compareImportance;
                break;
            case "FinishDate":
                func = compareFinishDate;
                break;
            case "CreationDate":
                func = compareCreationDate;
                break;
            default:
                func = compareImportance;
        }
        return func;
    }

    function publicSortNotes(sortBy, sortOrder) {
        console.log("notesService.publicSortNotes");
        notes.sort(getFunctionName(sortBy));

        if (sortOrder === "desc") {
            notes.reverse();
        }
        return convertToPublicNotes(notes);
    }

    function compareFinishDate(note1, note2) {
         return note1.finishDate < note2.finishDate ? 1 : -1;
    }

    function compareImportance(note1, note2) {
        return note1.importance < note2.importance ? 1 : -1;
    }

    function compareCreationDate(note1, note2) {
        return note1.creationDate < note2.creationDate ? 1 : -1;
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
        notes.forEach(function(note) {
            var publicNote = new Note(
                note.id,
                note.title,
                note.creationDate.toLocaleDateString("de-ch"),
                note.finishDate.toLocaleDateString("de-ch"),
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
        if (typeof notes[0] === 'undefined' || notes.length === 0) {
            notes = notesStorage.loadNotes();
        }
        return convertToPublicNotes(notes);
    }

    function publicSetSelectedNote(id) {
        notesStorage.setSelectedNote(id);
    }

    function publicGetSelectedNote() {
        var note = notesStorage.getSelectedNote();
        var notes = [];
        notes.push(note);
        return convertToPublicNotes(notes)[0];
    }

    function publicClearSelectedNote() {
        notesStorage.clearSelectedNote();
    }

    return {
        createNote : publicCreateNote,
        saveNote : publicSaveNote,
        sortNotes : publicSortNotes,
        applyFilter : publicApplyFinishedFilter,
        clearFilter : publicClearFinishedFilter,
        getNotes : publicGetNotes,
        setSelectedNote : publicSetSelectedNote,
        getSelectedNote : publicGetSelectedNote,
        clearSelectedNote : publicClearSelectedNote
    };

})();