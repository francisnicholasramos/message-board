import { Request, Response, NextFunction } from "express";
import { matchedData, validationResult} from "express-validator";
import {query} from "../lib/index";
import {format} from "date-fns";

export async function getMessages(req: Request, res: Response) {
    try {
        const { rows } = await query("SELECT author_name, message, created_at FROM messages")

        const messages = rows.map((row) => {
            const formattedDate = format(new Date(row.created_at), "EEE, MMM dd, h:mm a");
            return {
                ...row,
                created_at: formattedDate,
            };
        });

        res.render("index", {messages, showModal: false})

    } catch (error) {
        return;
    }
}


export async function postMessage(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const { rows } = await query("SELECT author_name, message, created_at FROM messages")
        res.render("index", {
            messages: rows,
            errors: errors.mapped(),
            showModal: true
        });
        return;
    }

    const formData = matchedData(req);
    const {author, user_message} = formData as {author: string, user_message: string};

    try {
        await query(
            "INSERT INTO messages (author_name, message) VALUES ($1, $2)",
            [author, user_message]
        );

        res.redirect("/")
    } catch (error) {
        next(error)
    }
}
