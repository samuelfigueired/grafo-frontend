import axios from "axios";

// Tenta HTTP primeiro (porta 5070 geralmente é HTTP)
const API_URL = "http://localhost:5070/api/graph";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API Error:", error.message, error.response?.status);
    return Promise.reject(error);
  }
);

export const runBFS = (graph, start) =>
  axiosInstance.post(`/bfs?start=${start}`, graph);

export const runDFS = (graph, start) =>
  axiosInstance.post(`/dfs?start=${start}`, graph);

export const runDijkstra = (graph, start) =>
  axiosInstance.post(`/dijkstra?start=${start}`, graph);

export const runPrim = (graph) =>
  axiosInstance.post(`/prim`, graph);
