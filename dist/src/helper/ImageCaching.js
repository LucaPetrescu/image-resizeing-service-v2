"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const redisConnect_1 = require("../helper/redisConnect");
class ImageCaching {
    constructor() { }
    getClient() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let client = yield (0, redisConnect_1.getRedisClient)();
            return client;
        });
    }
    getCachedImage(imagePath, width) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cacheKey = `image:${imagePath}-${width}`;
            const cachedBuffer = yield (yield this.getClient()).get(cacheKey);
            if (cachedBuffer) {
                return cachedBuffer;
            }
            return null;
        });
    }
    cacheImage(imagePath, width, imageBuffer) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const cacheKey = `image:${imagePath}-${width}`;
            yield (yield this.getClient()).set(cacheKey, imageBuffer);
        });
    }
    getCacheStats() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let client = yield (0, redisConnect_1.getRedisClient)();
            return yield client.info();
        });
    }
}
exports.default = new ImageCaching();
//# sourceMappingURL=ImageCaching.js.map