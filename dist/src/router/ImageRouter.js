"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const BaseRouter_1 = tslib_1.__importDefault(require("./base/BaseRouter"));
const ImageController_1 = tslib_1.__importDefault(require("../controller/ImageController"));
const ImageMiddleware_1 = tslib_1.__importDefault(require("../middleware/ImageMiddleware"));
class NoteRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/resizeImage/:image_name", ImageController_1.default.resizeImage);
        this.router.post("/postImage", ImageMiddleware_1.default.diskLoader.single("image"), ImageController_1.default.postImage);
        this.router.get("/getStats", ImageController_1.default.getStats);
    }
}
exports.default = new NoteRoutes().router;
//# sourceMappingURL=ImageRouter.js.map