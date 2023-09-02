const mongoose = require("mongoose");

const emptySchema = new mongoose.Schema({});

const Project = mongoose.model("Project", emptySchema);

module.exports = Project;
