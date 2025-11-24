// services/exportService.js
import api from "./axiosConfig";

export const exportExcel = (payload) =>
  api.post("/export/excel", payload, {
    responseType: "blob"
  });
