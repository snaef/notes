/**
 * Created by sonja on 30/10/16.
 */
var render  = (function() {
    "use strict";
    var notesTemplate = $("#notesTemplate").html();
    var createNotesHtml = Handlebars.compile (notesTemplate);

    Handlebars.registerHelper("imgFor", function(from, to, incr, block) {
        var str = "";
        for(var i = from; i < to; i += incr)
            str = str + "<img class='flash' src='../images/flash.svg' alt='Flash icon'>"
        return str;
    });

    function publicRenderNotes(notes) {
        console.log("Render notes");
        removeContentElements();
        $("#main_content").append(createNotesHtml(notes));

        registerEditButtons();
    }


    function registerEditButtons() {
        var buttons = document.getElementsByClassName("edit_button");
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", clickEditEventHandler);
        }
    }

    function clickEditEventHandler(event) {
        var noteId = event.target.getAttribute("noteId");
        $(function() {
            var client = window.notesClientViewNotes;
            var note = client.getNote(noteId);
            localStorage.setItem("selectedNote", JSON.stringify(note));
        });
        location.href="../html/create_note.html";
    }

    // Remove all child elements in the content section before adding new notes.
    // Else the notes are duplicated when sorting / filtering the notes.
    function removeContentElements() {
        var contentElement = document.getElementById("main_content");
        while (contentElement.firstChild) {
            contentElement.removeChild(contentElement.firstChild);
        }
    }

    function publicRenderNote(note) {
        console.log("Render note");
        document.getElementById("title").value = note.title;
        document.getElementById("datepicker").value = note.finishDate;
        document.getElementById("description").value = note.description;
        $("input[name=importance][value=" + note.importance + "]").attr('checked', 'checked');
    }

    return {
        renderNotes : publicRenderNotes,
        renderNote : publicRenderNote
    }

})();