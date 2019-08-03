const db = require('../db')

const commentModel = {
  add: (username, content, cb) => {
    db.query(
      'insert into comments(username, content) values(?, ?)',
      [username, content],
      (err, results) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  },

  getAll: cb => {
    db.query(
      `SELECT U.nickname, C.content, C.id, C.username
       FROM   comments as C
       LEFT JOIN users as U on U.username = C.username
       ORDER BY C.id DESC
      `,
      (err, results) => {
        if (err) return cb(err);
        cb(null, results)
      }
    );
  },

  get: (id, cb) => {
    db.query(
      `SELECT U.nickname, C.content, C.id, C.username
       FROM   comments as C
       LEFT JOIN users as U on U.username = C.username
       WHERE C.id = ? 
      `, [id], 
      (err, results) => {
        if (err) return cb(err);
        cb(null, results[0] || {})
      }
    );
  },

  delete: (username, id, cb) => {
    db.query(
      `DELETE FROM comments where id=? AND username=?
      `, [id, username],
      (err, results) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  },

  update: (username, id, content, cb) => {
    db.query(
      `update comments set content=? where id=? and username=?
      `, [content, id, username],
      (err, results) => {
        if (err) return cb(err);
        cb(null)
      }
    );
  } 
}

module.exports = commentModel