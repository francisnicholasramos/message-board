import {checkSchema} from "express-validator";

export const inputSchema = checkSchema({
    author: {
        in: ["body"],
        isLength: {
            options: {min: 3, max: 20},
            errorMessage: "Username must be between 3 and 20 characters."
        },
        isString: true,
        notEmpty: {
            errorMessage: "Username is required."
        }
    },
    user_message: {
        in: ["body"],
        isString: true,
        isLength: {
            options: {min: 1},
            errorMessage: "Message input must not be empty."
        }
    }
});

