import { getLocalStorage } from "@/utils/storage";
import axios, { Method } from "axios";
import { LOCAL_STORAGE } from "@/constants";

const { TOKEN } = LOCAL_STORAGE;
const API_END_POINT = "/api";

const METHOD: Record<string, Method> = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
  PATCH: "patch",
};

const { GET, POST, DELETE, PUT, PATCH } = METHOD;

const getDefaultInstance = (method: Method) => {
  const token = getLocalStorage(TOKEN);

  const defaultInstance = axios.create({
    baseURL: API_END_POINT,
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return defaultInstance;
};

const HTTP = {
  get: getDefaultInstance(GET),
  post: getDefaultInstance(POST),
  delete: getDefaultInstance(DELETE),
  put: getDefaultInstance(PUT),
  patch: getDefaultInstance(PATCH),
};

export default HTTP;
