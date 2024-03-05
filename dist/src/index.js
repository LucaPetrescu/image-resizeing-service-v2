"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/.env" });
const tslog_1 = require("tslog");
const ImageRouter_1 = tslib_1.__importDefault(require("./router/ImageRouter"));
const express_fileupload_1 = tslib_1.__importDefault(require("express-fileupload"));
const redisConnect_1 = require("./helper/redisConnect");
const path_1 = tslib_1.__importDefault(require("path"));
dotenv_1.default.config();
const logger = new tslog_1.Logger();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
        this.redisConnection();
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send("Welcome");
        });
        this.app.use("/app", ImageRouter_1.default);
    }
    redisConnection() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, redisConnect_1.getRedisClient)();
                console.log("Hello from redis");
            }
            catch (error) {
                console.error("Redis connection error:", error);
            }
        });
    }
}
exports.app = new App().app;
exports.app.use(require("express-status-monitor")());
exports.app.use("/images", express_1.default.static(path_1.default.join(__dirname, "/images")));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((0, express_fileupload_1.default)());
exports.app.listen(process.env.PORT || 5000, () => {
    logger.info("Server running on port " + process.env.PORT);
});
//# sourceMappingURL=index.js.map