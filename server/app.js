const express = require('express')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const model = mongoose.model;
const app = express()
const port = 3001 || process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));

// Connecting mongodb
mongoose.connect("mongodb+srv://surojeet:Suro%40123@cluster0.qhibn.mongodb.net/student?retryWrites=true&w=majority").then(()=>{
    console.log("Database connected");
})


// creating schema for database
const studentSchema = new Schema({
  roll: {
    type: Number,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  }
});

//creating model from above schema
const Student = model("student", studentSchema);


// for checking purpose whether api working or not
app.get("/api", (req, res) => {
  res.send("Api working");
})


// URL for registering user
app.post('/api/register', (req, res) => {
  const data = req.body;
  console.log(data);
  const studentData = new Student({
    roll : Number(data.roll),
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    contact: Number(data.contact)
  })

  studentData.save((doc, err) => {
    if(err) {
      return res.json(err);
    } else {
      return res.json(doc);
    }
  })
})


//URL  this is used for login purposes
app.post("/api/login", (req, res) => {
  const data = req.body;
  Student.findOne({roll: Number(data.roll), password: data.password}, (docs, err) => {
    if(err) {
      return res.json(err)
    } else {
      if( docs) {
        return res.json(docs);
      } else {
        return res.json({});
      }
      
    }
  })
})

// URL this is used for deleting Account purposes

app.post("/api/delete", (req, res) => {
  const data = req.body;
  Student.findOneAndDelete({roll: Number(data.roll)}, (result, err) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result);
    }
  })
})

// URL this is used for updating contacts in User

app.post("/api/update", (req, res) => {
  const data = req.body;
  Student.findOneAndUpdate({roll: Number(data.roll)}, data, (result, err) => {
    if(err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})