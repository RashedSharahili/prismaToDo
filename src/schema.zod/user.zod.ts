import { TypeOf, z } from "zod";

export const createUserSchema = z.object({

    body: z.object({
        name: z.string({
            invalid_type_error: "name must be string"
        }).min(3, "name must be at least 3 characters"),
        email: z.string({
            required_error: "email is required!"
        }).email("email must be a valid email address"),
        password: z.string({
            required_error: "password is requird!",
            invalid_type_error: "password must be string"
        })
    })
});

export const loginSchema = z.object({

    body: z.object({
        email: z.string({
            required_error: "email is required!"
        }).email("Invalid email address"),
        password: z.string({
            required_error: "password is requird!",
            invalid_type_error: "password must be string"
        })
    })
});

export type CreateUserSchema = TypeOf<typeof createUserSchema>["body"];
export type LoginSchema = TypeOf<typeof loginSchema>["body"];