# Express 教學示範用專案

記得自己新增 `db.js`，內容格式為：

``` js
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : ''
});

module.exports = connection
```

接著就可以跑起來

```
npm install
node index.js
```

裡面一個簡單的留言板以及沒用到的 todo list 功能，資料庫結構請參考教學影片。

