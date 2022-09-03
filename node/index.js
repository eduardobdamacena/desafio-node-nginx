const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const port = 3000;

const config = {
  host: "mysql-desafio",
  user: "root",
  password: "123456",
  database: "desafionode",
};

const connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    console.log(err.message);
  } else {
    var sql = `CREATE TABLE IF NOT EXISTS people (id int primary key auto_increment, name VARCHAR(255) not null)`;
    connection.query(sql, function (err, result, fields) {
      if (err) {
        console.log(err.message);
      }
    });
  }
});

app.get("/", (req, res) => {
  var sql = `SELECT * FROM people`;
  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err.message);
    } else {
      res.render("index", { names: result });
    }
  });
});

app.post("/name/new", (req, res) => {
  var name = req.body.name;
  if (!name) {
    return res.redirect("/");
  }
  var sql = `INSERT INTO people(name) VALUES('${name}')`;
  connection.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
