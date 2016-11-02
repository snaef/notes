/*
 * Handles events of the main UI.
 */
;(function($) {
    "use strict";

    $(function() {
        var client = window.notesClientViewNotes;
        client.displayNotes("Importance", "asc");
        document.getElementById("sort_by_finish_date").addEventListener("click", clickFinishDateSortEventHandler);
        document.getElementById("sort_by_importance").addEventListener("click", clickImportanceSortEventHandler);
        document.getElementById("sort_by_creation_date").addEventListener("click", clickCreationDateSortEventHandler);
        document.getElementById("filter_finished").addEventListener("click", clickFinishedFilterEventHandler);
        document.getElementById("create_note").addEventListener("click", clickCreateNoteEventHandler);
        document.getElementById("style_switch").addEventListener("change", switchStyleEventHandler);

        // used to remember the current sort orders (due date, creation date, importance).
        var sortOrderMap = {};
        // used to rember the current state of the finished filter.
        var filtered = false;
        var currentButtonColor = "";

        function clickFinishDateSortEventHandler() {
            var sortOrderKey = "FinishDate";
            var sortOrder = getSortOrder(sortOrderKey);
            client.displayNotes(sortOrderKey, sortOrder, null);
        }

        function clickImportanceSortEventHandler() {
            var sortOrderKey = "Importance";
            var sortOrder = getSortOrder(sortOrderKey);
            client.displayNotes(sortOrderKey, sortOrder, null);
        }

        function clickCreationDateSortEventHandler() {
            var sortOrderKey = "CreationDate";
            var sortOrder = getSortOrder(sortOrderKey);
            client.displayNotes(sortOrderKey, sortOrder, null);
        }

        function clickFinishedFilterEventHandler() {
            var notes;
            if (!filtered) {
                filtered = true;
                client.displayNotes(null, null, filtered);

            }
            else {
                filtered = false;
                client.displayNotes(null, null, filtered);
            }
        }

        function clickCreateNoteEventHandler() {
            location.href="noteManagement.html";
        }

        function switchStyleEventHandler(event) {
            var index = event.target.selectedIndex;
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

        function removeCurrentRandomColor(elements, styles) {
            for (var i = 0; i < elements.length; i++) {
                var str = elements[i].className;
                for (var j = 0; j < styles.length; j++) {
                    var newStr = str.replace(styles[j], "");
                    elements[i].className = newStr;
                    if (newStr.length < str.length) {
                        break;
                    }
                }
            }
        }

        function getSortOrder(sortOrderKey) {
            var currentSortOrder = sortOrderMap[sortOrderKey];
            var newSortOrder;
            switch(currentSortOrder) {
                case "asc":
                    newSortOrder = "desc";
                    break;
                case "desc":
                    newSortOrder = "asc";
                    break;
                default:
                    newSortOrder = "asc";
            }
            // update sortOrderMap to new current sort order
            sortOrderMap[sortOrderKey] = newSortOrder;

            return newSortOrder;
        }
    });
}(jQuery));