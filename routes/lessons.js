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

router.get('/:id', getLesson, async (req, res) => {
  res.json(res.lesson);
  //if getLesson is used as middleware then the next try/catch block is unnecessary
  //   try {
    //     const lesson = await Lesson.findById(req.params.id);
    //     res.json(lesson)
    //   } catch (err){
      //     res.status(500).json({ message: err.message})
      //   }
    });

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

    router.delete('/:id', async (req, res) => {
      let lesson;
      try {
        lesson = await Lesson.findById(req.params.id);
        if(lesson == null) {
          return res.status(404).json({ message: "cannot find lesson" })
        }
        res.json(lesson)
      } catch (err){
        res.status(500).json({ message: err.message })
      }
      res.lesson = lesson;
      res.lesson.remove();

      console.log('deleted: ', lesson.lessonTitle);
    })

    router.patch('/:id', async (req, res) => {
      let lesson;
      try {
        lesson = await Lesson.findById(req.params.id);
        if(lesson == null) {
          return res.status(404).json({ message: "cannot find lesson" })
        }
        res.json(lesson)
      } catch (err){
        res.status(500).json({ message: err.message })
      }
      res.lesson = lesson;

      if(req.body.lessonTitle != null) {
        res.lesson.lessonTitle = req.body.lessonTitle;
      }
      if(req.body.lessonAuthor != null) {
        res.lesson.lessonAuthor = req.body.lessonAuthor;
      }
      try {
        const updatedLesson = res.lesson.save();
        res.json(updatedLesson);
      } catch(err) {
        res.status(404).json({ message: "lesson not updated" });
      }
    });
    //the below function is middleware to that fetches a specific lesson
    async function getLesson(req, res, next) {
      let lesson;
      try {
        lesson = await Lesson.findById(req.params.id);
        if(lesson == null) {
          return res.status(404).json({ message: "Cannot find lesson" });
        }
      } catch (err) {
        return res.status(500).json({ message: 'The ID selected was not found.' });
      }
      res.lesson = lesson;
      next();
    }

    module.exports = router;
