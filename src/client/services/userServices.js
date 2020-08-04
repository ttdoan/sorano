import axios from "axios";

let url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:" + process.env.PORT
    : "https://ecommerce-ttdoan.herokuapp.com";

function login(email, password) {
  // send request to login
  //  store access token in redux
}

function register(form, successCb, failCb) {
  let { firstName, lastName, email, password } = form;

  axios
    .post(url + "/account/register", {
      user: {
        firstName,
        lastName,
        email,
        password,
      },
    })
    .then((result) => successCb(result))
    .catch((err) => failCb(err));
}

function refreshAccess(successCb, failCb = () => {}) {
  axios
    .post(url + "refresh")
    .then((result) => successCb(result))
    .catch((err) => failCb(err));
}

function logout() {
  // delete access token from redux
}

export { login, register, logout, refreshAccess };
