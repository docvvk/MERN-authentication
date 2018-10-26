var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/rateMyProject", { useNewUrlParser: true });

// When the server starts, create and save a new User document to the db
// The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
db.User.create({ 
  firstName: "Vivek",
  lastName: "Malhan",
  userName: "docvvk",
  password: "12345",
  email: "vivek.malhan@yahoo.com",
  cell: 6473274455
  })
  .then(function(dbUser) {
    console.log(dbUser);
  })
  .catch(function(err) {
    console.log(err.message);
  });

db.Project.create({ 
  repoURL: "https://github.com/docvvk/mongo-scrapper",
  appURL: " https://floating-anchorage-56997.herokuapp.com/#",
  projectName: "Mongo Scrsaper",
  imageURL: "https://photos.app.goo.gl/DQAcicrXdgEpdVHu5",
  description: "This website pulls scraped news from https://www.npr.org/sections/news/ using Node.js | Cheerio | Express | Mongoose | Request | Express-HandleBars | Body-Parser. You can get the latest news by clicking on the “Get New Articles” Button. You also have the option to save your favourite article and comment on it as well. Happy Scraping!.",
  keywords: ["Node.js", "Cheerio", "Express", "Mongoose", "MongoDb", "Heroku"]
  })
  .then(function(dbProject) {
    console.log(dbProject);
  })
  .catch(function(err) {
    console.log(err.message);
  });
db.Reviews.create({
  rating: 7,
  comment: "Awesome project"
})
.then(function(dbReviews) {
  console.log(dbReviews)
})
.catch(function(err) { 
  console.log(err.message);
 });

// Routes

// Route for retrieving all the Reviews from the db
app.get("/reviews", function (req, res) { 
  db.Reviews.find({})
    .then(function(dbReviews) {
      res.json(dbReviews);
    })
    .catch(function(err) {
      res.json(err)
    })
 })
// Route for retrieving all the Users from the db
app.get("/user", function (req, res) { 
  db.User.find({})
    .then(function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err)
    })
 })
// Route for retrieving all the Projects from the db
app.get("/project", function (req, res) { 
  db.Project.find({})
    .then(function(dbProject) {
      res.json(dbProject);
    })
    .catch(function(err) {
      res.json(err)
    })
 })


// Route for saving a new Note to the db and associating it with a User
// app.post("/submit", function(req, res) {
//   // Create a new Review in the db
//   db.Reviews.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.User.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
//     })
//     .then(function(dbUser) {
//       // If the User was updated successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// Route for saving a new Review to the db
app.post("/submit", function (req,res) { 
  db.Reviews.create(req.body)
    .then(function(dbReviews) {
      res.json(dbReviews)
    })
    .catch(function(err) {
      res.json(err);
    })
 })

app.put("/update", function(req,res) {
  db.Reviews.update(req.body)
  .then(function(dbReviews) {
    res.json(dbReviews)
  })
  .catch(function(err) {
    res.json(err);
  })
})

app.delete("/remove", function(req,res) {
  db.Reviews.remove(req.body)
  .then(function(dbReviews) {
    res.json(dbReviews)
  })
  .catch(function(err) {
    res.json(err);
  })
})





// // Route to get all User's and populate them with their notes
// app.get("/populateduser", function(req, res) {
//   // Find all users
//   db.User.find({})
//     // Specify that we want to populate the retrieved users with any associated notes
//     .populate("notes")
//     .then(function(dbUser) {
//       // If able to successfully find and associate all Users and Notes, send them back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });
// });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
