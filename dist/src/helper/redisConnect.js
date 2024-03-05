"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = void 0;
const tslib_1 = require("tslib");
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
function getRedisClient() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!client.isOpen) {
            yield client.connect();
        }
        return client;
    });
}
exports.getRedisClient = getRedisClient;
//# sourceMappingURL=redisConnect.js.map