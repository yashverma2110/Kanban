import axios from "axios";
import { API_URL } from "../../../utils/apiConfig";
import { getApiHeader } from "../../../utils/common";

export const getAllTasks = (id, cb) => {
  axios
    .get(`${API_URL}/get/board/${id}`, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};

export const getTasks = ({ status, id }, cb) => {
  axios
    .get(`${API_URL}/get/tasks?status=${status}&id=${id}`, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};

export const addTask = (payload, cb) => {
  const id = payload.id;
  delete payload.id;
  axios
    .post(`${API_URL}/add/task?id=${id}`, payload, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};

export const updateTask = (payload, cb) => {
  const id = payload._id;
  delete payload._id;
  axios
    .put(`${API_URL}/update/task/${id}`, payload, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};

export const updateBoard = (payload, cb) => {
  const id = payload._id;
  delete payload._id;
  axios
    .put(`${API_URL}/update/board/${id}`, payload, getApiHeader())
    .then((res) => {
      cb(res.data);
    })
    .catch((err) => {
      cb({ error: err?.response?.status });
    });
};
