/**
 * Created by sonja on 06/10/16.
 */
function clickSubmitEventHandler() {
    var id;
    var title = document.getElementById("title").value;
    var finishDate = document.getElementById("finishDate").value;
    var creationDate = new Date().toLocaleDateString("de-ch");
    var description = document.getElementById("description").value;
    var finished = false;

    notesService.saveNote(id, title, creationDate, finishDate, 1, finished, description);

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

    var selectedNoteId = notesService.getSelectedNote();

    if (selectedNoteId !== undefined) {
        var selectedNote;
        var notes = notesService.getNotes();
        notes.forEach(function (note) {
            if (note.id.toString() === selectedNoteId) {
                selectedNote = note;
            }
        });
        displayNote(selectedNote);
    }

};