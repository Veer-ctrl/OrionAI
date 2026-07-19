import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import AuthContext from "./AuthContext";
import documentService from "../services/documentService";
import { useContext } from "react";
export const DocumentContext = createContext();
export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);
  const { user, loading: authLoading } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch all documents
  const refreshDocuments = async (showLoader = true) => {
    if (showLoader) {
      setLoading(true);
    }

    try {
      const response = await documentService.getDocuments();

      setDocuments(response.documents);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to load documents."
      );
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  // Upload document
  const uploadDocument = async (file) => {
    setUploading(true);

    try {
      const response =
        await documentService.uploadDocument(file);

      await refreshDocuments(false);

      toast.success("Document uploaded successfully.");

      return response;
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to upload document."
      );

      throw err;
    } finally {
      setUploading(false);
    }
  };

  // Delete document
  const deleteDocument = async (documentId) => {
    setDeleting(true);

    try {
      await documentService.deleteDocument(documentId);

      setDocuments((prev) =>
        prev.filter((doc) => doc._id !== documentId)
      );

      toast.success("Document deleted.");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to delete document."
      );

      throw err;
    } finally {
      setDeleting(false);
    }
  };

useEffect(() => {
  if (!authLoading && user) {
    refreshDocuments();
  }
}, [authLoading, user]);

  const value = {
    documents,
    loading,
    uploading,
    deleting,

    refreshDocuments,
    uploadDocument,
    deleteDocument,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
}