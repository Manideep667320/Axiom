"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agent_controller_1 = require("../controllers/agent.controller");
const router = (0, express_1.Router)();
router.post('/init', agent_controller_1.initAgentController);
router.get('/status', agent_controller_1.getAgentStatusController);
router.get('/topics', agent_controller_1.getAgentTopicsController);
exports.default = router;
