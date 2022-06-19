var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

// keyword search
router.get('/search', function(req, res, next) {
  var keyword = req.query.keyword;

  var sql = `SELECT p.*, u.Name, ROUND(AVG(c.Evaluation), 1) as AvgEvaluation
               FROM Products p
               JOIN Users u ON u.Student_ID = p.Seller_ID
               LEFT OUTER JOIN Orders o ON o.Product_ID = p.Product_ID
               LEFT OUTER JOIN Comments c ON c.Order_ID = o.Order_ID
              WHERE p.Product_Name LIKE '%${keyword}%'
              GROUP BY p.Product_ID`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Get a product
router.get('/:Product_ID', function(req, res, next) {
  var Product_ID = req.params.Product_ID;

  var sql = `SELECT p.*, ROUND(AVG(c.Evaluation), 1) as AvgEvaluation
               FROM Products p
               LEFT OUTER JOIN Orders o ON o.Product_ID = p.Product_ID
               LEFT OUTER JOIN Comments c ON c.Order_ID = o.Order_ID
              WHERE p.Product_ID = ${Product_ID}
              GROUP BY p.Product_ID`;

  console.log(sql); 
  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Create a product
router.post('/', function(req, res, next) {
  
  // get unique pk
  var sql_get_pk = `SELECT MAX(Product_ID) as max_ID
                      FROM Products`;

  connection.query(sql_get_pk, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    else {
      var Product_ID = result[0].max_ID + 1;
      var Seller_ID = req.body.Seller_ID;
      var Product_Name = req.body.Product_Name;
      var Price = req.body.Price;
      var Original_Price = req.body.Original_Price;
      var Purchased_Year = req.body.Purchased_Year;
      var Memo = req.body.Memo;
      var Image_Url = req.body.Image_Url;
      var Quantity = req.body.Quantity;
    
      var sql = `INSERT INTO Products (Product_ID, Seller_ID, Product_Name, 
                        Price, Original_Price, Purchased_Year, Post_Date, 
                        Memo, Image_Url, Quantity)
                 VALUES (${Product_ID}, ${Seller_ID}, '${Product_Name}',
                  ${Price}, ${Original_Price}, ${Purchased_Year}, CURDATE(),
                  '${Memo}', '${Image_Url}', ${Quantity})`;
    
      console.log(sql); 
      connection.execute(sql, function(err, result) {
        if (err) {
          return res.status(500).send({message: "db execution error: " + err.message});
        }
        return res.status(200).send({result: result, Product_ID: Product_ID, message: "OK"});
      });
    }
  });  
});

// Update a product
router.put('/:Product_ID', function(req, res, next) {
  var Product_ID = req.params.Product_ID;
  var Product_Name = req.body.Product_Name;
  var Price = req.body.Price;
  var Original_Price = req.body.Original_Price;
  var Purchased_Year = req.body.Purchased_Year;
  var Memo = req.body.Memo;
  var Image_Url = req.body.Image_Url;
  var Quantity = req.body.Quantity;

  var sql = `UPDATE Products
                SET Product_Name = '${Product_Name}',
                    Price = ${Price},
                    Original_Price = ${Original_Price},
                    Purchased_Year = ${Purchased_Year},
                    Memo = '${Memo}',
                    Image_Url = '${Image_Url}',
                    Quantity = ${Quantity}
              WHERE Product_ID = ${Product_ID}`;

  console.log(sql); 
  connection.execute(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db execution error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Delete a product
router.delete('/:Product_ID', function(req, res, next) {
  var Product_ID = req.params.Product_ID;

  var sql = `DELETE FROM Products 
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
