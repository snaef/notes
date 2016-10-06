/**
 * Created by sonja on 06/10/16.
 */
function send(){
    var users = JSON.parse(sessionStorage.getItem("users"));
    users.push(document.getElementById("name").value);
    sessionStorage.setItem("users", JSON.stringify(users));
    window.location.replace("list.html");
};

function clickSubmitEventHandler() {
    var notes = JSON.parse(sessionStorage.getItem("notes"));
    var title = document.getElementById("title").value;
    var dueDate = document.getElementById("dueDate").value;
    var description = document.getElementById("description").value;
    var note = {
        id : notes.length + 1,
        title : title,
        dueDate : dueDate,
        description : description,
        creationDate : new Date().toLocaleDateString("de-CH"),
        importance : 1,
        finished : false
    };
    console.log(note);
    notes.push(note);
    console.log("note added:" + notes.toString());
    sessionStorage.setItem("notes", JSON.stringify(notes));
    window.location.replace("index.html");
}



window.onload = function () {
    console.log("create_note.html loaded");

    document.getElementById("submit").addEventListener("click", clickSubmitEventHandler);

};