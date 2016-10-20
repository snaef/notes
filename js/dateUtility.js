/**
 * Created by sonja on 08/10/16.
 */

// Expects local date string in the format dd.mm.yyyy
function convertLocalDateStrToUTC(localDateStr) {
    var dateSplit = localDateStr.split(".");
    var date = new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]);
    var newDate =  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()));

    return newDate;
}

