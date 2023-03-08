"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validate = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            headers: req.headers,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        const zodError = error;
        return res.status(404).json({
            message: zodError.errors[0].message
        });
    }
};
exports.default = Validate;
