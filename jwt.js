const jwt = require('jsonwebtoken');

let token = jwt.sign('test content', 'noname')
console.log(token);