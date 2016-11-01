/**
 * Created by sonja on 30/10/16.
 */
var express = require('express');
var router = express.Router();
var controller = require('../controller/notesController.js');

//router.get("/", controller.showIndexPage);
router.get("/notes", controller.getAllNotes);
router.get("/notes/:id/", controller.getNote);
router.post("/notes/", controller.createNote);
router.put("/notes/:id/", controller.updateNote);

module.exports = router;
