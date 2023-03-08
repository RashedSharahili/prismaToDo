"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            invalid_type_error: "name must be string"
        }).min(3, "name must be at least 3 characters"),
        email: zod_1.z.string({
            required_error: "email is required!"
        }).email("email must be a valid email address"),
        password: zod_1.z.string({
            required_error: "password is requird!",
            invalid_type_error: "password must be string"
        })
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email is required!"
        }).email("Invalid email address"),
        password: zod_1.z.string({
            required_error: "password is requird!",
            invalid_type_error: "password must be string"
        })
    })
});
