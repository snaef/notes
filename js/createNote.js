/**
 * Created by sonja on 06/10/16.
 */

var selectedNote = null;

function clickSubmitEventHandler() {
    var id;
    var creationDate = new Date().toLocaleDateString("de-ch");
    var title = document.getElementById("title").value;
    var finishDate = document.getElementById("finishDate").value;
    var description = document.getElementById("description").value;
    var finished = false;

    if (selectedNote !== null) {
        id = selectedNote.id;
        creationDate = selectedNote.creationDate;
    }

    notesService.saveNote(id, title, creationDate, finishDate, 1, finished, description);
    notesService.clearSelectedNote();
    window.location.replace("index.html");
}

function clickCancelEventHandler() {
    notesService.clearSelectedNote();
    window.location.replace("index.html");
}

function displayNote(note) {
    document.getElementById("title").value = note.title;
    document.getElementById("finishDate").value = note.finishDate;

    document.getElementById("description").value = note.description;
}

window.onload = function () {
    console.log("create_note.html loaded");
    document.getElementById("submit").addEventListener("click", clickSubmitEventHandler);
    document.getElementById("cancel").addEventListener("click", clickCancelEventHandler);

    selectedNote = notesService.getSelectedNote();

    if (selectedNote !== null) {
        displayNote(selectedNote);
    }
};