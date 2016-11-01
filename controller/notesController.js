var store = require("../services/notesService.js");

module.exports.showIndexPage = function(req, res) {
    res.type('test/html');
    //res.sendFile(__dirname + '/../public/index.html');
    //res.sendFile('index.html', {root: 'public/'});
}

module.exports.getAllNotes = function(req, res) {
    store .getAll(function (err, dbNote) {
        res.type('application/json');
        res.end(JSON.stringify(dbNote));
        //next();
    });
}

module.exports.getNote = function (req, res) {
    store.get(req.params.id, function (err, note) {
        res.type('application/json');
        res.end(JSON.stringify(note));
    });
}

module.exports.createNote = function (req, res) {
    var note = req.body;
    store.create(note, function (err, note) {
        res.type('application/json');
        res.end(JSON.stringify(note));
    });
}

module.exports.updateNote = function (req, res) {
    var note = req.body;
    store.update(note._id, note, function (err, note) {
        res.type('application/json');
        res.end(JSON.stringify(note));
        console.log(note);
    });
}

