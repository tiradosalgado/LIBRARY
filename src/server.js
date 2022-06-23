const express = require('express');
const path = require('path');
const morgan = require('morgan');
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  { DB } = require('./config/DB'),
  itemRoutes = require('./routes/item');

mongoose.Promise = global.Promise;
mongoose.connect(DB, { useMongoClient: true})
  .then(() => console.log('Db is conencted'))
  .catch(err => console.error(err));

const app = express();
var port = process.env.PORT || 4000;

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// rutas
app.use('/items', itemRoutes);

// archivo estático
app.use(express.static(path.join(__dirname, 'public')));

// inicio de servidor
var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
