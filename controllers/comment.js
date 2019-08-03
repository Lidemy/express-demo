const commentModel = require('../models/comment')

const commentController = {
  add: (req, res) => {
    const {username} = req.session
    const {content} = req.body
    if (!username || !content) {
      return res.redirect('/')
    }
    commentModel.add(username, content, err => {
      return res.redirect('/')
    })
  },

  index:  (req, res) => {
    commentModel.getAll((err, results) => {
      if (err) {
        console.log(err)
      }
      res.render('index', {
        comments: results
      })
    })
  },

  delete: (req, res) => {
    commentModel.delete(req.session.username, req.params.id, err => {
      res.redirect('/')
    })
  },

  update: (req, res) => {
    commentModel.get(req.params.id, (err, result) => {
      res.render('update', {
        comment: result
      })
    })
  },

  handleUpdate: (req, res) => {
    commentModel.update(req.session.username, req.params.id, req.body.content, err => {
      res.redirect('/')
    })
  }
}

module.exports = commentController