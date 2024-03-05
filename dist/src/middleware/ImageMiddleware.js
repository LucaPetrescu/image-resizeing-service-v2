"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const multer_1 = tslib_1.__importDefault(require("multer"));
const imagehelper_1 = require("../helper/imagehelper");
class ImageMiddleware {
}
ImageMiddleware.memoryLoader = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 2097152, // 2 MByte
    },
});
ImageMiddleware.diskLoader = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, path_1.default.join(__dirname, "../images/"));
        },
        filename: (req, file, cb) => {
            return cb(null, `${file.fieldname}_${(0, imagehelper_1.setRandomId)()}${path_1.default.extname(file.originalname)}`);
        },
    }),
    limits: {
        fileSize: 67108864, // 64 MByte
    },
});
exports.default = ImageMiddleware;
//# sourceMappingURL=ImageMiddleware.js.map