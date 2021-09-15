const express = require("express");

const package = require("./package.json");
const mock = require("./MOCK_DATA.json");
const app = express();

app.get("/deepak", function (req, res) {
  console.log("loger 1");
});

//app.use(loger);

app.get("/", function (req, res) {
  res.send("Welcome to Home page");
});

app.get("/users", function (req, res) {
  res.send(mock);
});

// app.post("/", loger, function (req, res) {
//   console.log("loger 7");
// });

app.use(express.json());

app.post(
  "/",
  validate({ firstName: "required", lastName: "required" }),
  function (req, res) {
    console.log(req.body);
    res.send("Hello");
  }
);

// function validate(data) {
//   return function (req, res, next) {
//     Object.keys(data).forEach((el) => {
//       if (data[el] === "required") {
//         if (!req.query[el]) {
//           res.send(`add ${el} in the form`);
//         }
//       }
//     });
//     next();
//   };
// }

function validate(data) {
  return function (req, res, next) {
    let errors = [];
    Object.keys(data).forEach(function (item) {
      if (data[item] === "required") {
        if (!req.query[item]) {
          // req.query.firstName
          errors.push(`Please add ${item} in the form`);
        }
      }
    });
    if (errors.length) {
      return res.send(errors);
    }
    next();
  };
}

function loger(req, res, next) {
  console.log("loger after");
  next();
  console.log("loger 2");
}

app.listen(2345, function () {
  console.log("listening on port 2345");
});
