"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const taskRoutes_1 = __importDefault(require("./src/routes/taskRoutes"));
const errorHandler_1 = require("./src/middleware/errorHandler");
const app = (0, express_1.default)();
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// CORS
const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:5173',
];
app.use((0, cors_1.default)({ origin: allowedOrigins, credentials: true }));
// Middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
// Root
app.get('/', (req, res) => {
    res.send('🚀 API server is running');
});
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});
// Routes
app.use('/api', taskRoutes_1.default);
// Error handlers
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map