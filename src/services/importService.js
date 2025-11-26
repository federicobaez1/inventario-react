import api from "./axiosConfig";

export const importExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/import/excel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
