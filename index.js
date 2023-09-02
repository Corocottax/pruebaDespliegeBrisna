require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectsData = require("../data");
const Project = require("../models");

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL
    );
    console.log("Éxito al conectarse a la base de datos ☺️");
  } catch (err) {
    console.log("Error al conectar con la DB:", err);
  }
};

connectDB();

// Requerido para poder hacer peticiones desde otra página! 
app.use(cors());

app.use("/createproject", async (req, res, next) => {
  try {
    await Project.collection.drop();
    await Project.collection.insertMany(projectsData);

    return res.status(201).json("datos creados correctamente");
  } catch (err) {
    console.log("Error", err);
  }
});

app.use("/getprojects", async (req, res, next) => {
    try {
      const projects = await Project.find().lean();
  
      return res.status(200).json(projects);
    } catch (err) {
      console.log("Error", err);
    }
  });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`La aplicación está corriendo en: http://localhost:${PORT}`);
});
