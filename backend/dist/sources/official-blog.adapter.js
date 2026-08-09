"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficialBlogAdapter = void 0;
const rss_adapter_1 = require("./rss.adapter");
class OfficialBlogAdapter extends rss_adapter_1.RSSAdapter {
    type = 'official_blog';
}
exports.OfficialBlogAdapter = OfficialBlogAdapter;
