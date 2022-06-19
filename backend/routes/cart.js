var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

// Get one's cart
router.get('/:Student_ID', function(req, res, next) {
  var Student_ID = req.params.Student_ID;

  var sql = `SELECT c.*, p.Product_Name, p.Price, p.Image_Url
               FROM Cart c
               JOIN Products p
                 ON p.Product_ID = c.Product_ID
              WHERE c.Student_ID = ${Student_ID}`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Get one's cart of a product
router.get('/:Student_ID/:Product_ID', function(req, res, next) {
  var Student_ID = req.params.Student_ID;
  var Product_ID = req.params.Product_ID;

  var sql = `SELECT *
               FROM Cart
              WHERE Student_ID = ${Student_ID} AND Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Create a cart
router.post('/', function(req, res, next) {
  var Student_ID = req.body.Student_ID;
  var Product_ID = req.body.Product_ID;
  var Quantity = req.body.Quantity;

  var sql = `INSERT INTO Cart (Student_ID, Product_ID, Quantity)
             VALUES (${Student_ID}, ${Product_ID}, ${Quantity})`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Update a cart
router.put('/:Student_ID/:Product_ID', function(req, res, next) {
  var Student_ID = req.params.Student_ID;
  var Product_ID = req.params.Product_ID;
  var Quantity = req.body.Quantity;

  var sql = `UPDATE Cart
                SET Quantity = ${Quantity}
              WHERE Student_ID = ${Student_ID}
                AND Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Delete a cart
router.delete('/:Student_ID/:Product_ID', function(req, res, next) {
  var Student_ID = req.params.Student_ID;
  var Product_ID = req.params.Product_ID;

  var sql = `DELETE FROM Cart 
              WHERE Student_ID = ${Student_ID}
                AND Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

module.exports = router;