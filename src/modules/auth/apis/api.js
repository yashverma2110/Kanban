import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { getApiHeader } from "../../../utils/common";

export const Signup = (payload, cb) => {
  axios
    .post(`${API_URL}/users/signup`, payload)
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err.response.status });
    });
};

export const Login = (payload, cb) => {
  axios
    .post(`${API_URL}/users/login`, payload)
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err.response.status });
    });
};

export const Logout = (payload, cb) => {
  axios
    .post(`${API_URL}/user/logout`, payload, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err.response.status });
    });
};
