const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Task = require("../models/Task");

// Get All Task
router.get("/getAllTasks", function (req, res, next) {
  Task.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// GET SINGLE TASK BY ID
router.get("/getSingleTask/:id", function (req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Add Task
router.post("/addSingleTask", function (req, res, next) {
  Task.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// DELETE SINGLE TASK BY ID
router.delete("/deleteSingleTask/:id", function (req, res, next) {
  Task.findByIdAndDelete(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/updateSingleTask/:id", function (req, res, next) {
  Task.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    Task.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
});

module.exports = router;
