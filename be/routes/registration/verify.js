const express = require('express');

const router = express.Router();

function parseClientDataJSON(clientDataJSON) {
  const decodedBuffer = Buffer.from(clientDataJSON, 'base64');
  const jsonString = decodedBuffer.toString('utf-8');
  return JSON.parse(jsonString);
}

function parseRawId(rawId) {
  const decodedBuffer = Buffer.from(rawId, 'base64');
  return new Uint8Array(decodedBuffer);
}

router.post('/', async (req, res) => {
  const body = req.body;
  const clientData = parseClientDataJSON(
    body.credential.response.clientDataJSON,
  );

  process.context.userNameToRawIdMap.set(
    body.userName,
    parseRawId(body.credential.rawId),
  );

  res.json({
    message: `Biometric authentication from ${clientData.origin} set up successfully`,
  });
});

module.exports = router;
