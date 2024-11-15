const express = require('express');
const genRandomUint8Array = require('../../utils/genRandomUint8Array');

const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;

  const rawId = process.context.userNameToRawIdMap.get(body.userName);

  if (!rawId) {
    res.status(412);
    return res.json({
      message: `No credential found for ${body.userName}`,
    });
  }

  res.json({
    challenge: genRandomUint8Array(),
    allowedCredentials: [
      {
        type: 'public-key',
        id: rawId,
      },
    ],
    transports: ['internal'],
  });
});

module.exports = router;
