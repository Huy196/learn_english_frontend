import axios from "axios";

const API_URL = "http://localhost:8080/api";

const uploadFile = {
  uploadFile: async (imageUploadForm, token) => {
    const response = await axios.post(`${API_URL}/upload`, imageUploadForm, {
      headers: {
        "Content-Type": "multipart/form-data", 
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default uploadFile;
