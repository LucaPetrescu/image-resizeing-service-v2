"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const uri = "mongodb://localhost:27017/";
const dbName = "Images";
function dbconnect() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri + dbName);
            console.log("Connected to MongoDB");
            // Use the db object to interact with your collections
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    });
}
exports.default = dbconnect;
//# sourceMappingURL=dbconnect.js.map