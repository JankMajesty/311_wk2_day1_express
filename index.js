
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* BEGIN - create routes here */
app.get('/users', (req, res) => {
  res.json(users)
});

// app.get('/users/1', (req, res) => {
//   res.json(users[0])
 
// });

app.get('/users/:userId', (req, res) => {
  res.json(users.filter(user => user._id === parseInt(req.params.userId)));
 
});

app.post('/users/', (req, res) => {
  const newUser = {
    _id: users.length + 1,
    name: req.body.name,
    occupation: req.body.occupation,
    avatar: req.body.avatar
  }

  users.push(newUser)
  res.json(users)
  console.log(req.body)
});

app.put('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId));

  if(found) {
    const updateUser = req.body;
    users.forEach(user => {
      if(user._id === parseInt(req.params.userId)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.occupation = updateUser.occupation ? updateUser.occupation : user.occupation;
        user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;
      }
    });
  } else {
    res.status(400).json({ msg: 'No user with the id of $(req.params.userId'});
}

return res.json(users)
});

app.delete('/users/:userId', (req, res) => {
  const found = users.some(user => user._id === parseInt(req.params.userId));

  if (found) {
    res.json({
      msg: 'user deleted',
      users: users.filter(user => user._id !== parseInt(req.params.userId))
    });
  } 
  else {
    res.status(400).json({ msg: 'No user with id of ${req.params.userId}' });
  }
});
/* END - create routes here */


app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))