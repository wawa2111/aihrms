import axiosInstance from "../axios/axiosInstance.js.jsx";

// Fetch Roles
export const chatWithGemini = async (prompt, setLoading) => {
  try {
    setLoading(true);
    const { data } = await axiosInstance.post("/insights/chat", { prompt });
    return data;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.response?.data.message || "Failed to chat");
  } finally {
    setLoading(false);
  }
};
