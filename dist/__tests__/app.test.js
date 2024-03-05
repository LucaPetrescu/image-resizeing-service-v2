"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const index_1 = require("../src/index");
beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(index_1.app).get("/app");
}));
describe("API Endpoint /app", () => {
    it("should return stats data on GET /getStats", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const resGetStats = yield (0, supertest_1.default)(index_1.app).get("/app/getStats");
        expect(resGetStats.status).toEqual(200);
    }));
});
//# sourceMappingURL=app.test.js.map