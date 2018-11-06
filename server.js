const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server/server'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
  ext: 'js'
})
.on('restart', function() {
  console.log('Server restarted!');
})
.once('exit', function () {
  console.log('Shutting down server');
  process.exit();
});

app.use(bodyParser.json());
// bodyParser.urlencoded({extended:true})

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rateMyProject", { useNewUrlParser: true });
app.use(logger("dev"));
app.use(routes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});
app.get("/",function(req,res) {
  res.send('hi')
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
