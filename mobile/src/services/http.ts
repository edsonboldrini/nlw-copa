import axios from "axios";

export const http = axios.create({
  baseURL: 'http://192.168.100.39:3333'
})