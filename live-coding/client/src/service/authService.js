async function authenticate(credentials) {

  const resp = await sendData("http://127.0.0.1:8080/auth/login", credentials);

  if(resp.status == 200) {
    const { token } = await resp.json();
    sessionStorage.setItem("token", token);

    return { authenticated: true };
  } else {
    return { authenticated: false };
  }
}

async function register() {
  const resp = await sendData("http://127.0.0.1:8080/auth/register", credentials);
}