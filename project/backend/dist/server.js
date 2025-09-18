"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ต้องอยู่บนสุดเสมอ
const app_1 = __importDefault(require("./app"));
const database_1 = require("./src/config/database");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
(async () => {
    try {
        // เชื่อมต่อ MongoDB
        await (0, database_1.connectDatabase)();
        // Start server
        app_1.default.listen(PORT, "0.0.0.0", () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
        });
    }
    catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
})();
//# sourceMappingURL=server.js.map