"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.convertResolution = exports.countFilesInDirectory = exports.decodeImage = exports.resizeImage = exports.checkImagePath = exports.setRandomId = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const sharp_1 = tslib_1.__importDefault(require("sharp"));
function setRandomId() {
    return Math.floor(Math.random() * 1000);
}
exports.setRandomId = setRandomId;
function checkImagePath(imagePath) {
    return new Promise((resolve, reject) => {
        fs_1.default.stat(imagePath, (error, stats) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
}
exports.checkImagePath = checkImagePath;
function resizeImage(imagePath, width, height) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const imageData = yield (0, sharp_1.default)(imagePath).resize(width, height).toBuffer();
            return imageData;
        }
        catch (e) {
            return null;
        }
    });
}
exports.resizeImage = resizeImage;
function decodeImage(buffer) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const image = yield (0, sharp_1.default)(buffer).toFormat("jpeg").toBuffer();
            const base64Image = image.toString();
            return base64Image;
        }
        catch (error) {
            return error;
        }
    });
}
exports.decodeImage = decodeImage;
function countFilesInDirectory(dirPath) {
    return new Promise((resolve, reject) => {
        fs_1.default.readdir(dirPath, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(files.length);
            }
        });
    });
}
exports.countFilesInDirectory = countFilesInDirectory;
function convertResolution(resolution) {
    return {
        width: parseInt(resolution.split("x")[0], 10),
        height: parseInt(resolution.split("x")[0], 10),
    };
}
exports.convertResolution = convertResolution;
function getStats(statsString) {
    const hitsMatch = statsString.match(/keyspace_hits:(\d+)/);
    const missesMatch = statsString.match(/keyspace_misses:(\d+)/);
    const regex = /keys=(\d+)/;
    const match = statsString.match(regex);
    let noOfCachedFiles = null;
    if (match) {
        noOfCachedFiles = parseInt(match[1], 10);
    }
    else {
        throw new Error("No file found!");
    }
    const hits = parseInt(hitsMatch ? hitsMatch[1] : "0");
    const misses = parseInt(missesMatch ? missesMatch[1] : "0");
    const hitRatio = hits / (hits + misses);
    return { hits, misses, hitRatio, noOfCachedFiles };
}
exports.getStats = getStats;
//# sourceMappingURL=imagehelper.js.map