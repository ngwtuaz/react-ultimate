// import axios from "axios";
import axios from "./axios.customize";

const CreateUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "/api/v1/user";
  const data = {
    // fullName: fullName,
    // email: email,
    // password: password,
    // phone: phone,
    fullName,
    email,
    password,
    phone,
  };
  return axios.post(URL_BACKEND, data);
};
const UpdateUserApi = () => {};
const DeleteUserApi = () => {};

export { CreateUserApi, UpdateUserApi, DeleteUserApi };
