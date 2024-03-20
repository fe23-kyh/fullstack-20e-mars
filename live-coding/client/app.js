const usernameField = document.querySelector('input[name=username-field]');
const passwordField = document.querySelector('input[name=password-field]');
const loginForm = document.querySelector('.login-form');

loginForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const username = usernameField.value;
  const password = passwordField.value;

  const data = { username, password };

  const resp = await authenticate(data);

  if(resp.authenticated) {
    window.location.href = "items.html";
  }
});



(async (listEl) => {
  if(listEl) {
    const resp = await getData("http://localhost:8080/carts/1");

    const data = await resp.json();

    for(let item of data.items) {
      const li = document.createElement('li');

      li.textContent = item.name + ` {${item.quantity}}`;
      listEl.append(li);
    }

    const value = getJwtValue("sub");
  }
})(document.querySelector('.shopping-list'));