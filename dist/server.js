"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log('MongoDB connected successfully');
        app_1.default.listen(config_1.default.port, () => {
            console.log(`App is running on port ${config_1.default.port}`);
        });
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
main();
