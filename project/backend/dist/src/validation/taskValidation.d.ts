import { z } from 'zod';
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
}, {
    title: string;
}>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    completed?: boolean | undefined;
}, {
    title?: string | undefined;
    completed?: boolean | undefined;
}>;
export declare const taskIdSchema: z.ZodString;
