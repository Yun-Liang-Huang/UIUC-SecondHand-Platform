var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

// Get one's orders
router.get('/:Student_ID', function(req, res, next) {
  var Student_ID = req.params.Student_ID;

  var sql = `SELECT o.*, p.Seller_ID, p.Product_Name, p.Price, p.Original_Price, p.Purchased_Year, p.Post_Date, p.Memo, p.Image_Url
               FROM Orders o
               JOIN Products p ON p.Product_ID = o.Product_ID
              WHERE o.Buyer_ID = ${Student_ID}`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Get one's order of a product
router.get('/:Student_ID/:Product_ID', function(req, res, next) {
  var Student_ID = req.params.Student_ID;
  var Product_ID = req.params.Product_ID;

  var sql = `SELECT o.*, p.Seller_ID, p.Product_Name, p.Price, p.Original_Price, p.Purchased_Year, p.Post_Date, p.Memo, p.Image_Url
               FROM Orders o
               JOIN Products p ON p.Product_ID = o.Product_ID
              WHERE o.Buyer_ID = ${Student_ID} AND o.Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Create an order
router.post('/', function(req, res, next) {

  // get unique pk
  var sql_get_pk = `SELECT MAX(Order_ID) as max_ID
                      FROM Orders`;

  connection.query(sql_get_pk, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    else {
      var Order_ID = result[0].max_ID + 1;
      var Buyer_ID = req.body.Buyer_ID;
      var Product_ID = req.body.Product_ID;
      var Quantity = req.body.Quantity;
    
      var sql = `INSERT INTO Orders (Order_ID, Buyer_ID, Product_ID, Order_Date, Quantity)
                 VALUES (${Order_ID}, ${Buyer_ID}, ${Product_ID}, CURDATE(), ${Quantity})`;
    
      console.log(sql); 
      connection.execute(sql, function(err, result) {
        if (err) {
          return res.status(500).send({message: "db execution error: " + err.message});
        }
        return res.status(200).send({result: result, message: "OK"});
      });
    }
  });  
});

module.exports = router;