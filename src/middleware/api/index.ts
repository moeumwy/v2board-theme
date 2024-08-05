import axios, { AxiosHeaders } from "axios";
import lo from "lodash-es";
import config from "@/config";

const getBaseUrl = () => {
  if (import.meta.env.API_BASE_URL) {
    return import.meta.env.API_BASE_URL;
  }

  return new URL("/api/v1/", config.api).toString();
};

const instance = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json, application/x-www-form-urlencoded",
    Accept: "application/json, application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("gfw_token") || undefined
  },
  timeout: 5000
});

// monitor middleware
if (import.meta.env.DEV) {
  instance.interceptors.request.use((config) => {
    console.log("Request", config);
    return config;
  });
  instance.interceptors.response.use((response) => {
    console.log("Response", response);
    return response;
  });
}

// Add authorization header to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("gfw_token");
  if (!lo.isNull(token)) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", token);
    } else {
      config.headers = new AxiosHeaders({ Authorization: token });
    }
  }

  return config;
});

export default instance;
