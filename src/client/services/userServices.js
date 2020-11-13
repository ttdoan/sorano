import axios from "axios";

let url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:" + process.env.PORT
    : "https://sorano.herokuapp.com";

function login(form, successCb, failCb) {
  // send request to login
  //  store access token in redux
  const { email, password } = form;

  (async () => {
    try {
      const result = await axios.post(url + "/account/login", {
        user: {
          email,
          password,
        },
      });
      successCb(result);
    } catch (err) {
      console.log("login response error: ", err);
      failCb(err);
    }
  })();
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
