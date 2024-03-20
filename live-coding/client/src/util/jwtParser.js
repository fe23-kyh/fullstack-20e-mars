function getJwtValue(ref) {
  const token = sessionStorage.getItem("token");
  const parts = token.split(".");
  const payload = parts[1];

  const data = JSON.parse(atob(payload));

  return data[ref];
}