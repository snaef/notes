/*
 * Rest client consisting of a server call to retrieve all notes, resp. one specific note from the local storage .
 */
;(function($) {
    "use strict";
    var notesStore = [];

    function displayNotes(sortBy, sortOrder, filtered) {
        if (filtered !== null && !filtered) {
            clearFinishedFilter();
        }
        if (notesStore.length !== 0) {
            applySortingFiltering(sortBy, sortOrder, filtered)
            render.renderNotes(notesStore);
            console.log("render local notes");
        }
        else {
            loadNotesFromServer(sortBy, sortOrder, filtered);
        }
    }

    function getNote(id) {
        for (var i = 0; i <  notesStore.length; i++) {
            if (notesStore[i]._id === id) {
                return notesStore[i];
            }
        }
        return null;
    }

    function loadNotesFromServer(sortBy, sortOrder, filtered) {
        $.ajax({method: "GET", dataType: "json", contentType: "application/json", url: "/notes"
        }).done(function (msg) {
            notesStore = JSON.parse(JSON.stringify(msg));
            if (notesStore !== null) {
                applySortingFiltering(sortBy, sortOrder, filtered)
                render.renderNotes(notesStore);
                console.log("render server notes");
            }
        }).fail(function (msg) {
            console.log('displayNotes failed: ' + msg);
        });
    }

    function applySortingFiltering(sortBy, sortOrder, filtered) {
        if (sortBy !== null && sortOrder !== null) {
            notesStore = sorter.sortNotes(notesStore, sortBy, sortOrder);
        }
        if (filtered) {
            applyFinishedFilter(notesStore);
        }
    }

    function applyFinishedFilter(notes) {
        console.log("Apply finished filter");
        for (var i = notes.length -1 ; i >= 0; i--) {
            if (notes[i].finished === false) {
                notes.splice(i, 1);
            }
        }
        return notes;
    }

    function clearFinishedFilter() {
        console.log("Removed finished filter");
        notesStore = [];
    }

    window.notesClientViewNotes = { displayNotes: displayNotes, getNote: getNote};
}(jQuery));