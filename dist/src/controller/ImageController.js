"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const imagehelper_1 = require("../helper/imagehelper");
const ImageCaching_1 = tslib_1.__importDefault(require("../helper/ImageCaching"));
class ImageController {
    resizeImage(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const imageName = req.params.image_name;
                const resolutionString = req.query.resolution;
                if (!imageName)
                    throw new Error("Please fill in the params field");
                const imagePath = path_1.default.join(__dirname, "../", "images", `image_${imageName}.jpg`);
                yield (0, imagehelper_1.checkImagePath)(imagePath);
                const resolution = (0, imagehelper_1.convertResolution)(resolutionString);
                const width = resolution.width;
                const height = resolution.height;
                const resizedImage = yield (0, imagehelper_1.resizeImage)(imagePath, width, height);
                yield ImageCaching_1.default.cacheImage(imagePath, width, resizedImage);
                res.setHeader("Content-Type", "image/jpeg");
                res.status(200).send(resizedImage);
            }
            catch (e) {
                res.status(500).json({
                    message: e.message,
                });
            }
        });
    }
    postImage(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                res.send({
                    message: "File uploaded",
                    result: req.file.filename,
                    imageAvailableAt: `http://localhost:5000/images/${req.file.filename}`,
                });
            }
            catch (e) {
                res.send(e);
            }
        });
    }
    getStats(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let statsString = yield ImageCaching_1.default.getCacheStats();
                const { hits, misses, hitRatio, noOfCachedFiles } = (0, imagehelper_1.getStats)(statsString);
                const imageFolder = path_1.default.join(__dirname, "../", "images");
                const noOfOriginaFiles = yield (0, imagehelper_1.countFilesInDirectory)(imageFolder);
                res.send({
                    RelevantInfo: {
                        hits,
                        misses,
                        noOfCachedFiles,
                        noOfOriginaFiles,
                        hitRatio,
                    },
                    OtherInfo: { statsString },
                });
            }
            catch (e) {
                res.send(e);
            }
        });
    }
}
exports.default = new ImageController();
//# sourceMappingURL=ImageController.js.map