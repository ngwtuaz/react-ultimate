// import axios from "axios";
import axios from "./axios.customize";

const CreateUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const UpdateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, data);
};
const DeleteUserAPI = (id) => {
  const URL_BACKEND = `/api/v1/user/${id}`;
  return axios.delete(URL_BACKEND);
};
const fetchAllUserAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const handleUploadFile = (file, folder) => {
  const URL_BACKEND = "/api/v1/file/upload";
  let config = {
    headers: {
      "upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };
  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
};
const UpdateUserAvatarAPI = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    avatar,
    _id,
    fullName,
    phone,
  };
  return axios.put(URL_BACKEND, data);
};
const RegisterUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user/register";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };
  return axios.post(URL_BACKEND, data);
};
const LoginAPI = (email, password) => {
  const URL_BACKEND = "/api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 3000,
  };
  return axios.post(URL_BACKEND, data);
};
const GetAccountAPI = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get(URL_BACKEND);
};
const LogOutAPI = () => {
  const URL_BACKEND = "/api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};
const CreateBookAPI = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: Number(price),
    quantity: Number(quantity),
    category: category,
  };
  return axios.post(URL_BACKEND, data);
};
const fetchAllBookAPI = (current, pageSize) => {
  const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
  return axios.get(URL_BACKEND);
};
const UpdateBookAPI = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "/api/v1/book";
  const data = {
    _id: _id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.put(URL_BACKEND, data);
};
const DeleteBookAPI = (id) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete(URL_BACKEND);
};

export {
  CreateUserAPI,
  UpdateUserAPI,
  fetchAllUserAPI,
  DeleteUserAPI,
  handleUploadFile,
  UpdateUserAvatarAPI,
  RegisterUserAPI,
  LoginAPI,
  GetAccountAPI,
  LogOutAPI,
  CreateBookAPI,
  fetchAllBookAPI,
  UpdateBookAPI,
  DeleteBookAPI,
};
