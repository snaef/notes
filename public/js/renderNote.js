/**
 * Created by sonja on 30/10/16.
 */
var renderNote  = (function() {


    function publicRenderNote(note) {
        console.log("Render note");
        document.getElementById("title").value = note.title;
        document.getElementById("datepicker").value = note.finishDate;
        document.getElementById("description").value = note.description;
        $("input[name=importance][value=" + note.importance + "]").attr('checked', 'checked');
    }

    return {
        renderSingleNote : publicRenderNote
    }

})();