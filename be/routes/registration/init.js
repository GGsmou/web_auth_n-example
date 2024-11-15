const express = require('express');
const genRandomUint8Array = require('../../utils/genRandomUint8Array');

const router = express.Router();

router.get('/', (_, res) => {
  res.json({
    challenge: genRandomUint8Array(),
    supportedPubKeyCredParams: [
      {
        type: 'public-key',
        alg: -7,
      },
    ],
  });
});

module.exports = router;
