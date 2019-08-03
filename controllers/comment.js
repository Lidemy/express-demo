const db = require('../models')
const Comment = db.Comment
const User = db.User

const commentController = {
  add: (req, res) => {
    const {userId} = req.session
    const {content} = req.body
    if (!userId || !content) {
      return res.redirect('/')
    }

    Comment.create({
      content,
      UserId: userId
    }).then(() => {
      res.redirect('/')
    })
  },

  index: (req, res) => {
    Comment.findAll({
      include: User
    }).then(comments => {
      res.render('index', {
        comments
      })
    })
  },

  delete: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.destroy()
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },

  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(comment => {
      res.render('update', {
        comment      
      })
    })
  },

  handleUpdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(comment => {
      return comment.update({
        content: req.body.content
      })
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  }
}

module.exports = commentController