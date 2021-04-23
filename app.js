const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';



// Database Name
const dbName = 'myproject';
const client = new MongoClient(url, { useNewUrlParser: true,
  useUnifiedTopology: true });
// Use connect method to connect to the server
/*client.connect(function(err) {
  assert.strictEqual(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  // Get the documents collection
  const collection = db.collection('documents');

  client.close();
});*/

async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    movies.insertMany([
      {
        title: 'Post Two',
        body: 'Body of post two',
        category: 'Technology',
        date: Date()
      },
      {
        title: 'Post Three',
        body: 'Body of post three',
        category: 'News',
        date: Date()
      },
      {
        title: 'Post Four',
        body: 'Body of post three',
        category: 'Entertainment',
        date: Date()
      }
    ], function(err, result) {
      assert.strictEqual(err, null);
      assert.strictEqual(3, result.result.n);
      assert.strictEqual(3, result.ops.length);
      console.log('Inserted 3 movies into the collection');
    });

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Post Four' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

//disable cache
let twig = require('twig');
twig.cache(false)

let homepageRouter = require('./routes/homepage');
let usersRouter = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTERS CALLS
app.use('/', homepageRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
