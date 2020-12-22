"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schedule = exports.publishSubscribe = exports.ping = exports.leaderElection = exports.keyValue = exports.directMessage = exports.cryptoKeyValue = exports.cron = exports.counter = exports.accounts = void 0;
const accounts = __importStar(require("./platform/accounts"));
exports.accounts = accounts;
const counter = __importStar(require("./platform/counter"));
exports.counter = counter;
const cron = __importStar(require("./platform/cron"));
exports.cron = cron;
const cryptoKeyValue = __importStar(require("./platform/cryptoKeyValue"));
exports.cryptoKeyValue = cryptoKeyValue;
const directMessage = __importStar(require("./platform/directMessage"));
exports.directMessage = directMessage;
const keyValue = __importStar(require("./platform/keyValue"));
exports.keyValue = keyValue;
const leaderElection = __importStar(require("./platform/leaderElection"));
exports.leaderElection = leaderElection;
const ping = __importStar(require("./platform/ping"));
exports.ping = ping;
const publishSubscribe = __importStar(require("./platform/publishSubscribe"));
exports.publishSubscribe = publishSubscribe;
const schedule = __importStar(require("./platform/schedule"));
exports.schedule = schedule;
//# sourceMappingURL=platform.js.map