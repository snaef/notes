/**
 * Created by sonja on 06/10/16.
 */
$( document ).ready(function() {
    "use strict";

    var selectedNote = notesService.getSelectedNote();

    $(function() {
        document.getElementById("submit").addEventListener("click", clickSubmitEventHandler);
        document.getElementById("cancel").addEventListener("click", clickCancelEventHandler);
        $("#datepicker").datepicker({dateFormat: "dd.mm.yy"});

        if (selectedNote !== null) {
            displayNote(selectedNote);
        }
    });

    function displayNote(note) {
        document.getElementById("title").value = note.title;
        document.getElementById("datepicker").value = note.finishDate;
        document.getElementById("description").value = note.description;
        $("input[name=importance][value=" + note.importance + "]").attr('checked', 'checked');
    }

    function clickSubmitEventHandler() {
        var id;

        var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        var creationDate = new Date().toLocaleDateString("de-ch", options);
        var title = document.getElementById("title").value;
        var finishDate = document.getElementById("datepicker").value;
        var description = document.getElementById("description").value;
        var finished = false;
        var importance = document.querySelector('input[name = "importance"]:checked').value;
        if (selectedNote !== null) {
            id = selectedNote.id;
            creationDate = selectedNote.creationDate;
        }

        notesService.saveNote(id, title, creationDate, finishDate, importance, finished, description);
        notesService.clearSelectedNote();
        window.location.replace("index.html");
    }

    function clickCancelEventHandler() {
        if (selectedNote !== null) {
            notesService.clearSelectedNote();
        }

        window.location.replace("index.html");
    }
});