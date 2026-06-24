import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import documentRoutes from "./routes/documentRoutes.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;
app.use("/api/documents", documentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});