var express = require("express");
var router = express.Router();

// students array each object firstname, lastname, age, email address
let students = [
  {
    firstName: "Jacob",
    lastName: "Couch",
    age: 24,
    email: "jcbcouch@gmail.com"
  },
  {
    firstName: "Samuel",
    lastName: "Sandoval",
    age: 29,
    email: "samuelsandoval3@gmail.com"
  },
  {
    firstName: "Justin",
    lastName: "Moreno",
    age: 24,
    email: "justin.edward.moreno@gmail.com"
  },
  {
    firstName: "Ryan",
    lastName: "Harmon",
    age: 26,
    email: "rharmon@my.edgetechacademy.edu"
  },
  {
    firstName: "Ryan",
    lastName: "Gosling",
    age: 38,
    email: "r.gosling@skullcrusher.net"
  }
];

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Something Else" });
});

// router.get("/studentFinder.html", function(req, res, next) {
//   res.sendFile("/public/studentFinder.html");
// });

// router.post("/returnStudent", function(req, res, next) {
//   // res.send(
//   //   "First Name: " + req.body.firstName + "<br>Last Name: " + req.body.lastName
//   // );
//   res.render("returnStudent", {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName
//   });
// });

router.post("/returnStudent", function(req, res, next) {
  let matchingStudents = [];
  if (req.body.firstName) {
    matchingStudents = students.filter(student =>
      student.firstName
        .toLowerCase()
        .startsWith(req.body.firstName.toLowerCase())
    );
  }
  if (req.body.lastName) {
    matchingStudents = students.filter(student =>
      student.lastName.toLowerCase().startsWith(req.body.lastName.toLowerCase())
    );
  }
  if (req.body.age) {
    matchingStudents = students.filter(student => student.age == req.body.age);
  }
  if (req.body.email) {
    matchingStudents = students.filter(student =>
      student.email.toLowerCase().startsWith(req.body.email.toLowerCase())
    );
  }
  let response = "";
  matchingStudents.forEach(function(student) {
    response += `name: ${student.firstName} ${student.lastName}<br>age: ${
      student.age
    }<br>email: ${student.email}<hr>`;
  });

  res.send(response);
});

router.get("/getAllStudents", function(req, res, next) {
  res.send(students);
});

router.get("/getStudent", function(req, res, next) {
  let matchingStudents = students.filter(
    student => student.firstName == req.query.name
  );
  let response = "";
  matchingStudents.forEach(function(student) {
    // response += `name: ${student.firstName} ${student.lastName}<br>age: ${
    //   student.age
    // }<br>email: ${student.email}<hr>`;
    response +=
      "name: " +
      student.firstName +
      " " +
      student.lastName +
      "<br>age: " +
      student.age +
      "<br>email: " +
      student.email +
      "<hr>";
  });
  res.send(response);
});

router.get("/addStudent", function(req, res, next) {
  // destructuring
  const { firstName, lastName, age, email } = req.query;

  students.push({
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email
  });
  res.send(students);
});

router.get("/deleteStudent", function(req, res, next) {
  students = students.filter(function(student) {
    student.firstName != req.query.name;
  });
  response.send(students);
});

module.exports = router;
