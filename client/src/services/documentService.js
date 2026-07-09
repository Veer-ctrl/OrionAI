import api from "../lib/axios";

export const getDocuments = async () => {
  const response = await api.get("/documents");
  return response.data;
};

export const getDocument = async (id) => {
  const response = await api.get(`/documents/${id}`);
  return response.data;
};

export const uploadDocument = async (file) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await api.post("/documents/upload", formData);

  return response.data;
};

export const deleteDocument = async (id) => {
  const response = await api.delete(`/documents/${id}`);
  return response.data;
};

const documentService = {
  getDocuments,
  getDocument,
  uploadDocument,
  deleteDocument,
};

export default documentService;