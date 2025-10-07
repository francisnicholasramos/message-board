"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = getMessages;
exports.postMessage = postMessage;
const express_validator_1 = require("express-validator");
const index_1 = require("../lib/index");
const date_fns_1 = require("date-fns");
async function getMessages(req, res) {
    try {
        const { rows } = await (0, index_1.query)("SELECT author_name, message, created_at FROM messages");
        const messages = rows.map((row) => {
            const formattedDate = (0, date_fns_1.format)(new Date(row.created_at), "EEE, MMM dd, h:mm a");
            return {
                ...row,
                created_at: formattedDate,
            };
        });
        res.render("index", { messages, showModal: false });
    }
    catch (error) {
        return;
    }
}
async function postMessage(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const { rows } = await (0, index_1.query)("SELECT author_name, message, created_at FROM messages");
        res.render("index", {
            messages: rows,
            errors: errors.mapped(),
            showModal: true
        });
        return;
    }
    const formData = (0, express_validator_1.matchedData)(req);
    const { author, user_message } = formData;
    try {
        await (0, index_1.query)("INSERT INTO messages (author_name, message) VALUES ($1, $2)", [author, user_message]);
        res.redirect("/");
    }
    catch (error) {
        next(error);
    }
}
