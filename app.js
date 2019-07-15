const express = require('express');
const mongoose = require('mongoose');
const lessons = require('./api.js');
const app = express();
const PORT = process.env.PORT || 3000;
// const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/lessons';
// const db = mongoose.connection;

// mongoose.connect(
//   DATABASE_URL,
//   { useNewUrlParser: true }
// );
// db.on('error', error => console.error(error));
// db.once('open', () => console.log('Connected to Database'));
app.use(express.json());

app.listen(PORT, console.log(`listening on port: ${PORT}`));

app.get('/', (req, res) => res.send('Hello Whirled'));

app.get('/api/lessons/', (req, res) => res.send(lessons));

app.get('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find((l) => {
    return l.id === parseInt(req.params.id);
  });
  if(!lesson) {
    res.status(404).send('The lesson ID given was not found');
  }
  res.send(lesson);
});

app.post('/api/lessons', (req, res) => {
  if(!req.body.lesson || req.body.lesson.length < 3) {
    res.status(400).send('lesson required and should be at least 3 characters long.')
  }
  const lesson = {
    id: lessons.length + 1,
    lesson: req.body.lesson
  }
  lessons.push(lesson);
  res.send(lessons)
})

app.put('/api/lessons/:id', (req, res) => {
  if(!req.body.lesson || req.body.lesson.length < 3) {
    res.status(400).send('lesson required and should be at least 3 characters long.')
  }
  const lesson = lessons.find((l) => {
    return l.id === parseInt(req.params.id);
  });
  if(!lesson) {
    res.status(404).send('The lesson ID given was not found');
  }
  lesson.lesson = req.body.lesson;
  res.send(lessons);
})

app.delete('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(function(l) {
    return l.id === parseInt(req.params.id);
  });
  if(!lesson) {
    res.status(404).send('The lesson ID given was not found');
  }
  const index = lessons.indexOf(lesson)
  lessons.splice(index, 1);
  res.send(lesson);
})
