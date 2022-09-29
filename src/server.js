'use strict';

// 3rd Party Resources
const express = require('express'); // imported*********************
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./auth/middleware/logger');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const v2Routes = require('./auth/route/v2');
// const v1Routes = require('./auth/route/v1');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api/v2', v2Routes);
// app.use('/api/v1', v1Routes);
app.use(logger);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {    //imported************************
  server: app,
  start: (port) => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
