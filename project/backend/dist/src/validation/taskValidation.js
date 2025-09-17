"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdSchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
// Schema สำหรับสร้าง task
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters')
        .trim(),
});
// Schema สำหรับอัปเดต task
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required')
        .max(200, 'Title must be less than 200 characters')
        .trim()
        .optional(),
    completed: zod_1.z.boolean().optional(),
});
// Schema สำหรับตรวจสอบ task ID
exports.taskIdSchema = zod_1.z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid task ID');
//# sourceMappingURL=taskValidation.js.map