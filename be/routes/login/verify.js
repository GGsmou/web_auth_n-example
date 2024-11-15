const express = require('express');

const router = express.Router();

router.post('/', async (_, res) => {
  res.json({
    message: 'Biometric authentication passed successfully',
  });
});

module.exports = router;
