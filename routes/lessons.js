const express = require('express');
const router = express.Router();
const Lesson = require('../models/lesson.js');

router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json(lessons)
  } catch (err){
    res.status(500).json({ message: err.message})
  }
})

router.get('/:id', (req, res) => {
  res.send(req.params.id);
})

router.post('/', async (req, res) => {
  const lesson = new Lesson({
    lessonAuthor: req.body.lessonAuthor,
    lessonTitle: req.body.lessonTitle
  })
  try {
    const newLesson = await lesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    res.status(400).json({ message: err.message});
  }
})

module.exports = router;
