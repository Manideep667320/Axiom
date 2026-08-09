"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRunsController = getRunsController;
const run_repository_1 = require("../../repositories/run.repository");
async function getRunsController(req, res, next) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 20;
        const runs = await run_repository_1.runRepository.getRecentRuns(limit);
        res.json({ runs });
    }
    catch (err) {
        next(err);
    }
}
