const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const model = mongoose.model;
const session = require("express-session");
const { json } = require("body-parser");
const app = express();
const port = 3001 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
  })
);

// Connecting mongodb
mongoose
  .connect(
    "mongodb+srv://surojeet:Suro%40123@cluster0.qhibn.mongodb.net/student?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected");
  });

// creating schema for database
const studentSchema = new Schema({
  roll: {
    type: Number,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
});

//creating model from above schema
const Student = model("student", studentSchema);

// for checking purpose whether api working or not
app.get("/api", (req, res) => {
  res.send("Api working");
});

// URL for registering user
app.post("/api/register", (req, res) => {
  const data = req.body;
  const studentData = new Student({
    roll: Number(data.roll),
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    contact: Number(data.contact),
  });

  studentData.save((doc, err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(doc);
    }
  });
});

app.post("/auth/isAuth", (req, res) => {
  if (req.session.data) {
    res.json({
      auth: true,
      data: req.session.data,
    });
  } else {
    res.json({
      auth: false,
    });
  }
});

app.post("/auth/logout", (req, res) => {
  req.session.destroy();
  res.json({
    auth: false,
  });
});

//URL  this is used for login purposes
app.post("/api/login", (req, res) => {
  const data = req.body;
  Student.findOne(
    { roll: Number(data.roll), password: data.password },
    (err, docs) => {
      if (err) {
        return res.json(err);
      } else {
        if (docs) {
          req.session.data = docs;
          return res.json(req.session.data);
        } else {
          return res.json({});
        }
      }
    }
  );
});

// URL this is used for deleting Account purposes

app.post("/api/delete", (req, res) => {
  const data = req.session.data;
  console.log(data);
  Student.findOneAndDelete({ roll: Number(data.roll) }, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      req.session.destroy();
      res.json({
        auth: false,
      });
    }
  });
});

// URL this is used for updating contacts in User

app.post("/api/update", (req, res) => {
  const data = {
    roll: Number(req.session.data.roll),
    firstName: req.session.data.firstName,
    lastName: req.session.data.lastName,
    password: req.session.data.password,
    contact: Number(req.body.contact),
  };
  Student.findOneAndUpdate({ roll: Number(req.session.data.roll) }, data, (err, doc) => {
    if (err) {
      res.json(err);
    } else {
      req.session.data = data;
      res.json(doc);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
