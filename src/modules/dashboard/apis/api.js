import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { getApiHeader } from "../../../utils/common";

export const getAllBoards = (cb) => {
  axios
    .get(`${API_URL}/get/boards`, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};

export const addNewBoard = (payload, cb) => {
  axios
    .post(`${API_URL}/add/board`, payload, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};

export const getAllUsers = (cb) => {
  axios
    .get(`${API_URL}/users/getAll`, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};
