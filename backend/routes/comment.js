var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

// Get comments by order ID
router.get('/order-comment/:Order_ID', function(req, res, next) {
  var Order_ID = req.params.Order_ID;

  var sql = `SELECT c.*, o.Product_ID, o.Buyer_ID, o.Order_Date, o.Quantity, u.Name
               FROM Comments c
               JOIN Orders o ON o.Order_ID = c.Order_ID
               JOIN Users u ON o.Buyer_ID = u.Student_ID
              WHERE c.Order_ID = ${Order_ID}`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Get comments by product ID
router.get('/product-comment/:Product_ID', function(req, res, next) {
  var Product_ID = req.params.Product_ID;

  var sql = `SELECT c.*, o.Product_ID, o.Buyer_ID, o.Order_Date, o.Quantity, u.Name
               FROM Comments c
               JOIN Orders o ON o.Order_ID = c.Order_ID
               JOIN Users u ON o.Buyer_ID = u.Student_ID
              WHERE o.Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Create a comment
router.post('/', function(req, res, next) {
  var Order_ID = req.body.Order_ID;
  var Comment = req.body.Comment;
  var Evaluation = req.body.Evaluation;

  var sql = `INSERT INTO Comments (Order_ID, Comment, Evaluation)
             VALUES (${Order_ID}, '${Comment}', ${Evaluation})`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Update a comment
router.put('/:Order_ID', function(req, res, next) {
  var Order_ID = req.params.Order_ID;
  var Comment = req.body.Comment;
  var Evaluation = req.body.Evaluation;

  var sql = `UPDATE Comments
                SET Comment = '${Comment}',
                    Evaluation = ${Evaluation}
              WHERE Order_ID = ${Order_ID}`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Delete a comment
router.delete('/:Order_ID', function(req, res, next) {
  var Order_ID = req.params.Order_ID;

  var sql = `DELETE FROM Comments 
              WHERE Order_ID = ${Order_ID}`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

module.exports = router;