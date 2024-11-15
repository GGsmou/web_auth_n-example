const genRandomNumber = require('./genRandomNumber');

function genRandomUint8Array() {
  return new Uint8Array([
    ...Array.from({ length: genRandomNumber(1, 6) }, () =>
      genRandomNumber(0, 255),
    ),
  ]);
}

module.exports = genRandomUint8Array;
