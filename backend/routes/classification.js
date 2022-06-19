var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

// Get by category id
router.get('/:Category_ID', function(req, res, next) {
  var Category_ID = req.params.Category_ID;

  var sql = `SELECT p.*, ROUND(AVG(c.Evaluation), 1) as AvgEvaluation, ca.Category_ID, ca.Name AS Category_Name
               FROM Products p
               JOIN Classification cl ON p.Product_ID = cl.Product_ID
               JOIN Categories ca ON ca.Category_ID = cl.Category_ID
               LEFT OUTER JOIN Orders o ON o.Product_ID = p.Product_ID
               LEFT OUTER JOIN Comments c ON c.Order_ID = o.Order_ID
              WHERE cl.Category_ID = ${Category_ID}
              GROUP BY p.Product_ID`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Create a classification
router.post('/', function(req, res, next) {
  var Category_ID = req.body.Category_ID;
  var Product_ID = req.body.Product_ID;

  var sql = `INSERT INTO Classification (Category_ID, Product_ID)
             VALUES (${Category_ID}, ${Product_ID})`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Update a classification
router.put('/:Product_ID/:Category_ID', function(req, res, next) {
  var Product_ID = req.params.Product_ID;
  var Category_ID = req.params.Category_ID;

  var sql = `UPDATE Classification
                SET Category_ID = ${Category_ID}
              WHERE Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

module.exports = router;