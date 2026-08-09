"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const logger_1 = require("../../config/logger");
function errorMiddleware(err, req, res, next) {
    logger_1.logger.error({ err, url: req.url, method: req.method }, 'Unhandled Express Error');
    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
}
