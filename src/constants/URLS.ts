import axios from "axios";

const baseURL = `http://154.41.228.234:3000/api/v0/`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem("token") },
});
export const privateAxiosInstance = axios.create({ baseURL });

export const requestHeader = {
  headers: { Authorization: `${localStorage.getItem("token")}` },
};


export const User = {
  getAllUser: (page:number,size:number)=>`admin/users?page=${page}&size=${size}`,
};
