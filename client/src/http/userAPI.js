import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
  const { data } = await $host.post("api/user/registration", {
    name,
    email,
    password,
    role: "ADMIN",
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (name, email, password) => {
  const { data } = await $host.post("api/user/login", {
    name,
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
