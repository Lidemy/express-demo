const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');

const db = require('./db')
const app = express()
const port = 5001

const todoController = require('./controllers/todo')
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')

app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.post('/todos', todoController.newTodo)
app.get('/todos', todoController.getAll)
app.get('/todos/:id', todoController.get)
app.get('/', commentController.index)

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

app.post('/comments', commentController.add)
app.get('/delete_comments/:id', commentController.delete)
app.get('/update_comments/:id', commentController.update)
app.post('/update_comments/:id', commentController.handleUpdate)

app.listen(port, () => {
  db.connect()
  console.log(`Example app listening on port ${port}!`)
})