/**
 * Created by sonja on 06/10/16.
 */
;(function($) {
    "use strict";
    var tmpNote = localStorage.getItem("selectedNote");
    var selectedNote = null;
    if (tmpNote !== null) {
        selectedNote = JSON.parse(tmpNote);
        document.getElementById("title").value = selectedNote.title;
        document.getElementById("datepicker").value = selectedNote.finishDate;
        document.getElementById("description").value = selectedNote.description;
        $("input[name=importance][value=" + selectedNote.importance + "]").attr('checked', 'checked');
    }

    document.getElementById("submit").addEventListener("click", clickSubmitEventHandler);
    document.getElementById("cancel").addEventListener("click", clickCancelEventHandler);
    $("#datepicker").datepicker({dateFormat: "dd.mm.yy"});

    function clickSubmitEventHandler() {
        var title = document.getElementById("title").value;
        var finishDate = document.getElementById("datepicker").value;
        var description = document.getElementById("description").value;
        var finished = false;
        var importance = document.querySelector('input[name = "importance"]:checked').value;

        if (selectedNote !== null) {
            selectedNote = updateValues(title, finishDate, description, finished, importance);
            $(function() {
                var client = window.notesClientManageNotes;
                client.updateNote(selectedNote);
            });
        }
        else {
            $(function() {
                var client = window.notesClientManageNotes;
                var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
                var creationDate = new Date().toLocaleDateString("de-ch", options);
                client.createNote(title, creationDate, finishDate, importance, finished, description);
            });
        }
        localStorage.removeItem("selectedNote");
        location.href="index.html";
    }

    function updateValues(title, finishDate, description, finished, importance) {
        selectedNote.title = title;
        selectedNote.finishDate = finishDate;
        selectedNote.description = description;
        selectedNote.finished = finished;
        selectedNote.importance = importance;
        return selectedNote;
    }

    function clickCancelEventHandler() {
        localStorage.removeItem("selectedNote");
        window.location.replace("index.html");
    }
}(jQuery));