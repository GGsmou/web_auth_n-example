'use strict';

const express = require('express');
const cors = require('cors');

(function initGlobalState() {
  process.context = {
    userNameToRawIdMap: new Map(),
  };
})();

(function startServer(port = 8000) {
  const app = express();

  app.use(express.json());
  app.use(cors());

  /* Routes */
  app.use('/registration/init', require('./routes/registration/init'));
  app.use('/registration/verify', require('./routes/registration/verify'));

  app.use('/login/init', require('./routes/login/init'));
  app.use('/login/verify', require('./routes/login/verify'));
  /* /Routes */

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
