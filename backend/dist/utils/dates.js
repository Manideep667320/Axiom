"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWithinHours = isWithinHours;
function isWithinHours(date, hours) {
    const diffMs = Date.now() - date.getTime();
    return diffMs <= hours * 3600 * 1000;
}
