import axios from "axios";

export const api = axios.create({
  baseURL: "https://hrms-lite-4hvs.onrender.com/",
});
