var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

// Get all categories
router.get('/', function(req, res, next) {

  var sql = `SELECT *
               FROM Categories`;

  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

module.exports = router;