//-------------------Utils-------------------//
async function superFetch(url, method, body) {
  return fetch(`http://localhost:8000${url}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (!response.ok) {
        document.getElementById('server-response').style.color = 'red';
      } else {
        document.getElementById('server-response').style.color = 'green';
      }

      return response;
    })
    .then((response) => response.json())
    .then((response) => {
      document.getElementById('server-response').innerText = JSON.stringify(
        response,
        null,
        2,
      );
      return response;
    });
}
const requestingPartyData = { id: 'localhost', name: 'Solidgate ;)' };

function extractUserName() {
  const userName = document.getElementById('user-name').value;
  if (userName) {
    return userName;
  }

  alert('Please enter a user name');
}
//-------------------/Utils-------------------//

async function register() {
  const userName = extractUserName();
  if (!userName) {
    return;
  }

  const { challenge, supportedPubKeyCredParams } = await superFetch(
    '/registration/init',
    'GET',
  );

  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: new Uint8Array(Object.values(challenge)),
      rp: requestingPartyData,
      user: {
        id: Uint8Array.from(userName, (c) => c.charCodeAt(0)),
        name: userName,
        displayName: userName,
      },
      pubKeyCredParams: supportedPubKeyCredParams,
    },
  });

  await superFetch('/registration/verify', 'POST', {
    credential,
    userName,
  });
}

async function login() {
  const userName = extractUserName();
  if (!userName) {
    return;
  }

  const { challenge, allowedCredentials } = await superFetch(
    '/login/init',
    'POST',
    { userName },
  );

  if (!allowedCredentials) {
    return;
  }

  const credential = await navigator.credentials.get({
    publicKey: {
      challenge: new Uint8Array(Object.values(challenge)),
      rpId: requestingPartyData.id,
      allowCredentials: allowedCredentials.map((cred) => ({
        ...cred,
        id: new Uint8Array(Object.values(cred.id)),
      })),
      userVerification: 'required',
    },
  });

  await superFetch('/login/verify', 'POST', credential);
}
