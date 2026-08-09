"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestIdMiddleware = requestIdMiddleware;
const uuid_1 = require("uuid");
function requestIdMiddleware(req, res, next) {
    const reqId = req.headers['x-request-id'] || (0, uuid_1.v4)();
    req.headers['x-request-id'] = reqId;
    res.setHeader('x-request-id', reqId);
    next();
}
