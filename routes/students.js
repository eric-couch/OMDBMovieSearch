var express = require("express");
var router = express.Router();

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

router.get("/getStudent", function(req, res, next) {
  if (req.query.name) {
    let matchingStudents = students.filter(
      student => student.firstName == req.query.name
    );
    let response = "";
    matchingStudents.forEach(function(student) {
      response += `name: ${student.firstName} ${student.lastName}<br>age: ${
        student.age
      }<br>email: ${student.email}<hr>`;
    });
    res.send(response);
  } else {
    res.send("bad input");
  }
});

router.get("/addStudent", function(req, res, next) {
  const { firstName, lastName, age, email } = req.query;

  student = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    email: email
  };
  students.push(student);
  res.send("student added");
});

router.get("/getAllStudents", function(req, res, next) {
  res.send(students);
});

router.get("/deleteStudent", function(req, res, next) {
  //students = students.filter(student => student.firstName != req.query.name);
  let removeStudentName = req.query.name;
  let newStudents = [];
  students.forEach(function(s) {
    if (s.firstName != removeStudentName) {
      newStudents.push(s);
    }
  });
  console.log(newStudents);
  students = newStudents;
  res.send(students);
});

module.exports = router;
