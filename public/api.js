var getForm = document.getElementById('user_form');
getForm.addEventListener('submit', getRequest);


function getRequest(event) {
  event.preventDefault();
  var lessonID = event.target.lessonID.value;
  fetch(`/lessons/${lessonID}`)
  .then((response) => response.json())
  .then(function(data) {
    if(!lessonID) {
      document.getElementById('results').innerHTML = '';
      for(var i in data) {
        document.getElementById('results').innerHTML += 'Title: ' + data[i].lessonTitle + '<br />' + ' ID: ' + data[i]._id + '<br />';
      }
    } else {
      document.getElementById('results').innerHTML = '';
      document.getElementById('results').innerHTML = 'Title: ' + data.lessonTitle + '<br />' + ' ID: ' + data._id + '<br />';
    }
    console.log('data: ', data);
  })
}

var postForm = document.getElementById('user_post');
postForm.addEventListener('submit', postRequest);

function postRequest(event) {
  event.preventDefault();
  var lessonTitle = event.target.lessonTitle.value;
  var lessonAuthor = event.target.lessonAuthor.value;
  post = {
    lessonTitle: event.target.lessonTitle.value,
    lessonAuthor: event.target.lessonAuthor.value
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  return fetch('/lessons', options)
  .then(res => res.json())
  .then(res => console.log('res: ', res))
}

var deleteForm = document.getElementById('user_delete');
deleteForm.addEventListener('submit', deleteRequest);

function deleteRequest(event) {
  event.preventDefault();
  var lessonID = event.target.lessonID.value;
  const options = {
    method: 'DELETE',
    body: JSON.stringify({
      lessonID: lessonID
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  const URL = `/lessons/${lessonID}`
  fetch(URL, options)
  .then(response => response.json())
  .then(data => console.log('Lesson Deleted: ', data))
}

var updateForm = document.getElementById('user_update');
updateForm.addEventListener('submit', updateRequest);

function updateRequest(event) {
  event.preventDefault();
  var lessonID = event.target.lessonID.value;
  var lessonAuthor = event.target.lessonAuthor.value;
  var lessonTitle = event.target.lessonTitle.value;
  post = {
    lessonTitle: lessonTitle,
    lessonAuthor: lessonAuthor
  }
  const options = {
    method: 'PATCH',
    body: JSON.stringify(post),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  const URL =  `/lessons/${lessonID}`;
  fetch(URL, options)
  .then((response) => response.json())
  .then(data => console.log('data: ', data))
}


// const lessons = [
  //   { id: 1, lesson:'lesson 1: never eat dried worms' },
  //   { id: 2, lesson:'lesson 2: always eat fried worms' },
  //   { id: 3, lesson:'lesson 3: only eat worms on your turn' },
  //   { id: 4, lesson:'lesson 4: get enough sleep'}
  // ];
  //
  // module.exports = lessons;
