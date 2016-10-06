/**
 * Created by sonja on 29/09/16.
 */
'use strict';

var notes = [
    {"id":1, "title":"CAS FE - Projekt im Github eintragen.", "due_date":"16.09.2016", "creation_date":"10.09.2016", "importance":1, "finished":true, "description":"HTML für die note App erstellen. CSS erstellen für die note app "},
    {"id":2, "title":"CAS FE - HTML Gerüst erstellen für die WireFrames inkl. CSS.", "due_date":"23.09.2016", "creation_date":"09.09.2016", "importance":3, "finished":true, "description":""},
    {"id":3, "title":"CAS FE - HTML Seite ausprogrammieren.", "due_date":"30.09.2016", "creation_date":"12.09.2016", "importance":5, "finished":false, "description":"HTML Seite ausprogrammieren: Anzeigen der Einträge / Filtern / Sortieren Daten in einer Variable abspeichern & Beispiel Daten erfassen. Handlebars verwenden für das Rendern der Einträge. "}
];

// used to remember the current sort orders (due date, creation date, importance)
var sortOrderMap = {};
var currentButtonColor = "";

// Remove all child elements in the content section before adding new notes.
// Else the notes are duplicated when sorting / filtering the notes.
function removeContentElements() {
    var contentElement = document.getElementById("main_content");
    while (contentElement.firstChild) {
        contentElement.removeChild(contentElement.firstChild);
    }
}

function renderNotes(notes) {
    removeContentElements();

    var df = document.createDocumentFragment();

    notes.forEach(function (note) {
        var noteEntryElement = document.createElement("div");
        noteEntryElement.className = "note_entry";
        df.appendChild(noteEntryElement);
        var noteElement = document.createElement("div");
        noteElement.className = "note";
        noteEntryElement.appendChild(noteElement);

        var noteHeaderElement = document.createElement("header");
        noteHeaderElement.className = "note_header";
        noteElement.appendChild(noteHeaderElement);

        var dueDateElement = document.createElement("div");
        dueDateElement.className = "due_date";
        dueDateElement.textContent = note.due_date;
        noteHeaderElement.appendChild(dueDateElement);

        var titleElement = document.createElement("div");
        titleElement.className = "title";
        titleElement.textContent = note.title;
        noteHeaderElement.appendChild(titleElement);

        var importanceElement = document.createElement("div");
        importanceElement.className = "importance";
        for (var i = 0; i < note.importance; ++i) {
            var imgElement = document.createElement("img");
            imgElement.className = "flash";
            imgElement.src = "images/flash.svg";
            imgElement.alt = "Flash icon";
            importanceElement.appendChild(imgElement);
        }
        noteHeaderElement.appendChild(importanceElement);

        var noteDetailsElement = document.createElement("div");
        noteDetailsElement.className = "note_details";
        noteElement.appendChild(noteDetailsElement);

        var finishedElement = document.createElement("div");
        finishedElement.className = "finished";
        noteDetailsElement.appendChild(finishedElement);

        var checkElement = document.createElement("input");
        checkElement.type = "checkbox";
        checkElement.checked = note.finished;
        checkElement.disabled = true;
        finishedElement.appendChild(checkElement);

        if (note.description != "") {
            var descriptionElement = document.createElement("div");
            descriptionElement.className = "description";
            descriptionElement.textContent = note.description;
            noteDetailsElement.appendChild(descriptionElement);
        }

        var editElement = document.createElement("div");
        editElement.className = "edit";
        noteEntryElement.appendChild(editElement);

        var editButtonElement = document.createElement("input");
        editButtonElement.type = "button";
        editButtonElement.value = "Edit";
        editButtonElement.className = "edit_button " + currentButtonColor;
        editElement.appendChild(editButtonElement);

    });
    document.getElementById("main_content").appendChild(df);
}

function compareDueDate(note1, note2) {
    return note1.due_date > note2.due_date;
}

function compareImportance(note1, note2) {
    return note1.importance < note2.importance;
}

function compareCreationDate(note1, note2) {
    return note1.creation_date > note2.creation_date;
}

function sortNotes(sortFunction, key) {
    var currentSortOrder = sortOrderMap[key];

    if (currentSortOrder === "asc") {
        renderNotes(notes.sort(sortFunction).reverse());
        sortOrderMap[key] = "desc";
    }
    else {
        renderNotes(notes.sort(sortFunction));
        sortOrderMap[key] = "asc";
    }
    console.log(sortFunction);
}

function clickDueDateSortEventHandler() {
    sortNotes(compareDueDate, "dueDateSort");
}

function clickImportanceSortEventHandler() {
    sortNotes(compareImportance, "importanceSort");
}

function clickCreationDateSortEventHandler() {
    sortNotes(compareCreationDate, "creationDateSort");
}

function filterFinishedNotes(allNotes, notesToFilter) {
    var totalNotes = allNotes.length;
    console.log("Total all notes: " + totalNotes);

    var mainContent = document.getElementById("main_content");
    var notesDisplayed = mainContent.childElementCount;
    console.log("Number of notes displayed: " + notesDisplayed);

    if (totalNotes === notesDisplayed) {
        console.log("remove finished notes");

        for (var i = 0; i < allNotes.length; i++) {
            if (allNotes[i].finished === false) {
                console.log("removed note " + allNotes[i].id);
                delete notesToFilter[i];
                console.log(notesToFilter);
            }
            else {
                console.log("do not remove note " + allNotes[i].id);
            }
        }

        return notesToFilter;
    }
    // Unfilter the notes in case the finished filters were filtered before
    // (unfilter if totalNotes !== notesDisplayed)
    return allNotes;
}

function clickFinishedFilterEventHandler() {
    // Create a copy of the notes and apply filtering on this copy as we do not want to re-load the original notes from the server.
    var notesToFilter = JSON.parse(JSON.stringify(notes));
    var filteredNotes = filterFinishedNotes(notes, notesToFilter);
    renderNotes(filteredNotes);
}

function clickCreateNoteEventHandler() {
    location.href='create_note.html';
}

function removeCurrentRandomColor(elements, styles) {
    for (var i = 0; i < elements.length; i++) {
        var str = elements[i].className;
        for (var j = 0; j < styles.length; j++) {
            var newStr = str.replace(styles[j], '');
            elements[i].className = newStr;
            if (newStr.length < str.length) {
                break;
            }
        }
    }
}

function switchStyleEventHandler(event) {
    var index = event.srcElement.selectedIndex;
    var styles = ["blue_button", "red_button", "green_button", "white_button"];

    var elements = $("input:button");
    removeCurrentRandomColor(elements, styles);

    if (index === 0) {
        $("input:button").addClass("white_button");
        currentButtonColor = "white_button";
    }
    else {
        var randomNumber =  (Math.random() * 2).toFixed(0);

        $("input:button").addClass(styles[randomNumber]);
        currentButtonColor = styles[randomNumber];
        console.log("random style: " + styles[randomNumber]);
    }

}

window.onload = function () {
    console.log(notes);
    renderNotes(notes.sort(compareImportance));
    document.getElementById("sort_by_due_date").addEventListener("click", clickDueDateSortEventHandler);
    document.getElementById("sort_by_importance").addEventListener("click", clickImportanceSortEventHandler);
    document.getElementById("sort_by_creation_date").addEventListener("click", clickCreationDateSortEventHandler);
    document.getElementById("filter_finished").addEventListener("click", clickFinishedFilterEventHandler);
    document.getElementById("create_note").addEventListener("click", clickCreateNoteEventHandler);
    document.getElementById("style_switch").addEventListener("change", switchStyleEventHandler);
};
