const db = require('../db')

const todoModel = {
  getAll: (cb) => {
    db.query(
      'SELECT * from todos', (err, results) => {
      if (err) return cb(err);
      cb(null, results)
    });
  },

  get: (id, cb) => {
    db.query(
      'SELECT * from todos where id = ?', [id],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      }
    );
  },

  add: (content, cb) => {
    db.query(
      'insert into todos(content) values(?)', [content],
      (err, results) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  }
}

module.exports = todoModel