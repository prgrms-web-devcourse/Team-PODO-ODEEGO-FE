import axios, { Method } from "axios";

// const API_END_POINT = process.env.NEXT_PUBLIC_API_END_POINT;
const API_END_POINT = "/api";

const METHOD: Record<string, Method> = {
  GET: "get",
  POST: "post",
  DELETE: "delete",
  PUT: "put",
};

const { GET, POST, DELETE, PUT } = METHOD;

//공통 instance
//TODO : Authorization이 필요하다면 등록
const getDefaultInstance = (method: Method) => {
  const defaultInstance = axios.create({
    baseURL: API_END_POINT,
    method,
  });

  return defaultInstance;
};

const HTTP = {
  get: getDefaultInstance(GET),
  post: getDefaultInstance(POST),
  delete: getDefaultInstance(DELETE),
  put: getDefaultInstance(PUT),
};

export default HTTP;
