import dotenv from "dotenv";
dotenv.config(); // ต้องอยู่บนสุดเสมอ

import app from "./app";
import { connectDatabase } from "./src/config/database";

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3001;

(async () => {
  try {

    // เชื่อมต่อ MongoDB
    await connectDatabase();

    // Start server
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
