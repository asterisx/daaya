'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;

app.get("/posts", function (req, res) {
    return res.json(_db.Posts);
});

app.put("/post", function (req, res) {
    var newCompany = Object.assign({ id: _db.Posts.length }, req);
    _db.Posts.push(newCompany);
    res.json(newCompany);
});

app.listen(port);