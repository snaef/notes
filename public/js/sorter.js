/*
 * Sorts notes by "Importance", "FinishDate" or "CreationDate" according to the provided sortOrder.
 */
var sorter  = (function() {
    "use strict";
    function publicSortNotes(notes, sortBy, sortOrder) {
        console.log("notesService.publicSortNotes");
        notes.sort(getFunctionName(sortBy));

        if (sortOrder === "desc") {
            notes.reverse();
        }
        return notes;
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

    function compareFinishDate(note1, note2) {
        return note1.finishDate < note2.finishDate ? 1 : -1;
    }

    function compareImportance(note1, note2) {
        return note1.importance < note2.importance ? 1 : -1;
    }

    function compareCreationDate(note1, note2) {
        return note1.creationDate < note2.creationDate ? 1 : -1;
    }

    return {
        sortNotes : publicSortNotes
    }
})();