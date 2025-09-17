"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./src/config/database");
dotenv_1.default.config();
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
exports.default = app_1.default;
//# sourceMappingURL=server.js.map