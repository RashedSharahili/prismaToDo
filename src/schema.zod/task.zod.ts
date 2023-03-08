import { TypeOf, z } from "zod";

export const createTaskSchema = z.object({

    body: z.object({
        
        title: z.string({
            required_error: "title is required!",
            invalid_type_error: "title must be string"
        }).min(3, "title must be at least 3 characters")
    })
});

export const updateTaskSchema = z.object({

    body: z.object({
        
        title: z.string({
            required_error: "title is required!",
            invalid_type_error: "title must be string"
        }).min(3, "title must be at least 3 characters")
    }),
    params: z.object({

        id: z.string({

            required_error: "paramter id od task is required!",
            invalid_type_error: "id must be string"
        })
    })
});

export const deleteTaskSchema = z.object({

    params: z.object({

        id: z.string({

            required_error: "paramter id od task is required!",
            invalid_type_error: "id must be string"
        })
    })
});

export type CreateTaskSchema = TypeOf<typeof createTaskSchema>["body"];
export type UpdateTaskSchema = TypeOf<typeof updateTaskSchema>["body"];
export type UpdateTaskSchema2 = TypeOf<typeof updateTaskSchema>["params"];
export type DeleteTaskSchema = TypeOf<typeof deleteTaskSchema>["params"];