var express = require('express');
var router = express.Router();
var mysql = require('mysql2');
var config = require('../config');

var connection = mysql.createConnection(config.db);
connection.connect;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// advanced query 1
router.get('/popular-item', function(req, res, next) {
  var sql = `SELECT p.Product_Name, p.Image_Url, COUNT(p.Seller_ID) as Num_Sellers, ROUND(Avg(p.Price), 2) as Avg_Price, MAX(p.Post_Date) as Latest_Post_Date
               FROM Products p JOIN Users u on p.Seller_ID=u.Student_ID
              WHERE u.Department='CS' OR u.Department='ECE'
              GROUP BY p.Product_Name, p.Image_Url
              ORDER BY Num_Sellers DESC;`;

  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// advanced query 2
router.get('/iphone-avgprice', function(req, res, next) {
  var sql = `(SELECT Product_Name, Image_Url, ROUND(Avg(Price), 2) as AvgPrice
                FROM Products 
               WHERE Product_Name LIKE 'iPhone%' 
               GROUP BY Product_Name, Image_Url) 
               UNION 
             (SELECT Product_Name, Image_Url, ROUND(Avg(Price), 2) as AvgPrice 
                FROM Products 
               WHERE Product_Name LIKE 'iPad%' 
               GROUP BY Product_Name, Image_Url);`;

  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});

// Stored procedure - return discount rate (price/original_price) and discount type of each product
router.get('/discount-type', function(req, res, next) {
  var sql = `CALL GetHighDiscount();`;

  connection.query(sql, function(err, result) {
    if (err) {
      return res.status(500).send({message: "db query error: " + err.message});
    }
    return res.status(200).send({result: result, message: "OK"});
  });
});


module.exports = router;
