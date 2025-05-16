const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");
const upstox = require("../routes/upstox.route");
const auth = require("../routes/auth.route");

module.exports = (app) => {
    const allowedOrigins = [
        'http://localhost:3000',
    ];

    app.use(express.json());
    app.use(cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'x-username'],
        credentials: true, // Allow cookies or credentials if needed
    }));
    app.use("/api/upstox", upstox);
    app.use("/api/auth", auth);
    app.use(error);
};